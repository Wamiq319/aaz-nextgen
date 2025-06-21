"use client";

import { useState, useEffect, useRef } from "react";
import { DataCard } from "@/components/ui/DataCard";
import { Pagination } from "@/components/Pagination";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { Dropdown } from "@/components/ui/DropDown";
import { useTranslations } from "next-intl";
import { EventCategory, Event } from "@/lib/types/events";

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Get translations
  const t = useTranslations("ResultsPage");

  // Fetch events from API on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsInitialLoading(true);
      const response = await fetch("/api/event");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  // Prepare options for dropdowns
  const cityOptions = [
    { value: "All", label: t("filters.allCities") },
    ...Array.from(new Set(events.map((event) => event.city))).map((city) => ({
      value: city,
      label: city,
    })),
  ];

  // Generate category options from the enum
  const categoryOptions = [
    { value: "All", label: t("filters.allCategories") },
    ...Object.values(EventCategory).map((category) => ({
      value: category,
      label: category,
    })),
  ];

  // Generate suggestions based on input
  useEffect(() => {
    if (searchTerm.length > 0) {
      const matchedEvents = events
        .filter((event) =>
          event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((event) => event.eventName);
      setSuggestions(matchedEvents);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, events]);

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

  function handleViewEvent(eventId?: string) {
    if (eventId) {
      router.push(`/result/${eventId}`);
    }
  }

  const handleSearch = () => {
    setIsLoading(true);

    // Simulate loading for 2 seconds
    setTimeout(() => {
      // Filter events based on search and filters
      const filtered = events.filter((event) => {
        const matchesSearch = searchTerm
          ? event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
        const matchesCity =
          selectedCity === "All" || event.city === selectedCity;
        const matchesCategory =
          selectedCategory === "All" || event.category === selectedCategory;

        return matchesSearch && matchesCity && matchesCategory;
      });

      setFilteredEvents(filtered);
      setIsLoading(false);
    }, 2000);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedCity("All");
    setSelectedCategory("All");
    setFilteredEvents(events); // Reset to show all events
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
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
        <div className="flex-1 relative" ref={searchRef}>
          <Input
            type="text"
            placeholder={t("search.placeholder")}
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

        <div className="flex justify-between gap-4">
          <Dropdown
            options={cityOptions}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          />

          <Dropdown
            options={categoryOptions}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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

      {/* Events Grid with Pagination */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader text={t("loading.searching")} />
        </div>
      ) : filteredEvents.length > 0 ? (
        <Pagination
          items={filteredEvents}
          itemsPerPage={5}
          className="space-y-4"
          gridClassName="space-y-3"
          renderItem={(event: Event) => (
            <DataCard
              id={event.eventId}
              title={event.eventName}
              data={[
                {
                  label: t("eventData.date"),
                  value: new Date(event.examDate).toLocaleDateString(),
                },
                { label: t("eventData.city"), value: event.city },
                { label: t("eventData.category"), value: event.category },
                {
                  label: t("eventData.grades"),
                  value: event.grades.join(", "),
                },
                {
                  label: t("eventData.participants"),
                  value: event.totalParticipants.toString(),
                },
                {
                  label: t("eventData.status"),
                  value: event.isPublished
                    ? t("status.published")
                    : t("status.draft"),
                  className: event.isPublished
                    ? "text-green-600"
                    : "text-yellow-600",
                },
              ]}
              primaryButtonText={t("actions.viewResult")}
              onPrimaryButtonClick={handleViewEvent}
              primaryButtonVariant="primary"
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
