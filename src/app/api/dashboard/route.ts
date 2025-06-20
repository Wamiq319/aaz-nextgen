import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Event from "@/lib/models/Events";
import Result from "@/lib/models/Result";
import Download from "@/lib/models/Download";

// GET - Fetch dashboard statistics
export async function GET() {
  try {
    await dbConnect();

    // Fetch counts from all collections
    const [totalEvents, totalResults, totalDownloads] = await Promise.all([
      Event.countDocuments(),
      Result.countDocuments(),
      Download.countDocuments(),
    ]);

    // Fetch recent events (last 5)
    const recentEvents = await Event.find({})
      .sort({ examDate: -1 })
      .limit(5)
      .select("eventName examDate city category");

    // Fetch recent results (last 5)
    const recentResults = await Result.find({})
      .sort({ publishedDate: -1 })
      .limit(5)
      .select(
        "student.fullName student.grade examData.score examData.position publishedDate"
      );

    // Fetch recent downloads (last 5)
    const recentDownloads = await Download.find({})
      .sort({ uploadDate: -1 })
      .limit(5)
      .select("title category uploadDate");

    // Calculate some additional statistics
    const publishedEvents = await Event.countDocuments({ isPublished: true });
    const unpublishedEvents = await Event.countDocuments({
      isPublished: false,
    });

    // Get top performing students (top 5 by score)
    const topStudents = await Result.find({})
      .sort({ "examData.score": -1 })
      .limit(5)
      .select(
        "student.fullName student.grade examData.score examData.position"
      );

    // Get events by category
    const eventsByCategory = await Event.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Get results by grade
    const resultsByGrade = await Result.aggregate([
      {
        $group: {
          _id: "$student.grade",
          count: { $sum: 1 },
          avgScore: { $avg: "$examData.score" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const dashboardData = {
      statistics: {
        totalEvents,
        totalResults,
        totalDownloads,
        publishedEvents,
        unpublishedEvents,
      },
      recentActivity: {
        events: recentEvents,
        results: recentResults,
        downloads: recentDownloads,
      },
      analytics: {
        topStudents,
        eventsByCategory,
        resultsByGrade,
      },
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
