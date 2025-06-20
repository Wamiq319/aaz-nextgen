import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Result from "@/lib/models/Result";
import Event from "@/lib/models/Events";
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

    // Get event data to include totalParticipants
    const event = await Event.findOne({ eventId: result.eventId });
    const resultWithEvent = {
      ...result.toObject(),
      event: event ? event.toObject() : null,
    };

    return NextResponse.json(resultWithEvent);
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

// DELETE result by id
export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Result ID is required" },
      { status: 400 }
    );
  }

  try {
    const result = await Result.findOneAndDelete({ resultId: id });

    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Result deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
