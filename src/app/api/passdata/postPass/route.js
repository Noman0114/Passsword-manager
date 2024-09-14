import { connect } from '@/dbConfig/dbConfig';
import passData from '@/models/passModel';
import { NextResponse } from 'next/server';

connect();

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password, info } = body;

        console.log(body);
        console.log('In a blog route');
        
        // Create and save the new blog post
        const newPass = new passData({
           email,
           password,
           info,
        });
        const savedPass = await newPass.save();

        console.log(savedPass);
        
        return NextResponse.json(savedPass);  // Return the saved blog

    } catch (error) {
        console.log('Error:', error);  // Log the actual error message
        console.log('Error in catch block');
        
        return NextResponse.json({ error: 'An error occurred while saving the blog' }, { status: 500 });  // Return error response
    }
}
