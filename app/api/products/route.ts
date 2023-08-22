import { prisma } from '@/libs/connect';
import { getAuthSession } from '@/utils/auth';
import console from 'console';
import { NextRequest, NextResponse } from 'next/server';

// GET ALL PRODUCTS
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get('cat');
  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    );
  }
};

// CREATE PRODUCT
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const newProduct = await prisma.product.create({
      data: body,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    );
  }
};
