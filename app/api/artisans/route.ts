import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Extract query parameters
    const search = searchParams.get('search') || '';
    const skills = searchParams.get('skills')?.split(',').filter(Boolean) || [];
    const city = searchParams.get('city') || '';
    const minRate = searchParams.get('minRate');
    const maxRate = searchParams.get('maxRate');
    const minRating = searchParams.get('minRating');
    const verified = searchParams.get('verified');
    const sortBy = searchParams.get('sortBy') || 'rating'; // rating, rate, experience
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      verified: verified === 'true' ? true : undefined,
    };

    // Search by name or bio
    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { bio: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filter by skills
    if (skills.length > 0) {
      where.skills = { hasSome: skills };
    }

    // Filter by city
    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    // Filter by hourly rate range
    if (minRate || maxRate) {
      where.hourlyRate = {};
      if (minRate) where.hourlyRate.gte = parseFloat(minRate);
      if (maxRate) where.hourlyRate.lte = parseFloat(maxRate);
    }

    // Filter by minimum rating
    if (minRating) {
      where.rating = { gte: parseFloat(minRating) };
    }

    // Build orderBy clause
    let orderBy: any = {};
    switch (sortBy) {
      case 'rate-low':
        orderBy = { hourlyRate: 'asc' };
        break;
      case 'rate-high':
        orderBy = { hourlyRate: 'desc' };
        break;
      case 'experience':
        orderBy = { yearsExp: 'desc' };
        break;
      case 'jobs':
        orderBy = { totalJobs: 'desc' };
        break;
      case 'rating':
      default:
        orderBy = { rating: 'desc' };
        break;
    }

    // Fetch artisans with pagination
    const [artisans, total] = await Promise.all([
      prisma.artisanProfile.findMany({
        where,
        orderBy,
        skip,
        take: limit,
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
      }),
      prisma.artisanProfile.count({ where }),
    ]);

    return NextResponse.json({
      artisans,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching artisans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artisans' },
      { status: 500 }
    );
  }
}
