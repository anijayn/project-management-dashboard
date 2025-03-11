import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { RegisterCredentials } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json() as RegisterCredentials;
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }
    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || '',
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}