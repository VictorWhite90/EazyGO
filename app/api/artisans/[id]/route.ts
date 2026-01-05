import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const artisan = await prisma.artisanProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
          },
        },
        bookings: {
          where: {
            status: 'COMPLETED',
          },
          include: {
            review: true,
            client: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            completedDate: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!artisan) {
      return NextResponse.json(
        { error: 'Artisan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ artisan });
  } catch (error) {
    console.error('Error fetching artisan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artisan' },
      { status: 500 }
    );
  }
}
