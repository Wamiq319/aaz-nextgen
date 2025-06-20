import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Download, { DownloadCategory } from "@/lib/models/Download";
import cloudinary from "@/lib/cloudinary";

// GET - Fetch all downloads
export async function GET() {
  try {
    await dbConnect();
    const downloads = await Download.find({}).sort({ uploadDate: -1 });
    return NextResponse.json(downloads);
  } catch (error) {
    console.error("Error fetching downloads:", error);
    return NextResponse.json(
      { error: "Failed to fetch downloads" },
      { status: 500 }
    );
  }
}

// POST - Create new download with file upload
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const grades = JSON.parse(formData.get("grades") as string);
    const file = formData.get("file") as File;

    // Validate required fields
    if (!title || !description || !category || !file) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate category
    if (
      !Object.values(DownloadCategory).includes(category as DownloadCategory)
    ) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Convert file to buffer for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            folder: "aaz-nextgen/downloads",
            public_id: `${Date.now()}_${file.name.replace(/\.[^/.]+$/, "")}`,
            format: "pdf",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const cloudinaryResult = uploadResult as any;

    // Create download record
    const download = new Download({
      id: `download_${Date.now()}`,
      title,
      description,
      category,
      downloadUrl: cloudinaryResult.secure_url,
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

// DELETE - Delete a download
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

    // Delete from Cloudinary if URL exists
    if (download.downloadUrl) {
      try {
        const publicId = download.downloadUrl.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
        }
      } catch (cloudinaryError) {
        console.error("Error deleting from Cloudinary:", cloudinaryError);
        // Continue with database deletion even if Cloudinary deletion fails
      }
    }

    await Download.deleteOne({ id });

    return NextResponse.json({ message: "Download deleted successfully" });
  } catch (error) {
    console.error("Error deleting download:", error);
    return NextResponse.json(
      { error: "Failed to delete download" },
      { status: 500 }
    );
  }
}
