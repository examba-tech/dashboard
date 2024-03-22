import { NextResponse } from "next/server";
import { Visit } from "@/src/models/models";

export async function GET() {
  try {
    const visits = await Visit.find();

    return NextResponse.json({ visits }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}





