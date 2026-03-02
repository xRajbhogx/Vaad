import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { getCurrentUserId } from '@/lib/auth'
import { styles } from './styles'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import type { DebateFormat } from '@/types'

const FORMATS: { key: DebateFormat; label: string; duration: string }[] = [
  { key: 'quick', label: 'Quick', duration: '6 min' },
  { key: 'standard', label: 'Standard', duration: '12 min' },
  { key: 'deep', label: 'Deep', duration: '20 min' },
]

export default function CreateDebateScreen() {
  const [topic, setTopic] = useState('')
  const [name, setName] = useState('')
  const [format, setFormat] = useState<DebateFormat>('standard')
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
        <View style={styles.container}>

          {/* Header */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome5 name="long-arrow-alt-left" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.heading}>New Debate</Text>
          <View style={styles.headingUnderline} />

          {/* Your name */}
          <Text style={styles.label}>Your name</Text>
          <TextInput
            style={styles.input}
            placeholder="What should we call you?"
            placeholderTextColor="#4A5568"
            value={name}
            onChangeText={setName}
            maxLength={40}
          />

          {/* Topic */}
          <Text style={styles.label}>Topic</Text>
          <TextInput
            style={[styles.input, styles.topicInput]}
            placeholder="State a clear, debatable position..."
            placeholderTextColor="#4A5568"
            value={topic}
            onChangeText={setTopic}
            multiline
            maxLength={200}
          />
          <Text style={styles.charCount}>{topic.length}/200</Text>

          {/* Format selector */}
          <Text style={styles.label}>Format</Text>
          <View style={styles.formatRow}>
            {FORMATS.map((f) => (
              <TouchableOpacity
                key={f.key}
                style={[
                  styles.formatButton,
                  format === f.key && styles.formatButtonActive,
                ]}
                onPress={() => setFormat(f.key)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.formatLabel,
                    format === f.key && styles.formatLabelActive,
                  ]}
                >
                  {f.label}
                </Text>
                <Text
                  style={[
                    styles.formatDuration,
                    format === f.key && styles.formatDurationActive,
                  ]}
                >
                  {f.duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
              <Text style={styles.createButtonText}>Create Debate</Text>
            )}
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

