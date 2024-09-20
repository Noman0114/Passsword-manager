import { connect } from '@/dbConfig/dbConfig';
import passData from '@/models/passModel';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // Assuming you're using JWT for authentication
export const dynamic = 'force-dynamic'
export async function GET(req) {
    try {
        connect();

        // Get the token from cookies
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({
                error: 'Authentication token is missing.'
            }, { status: 401 });
        }

        // Decode the token to get the user ID
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id; // Assuming the token has 'id' field

        // Fetch password data from the database for the logged-in user only
        const passwords = await passData.find({ userId: userId });
      
        
      

        return NextResponse.json(passwords); // Return the retrieved passwords
    } catch (error) {
        console.error('Error fetching passwords:', error.stack || error);
        return NextResponse.json({
            error: 'An error occurred while fetching password data.'
        }, { status: 500 });
    }
}
