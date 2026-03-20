import { Tabs } from "expo-router";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

function VaadTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const tabs = [
    { name: "index", label: "Feed", icon: "home" },
    { name: "debate", label: "Debate", icon: "add", isFab: true },
    { name: "profile", label: "Profile", icon: "person" },
  ];

  return (
    <View style={[styles.barWrapper, { paddingBottom: insets.bottom || 12 }]}>
      <View style={styles.bar}>
        {tabs.map((tab, i) => {
          const isFocused = state.index === i;

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(tab.name); // ✅ removed dead routeName variable
            }
          };

          if (tab.isFab) {
            return (
              <TouchableOpacity
                key={tab.name}
                onPress={onPress}
                style={styles.fabWrapper}
                activeOpacity={0.85}
              >
                <View style={[styles.fab, isFocused && styles.fabActive]}> {/* ✅ focused state */}
                  <Ionicons name="add" size={28} color="#FFFFFF" />
                </View>
                <Text style={[styles.fabLabel, isFocused && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          }

          const iconName = isFocused
            ? (tab.icon as any)
            : (`${tab.icon}-outline` as any);

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              {isFocused && <View style={styles.activeBar} />}
              <Ionicons name={iconName} size={24} color={isFocused ? "#C0392B" : "#555"} />
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <VaadTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="debate" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  barWrapper: {
    backgroundColor: "#161616",
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  bar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingBottom: 2,
  },
  activeBar: {
    position: "absolute",
    top: -10,
    width: 28,
    height: 3,
    backgroundColor: "#C0392B",
    borderRadius: 2,
  },
  tabLabel: {
    color: "#555",
    fontSize: 11,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  tabLabelActive: {
    color: "#C0392B",
  },
  fabWrapper: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  fab: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#C0392B",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    shadowColor: "#C0392B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  fabActive: {               // ✅ new — dimmed when focused so user knows they're already there
    backgroundColor: "#96221A",
  },
  fabLabel: {
    color: "#F0EDE8",
    fontSize: 11,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
});