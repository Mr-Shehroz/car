import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'hn42ur6p',
  dataset: 'production',
  apiVersion: '2023-07-10',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    fullName,
    email,
    phone,
    pickupDate,
    returnDate,
    car,
    carPriceperDay
  } = body

  try {
    const result = await client.create({
      _type: 'reservation',
      fullName,
      email,
      phone,
      pickupDate,
      returnDate,
      car,
      carPriceperDay
    })

    return NextResponse.json({ success: true, id: result._id }, { status: 200 })
  } catch (err) {
    console.error('POST ERROR:', err)
    const errorMessage = typeof err === 'object' && err !== null && 'message' in err ? (err as { message: string }).message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

export async function GET() {
  try {
    const reservations = await client.fetch(`*[_type == "reservation"] | order(_createdAt desc){
  _id,
  fullName,
  email,
  phone,
  pickupDate,
  returnDate,
  car,
  carPriceperDay
}`)


    return NextResponse.json(reservations, { status: 200 })
  } catch (err) {
    console.error('GET ERROR:', err)
    const errorMessage = typeof err === 'object' && err !== null && 'message' in err ? (err as { message: string }).message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
