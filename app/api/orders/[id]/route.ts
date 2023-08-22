import { prisma } from '@/libs/connect';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const { status } = await req.json();

    await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status,
      },
    });
    return NextResponse.json(
      {
        message: 'Order has been updated!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    );
  }
};
