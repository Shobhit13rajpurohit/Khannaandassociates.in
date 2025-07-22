import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const { user, adminData } = await signIn(email, password);
    const idToken = await user.getIdToken();

    // Set cookie
    const cookieStore = cookies();
    cookieStore.set('fb-access-token', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.uid,
        email: user.email,
        role: adminData.role,
      },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }
}
