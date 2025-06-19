"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { DataCard } from "@/components/ui/DataCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/DropDown";
import { Loader } from "@/components/ui/Loader";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

// Define the event type
type EventType = {
  eventId: string;
  eventName: string;
  examDate: string;
  city: string;
  category: string;
  grades: string[];
  isPublished: boolean;
  totalParticipants: number;
};

const categoryOptions = [
  { value: "Math", label: "Math" },
  { value: "Science", label: "Science" },
  { value: "English", label: "English" },
  { value: "Urdu", label: "Urdu" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Biology", label: "Biology" },
];

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    eventName: string;
    examDate: string;
    city: string;
    category: string;
    grades: string[];
    isPublished: boolean;
    totalParticipants: number;
  }>({
    eventName: "",
    examDate: "",
    city: "",
    category: "Math",
    grades: [],
    isPublished: false,
    totalParticipants: 0,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/event");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError("Could not load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError("");
    try {
      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to create event");
      }
      // Refresh events after creation
      const res = await fetch("/api/event");
      setEvents(await res.json());
      setShowAddForm(false);
      setFormData({
        eventName: "",
        examDate: "",
        city: "",
        category: "Math",
        grades: [],
        isPublished: false,
        totalParticipants: 0,
      });
    } catch (err: any) {
      setCreateError(err.message || "Could not create event.");
    } finally {
      setCreating(false);
    }
  };

  // Render function for DataCard
  const renderEventCard = (event: EventType) => (
    <DataCard
      key={event.eventId}
      id={event.eventId}
      title={event.eventName}
      data={[
        { label: "Date", value: event.examDate },
        { label: "City", value: event.city },
        { label: "Category", value: event.category },
        { label: "Grades", value: event.grades.join(", ") },
        { label: "Total Participants", value: event.totalParticipants },
      ]}
      secondaryButtonText="Delete"
      onSecondaryButtonClick={() => {
        setEventToDelete(event.eventId);
        setConfirmOpen(true);
      }}
      secondaryButtonVariant="red"
      secondaryButtonSize="sm"
      cardClassName="p-4"
      dataClassName="grid grid-cols-2 md:grid-cols-4 gap-3"
    />
  );

  const handleDeleteConfirmed = async () => {
    if (!eventToDelete) return;
    await fetch(`/api/event?id=${eventToDelete}`, { method: "DELETE" });
    // Fetch fresh data after deletion
    const res = await fetch("/api/event");
    setEvents(await res.json());
    setEventToDelete(null);
    setConfirmOpen(false);
  };

  return (
    <div>
      {/* Top Heading and Add Event Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#6B21A8]">Events Management</h1>
        <Button onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? "Close" : "Add New Event"}
        </Button>
      </div>
      <ConfirmationModal
        open={confirmOpen}
        title="Delete Event?"
        description="Are you sure you want to delete this event? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => {
          setConfirmOpen(false);
          setEventToDelete(null);
        }}
      />
      {/* Loader and Error */}
      {loading && (
        <div className="text-center py-8">
          <Loader text="Loading events..." />
        </div>
      )}
      {error && <div className="text-center text-red-500 py-2">{error}</div>}
      {/* Add Event Form */}
      {showAddForm && (
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <Input
              label="Event Name"
              value={formData.eventName}
              onChange={(e) =>
                setFormData({ ...formData, eventName: e.target.value })
              }
              required
              fullWidth
              className="border-0 border-b-2 border-[#E9D5FF] focus:border-[#6B21A8] rounded-none shadow-none bg-transparent"
            />
            <Input
              label="Exam Date"
              type="date"
              value={formData.examDate}
              onChange={(e) =>
                setFormData({ ...formData, examDate: e.target.value })
              }
              required
              fullWidth
              className="border-0 border-b-2 border-[#E9D5FF] focus:border-[#6B21A8] rounded-none shadow-none bg-transparent"
            />
            <Input
              label="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
              fullWidth
              className="border-0 border-b-2 border-[#E9D5FF] focus:border-[#6B21A8] rounded-none shadow-none bg-transparent"
            />
            <Dropdown
              label="Category"
              options={categoryOptions}
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              fullWidth
              className="border-0 border-b-2 border-[#E9D5FF] focus:border-[#6B21A8] rounded-none shadow-none bg-transparent"
            />
            <div>
              <label className="block text-[#6B21A8] font-semibold mb-2">
                Grades
              </label>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                  <label key={grade} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.grades.includes(grade.toString())}
                      onChange={(e) => {
                        const grades = [...formData.grades];
                        if (e.target.checked) {
                          grades.push(grade.toString());
                        } else {
                          const index = grades.indexOf(grade.toString());
                          if (index > -1) {
                            grades.splice(index, 1);
                          }
                        }
                        setFormData({ ...formData, grades });
                      }}
                      className="accent-[#6B21A8]"
                    />
                    <span className="text-[#6B21A8]">Grade {grade}</span>
                  </label>
                ))}
              </div>
            </div>
            <Input
              label="Total Participants"
              type="number"
              value={formData.totalParticipants}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  totalParticipants: Number(e.target.value),
                })
              }
              required
              fullWidth
              className="border-0 border-b-2 border-[#E9D5FF] focus:border-[#6B21A8] rounded-none shadow-none bg-transparent"
            />
            {createError && (
              <div className="text-red-500 text-center">{createError}</div>
            )}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={creating}>
                {creating ? <Loader text="Creating..." /> : "Create Event"}
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Events Grid */}
      {!loading && !error && events.length === 0 && (
        <div className="text-center text-gray-500 py-8">No events found.</div>
      )}
      {!loading && !error && events.length > 0 && (
        <Pagination
          items={events}
          renderItem={renderEventCard}
          itemsPerPage={5}
          gridClassName="grid grid-cols-1 gap-4"
        />
      )}
    </div>
  );
}
