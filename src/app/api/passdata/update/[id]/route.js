import { NextResponse } from 'next/server'

import { connect } from '@/dbConfig/dbConfig';
import passData from '@/models/passModel';
export async function PUT(
  request,
  { params }
) {
  try {
    const { id } = params
    const { info, email, password } = await request.json()
    const { db } = await connect()
    
    const result = await db.collection('passwords').updateOne(
      { _id: new passData(id) },
      { $set: { info, email, password } }
    )
    
    if (result.modifiedCount === 1) {
      return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Password not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error updating password', error }, { status: 500 })
  }
}