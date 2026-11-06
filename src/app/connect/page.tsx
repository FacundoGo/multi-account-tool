import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ConnectPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Connect Accounts</h1>
        <p className="text-gray-600 mb-8">Link your Instagram, YouTube, and X accounts.</p>

        <div className="space-y-4">
          <button className="w-full py-3 px-4 border rounded-lg text-left hover:bg-gray-50">
            Connect Instagram
          </button>
          <button className="w-full py-3 px-4 border rounded-lg text-left hover:bg-gray-50">
            Connect YouTube
          </button>
          <button className="w-full py-3 px-4 border rounded-lg text-left hover:bg-gray-50">
            Connect X
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          OAuth flows will be wired next. Free tier: up to 10 accounts.
        </p>
      </div>
    </div>
  )
}
