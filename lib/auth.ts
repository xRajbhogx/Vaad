import { supabase } from './supabase'

export async function ensureSession() {
  // 1️⃣ Get existing session
  const { data: { session }, error: getError } = await supabase.auth.getSession()
  if (getError) throw getError

  let activeSession = session

  // 2️⃣ If no session, sign in anonymously
  if (!activeSession) {
    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) throw error
    activeSession = data.session
  }

  if (!activeSession?.user?.id) {
    throw new Error('No user session')
  }

  const userId = activeSession.user.id

  // 3️⃣ Ensure profile row exists (VERY IMPORTANT)
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({ id: userId })

  if (profileError) throw profileError

  return activeSession
}

export async function getCurrentUserId(): Promise<string> {
  const session = await ensureSession()
  if (!session?.user?.id) throw new Error('No user session')
  return session.user.id
}