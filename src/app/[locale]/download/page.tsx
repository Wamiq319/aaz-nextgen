// app/downloads/page.tsx
"use client";

import { useState, useEffect } from "react";
import { DataCard } from "@/components/ui/DataCard";
import { Pagination } from "@/components/Pagination";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { Dropdown } from "@/components/ui/DropDown";
import { useTranslations } from "next-intl";
import { Download, DownloadCategory } from "@/lib/types/downloads";

export default function DownloadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [filteredDownloads, setFilteredDownloads] = useState<Download[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState("");

  // Get translations
  const t = useTranslations("DownloadsPage");

  // Fetch downloads from API on component mount
  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      setIsInitialLoading(true);
      setError("");
      const response = await fetch("/api/downloads");
      if (!response.ok) {
        throw new Error("Failed to fetch downloads");
      }
      const data = await response.json();
      setDownloads(data);
      setFilteredDownloads(data);
    } catch (error) {
      console.error("Error fetching downloads:", error);
      setError("Failed to load downloads");
    } finally {
      setIsInitialLoading(false);
    }
  };

  // Prepare options for dropdowns
  const categoryOptions = [
    { value: "All", label: t("filters.allCategories") },
    ...Object.values(DownloadCategory).map((category) => ({
      value: category,
      label: category,
    })),
  ];

  const gradeOptions = [
    { value: "All", label: t("filters.allGrades") },
    ...Array.from({ length: 12 }, (_, i) => ({
      value: (i + 1).toString(),
      label: `Grade ${i + 1}`,
    })),
  ];

  const handleSearch = () => {
    setIsLoading(true);

    // Simulate loading for 1 second
    setTimeout(() => {
      // Filter downloads based on search and filters
      const filtered = downloads.filter((download) => {
        const matchesSearch = searchTerm
          ? download.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            download.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          : true;
        const matchesCategory =
          selectedCategory === "All" || download.category === selectedCategory;
        const matchesGrade =
          selectedGrade === "All" || download.grades.includes(selectedGrade);

        return matchesSearch && matchesCategory && matchesGrade;
      });

      setFilteredDownloads(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedGrade("All");
    setFilteredDownloads(downloads); // Reset to show all downloads
  };

  const handleDownload = (downloadUrl: string, title: string) => {
    // Open the download URL in a new tab
    window.open(downloadUrl, "_blank");
  };

  // Show loading state while fetching initial data
  if (isInitialLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#6B21A8]">
          {t("title")}
        </h1>
        <div className="flex justify-center items-center h-64">
          <Loader text={t("loading.initial")} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#6B21A8]">
        {t("title")}
      </h1>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 items-end">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </div>

        <div className="flex justify-between gap-4">
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

      {/* Error Message */}
      {error && (
        <div className="text-center text-red-500 py-2 bg-red-50 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Downloads Grid with Pagination */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader text={t("loading.searching")} />
        </div>
      ) : filteredDownloads.length > 0 ? (
        <Pagination
          items={filteredDownloads}
          itemsPerPage={6}
          className="space-y-4"
          gridClassName="space-y-3"
          renderItem={(download: Download) => (
            <DataCard
              id={download.id}
              title={download.title}
              data={[
                {
                  label: t("downloadData.description"),
                  value: download.description,
                },
                { label: t("downloadData.category"), value: download.category },
                {
                  label: t("downloadData.grades"),
                  value: download.grades.join(", "),
                },
                {
                  label: t("downloadData.uploadDate"),
                  value: new Date(download.uploadDate).toLocaleDateString(),
                },
              ]}
              primaryButtonText={t("actions.download")}
              onPrimaryButtonClick={() =>
                handleDownload(download.downloadUrl, download.title)
              }
              primaryButtonVariant="primary"
              primaryButtonSize="sm"
              cardClassName="p-4"
              dataClassName="grid grid-cols-2 md:grid-cols-3 gap-3"
            />
          )}
          paginationControlsClassName="flex justify-center items-center gap-2 mt-6"
          activePageButtonClassName="bg-[#6B21A8] text-white"
          pageButtonClassName="bg-white text-[#6B21A8] border border-[#6B21A8] hover:bg-gray-50"
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">{t("noResults")}</p>
        </div>
      )}
    </div>
  );
}
