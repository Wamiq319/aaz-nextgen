"use client";

import { X, Mail, Phone, MapPin } from "lucide-react";
import { useEffect } from "react";

interface ComingSoonPopupProps {
  onClose: () => void;
}

export const ComingSoonPopup = ({ onClose }: ComingSoonPopupProps) => {
  // Prevent background scrolling when popup is visible
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

      {/* Popup Container */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg px-4 z-[10000]">
        <div className="relative bg-gradient-to-br from-[#6B21A8] via-[#9333EA] to-[#D63384] text-white p-8 rounded-2xl shadow-2xl animate-zoomIn">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          <div className="space-y-6">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <p className="text-lg leading-relaxed text-center">
                Registration: Coming Soon
              </p>
            </div>

            {/* Minimal contact info at bottom */}
            <div className="pt-2 border-t border-white/20">
              <div className="flex flex-col gap-2 text-sm text-white/80">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>aaznextgen111@gmail.com</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+92 312 0854931</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-center">
                    Gulistan Colony, Rawalpindi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
