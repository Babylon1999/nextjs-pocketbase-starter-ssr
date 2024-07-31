"use server";

import LoginForm from "@/components/loginForm";
import Script from "next/script";
import { SiPocketbase } from "react-icons/si";

export default async function LoginComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg  p-6 shadow-lg">
        <div className="text-center">
          <div className="flex justify-center p-6">
            <SiPocketbase className="size-12" />
          </div>
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="">Enter your email below to login to your account</p>
        </div>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async={true}
          defer={true}
        />
        <LoginForm />

        <div className="text-center text-sm ">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="underline ">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
