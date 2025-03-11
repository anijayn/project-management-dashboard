import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const data = await request.json();
    const { name, assetType, model, address, city, state, zip, note } = data;
    // Verify if the property belongs to the user
    const existingProperty = await prisma.property.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });
    if (!existingProperty) {
      return new NextResponse("Property not found", { status: 404 });
    }
    const updatedProperty = await prisma.property.update({
      where: {
        id,
      },
      data: {
        name,
        assetType,
        model,
        address,
        city,
        state,
        zip,
        note,
      },
    });
    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
    const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const existingProperty = await prisma.property.findUnique({
      where: {
        id: id,
        userId: session.user.id,
      },
    });
    if (!existingProperty) {
      return new NextResponse("Property not found", { status: 404 });
    }
    await prisma.property.delete({
      where: {
        id: id,
      },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting property:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 