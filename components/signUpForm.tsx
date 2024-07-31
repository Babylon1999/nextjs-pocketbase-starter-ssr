"use client";

import { SignUpButton } from "./submitButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Signup } from "@/pb/pbSingup";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  // Function to handle CAPTCHA callback

  useEffect(() => {
    const handleCaptchaSuccess = () => {
      setCanSubmit(true);
    };
    // Adding CAPTCHA callback to the window object
    (window as any).handleCaptchaSuccess = handleCaptchaSuccess;

    // Cleanup function
    return () => {
      delete (window as any).handleCaptchaSuccess;
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    const res = await Signup(formData);
    setIsLoading(false);
    if (res.error) {
      (window as any)?.turnstile.reset();
      toast.error(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium ">
          Name
        </Label>
        <Input
          name="name"
          id="name"
          type="name"
          placeholder="John Doe"
          className="mt-1 block w-full rounded-md border px-3  py-2 shadow-sm focus:outline-none  sm:text-sm "
        />
      </div>
      <div>
        <Label htmlFor="email" className="block text-sm font-medium ">
          Email
        </Label>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="m@example.com"
          className="mt-1 block w-full rounded-md border px-3  py-2 shadow-sm focus:outline-none  sm:text-sm "
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="block text-sm font-medium ">
            Password
          </Label>
        </div>
        <Input
          name="password"
          id="password"
          type="password"
          className="mt-1 block w-full border px-3 py-2"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="block text-sm font-medium ">
            Confirm Password
          </Label>
        </div>
        <Input
          name="confirm-password"
          id="confirm-password"
          type="password"
          className="mt-1 block w-full border px-3 py-2"
        />
      </div>
      <div
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
        data-callback="handleCaptchaSuccess"
      />
      <div>
        <SignUpButton isLoading={isLoading} canSubmit={canSubmit} />
      </div>
    </form>
  );
}
