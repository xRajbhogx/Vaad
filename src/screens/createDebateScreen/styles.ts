import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: '#0D1117' },
  scroll: { flex: 1 },
  container: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 48,
  },

  // ── Nav ─────────────────────────────────────────
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 28,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(240,237,232,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#F0EDE8',
    fontSize: 16,
    lineHeight: 18,
  },
  screenTitle: {
    fontFamily: 'serif',
    fontSize: 18,
    color: '#F0EDE8',
  },

  // ── Field label ──────────────────────────────────
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(240,237,232,0.5)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },

  // ── Text inputs ──────────────────────────────────
  textInput: {
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#F0EDE8',
    fontFamily: 'serif',
    fontStyle: 'italic',
    fontSize: 14,
    marginBottom: 20,
  },
  nameInput: {
    fontStyle: 'normal',
  },

  // ── Topic chips ──────────────────────────────────
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
  },
  chipActive: {
    backgroundColor: 'rgba(245,166,35,0.12)',
    borderColor: 'rgba(245,166,35,0.3)',
  },
  chipText: {
    fontSize: 12,
    color: 'rgba(240,237,232,0.5)',
    fontWeight: '400',
  },
  chipTextActive: {
    color: '#F5A623',
  },

  // ── Format radio options ─────────────────────────
  formatOptions: {
    gap: 8,
    marginBottom: 20,
  },
  formatOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
  },
  formatOptionSelected: {
    backgroundColor: 'rgba(245,166,35,0.12)',
    borderColor: 'rgba(245,166,35,0.3)',
  },
  radioDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(240,237,232,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDotSelected: {
    borderColor: '#F5A623',
  },
  radioDotInner: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F5A623',
  },
  formatText: {
    flex: 1,
  },
  formatName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#F0EDE8',
  },
  formatDurationText: {
    fontSize: 11,
    color: 'rgba(240,237,232,0.25)',
    marginTop: 2,
  },

  // ── Create button ────────────────────────────────
  createButton: {
    backgroundColor: '#F5A623',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 4,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: '#0D1117',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
})
