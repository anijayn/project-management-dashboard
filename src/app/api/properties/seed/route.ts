import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const assetTypes = ["Retail", "Self Storage", "Multi Family"];
const models = ["Model A", "Model B", "Model C", "Model D"];
const cities = ["Chennai", "Mumbai", "Hyderabad", "Bengaluru", "Delhi"];
const states = ["TN", "KA", "MH", "DL", "AP"];
const notes = [
  "Prime location with high foot traffic",
  "Recently renovated property",
  "Great investment opportunity",
  "Excellent condition, fully leased",
  "Strategic location for business"
];

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    const properties = Array.from({ length: 200 }, (_, index) => {
      const cityIndex = Math.floor(Math.random() * cities.length);
      return {
        name: `Property ${index + 1}`,
        assetType: assetTypes[Math.floor(Math.random() * assetTypes.length)],
        model: models[Math.floor(Math.random() * models.length)],
        userId: userId,
        address: `${1000 + index} Main Street`,
        city: cities[cityIndex],
        state: states[cityIndex],
        zip: String(10000 + Math.floor(Math.random() * 90000)),
        note: notes[Math.floor(Math.random() * notes.length)],
      };
    });
    await prisma.property.createMany({
      data: properties,
    });
    return NextResponse.json({
      message: "Successfully seeded 200 properties",
      count: properties.length,
    });
  } catch (error) {
    console.error("Error seeding properties:", error);
    return NextResponse.json(
      { error: "Failed to seed properties" },
      { status: 500 }
    );
  }
} 