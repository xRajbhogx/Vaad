import { darkColors } from "@/src/constants/colors";
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
        safe: {
            flex: 1,
            backgroundColor: darkColors.bg,
        },
        container: {
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: 20,
        },

        // Header
        header: {
            marginBottom: 40,
        },
        wordmark: {
            fontFamily: 'serif',
            fontSize: 42,
            color: darkColors.wordMark,
            letterSpacing: 2,
            fontWeight: '700',
        },
        tagline: {
            fontFamily: 'serif',
            fontSize: 16,
            color: darkColors.textMuted,
            marginTop: 4,
            fontStyle: 'italic',
        },

        // Primary button
        primaryButton: {
            backgroundColor: darkColors.button,
            borderRadius: 12,
            // borderBottomWidth:2,
            // borderLeftWidth:2,
            // borderColor:darkColors.divider,
            paddingVertical: 18,
            alignItems: 'center',
            marginBottom: 40,

            elevation:10,
            // shadowOpacity:0.8,
            // shadowColor:darkColors.button
        },
        primaryButtonGlow: {
            backgroundColor: darkColors.buttonGlow,
            borderRadius: 12,
            paddingVertical: 18,
            alignItems: 'center',

            elevation:10,
            shadowRadius:10,
            shadowOpacity:0.8,
            shadowOffset:{
                height:0,
                width:0
            },
            shadowColor:darkColors.button
            // marginBottom: 40,
            // borderWidth:1, 
            // borderColor:'#f9ac30ff'
        },
        primaryButtonText: {
            color: darkColors.buttonText,
            fontSize: 17,
            fontWeight: '700',
            letterSpacing: 0.5,
        },

        // Divider
        dividerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: darkColors.divider,
        },
        dividerText: {
            color: darkColors.textMuted,
            fontSize: 12,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginHorizontal: 12,
        },

        // Feed
        feedContent: {
            paddingBottom: 40,
        },
        debateCard: {
            backgroundColor: darkColors.debateCardBg,
            borderLeftWidth:2,
            borderRightWidth:0.1,
            borderTopWidth:0.1,
            borderBottomWidth:0.1,

            borderLeftColor:darkColors.debateCardLeftBorder,
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: darkColors.textMuted,
        },
        debateCardGlow: {
            backgroundColor: darkColors.debateCardBgGlow,
            borderLeftWidth:4,
            borderRightWidth:0.2,
            borderTopWidth:0.2,
            borderBottomWidth:0.2,
            borderLeftColor:darkColors.debateCardLeftBorderGlow,
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: darkColors.debateCardBorder,

            elevation:7,
            shadowRadius:3,
            shadowOpacity:0.8,
            shadowOffset:{
                height:0,
                width:0
            },
            shadowColor:darkColors.button
        },
        cardTop: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 14,
        },
        cardTopic: {
            fontFamily: 'serif',
            color: darkColors.cardTopic,
            fontSize: 16,
            flex: 1,
            lineHeight: 22,
            marginRight: 12,
        },
        cardFormat: {
            color: darkColors.textMuted,
            fontSize: 12,
            textTransform: 'uppercase',
            // letterSpacing: 1,
            marginTop: 2,
        },
        cardBottomText: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
            // borderWidth:4,
        },
        participant_timeBlock: {
            flex: 1,
            flexDirection:"row",
            alignItems: 'center',
            justifyContent: 'space-between',
            
            // borderWidth:4
        },
        participants: {
            color: darkColors.textMuted,
            fontSize: 11.5,
            letterSpacing: 1,
            marginBottom: 4,
        },
        scoreBlock: {
            flex: 1,
            flexDirection:"row",
            alignItems: 'center',
            justifyContent: 'space-around',
            // borderWidth:4,
        },
        scoreButton:{
            backgroundColor:'#4d4231ff', 
            paddingHorizontal:10, 
            borderRadius:20,
        },
        scoreValue: {
            color: darkColors.scoreText,
            fontSize: 11,
            fontWeight: '700',
            fontFamily: 'serif',
        },
        scoreDivider: {
            width: 1,
            height: 32,
            backgroundColor: darkColors.scoreDivider,
            marginHorizontal: 8,
        },
})