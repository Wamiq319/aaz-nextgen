"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Download as DownloadIcon, X, FileText } from "lucide-react";

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  documentUrl: string;
  documentTitle: string;
  onDownload?: (url: string, title: string) => void;
}

export const DocumentViewer = ({
  isOpen,
  onClose,
  documentUrl,
  documentTitle,
  onDownload,
}: DocumentViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[95vh] flex flex-col overflow-hidden">
        {/* Enhanced Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-[#6B21A8] to-[#8B5CF6] text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{documentTitle}</h3>
              <p className="text-sm text-white text-opacity-80">
                Document Viewer
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={onClose}
              variant="secondary"
              size="sm"
              icon={<X className="w-4 h-4" />}
            >
              Close
            </Button>
          </div>
        </div>

        {/* Enhanced Modal Content with iframe */}
        <div className="flex-1 p-6 bg-gray-50">
          <div className="w-full h-full bg-white rounded-lg shadow-inner overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B21A8] mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading document...</p>
                </div>
              </div>
            )}
            <iframe
              src={documentUrl}
              className="w-full h-full border-0"
              title={documentTitle}
              allowFullScreen
              onLoad={handleIframeLoad}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
