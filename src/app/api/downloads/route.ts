import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Download, { DownloadCategory } from "@/lib/models/Download";

function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

// GET - Fetch all downloads
export async function GET() {
  try {
    await dbConnect();
    const downloads = await Download.find({}).sort({ uploadDate: -1 });
    return NextResponse.json(downloads);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch downloads" },
      { status: 500 }
    );
  }
}

// POST - Create download with Google Drive link
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const grades = JSON.parse(formData.get("grades") as string);
    const googleDriveLink = formData.get("googleDriveLink") as string;
    const file = formData.get("file") as File;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      !Object.values(DownloadCategory).includes(category as DownloadCategory)
    ) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const timestamp = Date.now();

    const download = new Download({
      id: `download_${timestamp}`,
      title,
      description,
      category,
      downloadUrl: googleDriveLink || "",
      uploadDate: new Date().toISOString().slice(0, 10),
      grades,
    });

    await download.save();

    return NextResponse.json(download, { status: 201 });
  } catch (error) {
    console.error("Error creating download:", error);
    return NextResponse.json(
      { error: "Failed to create download" },
      { status: 500 }
    );
  }
}

// DELETE - Remove download from DB
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Download ID is required" },
        { status: 400 }
      );
    }

    const download = await Download.findOne({ id });
    if (!download) {
      return NextResponse.json(
        { error: "Download not found" },
        { status: 404 }
      );
    }

    await Download.deleteOne({ id });

    return NextResponse.json({
      message: "Download deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting download:", error);
    return NextResponse.json(
      { error: "Failed to delete download" },
      { status: 500 }
    );
  }
}
