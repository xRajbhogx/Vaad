export type DebateFormat = 'quick' | 'standard' | 'deep'
export type DebateStatus = 'waiting' | 'active' | 'completed' | 'published'
export type ParticipantSide = 'proposition' | 'opposition'
export type TurnRound = 'opening' | 'cross_question' | 'cross_answer' | 'rebuttal' | 'closing'
export type TurnStatus = 'pending' | 'recording' | 'processing' | 'done'

export interface Debate {
  id: string
  topic: string
  format: DebateFormat
  status: DebateStatus
  created_at: string
  is_public: boolean
  created_by: string | null   
}

export interface Participant {
  id: string
  debate_id: string
  user_id: string       
  name: string
  side: ParticipantSide
  joined_at: string
}

export interface Turn {
  id: string
  debate_id: string
  participant_id: string
  round: TurnRound
  turn_order: number
  duration_seconds: number
  audio_url: string | null
  transcript: string | null
  status: TurnStatus
  started_at: string | null
  ended_at: string | null
}