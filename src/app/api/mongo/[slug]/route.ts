import { NextResponse } from "next/server";
import * as Models from "@/src/models/models";
import { type NextRequest } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const collection_name = params.slug;
  let model: mongoose.Model<any> | null = null;

  if (collection_name === "master") {
    model = Models.Master;
  } else if (collection_name === "visits") {
    model = Models.Visit;
  } else if (collection_name === "edats") {
    model = Models.Edat;
  } else if (collection_name === "estatics") {
    model = Models.Estatic;
  } else {
    return NextResponse.json(
      { message: "Invalid collection name" },
      { status: 400 }
    );
  }
  const searchParams = request.nextUrl.searchParams;
  let mongoQuery: { [key: string]: any } = {};
  searchParams.forEach((value, key) => {
    mongoQuery[key] = value;
  });

  try {
    const collection = await model.find(mongoQuery).select("-_id");
    return NextResponse.json({ collection }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
