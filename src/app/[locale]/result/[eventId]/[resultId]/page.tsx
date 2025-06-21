"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Loader } from "@/components/ui/Loader";
import { useTranslations } from "next-intl";

interface ResultData {
  resultId: string;
  eventId: string;
  student: {
    fullName: string;
    fatherName: string;
    grade: string;
    institution: {
      name: string;
      campus: string;
    };
  };
  examData: {
    rollNumber: string;
    score: number;
    position: number;
    totalParticipants: number;
  };
  awards: {
    hasWon: boolean;
    awardName: string;
    awardType: string;
  };
  remarks: string;
  publishedDate: string;
  event?: {
    eventId: string;
    eventName: string;
    examDate: string;
    city: string;
    category: string;
    grades: string[];
    totalParticipants: number;
  };
}

export default function StudentResultPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("ResultsPage");

  const eventId = Array.isArray(params?.eventId)
    ? params.eventId[0]
    : params?.eventId;
  const resultId = Array.isArray(params?.resultId)
    ? params.resultId[0]
    : params?.resultId;

  const [result, setResult] = useState<ResultData | null>(null);
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
        <Loader text={t("loading.initial")} />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          {error || t("resultNotFound")}
        </h1>
        <Button
          variant="primary"
          onClick={() => router.push(`/result/${eventId}`)}
          className="mt-4"
        >
          {t("backToEvent")}
        </Button>
      </div>
    );
  }

  // Use totalParticipants from event if available, otherwise from examData
  const totalParticipants =
    result.event?.totalParticipants || result.examData.totalParticipants;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button
        variant="outline"
        onClick={() => router.push(`/result/${eventId}`)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("backToEventResults")}
      </Button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#6B21A8] p-4 text-white">
          <h1 className="text-2xl font-bold">{t("examResult")}</h1>
          <p className="text-[#F3E8FF]">
            {result.student.fullName} • {t("eventData.rollNo")}:{" "}
            {result.examData.rollNumber}
          </p>
          {result.event && (
            <p className="text-[#F3E8FF] text-sm mt-1">
              {result.event.eventName} •{" "}
              {new Date(result.event.examDate).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="p-6 space-y-6">
          {/* Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Column */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#6B21A8] border-b pb-2">
                {t("studentDetails")}
              </h2>
              <DetailItem
                label={t("fullName")}
                value={result.student.fullName}
              />
              <DetailItem
                label={t("fathersName")}
                value={result.student.fatherName}
              />
              <DetailItem
                label={t("eventData.grade")}
                value={result.student.grade}
              />
              <DetailItem
                label={t("institution")}
                value={`${result.student.institution.name} (${result.student.institution.campus})`}
              />
            </div>

            {/* Exam Column */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#6B21A8] border-b pb-2">
                {t("examDetails")}
              </h2>
              <DetailItem
                label={t("eventData.rollNo")}
                value={result.examData.rollNumber}
              />
              <DetailItem
                label={t("eventData.score")}
                value={`${result.examData.score}%`}
                highlight
              />
              <DetailItem
                label={t("eventData.position")}
                value={`#${result.examData.position} (${t(
                  "outOf"
                )} ${totalParticipants})`}
              />
              {result.awards?.hasWon && (
                <DetailItem
                  label={t("award")}
                  value={result.awards.awardName}
                  highlight
                />
              )}
              {result.awards?.awardType && (
                <DetailItem
                  label={t("awardType")}
                  value={result.awards.awardType}
                />
              )}
              <DetailItem
                label={t("publishedDate")}
                value={new Date(result.publishedDate).toLocaleDateString()}
              />
            </div>
          </div>

          {/* Event Details */}
          {result.event && (
            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-[#6B21A8] mb-3">
                {t("eventDetails")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <DetailItem
                  label={t("eventName")}
                  value={result.event.eventName}
                />
                <DetailItem
                  label={t("eventData.city")}
                  value={result.event.city}
                />
                <DetailItem
                  label={t("eventData.category")}
                  value={result.event.category}
                />
                <DetailItem
                  label={t("totalParticipants")}
                  value={result.event.totalParticipants}
                />
              </div>
            </div>
          )}

          {/* Remarks */}
          {result.remarks && (
            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-[#6B21A8] mb-3">
                {t("judgesRemarks")}
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
              {t("viewAllResults")}
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
