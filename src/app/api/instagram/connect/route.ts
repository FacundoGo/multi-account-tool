import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))

  const clientId = process.env.INSTAGRAM_CLIENT_ID
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/instagram/callback`

  if (!clientId) {
    return NextResponse.json({ error: 'INSTAGRAM_CLIENT_ID not set' }, { status: 500 })
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'instagram_business_basic,instagram_business_manage_insights',
    response_type: 'code',
  })

  return NextResponse.redirect(`https://www.instagram.com/oauth/authorize?${params.toString()}`)
}
