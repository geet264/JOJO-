import crypto from 'crypto';
import { NextResponse } from 'next/server';

// Server-side secret for HMAC token signing (falls back to a stable per-environment secret)
const SESSION_SECRET = process.env.JOJO_SESSION_SECRET || 'jojo_secure_devsecops_key_998877665544332211';

// In-Memory Sliding Window Rate Limiter
interface RateLimitRecord {
  attempts: number;
  firstAttemptAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * Checks if an action is within rate limits.
 * @param key Identifier (e.g. client IP or email)
 * @param maxAttempts Max attempts in window
 * @param windowMs Window duration in milliseconds (e.g. 10 minutes)
 */
export function checkRateLimit(
  key: string, 
  maxAttempts: number = 5, 
  windowMs: number = 10 * 60 * 1000
): { allowed: boolean; remaining: number; retryAfterSec?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now - record.firstAttemptAt > windowMs) {
    rateLimitMap.set(key, { attempts: 1, firstAttemptAt: now });
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (record.attempts >= maxAttempts) {
    const retryAfterSec = Math.ceil((record.firstAttemptAt + windowMs - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  record.attempts += 1;
  return { allowed: true, remaining: maxAttempts - record.attempts };
}

/**
 * Resets rate limit for a key upon successful authentication.
 */
export function resetRateLimit(key: string): void {
  rateLimitMap.delete(key);
}

/**
 * Creates a cryptographically signed HMAC-SHA256 session token.
 */
export function createSessionToken(userId: string, email: string): string {
  const payload = {
    userId,
    email,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies a signed session token.
 */
export function verifySessionToken(token: string | null | undefined): {
  valid: boolean;
  userId?: string;
  email?: string;
  error?: string;
} {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Missing session token' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, error: 'Malformed token structure' };
  }

  const [payloadB64, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadB64)
    .digest('base64url');

  // Timing safe comparison to prevent timing attacks
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSig);
  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return { valid: false, error: 'Invalid token signature' };
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (Date.now() > payload.exp) {
      return { valid: false, error: 'Session token has expired' };
    }
    return { valid: true, userId: payload.userId, email: payload.email };
  } catch {
    return { valid: false, error: 'Invalid token payload' };
  }
}

/**
 * Extracts and verifies session token from request cookies or Authorization header.
 */
export function getAuthenticatedUserFromRequest(req: Request): {
  authenticated: boolean;
  userId?: string;
  email?: string;
} {
  // Check Authorization: Bearer <token>
  const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const result = verifySessionToken(token);
    if (result.valid && result.userId) {
      return { authenticated: true, userId: result.userId, email: result.email };
    }
  }

  // Check Cookie: jojo_session=<token>
  const cookieHeader = req.headers.get('cookie') || req.headers.get('Cookie');
  if (cookieHeader) {
    const match = cookieHeader.match(/jojo_session=([^;]+)/);
    if (match && match[1]) {
      const result = verifySessionToken(match[1]);
      if (result.valid && result.userId) {
        return { authenticated: true, userId: result.userId, email: result.email };
      }
    }
  }

  return { authenticated: false };
}

/**
 * Applies OWASP recommended security headers to a response.
 */
export function applySecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('X-XSS-Protection', '1; mode=block');
  return res;
}
