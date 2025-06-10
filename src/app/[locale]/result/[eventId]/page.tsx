"use client";

import { useParams } from "next/navigation";
import eventsData from "@/data/events.json";
import resultsData from "@/data/results.json";
import { DataCard } from "@/components/ui/DataCard";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/DropDown";
import { Loader } from "@/components/ui/Loader";
import { useState } from "react";

export default function EventResultsPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  // Find the event
  const event = eventsData.find((e) => e.eventId === eventId);

  // Get all results for this event
  const eventResults = resultsData.filter(
    (result) => result.eventId === eventId
  );

  // Filtered results initially include all valid results
  const initialFilteredResults = eventResults.filter((result) =>
    event?.grades.includes(result.student.grade)
  );
  const [filteredResults, setFilteredResults] = useState(
    initialFilteredResults
  );

  const gradeOptions = [
    { value: "All", label: "All Grades" },
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

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Event not found</h1>
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
            placeholder="Search by roll number or name..."
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
        >
          {isLoading ? <Loader /> : "Search"}
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("");
            setSelectedGrade("All");
            setFilteredResults(initialFilteredResults);
          }}
          className="w-full md:w-auto"
          disabled={isLoading}
        >
          Clear
        </Button>
      </div>

      {/* Results Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#6B21A8] border-b pb-2">
          Student Results
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader text="Searching results..." />
          </div>
        ) : filteredResults.length > 0 ? (
          <Pagination
            items={filteredResults}
            itemsPerPage={5}
            className="space-y-4"
            gridClassName="space-y-3"
            renderItem={(result) => (
              <DataCard
                title={result.student.fullName}
                key={result.resultId}
                className="hover:bg-gray-50 transition-colors"
                data={[
                  { label: "Roll No", value: result.examData.rollNumber },
                  { label: "Position", value: `#${result.examData.position}` },
                  { label: "Grade", value: `Grade ${result.student.grade}` },
                  {
                    label: "Score",
                    value: `${result.examData.score}%`,
                    className: "font-bold",
                  },
                ]}
                buttonText="View Full Result"
                onButtonClick={() => handleViewResult(result.resultId)}
                buttonVariant="outline"
                buttonSize="sm"
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
                ? "No results published yet"
                : "No results match your search criteria"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
