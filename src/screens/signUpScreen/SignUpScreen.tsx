import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function VaadSignupScreen({ navigation }: any) {
  const [displayName, setDisplayName] = useState("Priya Mehta");
  const [email, setEmail] = useState("priya@example.com");
  const [password, setPassword] = useState("............");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getInputStyle = (fieldName: string) => [
    styles.input,
    focusedField === fieldName && styles.inputFocused,
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#111111" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          {/* Logo */}
          <Text style={styles.logo}>vaad</Text>

          {/* Heading */}
          <Text style={styles.heading}>Create your account</Text>
          <Text style={styles.subheading}>
            Join the argument. No noise, just substance.
          </Text>

          {/* Display Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>DISPLAY NAME</Text>
            <TextInput
              style={getInputStyle("displayName")}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Your display name"
              placeholderTextColor="#555"
              onFocus={() => setFocusedField("displayName")}
              onBlur={() => setFocusedField(null)}
              autoCapitalize="words"
              selectionColor="#C0392B"
            />
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={[getInputStyle("email"), styles.inputError]}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#555"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              keyboardType="email-address"
              autoCapitalize="none"
              selectionColor="#C0392B"
            />
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={getInputStyle("password")}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#555"
              secureTextEntry
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              selectionColor="#C0392B"
            />
            <Text style={styles.hint}>
              Minimum 8 characters. You know the drill.
            </Text>
          </View>

          <View style={styles.divider} />


          {/* Terms */}
          <Text style={styles.terms}>
            By creating an account you agree to Vaad`&pos;s{" "}
            <Text style={styles.link}>Terms of Use</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>

          {/* Create Account Button */}
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.85}
            onPress={() => {}}
          >
            <Text style={styles.ctaText}>Create Account</Text>
          </TouchableOpacity>

          {/* Sign In */}
          <Text style={styles.signInText}>
            Already have an account?{" "}
            <Text
              style={styles.signInLink}
              onPress={() => navigation?.navigate("Login")}
            >
              Sign in
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

