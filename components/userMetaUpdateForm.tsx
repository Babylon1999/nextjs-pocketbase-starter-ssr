"use client";

import { UpdateUserButton } from "./submitButtons";
import { CardHeader, Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { updateUserMeta } from "@/pb/pbAccount";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function UserMetaUpdateForm({
  user,
  csrfToken,
}: {
  user: any;
  csrfToken: string;
}) {
  const [name, setName] = useState(user);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    const res = await updateUserMeta(formData);
    setIsLoading(false);
    if (res.success) {
      toast.success("Profile Updated");
    } else {
      toast.error(res.error);
    }
  };
  return (
    <Card>
      <CardHeader>
        <h1>Profile</h1>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              required
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input required type="hidden" name="csrf" value={csrfToken} />
          </div>

          <div className="space-y-2"></div>
        </CardContent>

        <CardFooter>
          <UpdateUserButton isLoading={isLoading} />
        </CardFooter>
      </form>
    </Card>
  );
}
