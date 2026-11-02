import { NextResponse } from 'next/server';
import { createUser } from '@/lib/userDb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, password, role, experienceLevel, noticePeriod, currentCTC, expectedCTC, preferredLocation, targetPlatforms, skills } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Full name, email address, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 4 characters long.' },
        { status: 400 }
      );
    }

    const result = createUser({
      fullName,
      email,
      password,
      role: role || 'DevSecOps Engineer',
      experienceLevel: experienceLevel || '3-5 Years (Mid-Senior)',
      noticePeriod: noticePeriod || '30 Days',
      currentCTC: currentCTC || '14 LPA',
      expectedCTC: expectedCTC || '24 LPA',
      preferredLocation: preferredLocation || 'Worldwide Remote',
      targetPlatforms: targetPlatforms || ['linkedin', 'naukri'],
      skills: skills || ['DevSecOps', 'Docker & Kubernetes'],
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully in database.',
      user: result.user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error during registration: ' + String(error) },
      { status: 500 }
    );
  }
}
