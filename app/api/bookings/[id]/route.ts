import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth-handler';
import { prisma } from '@/lib/prisma';

// PATCH /api/bookings/[id] - Update booking status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { action, status, visitDate, quotedPrice, laborCost, materialCost, estimatedDays, quoteNotes } = body;

    // Get the booking to verify ownership
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        artisan: {
          select: {
            userId: true,
          },
        },
        client: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Verify user is authorized to update this booking
    const isArtisan = booking.artisan.userId === session.user.id;
    const isClient = booking.client.id === session.user.id;

    if (!isArtisan && !isClient) {
      return NextResponse.json(
        { error: 'You are not authorized to update this booking' },
        { status: 403 }
      );
    }

    // Handle different actions
    let updatedBooking;

    if (action === 'accept') {
      // Only artisans can accept
      if (!isArtisan) {
        return NextResponse.json(
          { error: 'Only artisans can accept bookings' },
          { status: 403 }
        );
      }

      updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
          status: 'ACCEPTED',
          visitDate: visitDate ? new Date(visitDate) : undefined,
          statusHistory: {
            create: {
              fromStatus: booking.status,
              toStatus: 'ACCEPTED',
              changedBy: session.user.id,
              reason: 'Booking accepted by artisan',
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
        },
      });
    } else if (action === 'reject' || action === 'cancel') {
      updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
          status: 'CANCELLED',
          statusHistory: {
            create: {
              fromStatus: booking.status,
              toStatus: 'CANCELLED',
              changedBy: session.user.id,
              reason: isArtisan ? 'Booking rejected by artisan' : 'Booking cancelled by client',
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
        },
      });
    } else if (action === 'submit_quote') {
      // Only artisans can submit quotes
      if (!isArtisan) {
        return NextResponse.json(
          { error: 'Only artisans can submit quotes' },
          { status: 403 }
        );
      }

      if (!quotedPrice) {
        return NextResponse.json(
          { error: 'Quoted price is required' },
          { status: 400 }
        );
      }

      // Create quote history entry
      await prisma.quoteHistory.create({
        data: {
          bookingId: id,
          quotedPrice,
          laborCost: laborCost || null,
          materialCost: materialCost || null,
          notes: quoteNotes || null,
          submittedBy: session.user.id,
        },
      });

      updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
          quotedPrice,
          laborCost: laborCost || null,
          materialCost: materialCost || null,
          estimatedDays: estimatedDays || null,
          quoteNotes: quoteNotes || null,
          quoteSubmittedAt: new Date(),
          status: 'QUOTE_SENT',
          statusHistory: {
            create: {
              fromStatus: booking.status,
              toStatus: 'QUOTE_SENT',
              changedBy: session.user.id,
              reason: 'Quote submitted',
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
        },
      });
    } else if (action === 'approve_quote') {
      // Only clients can approve quotes
      if (!isClient) {
        return NextResponse.json(
          { error: 'Only clients can approve quotes' },
          { status: 403 }
        );
      }

      updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
          status: 'QUOTE_APPROVED',
          quoteApprovedAt: new Date(),
          statusHistory: {
            create: {
              fromStatus: booking.status,
              toStatus: 'QUOTE_APPROVED',
              changedBy: session.user.id,
              reason: 'Quote approved by client',
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
        },
      });
    } else if (action === 'complete_work') {
      // Artisan marks work as completed
      if (!isArtisan) {
        return NextResponse.json(
          { error: 'Only artisans can mark work as completed' },
          { status: 403 }
        );
      }

      updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
          status: 'WORK_COMPLETED',
          workEndDate: new Date(),
          statusHistory: {
            create: {
              fromStatus: booking.status,
              toStatus: 'WORK_COMPLETED',
              changedBy: session.user.id,
              reason: 'Work completed by artisan',
            },
          },
        },
      });
    } else if (action === 'confirm_completion') {
      // Client confirms completion
      if (!isClient) {
        return NextResponse.json(
          { error: 'Only clients can confirm completion' },
          { status: 403 }
        );
      }

      // Calculate platform fee (10%)
      const quotedPriceNum = booking.quotedPrice ? parseFloat(booking.quotedPrice.toString()) : 0;
      const platformFee = quotedPriceNum * 0.1;
      const artisanEarnings = quotedPriceNum - platformFee;

      // Set commission due date (7 days from now)
      const commissionDueDate = new Date();
      commissionDueDate.setDate(commissionDueDate.getDate() + 7);

      updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
          status: 'COMPLETED',
          completedDate: new Date(),
          platformFee,
          artisanEarnings,
          commissionDueDate,
          statusHistory: {
            create: {
              fromStatus: booking.status,
              toStatus: 'COMPLETED',
              changedBy: session.user.id,
              reason: 'Job completion confirmed by client',
            },
          },
        },
      });
    } else if (status) {
      // Generic status update
      updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
          status,
          statusHistory: {
            create: {
              fromStatus: booking.status,
              toStatus: status,
              changedBy: session.user.id,
            },
          },
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action or status' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      message: 'Booking updated successfully',
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
