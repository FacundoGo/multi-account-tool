import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(`${origin}/connect?error=instagram`)
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(`${origin}/login`)

  // Exchange code for token (simplified — full exchange needs client secret)
  // For now we store a placeholder and note that full token exchange is next
  const { error: dbError } = await supabase.from('connected_accounts').insert({
    user_id: user.id,
    platform: 'instagram',
    platform_user_id: 'pending',
    username: 'pending',
    access_token: 'placeholder',
  })

  if (dbError) {
    console.error(dbError)
    return NextResponse.redirect(`${origin}/connect?error=db`)
  }

  return NextResponse.redirect(`${origin}/dashboard?connected=instagram`)
}
