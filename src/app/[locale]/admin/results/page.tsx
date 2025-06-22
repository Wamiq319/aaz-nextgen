"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Dropdown } from "@/components/ui/DropDown";
import { DataCard } from "@/components/ui/DataCard";
import { Loader } from "@/components/ui/Loader";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useRouter } from "next/navigation";
import { Result } from "@/lib/types/results";
import { Event } from "@/lib/types/events";

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    eventId: "",
    studentFullName: "",
    studentFatherName: "",
    studentGrade: "",
    institutionName: "",
    institutionCampus: "",
    rollNumber: "",
    score: "",
    position: "",
    hasWon: false,
    awardName: "",
    awardType: "",
    remarks: "",
    publishedDate: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resultToDelete, setResultToDelete] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    Promise.all([
      fetch("/api/results").then((res) => res.json()),
      fetch("/api/event?fields=id,name").then((res) => res.json()),
    ])
      .then(([resultsData, eventsData]) => {
        setResults(resultsData);
        setEvents(eventsData);
      })
      .catch(() => setErrorMessage("Failed to load results or events."))
      .finally(() => setLoading(false));
  }, []);

  // Filtered results
  const filteredResults = results.filter((result) => {
    let match = true;
    if (selectedEvent) match = match && result.eventId === selectedEvent;
    return match;
  });

  // Add Result
  const handleAddResult = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setErrorMessage("");
    setSuccessMessage("");
    // Validation: eventId and studentGrade must not be empty
    if (!formData.eventId) {
      setErrorMessage("Please select an event.");
      setCreating(false);
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    if (!formData.studentGrade) {
      setErrorMessage("Please select a grade.");
      setCreating(false);
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    // Compose the result object as per schema
    const newResult = {
      eventId: formData.eventId,
      student: {
        fullName: formData.studentFullName,
        fatherName: formData.studentFatherName,
        grade: formData.studentGrade,
        institution: {
          name: formData.institutionName,
          campus: formData.institutionCampus,
        },
      },
      examData: {
        rollNumber: formData.rollNumber,
        score: Number(formData.score),
        position: Number(formData.position),
      },
      awards: {
        hasWon: formData.hasWon,
        awardName: formData.awardName,
        awardType: formData.awardType,
      },
      remarks: formData.remarks,
      publishedDate: formData.publishedDate,
    };
    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newResult),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create result");
      }
      setSuccessMessage("Result uploaded successfully!");
      setShowAddForm(false);
      setFormData({
        eventId: "",
        studentFullName: "",
        studentFatherName: "",
        studentGrade: "",
        institutionName: "",
        institutionCampus: "",
        rollNumber: "",
        score: "",
        position: "",
        hasWon: false,
        awardName: "",
        awardType: "",
        remarks: "",
        publishedDate: "",
      });
      // Refresh results
      const updatedResults = await fetch("/api/results").then((res) =>
        res.json()
      );
      setResults(updatedResults);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || "Could not create result.");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setCreating(false);
    }
  };

  // Delete handler
  const handleDeleteResult = async (id?: string) => {
    if (!id) return;
    setResultToDelete(id);
    setShowDeleteModal(true);
  };

  // Confirm delete handler
  const confirmDelete = async () => {
    if (!resultToDelete) return;
    setDeletingId(resultToDelete);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const res = await fetch(`/api/results?id=${resultToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete result");
      }
      setResults((prev) => prev.filter((r) => r.resultId !== resultToDelete));
      setSuccessMessage("Result deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || "Could not delete result.");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setResultToDelete(null);
    }
  };

  // Cancel delete handler
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setResultToDelete(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-[#6B21A8] break-words">
          Results Management
        </h1>
        <Button onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? "Close" : "Add New Result"}
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Dropdown
          label="Filter by Event"
          options={[
            { value: "", label: "All Events" },
            ...events.map((event: any) => ({
              value: event.eventId,
              label: event.eventName,
            })),
          ]}
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        />
      </div>

      {/* Loader and Error */}
      {loading && (
        <div className="text-center py-8">
          <Loader text="Loading results..." />
        </div>
      )}
      {errorMessage && (
        <div className="text-center text-red-500 py-2">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="text-center text-green-600 py-2">{successMessage}</div>
      )}

      {/* Add Result Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 max-w-2xl mx-auto">
          <form onSubmit={handleAddResult} className="space-y-4">
            <Dropdown
              label="Event"
              options={[
                { value: "", label: "Select Event" },
                ...events.map((event: any) => ({
                  value: event.eventId,
                  label: event.eventName,
                })),
              ]}
              value={formData.eventId}
              onChange={(e) =>
                setFormData({ ...formData, eventId: e.target.value })
              }
              required
              fullWidth
            />
            <Input
              label="Student Name"
              value={formData.studentFullName}
              onChange={(e) =>
                setFormData({ ...formData, studentFullName: e.target.value })
              }
              required
              fullWidth
            />
            <Input
              label="Father Name"
              value={formData.studentFatherName}
              onChange={(e) =>
                setFormData({ ...formData, studentFatherName: e.target.value })
              }
              required
              fullWidth
            />
            <Dropdown
              label="Grade"
              options={[
                { value: "", label: "Select Grade" },
                ...Array.from({ length: 12 }, (_, i) => ({
                  value: `${i + 1}`,
                  label: `Grade ${i + 1}`,
                })),
              ]}
              value={formData.studentGrade}
              onChange={(e) =>
                setFormData({ ...formData, studentGrade: e.target.value })
              }
              required
              fullWidth
            />
            <Input
              label="Institution Name"
              value={formData.institutionName}
              onChange={(e) =>
                setFormData({ ...formData, institutionName: e.target.value })
              }
              required
              fullWidth
            />
            <Input
              label="Institution Campus"
              value={formData.institutionCampus}
              onChange={(e) =>
                setFormData({ ...formData, institutionCampus: e.target.value })
              }
              required
              fullWidth
            />
            <Input
              label="Roll Number"
              value={formData.rollNumber}
              onChange={(e) =>
                setFormData({ ...formData, rollNumber: e.target.value })
              }
              required
              fullWidth
            />
            <Input
              label="Score"
              type="number"
              value={formData.score}
              onChange={(e) =>
                setFormData({ ...formData, score: e.target.value })
              }
              required
              fullWidth
            />
            <Input
              label="Position"
              type="number"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              required
              fullWidth
            />
            <Dropdown
              label="Has Won Award?"
              options={[
                { value: "false", label: "No" },
                { value: "true", label: "Yes" },
              ]}
              value={formData.hasWon ? "true" : "false"}
              onChange={(e) =>
                setFormData({ ...formData, hasWon: e.target.value === "true" })
              }
              required
              fullWidth
            />
            <Input
              label="Award Name"
              value={formData.awardName}
              onChange={(e) =>
                setFormData({ ...formData, awardName: e.target.value })
              }
              fullWidth
            />
            <Input
              label="Award Type"
              value={formData.awardType}
              onChange={(e) =>
                setFormData({ ...formData, awardType: e.target.value })
              }
              fullWidth
            />
            <Input
              label="Remarks"
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
              fullWidth
            />
            <Input
              label="Published Date"
              type="date"
              value={formData.publishedDate}
              onChange={(e) =>
                setFormData({ ...formData, publishedDate: e.target.value })
              }
              required
              fullWidth
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
                disabled={creating}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={creating}>
                {creating ? <Loader text="Creating..." /> : "Add Result"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Results Table replaced with DataCard list */}
      <div className="space-y-4 mb-4">
        {filteredResults.length === 0 && !loading ? (
          <div className="text-center text-gray-500 py-8">
            No results found.
          </div>
        ) : (
          filteredResults.map((result: Result) => (
            <DataCard
              key={result.resultId}
              id={result.resultId}
              title={result.student.fullName}
              data={[
                {
                  label: "Event",
                  value:
                    events.find((e: Event) => e.eventId === result.eventId)
                      ?.eventName || "Unknown",
                },
                {
                  label: "Institution",
                  value: result.student.institution.name,
                },
                { label: "Score", value: result.examData.score },
                { label: "Position", value: result.examData.position },
              ]}
              primaryButtonText="View Full Result"
              onPrimaryButtonClick={(id) => {
                const result = results.find((r) => r.resultId === id);
                if (result) {
                  router.push(`/result/${result.eventId}/${id}`);
                }
              }}
              primaryButtonVariant="outline"
              primaryButtonSize="sm"
              secondaryButtonText={
                deletingId === result.resultId ? "Deleting..." : "Delete"
              }
              onSecondaryButtonClick={handleDeleteResult}
              secondaryButtonVariant="red"
              secondaryButtonSize="sm"
              secondaryButtonClassName={
                deletingId === result.resultId
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
              cardClassName="p-4"
              dataClassName="grid grid-cols-2 md:grid-cols-4 gap-3"
            />
          ))
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={showDeleteModal}
        title="Delete Result"
        description="Are you sure you want to delete this result? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
