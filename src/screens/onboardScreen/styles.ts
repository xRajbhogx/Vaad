import { colors } from "@/src/constants/colors";
import { StyleSheet } from "react-native";
import {useFonts} from 'expo-font'


// ─── Styles ───────────────────────────────────────────────────────────────────
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent:"center",
    // paddingVertical:60,
    borderWidth:10,
    // alignItems:"center",
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    // marginTop: 100,
    // justifyContent:"center",
    paddingHorizontal: 22,
    paddingTop: 32,
    paddingBottom: 48,
  },

  // ── Logo ──
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
    justifyContent:"center"
  },
  logoText: {
    fontFamily: "serif",
    fontSize: 76,
    fontWeight: "700",
    color: colors.coral,
    letterSpacing: 1,
    marginRight: 8,
  },
  aiBadge: {
    backgroundColor: colors.coral,
    borderRadius: 5,
    borderWidth:2,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  aiBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // ── Headline ──
  headline: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.textPrimary,
    lineHeight: 36,
    marginBottom: 14,
    letterSpacing: -0.3,
  },

  // ── Subheadline ──
  subheadline: {
    fontSize: 14.5,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 26,
  },

  // ── Chat Card ──
  chatCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 16,
    marginBottom: 28,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  chatHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  aiDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.coral,
  },
  chatLabel: {
    fontSize: 10.5,
    fontWeight: "700",
    color: colors.coral,
    letterSpacing: 1.2,
  },
  mootBadge: {
    backgroundColor: colors.mootBg,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  mootBadgeText: {
    fontSize: 10,
    color: colors.mootText,
    fontWeight: "600",
  },
  aiQuestion: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 21,
    fontStyle: "italic",
    marginBottom: 14,
  },
  normalWeight: {
    fontStyle: "normal",
    fontWeight: "400",
  },
  linkText: {
    color: colors.link,
    fontStyle: "normal",
    textDecorationLine: "underline",
  },
  italicBold: {
    fontStyle: "italic",
    fontWeight: "600",
    color: colors.textPrimary,
  },
  yourResponseLabel: {
    fontSize: 9.5,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  userResponse: {
    fontSize: 13.5,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 14,
  },

  // ── Feedback Box ──
  feedbackBox: {
    backgroundColor: colors.feedbackBg,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.tealLight,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  feedbackIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  feedbackIcon: {
    color: colors.tealLight,
    fontSize: 13,
    fontWeight: "700",
  },
  feedbackStrong: {
    color: colors.tealLight,
    fontSize: 13,
    fontWeight: "700",
  },
  feedbackBody: {
    color: colors.feedbackText,
    fontSize: 12.5,
    lineHeight: 18,
  },

  // ── Feature list ──
  featureList: {
    marginBottom: 30,
    gap: 0,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    gap: 14,
  },
  featureIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  featureEmoji: {
    fontSize: 18,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 3,
  },
  featureDesc: {
    fontSize: 12.5,
    color: colors.textSecondary,
    lineHeight: 18,
  },

  // ── CTA ──
  ctaButton: {
    backgroundColor: colors.coral,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: colors.coral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaText: {
    color: colors.white,
    fontSize: 15.5,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // ── Sign In ──
  signInButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 18,
  },
  signInText: {
    color: colors.textSecondary,
    fontSize: 14.5,
    fontWeight: "600",
  },

  // ── Footer ──
  footerLink: {
    alignItems: "center",
    paddingVertical: 4,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 12,
    textDecorationLine: "underline",
  },
});