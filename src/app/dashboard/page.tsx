import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: accounts } = await supabase
    .from('connected_accounts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome, {user.email}</p>

        <div className="border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Connected Accounts</h2>
            <a href="/connect" className="px-4 py-2 bg-black text-white rounded-md text-sm">
              Connect more
            </a>
          </div>

          {!accounts || accounts.length === 0 ? (
            <p className="text-gray-500">No accounts connected yet.</p>
          ) : (
            <ul className="space-y-2">
              {accounts.map((acc) => (
                <li key={acc.id} className="flex justify-between items-center border-b pb-2">
                  <span>
                    <strong>{acc.username || acc.platform_user_id}</strong>
                    <span className="text-sm text-gray-500 ml-2">({acc.platform})</span>
                  </span>
                  <span className="text-xs text-gray-400">{new Date(acc.created_at).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
