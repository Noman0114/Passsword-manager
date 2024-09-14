import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0)
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error logging out" });
  }
}
