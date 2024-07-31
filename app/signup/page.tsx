"use server";

import SignupForm from "@/components/signUpForm";
import Script from "next/script";
import { SiPocketbase } from "react-icons/si";

export default async function SignupComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg p-6 shadow-lg">
        <div className="text-center">
          <div className="flex justify-center p-6">
            <SiPocketbase className="size-12" />
          </div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="">Enter your information to create an account</p>
        </div>
        <SignupForm />
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async={true}
          defer={true}
        />
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
