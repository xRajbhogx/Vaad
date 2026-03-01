import { router } from 'expo-router'
import React from 'react'
import {
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles as makeStyles } from './styles'
import { darkColors } from '@/src/constants/colors'
import Ionicons from '@expo/vector-icons/Ionicons';


const styles = makeStyles()

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

export default function CreateDebateScreen() {

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />

      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.wordmark}>vaad</Text>
          <View style={{flexDirection:"row",alignItems:"center", paddingTop:2, }}>
            <Ionicons name="arrow-back-circle-sharp" size={24} color={darkColors.button} />
            <View style={{paddingHorizontal:5}}></View>
            <Text style={styles.tagline}>Creating New Debate.</Text>
          </View>
          
        </View>
        
        <TextInput
          style={{
            color:darkColors.cardTopic,
            backgroundColor: darkColors.debateCardBg,
            borderRadius:16,
            borderWidth:0.5,
            borderColor:darkColors.inputText,
            paddingLeft:20,
            paddingVertical:20,
            marginBottom:40,
          }}
          placeholder='Enter the topic'
          placeholderTextColor={darkColors.inputText}>
          
        </TextInput>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Format</Text>
          <View style={styles.dividerLine} />
        </View>

        <View
          style={{
            // color:darkColors.textMuted,
            backgroundColor: darkColors.debateCardBg,
            borderRadius:16,
            paddingLeft:20,
            marginBottom:20,
            flexDirection:'row',
            alignItems:"center",
            paddingHorizontal:20,
            paddingVertical:10,
            borderWidth:1,
            borderColor:darkColors.scoreDivider
          }}>
            <TouchableOpacity>
              <Ionicons name="radio-button-off" size={20} color="white" />
            </TouchableOpacity>
            <View style={{paddingHorizontal:5}}></View>
            <View>
              <Text style={{color:darkColors.cardTopic, fontSize:16, fontFamily: 'serif'}}>Quick</Text>
              <Text style={styles.participants}>6 minutes  •  4 rounds</Text>
            </View>   
        </View>

        <View
          style={{
            // color:darkColors.textMuted,
            backgroundColor: darkColors.selectedFormatBackground,
            borderRadius:16,
            paddingLeft:20,
            marginBottom:20,
            flexDirection:'row',
            alignItems:"center",
            paddingHorizontal:20,
            paddingVertical:10,
            borderWidth:0.5,
            borderColor:darkColors.selectedFormatBorder
          }}>
            <TouchableOpacity>
              <Ionicons name="radio-button-on-sharp" size={20} color="white" />
            </TouchableOpacity>
            <View style={{paddingHorizontal:5}}></View>
            <View>
              <Text style={{color:darkColors.cardTopic, fontSize:16, fontFamily: 'serif'}}>Standard</Text>
              <Text style={styles.participants}>12 minutes  •  4 rounds</Text>
            </View>   
        </View>

        <View
          style={{
            // color:darkColors.textMuted,
            backgroundColor: darkColors.debateCardBg,
            borderRadius:16,
            paddingLeft:20,
            marginBottom:40,
            flexDirection:'row',
            alignItems:"center",
            paddingHorizontal:20,
            paddingVertical:10,
            borderWidth:1,
            borderColor:darkColors.scoreDivider
          }}>
            <TouchableOpacity>
              <Ionicons name="radio-button-off" size={20} color="white" />
            </TouchableOpacity>
            <View style={{paddingHorizontal:5}}></View>
            <View>
              <Text style={{color:darkColors.cardTopic, fontSize:16, fontFamily: 'serif'}}>Deep</Text>
              <Text style={styles.participants}>20 minutes  •  4 rounds</Text>
            </View>   
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Your Name</Text>
          <View style={styles.dividerLine} />
        </View>

        <TextInput
          style={{
            color:darkColors.cardTopic,
            backgroundColor: darkColors.debateCardBg,
            borderRadius:16,
            borderWidth:0.5,
            borderColor:darkColors.inputText,
            paddingLeft:20,
            paddingVertical:20,
            marginBottom:40,
          }}
          placeholder='Enter your name'
          placeholderTextColor={darkColors.inputText}>
          
        </TextInput>
          


      </View>
    </SafeAreaView>
  )
}


