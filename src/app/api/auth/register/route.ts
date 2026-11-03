import { NextResponse } from 'next/server';
import { createUser } from '@/lib/userDb';
import { createSessionToken, applySecurityHeaders } from '@/lib/security';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      fullName, 
      email, 
      password, 
      role, 
      experienceLevel, 
      noticePeriod, 
      currentCTC, 
      expectedCTC, 
      preferredLocation, 
      targetPlatforms, 
      skills 
    } = body;

    // Strict Input Validation & Boundary Checks (CWE-20)
    if (!fullName || typeof fullName !== 'string' || !email || typeof email !== 'string' || !password || typeof password !== 'string') {
      const res = NextResponse.json(
        { success: false, error: 'Full name, email address, and password are required.' },
        { status: 400 }
      );
      return applySecurityHeaders(res);
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.includes('@') || cleanEmail.length > 100) {
      const res = NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
      return applySecurityHeaders(res);
    }

    if (password.length < 6) {
      const res = NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long for security.' },
        { status: 400 }
      );
      return applySecurityHeaders(res);
    }

    const cleanName = fullName.trim().slice(0, 80);

    const result = createUser({
      fullName: cleanName,
      email: cleanEmail,
      password, // Will be hashed with bcryptjs in userDb
      role: typeof role === 'string' ? role.slice(0, 100) : 'DevSecOps Engineer',
      experienceLevel: typeof experienceLevel === 'string' ? experienceLevel.slice(0, 50) : '3-5 Years (Mid-Senior)',
      noticePeriod: typeof noticePeriod === 'string' ? noticePeriod.slice(0, 50) : '30 Days',
      currentCTC: typeof currentCTC === 'string' ? currentCTC.slice(0, 50) : '14 LPA',
      expectedCTC: typeof expectedCTC === 'string' ? expectedCTC.slice(0, 50) : '24 LPA',
      preferredLocation: typeof preferredLocation === 'string' ? preferredLocation.slice(0, 100) : 'Worldwide Remote',
      targetPlatforms: Array.isArray(targetPlatforms) ? targetPlatforms.slice(0, 10) : ['linkedin', 'naukri'],
      skills: Array.isArray(skills) ? skills.slice(0, 50) : ['DevSecOps', 'Docker & Kubernetes'],
    });

    if (!result.success || !result.user) {
      const res = NextResponse.json({ success: false, error: result.error }, { status: 400 });
      return applySecurityHeaders(res);
    }

    // Secure Session Token & HttpOnly Cookie
    const sessionToken = createSessionToken(result.user.id, result.user.email);

    const res = NextResponse.json({
      success: true,
      message: 'Account created successfully in database.',
      token: sessionToken,
      user: result.user,
    });

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
      { success: false, error: 'Registration service encountered a secure processing error.' },
      { status: 500 }
    );
    return applySecurityHeaders(res);
  }
}
