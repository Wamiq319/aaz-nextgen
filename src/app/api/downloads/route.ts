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

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
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

    // Generate a clean filename for Cloudinary
    const timestamp = Date.now();
    const cleanFileName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_") // Replace special chars with underscore
      .replace(/\.pdf$/i, "") // Remove .pdf extension
      .trim(); // Remove any whitespace

    const publicId = `aaz-nextgen/downloads/${timestamp}_${cleanFileName}`;

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            folder: "aaz-nextgen/downloads",
            public_id: publicId,
            format: "pdf",
            flags: "attachment", // This makes the file downloadable
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const cloudinaryResult = uploadResult as any;

    // Create download record with cloudinaryPublicId
    const download = new Download({
      id: `download_${timestamp}`,
      title,
      description,
      category,
      downloadUrl: cloudinaryResult.secure_url,
      cloudinaryPublicId: cloudinaryResult.public_id, // Store the public_id
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

    // Delete from Cloudinary using stored public_id
    if (download.cloudinaryPublicId) {
      try {
        console.log(`Deleting from Cloudinary: ${download.cloudinaryPublicId}`);

        const result = await cloudinary.uploader.destroy(
          download.cloudinaryPublicId,
          { resource_type: "raw" }
        );

        console.log("Cloudinary deletion result:", result);

        if (result.result === "ok") {
          console.log("✅ File deleted from Cloudinary successfully");
        } else {
          console.log("⚠️ Cloudinary deletion may have failed:", result);
        }
      } catch (cloudinaryError) {
        console.error("❌ Error deleting from Cloudinary:", cloudinaryError);
        // Continue with database deletion even if Cloudinary deletion fails
      }
    } else {
      console.log(
        "⚠️ No cloudinaryPublicId found, skipping Cloudinary deletion"
      );
    }

    // Delete from database
    await Download.deleteOne({ id });
    console.log("✅ Download deleted from database");

    return NextResponse.json({
      message: "Download deleted successfully",
      cloudinaryDeleted: !!download.cloudinaryPublicId,
    });
  } catch (error) {
    console.error("Error deleting download:", error);
    return NextResponse.json(
      { error: "Failed to delete download" },
      { status: 500 }
    );
  }
}
