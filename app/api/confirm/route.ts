import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM ?? 'Bozo Boards <onboarding@resend.dev>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? ''

export async function POST(req: NextRequest) {
  const { name, contact, description, type } = await req.json()

  const isEmail = contact.includes('@')
  const isRepair = type !== 'sell_offer'

  // ── Email to customer ──────────────────────────────────────────────────────
  const customerSubject = isRepair
    ? `Repair request received — Bozo Boards`
    : `We've got your offer — Bozo Boards`

  const customerBody = isRepair
    ? `Hi ${name},

Thanks for getting in touch. We've received your repair request and will get back to you with a quote — usually the same day.

Here's what you sent us:
"${description}"

If you need to reach us in the meantime, just reply to this email.

Cheers,
Bozo Boards
South West UK`
    : `Hi ${name},

Thanks for reaching out. We've received your details and will come back to you with an offer shortly.

Here's what you told us about the board:
"${description}"

If you need to reach us in the meantime, just reply to this email.

Cheers,
Bozo Boards
South West UK`

  // ── Email to admin ─────────────────────────────────────────────────────────
  const adminSubject = isRepair
    ? `🔧 New repair request from ${name}`
    : `💰 New sell offer from ${name}`

  const adminBody = `${isRepair ? 'REPAIR REQUEST' : 'SELL OFFER'}
─────────────────────────────
Name:    ${name}
Contact: ${contact}

Details:
${description}
─────────────────────────────
View in admin: https://${req.headers.get('host')}/admin`

  const sends = []

  if (isEmail && process.env.RESEND_API_KEY) {
    sends.push(
      resend.emails.send({ from: FROM, to: contact, subject: customerSubject, text: customerBody })
    )
  }

  if (ADMIN_EMAIL && process.env.RESEND_API_KEY) {
    sends.push(
      resend.emails.send({ from: FROM, to: ADMIN_EMAIL, subject: adminSubject, text: adminBody })
    )
  }

  await Promise.allSettled(sends)

  return NextResponse.json({ ok: true })
}
