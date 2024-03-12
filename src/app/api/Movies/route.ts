import { NextResponse } from "next/server";
import Movie from "@/src/models/movies";

export async function GET() {
  try {
    const movies = await Movie.find();

    return NextResponse.json({ movies }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}