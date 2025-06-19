import React from "react";
import { Button } from "./Button";

interface ConfirmationModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full min-w-[320px]">
        <h2 className="text-lg font-bold text-[#6B21A8] mb-1">{title}</h2>
        <p className="text-gray-700 mb-4 text-sm">{description}</p>
        <div className="flex flex-row justify-end gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={onCancel} type="button">
            {cancelText}
          </Button>
          <Button variant="red" size="sm" onClick={onConfirm} type="button">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
