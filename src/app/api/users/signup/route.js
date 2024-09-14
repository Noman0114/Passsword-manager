import {connect} from '@/dbConfig/dbConfig';
import user from '@/models/userModel';
import { NextResponse } from 'next/server';



connect();

export async function POST(request) {
    try{
    const body = await request.json();
    const { name, email, password } = body;
    console.log(body);

    const User = await user.findOne({email});
    if(User){
        return NextResponse.json({error: "User already exists"});


    }
    
    
    const newUser = await user({
        name,
        email,
        password,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    
    return NextResponse.json(newUser);
}catch(error){
    console.log('error');
    
}
}