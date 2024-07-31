"use client";

import { UpdateUserButton } from "./submitButtons";
import { CardHeader, Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { updatePassword } from "@/pb/pbAccount";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function PassWordUpdateForm({
  csrfToken,
}: {
  csrfToken: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  // Function to handle CAPTCHA callback

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    const res = await updatePassword(formData);
    if (res?.error) {
      setIsLoading(false);
      toast.error(res.error);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <h1>Update Password</h1>
          <p>
            Please note you will be logged out once your password is updated.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              required={true}
              name="current-password"
              id="current-password"
              placeholder="Enter your current password"
              type="password"
            />
          </div>
          <div className="space-y-2">
            <Input
              required={true}
              name="new-password"
              id="new-password"
              placeholder="Enter your new password"
              type="password"
            />
          </div>
          <div className="space-y-2">
            <Input
              required={true}
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm your new password"
              type="password"
            />
            <Input
              required={true}
              name="csrf"
              type="hidden"
              value={csrfToken}
            />
          </div>
          <UpdateUserButton isLoading={isLoading} />
        </CardContent>
      </form>
    </Card>
  );
}
