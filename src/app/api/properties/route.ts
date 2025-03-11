import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { 
      name, 
      assetType, 
      model, 
      address, 
      city, 
      state, 
      zip, 
      note 
    } = await request.json();
    if (!name || !assetType || !model || !address || !city || !state || !zip) {
      return NextResponse.json(
        { error: 'All fields except note are required' },
        { status: 400 }
      );
    }
    const property = await prisma.property.create({
      data: {
        name,
        assetType,
        model,
        address,
        city,
        state,
        zip,
        note: note || '',
        userId: session.user.id,
      },
    });
    return NextResponse.json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const properties = await prisma.property.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({ properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}