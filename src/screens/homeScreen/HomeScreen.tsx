import { router } from 'expo-router'
import React, { useEffect } from 'react'
import {
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { supabase } from '@/lib/supabase'


const { width } = Dimensions.get('window')

// Placeholder recent debates — replace with real Supabase data in Week 3
const PLACEHOLDER_DEBATES = [
  { id: '1', topic: '"Engineering is better than MBA"', time: '12 min',participants:'Rahul vs Arjun', scores: { prop: 3.8, opp: 4.1 } },
  { id: '2', topic: '"Remote work hurts company culture"', time: '6 min',participants:'Saransh vs Pushkar', scores: { prop: 4.2, opp: 3.5 } },
  { id: '3', topic: '"Social media should be regulated"', time: '20 min',participants:'Satyam vs Suraj', scores: { prop: 4.1, opp: 4.9 } },
  { id: '4', topic: '"Engineering is better than MBA"', time: '12 min',participants:'Kanishka vs Lakshay', scores: { prop: 3.8, opp: 4.1 } },
  { id: '5', topic: '"Remote work hurts company culture"', time: '6 min',participants:'Garv vs Utkarsh', scores: { prop: 4.2, opp: 3.5 } },
  { id: '6', topic: '"Social media should be regulated"', time: '20 min',participants:'Jaat vs Gurjar', scores: { prop: 3.1, opp: 3.9 } },
]

export default function HomeScreen() {

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />

      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.wordmark}>vaad</Text>
          <Text style={styles.tagline}>one good argument.</Text>
        </View>

        {/* Primary CTA */}
        <Pressable
          style={({pressed})=> [styles.primaryButton, 
            pressed ? styles.primaryButtonGlow : styles.primaryButton
          ]}
          onPress={() => router.push('/create-debate')}
        >
          <Text style={styles.primaryButtonText}>Start a Debate</Text>
        </Pressable>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>recent debates</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Feed */}
        <FlatList
          data={PLACEHOLDER_DEBATES}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.feedContent}
          renderItem={({ item }) => (
            <Pressable
              style={({pressed})=> [styles.debateCard, 
                pressed ? styles.debateCardGlow : styles.debateCard
              ]}
              // activeOpacity={0.8}
              onPress={() => router.push({ pathname: '/public-page', params: { debateId: item.id } })}
            >
              <View style={styles.cardTop}>
                <Text style={styles.cardTopic}>{item.topic}</Text>
                {/* <Text style={styles.cardtime}>{item.time}</Text> */}
              </View>

              <View style={styles.cardBottomText}>
                <View style={styles.participant_timeBlock}>
                  <View>
                    <Text style={styles.participants}>{item.participants}</Text>
                      <View style={styles.scoreBlock}>
                      <View style={styles.scoreButton}>
                        <Text style={styles.scoreValue}>{item.scores.prop.toFixed(1)}</Text>
                      </View>
                      <View style={styles.scoreButton}>
                        <Text style={styles.scoreValue}>{item.scores.opp.toFixed(1)}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.participants}>•</Text>
                  <Text style={styles.participants}>{item.time}</Text>
                </View>

                <View style={styles.scoreDivider} />

                {/* <View style={styles.scoreBlock}>
                  <View style={styles.scoreButton}>
                    <Text style={styles.scoreValue}>{item.scores.prop.toFixed(1)}</Text>
                  </View>
                  <View style={styles.scoreButton}>
                    <Text style={styles.scoreValue}>{item.scores.opp.toFixed(1)}</Text>
                  </View>
                </View> */}
              </View>
            </Pressable>
          )}
        />

      </View>
    </SafeAreaView>
  )
}


