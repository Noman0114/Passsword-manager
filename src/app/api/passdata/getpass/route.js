import { connect } from '@/dbConfig/dbConfig';
import passData from '@/models/passModel';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export async function GET() {
    try {
connect();
        // Fetch all password data from the database
        const passwords = await passData.find({});
        return NextResponse.json(passwords); // Return the retrieved passwords
    } catch (error) {
        console.error('Error fetching passwords:', error.stack || error);
        return NextResponse.json({
            error: 'An error occurred while fetching password data.'
        }, { status: 500 });
    }
}
