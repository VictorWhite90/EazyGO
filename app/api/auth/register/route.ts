import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['CUSTOMER', 'ARTISAN']),
  artisanProfile: z.object({
    phone: z.string().optional(),
    bio: z.string().optional(),
    skills: z.array(z.string()).optional(),
    yearsExp: z.number().optional(),
    hourlyRate: z.number().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    serviceRadius: z.number().optional(),
    profilePhoto: z.string().optional(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user with artisan profile if applicable
    const userData: any = {
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      role: validatedData.role,
    };

    // If artisan, create profile
    if (validatedData.role === 'ARTISAN' && validatedData.artisanProfile) {
      userData.artisanProfile = {
        create: {
          phone: validatedData.artisanProfile.phone || '',
          bio: validatedData.artisanProfile.bio || '',
          skills: validatedData.artisanProfile.skills || [],
          yearsExp: validatedData.artisanProfile.yearsExp || 0,
          hourlyRate: validatedData.artisanProfile.hourlyRate || 0,
          address: validatedData.artisanProfile.address || '',
          city: validatedData.artisanProfile.city || '',
          state: validatedData.artisanProfile.state || '',
          zipCode: validatedData.artisanProfile.zipCode || '',
          serviceRadius: validatedData.artisanProfile.serviceRadius || 10,
          profilePhoto: validatedData.artisanProfile.profilePhoto || null,
        },
      };
    }

    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
