// app/downloads/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import downloadsData from "@/data/downloads.json";
import { Pagination } from "@/components/Pagination";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { Dropdown } from "@/components/ui/DropDown";
import { DataCard } from "@/components/ui/DataCard";

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  uploadDate: string;
  grades: string[];
}

export default function DownloadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredDownloads, setFilteredDownloads] = useState<DownloadItem[]>(
    downloadsData.downloads
  );
  const searchRef = useRef<HTMLDivElement>(null);

  // Prepare options for dropdowns
  const categoryOptions = [
    { value: "All", label: "All Categories" },
    ...Array.from(
      new Set(downloadsData.downloads.map((item) => item.category))
    ).map((category) => ({
      value: category,
      label: category,
    })),
  ];

  // Get all unique grades from all downloads
  const allGrades = Array.from(
    new Set(downloadsData.downloads.flatMap((item) => item.grades))
  ).sort();

  const gradeOptions = [
    { value: "All", label: "All Grades" },
    ...allGrades.map((grade) => ({
      value: grade,
      label: grade,
    })),
  ];

  // Generate suggestions based on input
  useEffect(() => {
    if (searchTerm.length > 0) {
      const matchedDownloads = downloadsData.downloads
        .filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((item) => item.title);
      setSuggestions(matchedDownloads);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDownload = (id?: string) => {
    if (!id) return;

    const downloadItem = downloadsData.downloads.find((item) => item.id === id);
    if (downloadItem) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = downloadItem.downloadUrl;
      link.download = `${downloadItem.title.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSearch = () => {
    setIsLoading(true);

    // Simulate loading for 2 seconds
    setTimeout(() => {
      // Filter downloads based on search and filters
      const filtered = downloadsData.downloads.filter((item) => {
        const matchesSearch = searchTerm
          ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;
        const matchesGrade =
          selectedGrade === "All" || item.grades.includes(selectedGrade);

        return matchesSearch && matchesCategory && matchesGrade;
      });

      setFilteredDownloads(filtered);
      setIsLoading(false);
    }, 2000);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedGrade("All");
    setFilteredDownloads(downloadsData.downloads);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  // Trigger search when filters change

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#6B21A8]">
        Download Resources
      </h1>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 items-end">
        <div className="flex-1 relative" ref={searchRef}>
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
            fullWidth
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between ">
          <Dropdown
            options={categoryOptions}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />

          <Dropdown
            options={gradeOptions}
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          />
        </div>

        <Button
          variant="primary"
          onClick={handleSearch}
          disabled={isLoading}
          className="w-full md:w-auto"
        >
          {isLoading ? <Loader /> : "Search"}
        </Button>

        <Button
          variant="outline"
          onClick={handleClear}
          className="w-full md:w-auto"
          disabled={isLoading}
        >
          Clear
        </Button>
      </div>

      {/* Downloads Grid with Pagination */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader text="Searching resources..." />
        </div>
      ) : filteredDownloads.length > 0 ? (
        <Pagination
          items={filteredDownloads}
          itemsPerPage={6}
          className="space-y-4"
          gridClassName="space-y-2"
          renderItem={(download) => (
            <DataCard
              id={download.id}
              title={download.title}
              data={[
                { label: "Description", value: download.description },
                { label: "Category", value: download.category },
                { label: "UploadDate", value: download.uploadDate },
                { label: "Grade", value: download.grades.join(", ") },
              ]}
              buttonText="Download"
              onButtonClick={handleDownload}
              cardClassName="p-4 border-2 border-[#6B21A8]"
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
            No resources found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
