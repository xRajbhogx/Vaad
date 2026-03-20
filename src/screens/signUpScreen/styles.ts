import { Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#111111",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 8,
  },

  /* Back */
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: "#888",
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },

  /* Logo */
  logo: {
    color: "#C0392B",
    fontSize: 28,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 6,
    letterSpacing: 1,
  },

  /* Heading */
  heading: {
    color: "#F0EDE8",
    fontSize: 26,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 6,
    lineHeight: 32,
  },
  subheading: {
    color: "#888",
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 28,
    lineHeight: 20,
  },

  /* Fields */
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#888",
    fontSize: 11,
    letterSpacing: 1.4,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  optionalBadge: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  optionalText: {
    color: "#666",
    fontSize: 9,
    letterSpacing: 1,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },
  input: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#2E2E2E",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    color: "#F0EDE8",
    fontSize: 15,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  inputFocused: {
    borderColor: "#C0392B",
  },
  inputError: {
    borderColor: "#C0392B",
    color: "#4FC3F7",
  },
  stanceInput: {
    height: 80,
    paddingTop: 14,
    lineHeight: 22,
  },
  hint: {
    color: "#555",
    fontSize: 11,
    marginTop: 6,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontStyle: "italic",
  },

  divider: {
    height: 1,
    backgroundColor: "#222",
    marginBottom: 20,
  },

  /* Terms */
  terms: {
    color: "#555",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 22,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  link: {
    color: "#888",
    textDecorationLine: "underline",
  },

  /* CTA */
  ctaButton: {
    backgroundColor: "#C0392B",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#C0392B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },

  /* Sign In */
  signInText: {
    color: "#555",
    fontSize: 13,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  signInLink: {
    color: "#888",
    textDecorationLine: "underline",
  },
});