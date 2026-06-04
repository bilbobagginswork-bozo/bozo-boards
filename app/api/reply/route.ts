import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM ?? 'Bozo Boards <onboarding@resend.dev>'

export async function POST(req: NextRequest) {
  const { to, name, message } = await req.json()

  if (!to.includes('@')) {
    return NextResponse.json({ ok: false, error: 'Contact is not an email address' })
  }

  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Re: Your request — Bozo Boards',
    text: `Hi ${name},\n\n${message}\n\nCheers,\nBozo Boards\nSouth West UK`,
  })

  return NextResponse.json({ ok: true })
}
