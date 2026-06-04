import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM ?? 'Bozo Boards <onboarding@resend.dev>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? ''

export async function POST(req: NextRequest) {
  const { name, contact, description, type } = await req.json()

  const isEmail = contact.includes('@')
  const isRepair = type !== 'sell_offer'

  const subject = isRepair
    ? 'We got your repair request — Bozo Boards'
    : 'We got your sell offer — Bozo Boards'

  const customerBody = isRepair
    ? `Hi ${name},\n\nThanks for submitting your repair request. We'll take a look and get back to you with a quote shortly — usually same day.\n\nWhat you told us:\n${description}\n\nCheers,\nBozo Boards\nSouth West UK`
    : `Hi ${name},\n\nThanks for sending over your board details. We'll take a look and come back to you with an offer.\n\nWhat you told us:\n${description}\n\nCheers,\nBozo Boards\nSouth West UK`

  const adminBody = `New ${isRepair ? 'repair request' : 'sell offer'} from ${name}\n\nContact: ${contact}\n\nDetails:\n${description}\n\nView in admin: https://${req.headers.get('host')}/admin`

  const sends = []

  if (isEmail) {
    sends.push(
      resend.emails.send({
        from: FROM,
        to: contact,
        subject,
        text: customerBody,
      })
    )
  }

  if (ADMIN_EMAIL) {
    sends.push(
      resend.emails.send({
        from: FROM,
        to: ADMIN_EMAIL,
        subject: `[Bozo Boards] New ${isRepair ? 'repair' : 'sell offer'} from ${name}`,
        text: adminBody,
      })
    )
  }

  await Promise.allSettled(sends)

  return NextResponse.json({ ok: true })
}
