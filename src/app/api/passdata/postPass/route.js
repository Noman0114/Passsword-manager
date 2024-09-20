import { connect } from '@/dbConfig/dbConfig';
import passData from '@/models/passModel';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; 
connect();

export async function POST(request) {
    try {


//new update for getting loginuser password only.
//i can store a user id when i add a new password.
//and get the password while matching these id.


// const token = request.cookies.get('token')?.value;

// if (!token) {
//     return NextResponse.json({
//         error: 'Authentication token is missing.'
//     }, { status: 401 });
// }

// // Decode the token to get the user ID
// const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
// const userId = decodedToken.id;




        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({
                error: 'Authentication token is missing.'
            }, { status: 401 });
        }

        // Decode the token to get the user ID
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
       
        
        const userId = decodedToken.id;


        const body = await request.json();
        const { email, password, info } = body;

      
        
        // Create and save the new blog post
        const newPass = new passData({
           email,
           password,
           info,
           userId,
        });
        const savedPass = await newPass.save();

       
        
        return NextResponse.json(savedPass);  // Return the saved blog

    } catch (error) {
       
        
        return NextResponse.json({ error: 'An error occurred while saving the blog' }, { status: 500 });  // Return error response
    }
}
