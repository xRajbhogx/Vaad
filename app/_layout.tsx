import { ensureSession } from '@/lib/auth'
import { Stack } from 'expo-router'
import React, { useEffect } from 'react'
import { supabase } from '@/lib/supabase'


export default function RootLayout() {
  const [ready, setReady] = React.useState(false)

  useEffect(() => {
    async function init() {
      try {
        await ensureSession()
      } catch (err) {
        console.error(err)
      } finally {
        setReady(true)
      }
    }
    init()
  }, [])

  if (!ready) return null

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0D1117' },
      }}
    />
  )
}