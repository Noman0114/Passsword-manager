import { connect } from "@/dbConfig/dbConfig";
import user from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect(); // Connect to the database

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    console.log(body);

    // Find the user by email
    const User = await user.findOne({ email });
    if (!User) {
      return NextResponse.json({ error: "User does not exist" });
    }
    console.log('user exists');

    // Check if the provided password matches the stored password
    // Assuming passwords are stored in plaintext (not recommended)
    if (password !== User.password) {
      return NextResponse.json({ error: "Invalid Password" });
    }

    // Create JWT token data
    const tokenData = {
      id: User._id,
      email: User.email,
      name: User.name
    };

    // Sign the JWT token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Prepare the response with the JWT token
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      redirectUrl: "/dashboard",
    });

    // Set the token as an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" });
  }
}
