import AuthImageRotator from '../components/auth/AuthImageRotator';

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AuthImageRotator />
      <div className="w-1/2 flex items-center justify-center bg-white px-8">
        {children}
      </div>
    </div>
  );
}