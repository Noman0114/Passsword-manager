import { connect } from '@/dbConfig/dbConfig';
import passData from '@/models/passModel';
import { NextResponse } from 'next/server';

connect();
export const DELETE = async (req, value) => {
  const empID = value.params.id;
  const iid = {_id:empID};
  
  const result = await passData.deleteOne(iid);
  return NextResponse.json({result,success: true})
}