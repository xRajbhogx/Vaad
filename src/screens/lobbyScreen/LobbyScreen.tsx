import { View, Text, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

export default function Lobby() {
  const { debateId, participantId } = useLocalSearchParams()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lobby</Text>
      <Text style={styles.sub}>{debateId}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#F5A623', fontSize: 24 },
  sub: { color: '#8B949E', fontSize: 12, marginTop: 8 },
})