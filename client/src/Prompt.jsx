import React from "react";

const Prompt = ({
  message = "Do you want to proceed?",
  onConfirm,
  onCancel,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 esamanru-light">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center space-y-4">
        <p className="text-lg font-semibold text-gray-800">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
