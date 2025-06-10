"use client";

import { useState, useEffect, useRef } from "react";
import eventsData from "@/data/events.json";
import { DataCard } from "@/components/ui/DataCard";
import { Pagination } from "@/components/Pagination";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { Dropdown } from "@/components/ui/DropDown";

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(eventsData); // Start with all events
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Prepare options for dropdowns
  const cityOptions = [
    { value: "All", label: "All Cities" },
    ...Array.from(new Set(eventsData.map((event) => event.city))).map(
      (city) => ({
        value: city,
        label: city,
      })
    ),
  ];

  const categoryOptions = [
    { value: "All", label: "All Categories" },
    ...Array.from(new Set(eventsData.map((event) => event.category))).map(
      (category) => ({
        value: category,
        label: category,
      })
    ),
  ];

  // Generate suggestions based on input
  useEffect(() => {
    if (searchTerm.length > 0) {
      const matchedEvents = eventsData
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

  function handleViewEvent(eventId: string) {
    router.push(`/result/${eventId}`);
  }

  const handleSearch = () => {
    setIsLoading(true);

    // Simulate loading for 4 seconds
    setTimeout(() => {
      // Filter events based on search and filters
      const filtered = eventsData.filter((event) => {
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
    }, 4000);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedCity("All"); // Should reset to "All" not empty string
    setSelectedCategory("All"); // Should reset to "All" not empty string
    setFilteredEvents(eventsData); // Reset to show all events
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#6B21A8]">
        Results
      </h1>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 items-end">
        <div className="flex-1 relative" ref={searchRef}>
          <Input
            type="text"
            placeholder="Search events..."
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

      {/* Events Grid with Pagination */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader text="Finding events..." />
        </div>
      ) : filteredEvents.length > 0 ? (
        <Pagination
          items={filteredEvents}
          itemsPerPage={5}
          className="space-y-4"
          gridClassName="space-y-3"
          renderItem={(event) => (
            <DataCard
              id={event.eventId}
              title={event.eventName}
              data={[
                {
                  label: "Date",
                  value: new Date(event.examDate).toLocaleDateString(),
                },
                { label: "City", value: event.city },
                { label: "Category", value: event.category },
                { label: "Grades", value: event.grades.join(", ") },
              ]}
              buttonText="View Result"
              onButtonClick={() => handleViewEvent(event.eventId)}
              buttonVariant="primary"
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
            No events found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
