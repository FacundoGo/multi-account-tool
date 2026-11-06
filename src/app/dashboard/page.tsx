import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome, {user.email}</p>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Connected Accounts</h2>
          <p className="text-gray-500 mb-4">No accounts connected yet.</p>
          <a
            href="/connect"
            className="inline-block px-4 py-2 bg-black text-white rounded-md"
          >
            Connect accounts
          </a>
        </div>
      </div>
    </div>
  )
}
