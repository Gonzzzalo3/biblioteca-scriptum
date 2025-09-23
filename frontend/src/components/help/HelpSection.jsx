// src/components/help/HelpSection.jsx
import { useState } from "react";

export default function HelpSection({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-md shadow-sm mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-semibold text-gray-800 flex justify-between items-center"
      >
        <span>{title}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="px-4 py-3 text-gray-700 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}