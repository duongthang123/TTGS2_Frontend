"use client";
import React from "react";

function ConfirmPrompt({ message, onConfirm, onCancel }) {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-40 z-50 transition"
      onClick={onCancel}  
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-96 transform transition-transform duration-300 ease-out animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Xác nhận</h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPrompt;
