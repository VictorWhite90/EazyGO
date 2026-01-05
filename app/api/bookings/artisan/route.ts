import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth-handler';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get artisan profile
    const artisanProfile = await prisma.artisanProfile.findUnique({
      where: { userId: session.user.id },
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
    });

    if (!artisanProfile) {
      return NextResponse.json(
        { error: 'Artisan profile not found' },
        { status: 404 }
      );
    }

    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');

    // Build where clause
    const where: any = {
      artisanId: artisanProfile.id,
    };

    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }

    // Fetch bookings
    const bookings = await prisma.booking.findMany({
      where,
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

    // Calculate stats
    const stats = await prisma.booking.aggregate({
      where: { artisanId: artisanProfile.id, status: 'COMPLETED' },
      _sum: {
        quotedPrice: true,
      },
      _count: true,
    });

    return NextResponse.json({
      bookings,
      stats: {
        totalEarnings: stats._sum.finalPrice || 0,
        totalJobs: stats._count,
      },
      profile: artisanProfile,
    });
  } catch (error) {
    console.error('Error fetching artisan bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
