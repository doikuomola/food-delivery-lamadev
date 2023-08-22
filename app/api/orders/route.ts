import { prisma } from '@/libs/connect';
import { getAuthSession } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return NextResponse.json(orders, { status: 200 });
      } else {
        const orders = await prisma.order.findMany({
          where: {
            userEmail: session.user?.email!,
          },
        });
        return NextResponse.json(orders, { status: 200 });
      }
    } catch (error) {
      return NextResponse.json(
        { message: 'Something went wrong!' },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: 'You are not authenticated' },
      { status: 401 }
    );
  }
};

export async function POST(req: NextRequest) {
  const session = await getAuthSession();

  if (session) {
    try {
      const body = await req.json();
      const newOrder = await prisma.order.create({
        data: body,
      });

      return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Server error', error },
        { status: 401 }
      );
    }
  } else {
    return NextResponse.json(
      { message: 'You are not authenticated' },
      { status: 401 }
    );
  }
}
