import { NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/userDb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Please enter both your email address and password.' },
        { status: 400 }
      );
    }

    const authResult = authenticateUser(email, password);

    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Access granted. Welcome to JOJO!',
      user: authResult.user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error during login: ' + String(error) },
      { status: 500 }
    );
  }
}
