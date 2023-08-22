import { prisma } from '@/libs/connect';
import { NextResponse } from 'next/server';

export const PUT = async ({ params }: { params: { intentId: string } }) => {
  const { intentId } = params;
  try {
    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: { status: 'Being prepared!' },
    });

    return new NextResponse(
      JSON.stringify({ message: 'Order has been updated' }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
};
