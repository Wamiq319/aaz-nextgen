"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { FileInput } from "@/components/ui/FileInput";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";

const categoryOptions = [
  { value: "Past Papers", label: "Past Papers" },
  { value: "Guide Books", label: "Guide Books" },
  { value: "Forms", label: "Forms" },
  { value: "Reference Books", label: "Reference Books" },
  { value: "Brochures", label: "Brochures" },
  { value: "Books", label: "Books" },
];

// Dummy downloads for UI
const dummyDownloads = [
  {
    id: "1",
    title: "2023 Past Papers Collection",
    description: "Complete set of past papers from 2023 exams",
    category: "Past Papers",
    downloadUrl: "/assets/pdf/past-papers-2023.pdf",
    uploadDate: "2024-01-15",
    grades: ["10", "11", "12"],
  },
];

type DownloadType = {
  id: string;
  title: string;
  description: string;
  category: string;
  downloadUrl: string;
  uploadDate: string;
  grades: string[];
};

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadType[]>(dummyDownloads);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: categoryOptions[0].value,
    grades: [] as string[],
    file: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  // TODO: Replace with real fetch logic
  // useEffect(() => { ... }, []);

  const handleFileChange = (files: FileList | null) => {
    setFormData({ ...formData, file: files && files[0] ? files[0] : null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError("");
    // TODO: Implement real upload logic
    setTimeout(() => {
      setDownloads([
        ...downloads,
        {
          id: (downloads.length + 1).toString(),
          title: formData.title,
          description: formData.description,
          category: formData.category,
          downloadUrl: "/assets/pdf/dummy.pdf",
          uploadDate: new Date().toISOString().slice(0, 10),
          grades: formData.grades,
        },
      ]);
      setShowAddForm(false);
      setFormData({
        title: "",
        description: "",
        category: categoryOptions[0].value,
        grades: [],
        file: null,
      });
      setCreating(false);
    }, 1200);
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
      {loading && (
        <div className="text-center py-8">
          <Loader text="Loading downloads..." />
        </div>
      )}
      {error && <div className="text-center text-red-500 py-2">{error}</div>}
      {showAddForm && (
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto">
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
                  setFormData({ ...formData, category: e.target.value })
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
                {creating ? <Loader text="Adding..." /> : "Add Download"}
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Downloads Grid */}
      {!loading && !error && downloads.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No downloads found.
        </div>
      )}
      {!loading && !error && downloads.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {downloads.map((download) => (
            <div
              key={download.id}
              className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2"
            >
              <div className="font-bold text-lg text-[#6B21A8]">
                {download.title}
              </div>
              <div className="text-gray-600 text-sm mb-1">
                {download.description}
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-purple-700 mb-2">
                <span className="bg-purple-100 rounded px-2 py-1">
                  {download.category}
                </span>
                <span className="bg-purple-100 rounded px-2 py-1">
                  Grades: {download.grades.join(", ")}
                </span>
                <span className="bg-purple-100 rounded px-2 py-1">
                  Uploaded: {download.uploadDate}
                </span>
              </div>
              <a
                href={download.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Download PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
