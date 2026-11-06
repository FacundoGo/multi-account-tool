'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  async function signIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for the login link.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold">Multi-Account Tool</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in with a magic link
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={signIn}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-black text-white rounded-md disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send magic link'}
          </button>
          {message && <p className="text-center text-sm">{message}</p>}
        </form>
      </div>
    </div>
  )
}
