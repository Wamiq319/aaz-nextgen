"use client";

import { useParams } from "next/navigation";
import { DataCard } from "@/components/ui/DataCard";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/DropDown";
import { Loader } from "@/components/ui/Loader";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Event } from "@/lib/types/events";
import { Result } from "@/lib/types/results";

export default function EventResultsPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const router = useRouter();
  const t = useTranslations("ResultsPage");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [eventResults, setEventResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [error, setError] = useState("");

  // Fetch event and results data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsInitialLoading(true);
        setError("");

        // Fetch event data
        const eventResponse = await fetch(`/api/event?id=${eventId}`);
        if (!eventResponse.ok) {
          throw new Error("Event not found");
        }
        const eventData = await eventResponse.json();
        setEvent(eventData);

        // Fetch all results and filter by eventId
        const resultsResponse = await fetch("/api/results");
        if (!resultsResponse.ok) {
          throw new Error("Failed to fetch results");
        }
        const allResults = await resultsResponse.json();
        const eventResultsData = allResults.filter(
          (result: Result) => result.eventId === eventId
        );
        setEventResults(eventResultsData);

        // Filter results by valid grades
        const validResults = eventResultsData.filter((result: Result) =>
          eventData.grades.includes(result.student.grade)
        );
        setFilteredResults(validResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setIsInitialLoading(false);
      }
    };

    if (eventId) {
      fetchData();
    }
  }, [eventId]);

  const gradeOptions = [
    { value: "All", label: t("filters.allGrades") },
    ...(event?.grades || [])
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map((grade) => ({
        value: grade,
        label: `Grade ${grade}`,
      })),
  ];

  const handleSearch = () => {
    setIsLoading(true);

    setTimeout(() => {
      const filtered = eventResults.filter((result) => {
        const isValidGrade = event?.grades.includes(result.student.grade);
        const matchesSearch = searchTerm
          ? result.examData.rollNumber
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            result.student.fullName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          : true;
        const matchesGrade =
          selectedGrade === "All" || result.student.grade === selectedGrade;

        return isValidGrade && matchesSearch && matchesGrade;
      });

      setFilteredResults(filtered);
      setIsLoading(false);
    }, 300);
  };

  const handleViewResult = (resultId: string) => {
    router.push(`/result/${eventId}/${resultId}`);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedGrade("All");
    const validResults = eventResults.filter((result) =>
      event?.grades.includes(result.student.grade)
    );
    setFilteredResults(validResults);
  };

  // Show loading state while fetching initial data
  if (isInitialLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <Loader text={t("loading.initial")} />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{t("error")}</h1>
        <p className="text-gray-600">{error}</p>
        <Button
          variant="outline"
          onClick={() => router.push("/result")}
          className="mt-4"
        >
          {t("backToResults")}
        </Button>
      </div>
    );
  }

  // Show not found state
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {t("eventNotFound")}
        </h1>
        <Button
          variant="outline"
          onClick={() => router.push("/result")}
          className="mt-4"
        >
          {t("backToResults")}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Event Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#6B21A8] mb-2">
          {event.eventName}
        </h1>
        <div className="text-lg text-gray-600">
          {event.city} • {new Date(event.examDate).toLocaleDateString()} •{" "}
          {event.category}
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full md:w-auto">
          <Input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </div>

        <Dropdown
          options={gradeOptions}
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="w-full md:w-48"
        />

        <Button
          variant="primary"
          onClick={handleSearch}
          className="w-full md:w-auto"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : t("search.button")}
        </Button>

        <Button
          variant="outline"
          onClick={handleClear}
          className="w-full md:w-auto"
          disabled={isLoading}
        >
          {t("search.clear")}
        </Button>
      </div>

      {/* Results Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#6B21A8] border-b pb-2">
          {t("studentResults")}
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader text={t("loading.searching")} />
          </div>
        ) : filteredResults.length > 0 ? (
          <Pagination
            items={filteredResults}
            itemsPerPage={5}
            className="space-y-4"
            gridClassName="space-y-3"
            renderItem={(result: Result) => (
              <DataCard
                title={result.student.fullName}
                key={result.resultId}
                className="hover:bg-gray-50 transition-colors"
                data={[
                  {
                    label: t("eventData.rollNo"),
                    value: result.examData.rollNumber,
                  },
                  {
                    label: t("eventData.position"),
                    value: `#${result.examData.position}`,
                  },
                  {
                    label: t("eventData.grade"),
                    value: result.student.grade,
                    className: "font-bold",
                  },
                  {
                    label: t("eventData.score"),
                    value: `${result.examData.score}%`,
                    className: "font-bold",
                  },
                ]}
                primaryButtonText={t("actions.viewResult")}
                onPrimaryButtonClick={() => handleViewResult(result.resultId)}
                primaryButtonVariant="outline"
                primaryButtonSize="sm"
                cardClassName="p-4"
                dataClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              />
            )}
            paginationControlsClassName="flex justify-center items-center gap-2 mt-6"
            activePageButtonClassName="bg-[#6B21A8] text-white"
            pageButtonClassName="bg-white text-[#6B21A8] border border-[#6B21A8] hover:bg-gray-50"
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {eventResults.length === 0
                ? t("noResultsPublished")
                : t("noResults")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
