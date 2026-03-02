import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'
import 'react-native-url-polyfill/auto'

// SecureStore has a 2048-byte limit on Android.
// We chunk values that exceed the limit across multiple keys.
const CHUNK_SIZE = 2000

const ExpoSecureStoreAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const value = await SecureStore.getItemAsync(key)
      // If it was chunked, the root key holds a JSON marker
      if (value && value.startsWith('__chunked__:')) {
        const count = parseInt(value.replace('__chunked__:', ''), 10)
        const chunks: string[] = []
        for (let i = 0; i < count; i++) {
          const chunk = await SecureStore.getItemAsync(`${key}_chunk_${i}`)
          chunks.push(chunk ?? '')
        }
        return chunks.join('')
      }
      return value
    } catch {
      return null
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (value.length <= CHUNK_SIZE) {
        await SecureStore.setItemAsync(key, value)
      } else {
        // Split into chunks
        const chunks: string[] = []
        for (let i = 0; i < value.length; i += CHUNK_SIZE) {
          chunks.push(value.slice(i, i + CHUNK_SIZE))
        }
        // Store each chunk
        for (let i = 0; i < chunks.length; i++) {
          await SecureStore.setItemAsync(`${key}_chunk_${i}`, chunks[i])
        }
        // Store marker with chunk count
        await SecureStore.setItemAsync(key, `__chunked__:${chunks.length}`)
      }
    } catch (err) {
        console.error('SecureStore setItem failed:', err)
      }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      const value = await SecureStore.getItemAsync(key)
      if (value && value.startsWith('__chunked__:')) {
        const count = parseInt(value.replace('__chunked__:', ''), 10)
        for (let i = 0; i < count; i++) {
          await SecureStore.deleteItemAsync(`${key}_chunk_${i}`)
        }
      }
      await SecureStore.deleteItemAsync(key)
    } catch {
      // silently fail
    }
  },
}

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})