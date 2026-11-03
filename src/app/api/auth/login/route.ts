import { NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/userDb';
import { checkRateLimit, resetRateLimit, createSessionToken, applySecurityHeaders } from '@/lib/security';

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Protection (OWASP API4:2023 / CWE-307)
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local_client';
    const rateCheck = checkRateLimit(`login_${clientIp}`, 5, 10 * 60 * 1000);

    if (!rateCheck.allowed) {
      const res = NextResponse.json(
        { 
          success: false, 
          error: `Too many failed login attempts. Account temporarily locked for security. Try again in ${rateCheck.retryAfterSec} seconds.` 
        },
        { status: 429 }
      );
      return applySecurityHeaders(res);
    }

    const body = await req.json();
    const { email, password } = body;

    // 2. Strict Input Validation (CWE-20)
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      const res = NextResponse.json(
        { success: false, error: 'Please enter both your email address and password.' },
        { status: 400 }
      );
      return applySecurityHeaders(res);
    }

    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail.length > 100 || !cleanEmail.includes('@')) {
      const res = NextResponse.json(
        { success: false, error: 'Invalid email address format.' },
        { status: 400 }
      );
      return applySecurityHeaders(res);
    }

    // 3. Cryptographic Password Verification via bcrypt
    const authResult = authenticateUser(cleanEmail, password);

    if (!authResult.success || !authResult.user) {
      const res = NextResponse.json(
        { success: false, error: authResult.error || 'Invalid credentials.' },
        { status: 401 }
      );
      return applySecurityHeaders(res);
    }

    // Reset rate limit on successful authentication
    resetRateLimit(`login_${clientIp}`);

    // 4. Secure Session Token & HttpOnly Cookie (CWE-384 / CWE-306)
    const sessionToken = createSessionToken(authResult.user.id, authResult.user.email);

    const res = NextResponse.json({
      success: true,
      message: 'Access granted. Welcome to JOJO!',
      token: sessionToken,
      user: authResult.user,
    });

    // Set HttpOnly, SameSite=Lax cookie
    res.cookies.set('jojo_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return applySecurityHeaders(res);
  } catch {
    const res = NextResponse.json(
      { success: false, error: 'Authentication service encountered a secure processing error.' },
      { status: 500 }
    );
    return applySecurityHeaders(res);
  }
}
