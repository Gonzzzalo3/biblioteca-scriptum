// src/layouts/AuthLayout

import AuthImageRotator from "../components/auth/AuthImageRotator";
import LogoAuth from "../components/auth/LogoAuth";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <AuthImageRotator />

      <div className="w-1/2 bg-[#fff7e2] relative flex justify-center px-8">
        <div className="absolute top-6">
          <LogoAuth />
        </div>

        <div className="w-full max-w-md flex flex-col gap-4 pt-[200px]">
          {children}
        </div>
      </div>
    </div>
  );
}
