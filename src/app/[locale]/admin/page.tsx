"use client";

import { useState, useEffect } from "react";
import { Loader } from "@/components/ui/Loader";

// Simple Card component defined locally
function Card({
  children,
  className = "",
  active = false,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <div
      className={`transition-all duration-200 rounded-2xl shadow-md border-0 p-6 cursor-pointer 
        ${
          active
            ? "bg-gradient-to-r from-[#6B21A8] to-[#D63384] text-white"
            : "bg-white hover:bg-[#F3E8FF] text-[#6B21A8]"
        } 
        ${className}`}
    >
      {children}
    </div>
  );
}

type DashboardData = {
  statistics: {
    totalEvents: number;
    totalResults: number;
    totalDownloads: number;
    publishedEvents: number;
    unpublishedEvents: number;
  };
  recentActivity: {
    events: Array<{
      eventName: string;
      examDate: string;
      city: string;
      category: string;
    }>;
    results: Array<{
      student: {
        fullName: string;
        grade: string;
      };
      examData: {
        score: number;
        position: number;
      };
      publishedDate: string;
    }>;
    downloads: Array<{
      title: string;
      category: string;
      uploadDate: string;
    }>;
  };
  analytics: {
    topStudents: Array<{
      student: {
        fullName: string;
        grade: string;
      };
      examData: {
        score: number;
        position: number;
      };
    }>;
    eventsByCategory: Array<{
      _id: string;
      count: number;
    }>;
    resultsByGrade: Array<{
      _id: string;
      count: number;
      avgScore: number;
    }>;
  };
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/dashboard");
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F3E8FF] via-white to-[#E0E7FF] py-10 px-4 md:px-12">
        <div className="text-center py-20">
          <Loader text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F3E8FF] via-white to-[#E0E7FF] py-10 px-4 md:px-12">
        <div className="text-center py-20">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={fetchDashboardData}
            className="bg-[#6B21A8] text-white px-6 py-2 rounded-lg hover:bg-[#581C87] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3E8FF] via-white to-[#E0E7FF] py-10 px-4 md:px-12">
      <h1 className="text-4xl font-extrabold text-[#6B21A8] mb-10 text-center drop-shadow-sm tracking-tight">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card active>
          <h3 className="font-semibold text-lg mb-2">Total Events</h3>
          <p className="text-4xl font-extrabold">
            {dashboardData?.statistics.totalEvents || 0}
          </p>
          <p className="text-sm opacity-80 mt-1">
            {dashboardData?.statistics.publishedEvents || 0} published
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg mb-2">Total Results</h3>
          <p className="text-4xl font-extrabold">
            {dashboardData?.statistics.totalResults || 0}
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg mb-2">Total Downloads</h3>
          <p className="text-4xl font-extrabold">
            {dashboardData?.statistics.totalDownloads || 0}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Events */}
        <section>
          <h2 className="text-2xl font-bold text-[#6B21A8] mb-4">
            Recent Events
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow border-0">
            {dashboardData?.recentActivity.events.length === 0 ? (
              <p className="text-gray-500">No events found</p>
            ) : (
              <div className="space-y-3">
                {dashboardData?.recentActivity.events.map((event, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold text-[#6B21A8]">
                        {event.eventName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {event.city} • {event.category}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(event.examDate)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recent Results */}
        <section>
          <h2 className="text-2xl font-bold text-[#6B21A8] mb-4">
            Recent Results
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow border-0">
            {dashboardData?.recentActivity.results.length === 0 ? (
              <p className="text-gray-500">No results found</p>
            ) : (
              <div className="space-y-3">
                {dashboardData?.recentActivity.results.map((result, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold text-[#6B21A8]">
                        {result.student.fullName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Grade {result.student.grade} • Score:{" "}
                        {result.examData.score} • Position:{" "}
                        {result.examData.position}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(result.publishedDate)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Students */}
        <section>
          <h2 className="text-2xl font-bold text-[#6B21A8] mb-4">
            Top Performing Students
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow border-0">
            {dashboardData?.analytics.topStudents.length === 0 ? (
              <p className="text-gray-500">No student data available</p>
            ) : (
              <div className="space-y-3">
                {dashboardData?.analytics.topStudents.map((student, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-[#6B21A8]">
                        #{index + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold text-[#6B21A8]">
                          {student.student.fullName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Grade {student.student.grade}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        {student.examData.score} pts
                      </p>
                      <p className="text-sm text-gray-500">
                        Position {student.examData.position}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recent Downloads */}
        <section>
          <h2 className="text-2xl font-bold text-[#6B21A8] mb-4">
            Recent Downloads
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow border-0">
            {dashboardData?.recentActivity.downloads.length === 0 ? (
              <p className="text-gray-500">No downloads found</p>
            ) : (
              <div className="space-y-3">
                {dashboardData?.recentActivity.downloads.map(
                  (download, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-semibold text-[#6B21A8]">
                          {download.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {download.category}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(download.uploadDate)}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
