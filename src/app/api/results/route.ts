import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Result from "@/lib/models/Result";
import { nanoid } from "nanoid";

// GET all results or a single result by id
export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    const result = await Result.findOne({ resultId: id });
    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }
    return NextResponse.json(result);
  }
  const results = await Result.find({});
  return NextResponse.json(results);
}

// CREATE new result
export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  // Generate unique resultId
  data.resultId = nanoid();
  try {
    const result = await Result.create(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
