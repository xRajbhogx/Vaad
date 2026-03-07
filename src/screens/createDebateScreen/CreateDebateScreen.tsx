import { getCurrentUserId } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import type { DebateFormat } from '@/types'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'

const FORMATS: { key: DebateFormat; label: string; duration: string; rounds: string }[] = [
  { key: 'quick',    label: 'Quick',    duration: '6 minutes',  rounds: '4 rounds' },
  { key: 'standard', label: 'Standard', duration: '12 minutes', rounds: '4 rounds' },
  { key: 'deep',     label: 'Deep',     duration: '20 minutes', rounds: '4 rounds' },
]

const TOPIC_CHIPS = ['College', 'Work', 'Society', 'Tech', 'Culture', 'Random']

export default function CreateDebateScreen() {
  const [topic, setTopic] = useState('')
  const [name, setName] = useState('')
  const [format, setFormat] = useState<DebateFormat>('standard')
  const [selectedChip, setSelectedChip] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleCreate() {
    if (!topic.trim()) {
      Alert.alert('Topic required', 'Enter a topic for the debate.')
      return
    }

    if (!name.trim()) {
      Alert.alert('Name required', 'Enter your name.')
      return
    }

    setLoading(true)

    let debateId: string | null = null

    try {
      const userId = await getCurrentUserId()

      // 1️⃣ Create debate as draft
      const { data: debate, error: debateError } = await supabase
        .from('debates')
        .insert({
          topic: topic.trim(),
          format,
          created_by: userId,
        })
        .select()
        .single()

      if (debateError) throw debateError

      debateId = debate.id

      // 2️⃣ Insert participant (proposition)
      const { data: participant, error: participantError } = await supabase
        .from('debate_participants')
        .insert({
          debate_id: debate.id,
          profile_id: userId,
          display_name: name.trim(),
          side: 'proposition',
        })
        .select()
        .single()

      if (participantError) throw participantError

      // 3️⃣ Move debate to waiting (only if still draft)
      const { error: updateError } = await supabase
        .from('debates')
        .update({ status: 'waiting' })
        .eq('id', debate.id)
        .eq('status', 'draft')

      if (updateError) throw updateError

      // 4️⃣ Navigate to lobby
      router.push(
        `/lobby?debateId=${debate.id}&participantId=${participant.id}`
      )

    } catch (err: any) {
      console.error(err)

      // 🧹 Rollback draft if something failed
      if (debateId) {
        await supabase
          .from('debates')
          .delete()
          .eq('id', debateId)
          .eq('status', 'draft')
      }

      Alert.alert('Error', err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Nav */}
          <View style={styles.nav}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.screenTitle}>New Debate</Text>
          </View>

          {/* Topic */}
          <Text style={styles.fieldLabel}>Topic</Text>
          <TextInput
            style={styles.textInput}
            placeholder="What are you debating?"
            placeholderTextColor="rgba(240,237,232,0.25)"
            value={topic}
            onChangeText={setTopic}
            multiline
            maxLength={200}
          />

          {/* Chips */}
          <Text style={styles.fieldLabel}>Or pick one</Text>
          <View style={styles.chipsRow}>
            {TOPIC_CHIPS.map((chip) => (
              <TouchableOpacity
                key={chip}
                style={[styles.chip, selectedChip === chip && styles.chipActive]}
                onPress={() => setSelectedChip(selectedChip === chip ? null : chip)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, selectedChip === chip && styles.chipTextActive]}>
                  {chip}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Format */}
          <Text style={styles.fieldLabel}>Format</Text>
          <View style={styles.formatOptions}>
            {FORMATS.map((f) => (
              <TouchableOpacity
                key={f.key}
                style={[styles.formatOption, format === f.key && styles.formatOptionSelected]}
                onPress={() => setFormat(f.key)}
                activeOpacity={0.7}
              >
                <View style={[styles.radioDot, format === f.key && styles.radioDotSelected]}>
                  {format === f.key && <View style={styles.radioDotInner} />}
                </View>
                <View style={styles.formatText}>
                  <Text style={styles.formatName}>{f.label}</Text>
                  <Text style={styles.formatDurationText}>{f.duration} · {f.rounds}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Your Name */}
          <Text style={styles.fieldLabel}>Your Name</Text>
          <TextInput
            style={[styles.textInput, styles.nameInput]}
            placeholder="What should we call you?"
            placeholderTextColor="rgba(240,237,232,0.25)"
            value={name}
            onChangeText={setName}
            maxLength={40}
          />

          {/* Create button */}
          <TouchableOpacity
            style={[styles.createButton, loading && styles.createButtonDisabled]}
            onPress={handleCreate}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#0D1117" />
            ) : (
              <Text style={styles.createButtonText}>Create & Share Link</Text>
            )}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

