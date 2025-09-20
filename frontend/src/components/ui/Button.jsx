// src/components/ui/Button.jsx

export default function Button({ children, full, variant = 'primary', ...props }) {
  const base = 'py-2 px-4 rounded-md transition font-semibold';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    green: 'bg-[#a3d9a5] text-gray-800 hover:bg-[#8ccf8f]',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${full ? 'w-full' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
}