"use client";

import { useEffect } from "react";
import { X, Download, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./Button"; // adjust path as needed

interface NoorQuestPopupProps {
  onClose: () => void;
}

export const NoorQuestPopup = ({ onClose }: NoorQuestPopupProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed top-1/2 left-1/2 w-full max-w-2xl px-4 transform -translate-x-1/2 -translate-y-1/2 z-[10000]">
        <div className="relative bg-gradient-to-br from-[#6B21A8] via-[#9333EA] to-[#D63384] text-white p-8 rounded-2xl shadow-2xl animate-zoomIn">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="space-y-5 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              📖 NoorQuest Qur’an Quiz – Registration Now Open!
            </h2>

            <p className="text-white/90">
              Join our exciting Qur’an knowledge competition open to students
              across Pakistan.
            </p>

            <div className="bg-white/10 p-4 rounded-lg text-sm md:text-base space-y-2 border border-white/10">
              <p>
                <strong>📅 Registration Deadline:</strong> August 10, 2025
              </p>
              <p>
                <strong>📝 Test Date:</strong> August 25, 2025
              </p>
              <p>
                <strong>📢 Result Announcement:</strong> September 5, 2025
              </p>
              <p>
                <strong>🏆 Prize Distribution:</strong> September 10, 2025
                <ul className="text-sm text-white/90 space-y-1 text-left list-disc list-inside">
                  <li>
                    🎓 Top 3 winners in each level will receive medals and
                    shields
                  </li>
                  <li>💰 Cash prizes for top performers</li>
                  <li>📚 Exclusive certificates for all participants</li>
                  <li>
                    🏅 Special awards for schools with highest participation
                  </li>
                </ul>
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="/pdfs/student-registration.pdf" download>
                <Button variant="primary" icon={<Download />}>
                  Download Student Form
                </Button>
              </a>
              <a href="/pdfs/school-registration.pdf" download>
                <Button variant="primary" icon={<Download />}>
                  Download School Form
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
