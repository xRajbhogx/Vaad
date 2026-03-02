import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: '#0D1117' },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
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
    flexDirection: 'row',
    gap: 10,
    marginBottom: 40,
  },
  formatButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#21262D',
    borderRadius: 6,
    paddingVertical: 12,
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