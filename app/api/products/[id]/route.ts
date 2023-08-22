import { prisma } from '@/libs/connect';
import { getAuthSession } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

// GET SINGLE PRODUCT
export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
};

// DELETE SINGLE PRODUCT
export const DELETE = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const session = await getAuthSession();

  if (session?.user.isAdmin) {
    try {
      await prisma.product.delete({
        where: { id: id },
      });

      return NextResponse.json(
        { message: 'Product has been deleted successfully!' },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
};
