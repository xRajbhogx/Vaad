import { ensureSession, getCurrentUserId } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { darkColors } from '@/src/constants/colors'
import type { Debate, Participant } from '@/types'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LobbyScreen() {
  const { debateId, participantId } = useLocalSearchParams<{
    debateId: string
    participantId?: string
  }>()

  const colors = {
    ...darkColors,
    accent: darkColors.button,
    textPrimary: '#E6EDF3',
    surface: '#161B22',
    border: darkColors.divider,
    textFaint: '#4A5568',
  }
  const isCreator = !!participantId

  // Shared state
  const [debate, setDebate] = useState<Debate | null>(null)
  const [loading, setLoading] = useState(true)

  // Opponent joining state
  const [name, setName] = useState('')
  const [joining, setJoining] = useState(false)

  // Creator waiting state
  const [opponentJoined, setOpponentJoined] = useState(false)

  // Pulse animation for waiting indicator
  const pulseAnim = useRef(new Animated.Value(1)).current

  // ─── Fetch the debate on mount ───────────────────────────
  useEffect(() => {
    fetchDebate()
  }, [debateId])

  async function fetchDebate() {
    const { data, error } = await supabase
      .from('debates')
      .select('*')
      .eq('id', debateId)
      .single()

    if (error || !data) {
      Alert.alert('Error', 'Debate not found.')
      router.back()
      return
    }

    setDebate(data)
    setLoading(false)
  }

  // ─── Realtime subscription (creator only) ────────────────
  useEffect(() => {
    if (!isCreator) return

    const channel = supabase
      .channel(`lobby:${debateId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'participants',
          filter: `debate_id=eq.${debateId}`,
        },
        (payload) => {
          const newParticipant = payload.new as Participant
          // Only react to the opposition joining, not our own insert
          if (newParticipant.side === 'opposition') {
            setOpponentJoined(true)
            // Small delay so both phones see "connected" before moving on
            setTimeout(() => {
              router.replace(
                `/debate?debateId=${debateId}&participantId=${participantId}`
              )
            }, 1500)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [isCreator, debateId, participantId])

  // ─── Pulse animation ──────────────────────────────────────
  useEffect(() => {
    if (!isCreator || opponentJoined) return

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [isCreator, opponentJoined])

  // ─── Share the debate link ────────────────────────────────
  async function handleShare() {
    try {
      await Share.share({
        message: `Join my debate on Vaad: vaad://lobby?debateId=${debateId}`,
        title: debate?.topic,
      })
    } catch (err) {
      console.error(err)
    }
  }

  // ─── Opponent joins ───────────────────────────────────────
  async function handleJoin() {
    if (!name.trim()) {
      Alert.alert('Name required', 'Enter your name to join.')
      return
    }

    setJoining(true)

    try {
      await ensureSession()
      const userId = await getCurrentUserId()

      // Insert opposition participant
      const { data: participant, error } = await supabase
        .from('participants')
        .insert({
          debate_id: debateId,
          user_id: userId,
          name: name.trim(),
          side: 'opposition',
        })
        .select()
        .single()

      if (error) throw error

      // Update debate status to active
      await supabase
        .from('debates')
        .update({ status: 'active' })
        .eq('id', debateId)

      // Navigate to debate screen
      router.replace(
        `/debate?debateId=${debateId}&participantId=${participant.id}`
      )
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Could not join debate.')
      setJoining(false)
    }
  }

  // ─── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
        <ActivityIndicator color={colors.accent} style={{ marginTop: 60 }} />
      </SafeAreaView>
    )
  }

  // ─── Render ───────────────────────────────────────────────
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.container, { backgroundColor: colors.bg }]}>

          {/* Format badge */}
          <Text style={[styles.formatBadge, { color: colors.textMuted }]}>
            {debate?.format.toUpperCase()} FORMAT
          </Text>

          {/* Topic */}
          <Text style={[styles.topic, { color: colors.textPrimary }]}>
            {debate?.topic}
          </Text>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {isCreator ? (
            // ── CREATOR VIEW ─────────────────────────────
            <View style={styles.section}>
              {opponentJoined ? (
                // Opponent connected
                <View style={styles.connectedContainer}>
                  <Text style={[styles.connectedText, { color: colors.accent }]}>
                    Opponent connected
                  </Text>
                  <Text style={[styles.connectedSub, { color: colors.textMuted }]}>
                    Starting debate...
                  </Text>
                  <ActivityIndicator
                    color={colors.accent}
                    style={{ marginTop: 16 }}
                  />
                </View>
              ) : (
                // Waiting for opponent
                <>
                  <View style={styles.waitingRow}>
                    <Animated.Text
                      style={[
                        styles.waitingText,
                        { color: colors.textMuted, opacity: pulseAnim },
                      ]}
                    >
                      ...
                    </Animated.Text>
                  </View>

                  <Text style={[styles.yourSide, { color: colors.textMuted }]}>
                    You are arguing{' '}
                    <Text style={{ color: colors.accent }}>Proposition</Text>
                  </Text>

                  {/* Share link */}
                  <View
                    style={[
                      styles.linkBox,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.linkText, { color: colors.textMuted }]}
                      numberOfLines={1}
                    >
                      vaad://lobby?debateId={debateId}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.shareButton,
                      { backgroundColor: colors.accent },
                    ]}
                    onPress={handleShare}
                    activeOpacity={0.85}
                  >
                    <Text
                      style={[
                        styles.shareButtonText,
                        { color: colors.buttonText },
                      ]}
                    >
                      Share Invite Link
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ) : (
            // ── OPPONENT VIEW ────────────────────────────
            <View style={styles.section}>
              <Text style={[styles.joinLabel, { color: colors.textMuted }]}>
                You are joining as{' '}
                <Text style={{ color: colors.accent }}>Opposition</Text>
              </Text>

              <Text
                style={[styles.inputLabel, { color: colors.textMuted }]}
              >
                YOUR NAME
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: colors.inputText,
                    borderBottomColor: colors.border,
                  },
                ]}
                placeholder="What should we call you?"
                placeholderTextColor={colors.textFaint}
                value={name}
                onChangeText={setName}
                maxLength={40}
                autoFocus
              />

              <TouchableOpacity
                style={[
                  styles.joinButton,
                  { backgroundColor: colors.accent },
                  joining && styles.buttonDisabled,
                ]}
                onPress={handleJoin}
                activeOpacity={0.85}
                disabled={joining}
              >
                {joining ? (
                  <ActivityIndicator color={colors.buttonText} />
                ) : (
                  <Text
                    style={[
                      styles.joinButtonText,
                      { color: colors.buttonText },
                    ]}
                  >
                    Join Debate
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },

  formatBadge: {
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 12,
  },
  topic: {
    fontFamily: 'serif',
    fontSize: 26,
    lineHeight: 36,
    fontWeight: '700',
    marginBottom: 32,
  },
  divider: {
    height: 1,
    marginBottom: 40,
  },

  section: {
    flex: 1,
  },

  // Creator — waiting
  waitingRow: {
    marginBottom: 16,
  },
  waitingText: {
    fontFamily: 'serif',
    fontSize: 18,
  },
  yourSide: {
    fontSize: 14,
    marginBottom: 32,
  },
  linkBox: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  linkText: {
    fontSize: 12,
    fontFamily: 'serif',
  },
  shareButton: {
    borderRadius: 6,
    paddingVertical: 16,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Creator — connected
  connectedContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  connectedText: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: '700',
  },
  connectedSub: {
    fontSize: 14,
    marginTop: 8,
  },

  // Opponent
  joinLabel: {
    fontSize: 15,
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 18,
    paddingVertical: 10,
    marginBottom: 40,
    fontFamily: 'serif',
  },
  joinButton: {
    borderRadius: 6,
    paddingVertical: 18,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
})