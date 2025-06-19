"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function StudentResultPage() {
  const params = useParams();
  const router = useRouter();

  const eventId = Array.isArray(params?.eventId)
    ? params.eventId[0]
    : params?.eventId;
  const resultId = Array.isArray(params?.resultId)
    ? params.resultId[0]
    : params?.resultId;

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!resultId) return;
    setLoading(true);
    setError("");
    fetch(`/api/results?id=${resultId}`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch result");
        }
        return res.json();
      })
      .then((data) => setResult(data))
      .catch((err) => setError(err.message || "Could not load result."))
      .finally(() => setLoading(false));
  }, [resultId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-[#6B21A8] mb-4">Loading...</h1>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          {error || "Result not found"}
        </h1>
        <Button
          variant="primary"
          onClick={() => router.push(`/result/${eventId}`)}
          className="mt-4"
        >
          Back to Event
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button
        variant="outline"
        onClick={() => router.push(`/result/${eventId}`)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Event Results
      </Button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#6B21A8] p-4 text-white">
          <h1 className="text-2xl font-bold">Exam Result</h1>
          <p className="text-[#F3E8FF]">
            {result.student.fullName} • Roll No: {result.examData.rollNumber}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Column */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#6B21A8] border-b pb-2">
                Student Details
              </h2>
              <DetailItem label="Full Name" value={result.student.fullName} />
              <DetailItem
                label="Father's Name"
                value={result.student.fatherName}
              />
              <DetailItem label="Grade" value={result.student.grade} />
              <DetailItem
                label="Institution"
                value={`${result.student.institution.name} (${result.student.institution.campus})`}
              />
            </div>

            {/* Exam Column */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#6B21A8] border-b pb-2">
                Exam Details
              </h2>
              <DetailItem
                label="Roll Number"
                value={result.examData.rollNumber}
              />
              <DetailItem
                label="Score"
                value={`${result.examData.score}%`}
                highlight
              />
              <DetailItem
                label="Position"
                value={`#${result.examData.position} (out of ${result.examData.totalParticipants})`}
              />
              {result.awards?.hasWon && (
                <DetailItem
                  label="Award"
                  value={result.awards.awardName}
                  highlight
                />
              )}
              <DetailItem
                label="Published Date"
                value={new Date(result.publishedDate).toLocaleDateString()}
              />
            </div>
          </div>

          {/* Remarks */}
          {result.remarks && (
            <div className="pt-4">
              <h2 className="text-lg font-semibold text-[#6B21A8] mb-3">
                Judge's Remarks
              </h2>
              <p className="bg-gray-50 p-4 rounded-md border border-gray-200">
                {result.remarks}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push(`/result`)}
            >
              View All Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable detail display component
function DetailItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p
        className={`mt-1 ${
          highlight ? "font-bold text-[#6B21A8]" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
