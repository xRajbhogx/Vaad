import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { DebateFormat } from '@/types'

const FORMATS: { key: DebateFormat; label: string; duration: string }[] = [
  { key: 'quick', label: 'Quick', duration: '6 min' },
  { key: 'standard', label: 'Standard', duration: '12 min' },
  { key: 'deep', label: 'Deep', duration: '20 min' },
]

export default function FormatSelector() {
  const [format, setFormat] = useState<DebateFormat>('standard')
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: '#0D1117' },
  container: {
    // flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    borderWidth:1
  },
  backButton: {
    marginBottom: 24,
    alignSelf: 'flex-start',
    padding: 4,
  },
  backArrow: {
    color: '#8B949E',
    fontSize: 24,
  },
  heading: {
    fontFamily: 'serif',
    fontSize: 28,
    color: '#E6EDF3',
    fontWeight: '700',
  },
  headingUnderline: {
    width: 40,
    height: 2,
    backgroundColor: '#F5A623',
    marginTop: 8,
    marginBottom: 32,
  },
  label: {
    color: '#8B949E',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#21262D',
    color: '#E6EDF3',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 28,
    fontFamily: 'serif',
  },
  topicInput: {
    minHeight: 64,
    textAlignVertical: 'top',
  },
  charCount: {
    color: '#4A5568',
    fontSize: 11,
    textAlign: 'right',
    marginTop: -20,
    marginBottom: 28,
  },
  formatRow: {
    flex:1,
    flexDirection: 'row',
    justifyContent:"space-evenly",
    paddingBottom:30,
    gap: 10,
    marginBottom: 40,
  },
  formatButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#21262D',
    borderRadius: 26,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#161B22',
  },
  formatButtonActive: {
    borderColor: '#F5A623',
    backgroundColor: '#1A1400',
  },
  formatLabel: {
    color: '#8B949E',
    fontSize: 14,
    fontWeight: '600',
  },
  formatLabelActive: {
    color: '#F5A623',
  },
  formatDuration: {
    color: '#4A5568',
    fontSize: 11,
    marginTop: 3,
  },
  formatDurationActive: {
    color: '#F5A623',
    opacity: 0.7,
  },
  createButton: {
    backgroundColor: '#F5A623',
    borderRadius: 6,
    paddingVertical: 18,
    alignItems: 'center',
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: '#0D1117',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
})