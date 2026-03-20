import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
  // Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { colors } from "@/src/constants/colors";
import { router } from "expo-router";

// const { width } = Dimensions.get("window");

// ─── tiny Animated wrapper ───────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 520,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 520,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  });

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

// ─── Feature row ─────────────────────────────────────────────────────────────
type FeatureRowProps = {
  emoji: string;
  title: string;
  description: string;
  delay?: number;
};

function FeatureRow({ emoji, title, description, delay = 0 }: FeatureRowProps) {
  return (
    <FadeIn delay={delay}>
      <View style={styles.featureRow}>
        <View style={styles.featureIconBox}>
          <Text style={styles.featureEmoji}>{emoji}</Text>
        </View>
        <View style={styles.featureText}>
          <Text style={styles.featureTitle}>{title}</Text>
          <Text style={styles.featureDesc}>{description}</Text>
        </View>
      </View>
    </FadeIn>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function VaadScreen() {

  const onStartPress = () => {
    router.push('/')
  };

  const onLogin = () => {
    router.push('/(auth)/loginScreen/LoginScreen')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Logo ── */}
          <FadeIn delay={0}>
            <View style={styles.logoRow}>
              <Text style={styles.logoText}>vaad</Text>
              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>AI</Text>
              </View>
            </View>
          </FadeIn>

          {/* ── Feature list ── */}
          <View style={styles.featureList}>
            <FeatureRow
              emoji="✏️"
              title="Doesn't let you win easily"
              description="Adversarially prompted to hold position under pressure, like a real judge or senior counsel would."
              delay={360}
            />
            <FeatureRow
              emoji="🔍"
              title="Actionable post-session analysis"
              description='Not "great point" — specific feedback on which citations landed, which arguments collapsed, what to fix.'
              delay={420}
            />
            <FeatureRow
              emoji="🧠"
              title="Remembers your patterns"
              description="Tracks what you always get wrong across sessions. Tells you before the next moot."
              delay={480}
            />
          </View>

          {/* ── CTA ── */}
          <FadeIn delay={560}>
            <TouchableOpacity style={styles.ctaButton} activeOpacity={0.85} onPress={onStartPress}>
              <Text style={styles.ctaText}>Start Practicing Free</Text>
            </TouchableOpacity>
          </FadeIn>

          {/* ── Sign In ── */}
          <FadeIn delay={610}>
            <TouchableOpacity style={styles.signInButton} activeOpacity={0.7} onPress={onLogin}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </FadeIn>

          {/* ── Footer ── */}
          <FadeIn delay={650}>
            <TouchableOpacity style={styles.footerLink} activeOpacity={0.6}>
              <Text style={styles.footerText}>
                For law colleges &amp; societies 
              </Text>
            </TouchableOpacity>
          </FadeIn>
        </ScrollView>
    </SafeAreaView>
  );
}

