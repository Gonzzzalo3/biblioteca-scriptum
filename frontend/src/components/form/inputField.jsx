// src/components/form/InputField.jsx

export default function InputField({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        {...props}
      />
    </div>
  );
}