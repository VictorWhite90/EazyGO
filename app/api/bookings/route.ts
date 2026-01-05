import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth-handler';
import { prisma } from '@/lib/prisma';

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Only customers can create bookings
    if (session.user.role !== 'CUSTOMER') {
      return NextResponse.json(
        { error: 'Only customers can create bookings' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      artisanId,
      jobTitle,
      jobDescription,
      location,
      urgency,
      preferredDate,
      clientNotes,
    } = body;

    // Validation
    if (!artisanId || !jobTitle || !jobDescription || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify artisan exists
    const artisan = await prisma.artisanProfile.findUnique({
      where: { id: artisanId },
    });

    if (!artisan) {
      return NextResponse.json(
        { error: 'Artisan not found' },
        { status: 404 }
      );
    }

    // Create booking with status history
    const booking = await prisma.booking.create({
      data: {
        clientId: session.user.id,
        artisanId,
        jobTitle,
        jobDescription,
        location,
        urgency: urgency || 'normal',
        visitDate: preferredDate ? new Date(preferredDate) : null,
        clientNotes,
        status: 'PENDING',
        statusHistory: {
          create: {
            fromStatus: 'PENDING',
            toStatus: 'PENDING',
            changedBy: session.user.id,
            reason: 'Booking created',
          },
        },
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        artisan: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        booking,
        message: 'Booking request sent successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

// GET /api/bookings - Get bookings (already exists in bookings/client and bookings/artisan)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get bookings based on user role
    if (session.user.role === 'CUSTOMER') {
      const bookings = await prisma.booking.findMany({
        where: {
          clientId: session.user.id,
        },
        include: {
          artisan: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
          review: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json({ bookings });
    } else if (session.user.role === 'ARTISAN') {
      // Get artisan profile
      const artisanProfile = await prisma.artisanProfile.findUnique({
        where: { userId: session.user.id },
      });

      if (!artisanProfile) {
        return NextResponse.json(
          { error: 'Artisan profile not found' },
          { status: 404 }
        );
      }

      const bookings = await prisma.booking.findMany({
        where: {
          artisanId: artisanProfile.id,
        },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          review: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json({ bookings });
    }

    return NextResponse.json(
      { error: 'Invalid user role' },
      { status: 403 }
    );
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
