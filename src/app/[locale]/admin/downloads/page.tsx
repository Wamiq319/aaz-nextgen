"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { FileInput } from "@/components/ui/FileInput";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { DataCard } from "@/components/ui/DataCard";
import { Pagination } from "@/components/Pagination";
import { Download, DownloadCategory } from "@/lib/types/downloads";

const categoryOptions = [
  { value: DownloadCategory.PastPapers, label: DownloadCategory.PastPapers },
  { value: DownloadCategory.GuideBooks, label: DownloadCategory.GuideBooks },
  { value: DownloadCategory.Forms, label: DownloadCategory.Forms },
  {
    value: DownloadCategory.ReferenceBooks,
    label: DownloadCategory.ReferenceBooks,
  },
  { value: DownloadCategory.Brochures, label: DownloadCategory.Brochures },
  { value: DownloadCategory.Books, label: DownloadCategory.Books },
];

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: categoryOptions[0].value,
    grades: [] as string[],
    file: null as File | null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [downloadToDelete, setDownloadToDelete] = useState<string | null>(null);

  // Fetch downloads on component mount
  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/downloads");
      if (!response.ok) {
        throw new Error("Failed to fetch downloads");
      }
      const data = await response.json();
      setDownloads(data);
    } catch (err: any) {
      setError(err.message || "Failed to load downloads");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (files: FileList | null) => {
    setFormData({ ...formData, file: files && files[0] ? files[0] : null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError("");
    setSuccessMessage("");

    if (!formData.file) {
      setCreateError("Please select a file to upload");
      setCreating(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("grades", JSON.stringify(formData.grades));
      formDataToSend.append("file", formData.file);

      const response = await fetch("/api/downloads", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create download");
      }

      const newDownload = await response.json();
      setDownloads([newDownload, ...downloads]);
      setSuccessMessage("Download created successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: categoryOptions[0].value,
        grades: [],
        file: null,
      });
      setShowAddForm(false);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setCreateError(err.message || "Failed to create download");
      setTimeout(() => setCreateError(""), 5000);
    } finally {
      setCreating(false);
    }
  };

  // Delete handler
  const handleDeleteDownload = async (id?: string) => {
    if (!id) return;
    setDownloadToDelete(id);
    setShowDeleteModal(true);
  };

  // Confirm delete handler
  const confirmDelete = async () => {
    if (!downloadToDelete) return;
    setDeletingId(downloadToDelete);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`/api/downloads?id=${downloadToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete download");
      }

      setDownloads((prev) => prev.filter((d) => d.id !== downloadToDelete));
      setSuccessMessage("Download deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setError(err.message || "Could not delete download");
      setTimeout(() => setError(""), 5000);
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setDownloadToDelete(null);
    }
  };

  // Cancel delete handler
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDownloadToDelete(null);
  };

  // Handle download link click
  const handleDownloadClick = (id?: string) => {
    if (!id) return;
    const download = downloads.find((d) => d.id === id);
    if (download) {
      window.open(download.downloadUrl, "_blank");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#6B21A8]">
          Downloads Management
        </h1>
        <Button onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? "Close" : "Add New Download"}
        </Button>
      </div>

      {/* Success and Error Messages */}
      {successMessage && (
        <div className="text-center text-green-600 py-2 bg-green-50 rounded-lg mb-4">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 py-2 bg-red-50 rounded-lg mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <Loader text="Loading downloads..." />
        </div>
      )}

      {showAddForm && (
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              fullWidth
            />
            <Input
              label="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              fullWidth
            />
            <div>
              <label className="block text-[#6B21A8] font-semibold mb-2">
                Category
              </label>
              <select
                className="w-full border-0 border-b-2 border-[#E9D5FF] focus:border-[#6B21A8] rounded-none shadow-none bg-transparent py-2"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as DownloadCategory,
                  })
                }
                required
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
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
            <FileInput
              label="Upload PDF"
              onChange={handleFileChange}
              required
              fullWidth
              accept=".pdf"
            />
            {createError && (
              <div className="text-red-500 text-center bg-red-50 p-2 rounded">
                {createError}
              </div>
            )}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
                disabled={creating}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={creating}>
                {creating ? <Loader text="Uploading..." /> : "Add Download"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Downloads List with DataCard and Pagination */}
      {!loading && downloads.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No downloads found.
        </div>
      ) : (
        <div className="space-y-4 mb-4">
          <Pagination
            items={downloads}
            itemsPerPage={6}
            className="space-y-4"
            gridClassName="space-y-2"
            renderItem={(download) => (
              <DataCard
                key={download.id}
                id={download.id}
                title={download.title}
                data={[
                  {
                    label: "Description",
                    value: download.description,
                  },
                  {
                    label: "Category",
                    value: download.category,
                  },
                  {
                    label: "Grades",
                    value: download.grades.join(", "),
                  },
                  {
                    label: "Upload Date",
                    value: download.uploadDate,
                  },
                ]}
                primaryButtonText="Download"
                onPrimaryButtonClick={handleDownloadClick}
                primaryButtonVariant="outline"
                primaryButtonSize="sm"
                secondaryButtonText={
                  deletingId === download.id ? "Deleting..." : "Delete"
                }
                onSecondaryButtonClick={handleDeleteDownload}
                secondaryButtonVariant="red"
                secondaryButtonSize="sm"
                secondaryButtonClassName={
                  deletingId === download.id
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
                cardClassName="p-4"
                dataClassName="grid grid-cols-2 md:grid-cols-4 gap-3"
              />
            )}
            paginationControlsClassName="flex justify-center items-center gap-2 mt-6"
            activePageButtonClassName="bg-[#6B21A8] text-white"
            pageButtonClassName="bg-white text-[#6B21A8] border border-[#6B21A8] hover:bg-gray-50"
          />
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={showDeleteModal}
        title="Delete Download"
        description="Are you sure you want to delete this download? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
