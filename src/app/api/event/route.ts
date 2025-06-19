import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Event from "@/lib/models/Events";
import { nanoid } from "nanoid";
import { error } from "console";

// GET all events or just id+name if ?fields=id,name
export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const fields = searchParams.get("fields");
  let events;
  if (fields === "id,name") {
    events = await Event.find({}, { eventId: 1, eventName: 1, _id: 0 });
  } else {
    events = await Event.find({});
  }
  return NextResponse.json(events);
}

// CREATE new event
export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  // Generate unique eventId
  data.eventId = nanoid();
  // Ensure totalParticipants is a number
  data.totalParticipants = Number(data.totalParticipants) || 0;
  try {
    const event = await Event.create(data);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

// DELETE event by eventId (expects ?id=...)
export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("id");
  if (!eventId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const deleted = await Event.findOneAndDelete({ eventId });
  if (!deleted) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
