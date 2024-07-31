import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import React from "react";

export function LoginButton({
  isLoading,
  canSubmit,
}: {
  isLoading: boolean;
  canSubmit: boolean;
}) {
  if (isLoading === true) {
    return (
      <Button disabled>
        <ReloadIcon
          aria-label="Login Button"
          role="button"
          className="mr-2 size-4 animate-spin"
        />
        Please wait
      </Button>
    );
  } else {
    return canSubmit ? (
      <Button
        className="bg-foreground"
        aria-label="Login Button"
        role="button"
        type="submit"
      >
        Submit
      </Button>
    ) : (
      <Button
        disabled
        className="bg-foreground"
        aria-label="Login Button"
        role="button"
        type="submit"
      >
        Submit
      </Button>
    );
  }
}

export function SignUpButton({
  isLoading,
  canSubmit,
}: {
  isLoading: boolean;
  canSubmit: boolean;
}) {
  if (isLoading) {
    return (
      <Button disabled>
        <ReloadIcon
          aria-label="Sign Up Button"
          role="button"
          className="mr-2 size-4 animate-spin"
        />
        Please wait
      </Button>
    );
  } else {
    return canSubmit ? (
      <Button
        className="bg-foreground"
        aria-label="Sign Up Button"
        role="button"
        type="submit"
      >
        Submit
      </Button>
    ) : (
      <Button
        disabled
        className="bg-foreground"
        aria-label="Sign Up Button"
        role="button"
        type="submit"
      >
        Submit
      </Button>
    );
  }
}

export function UpdateUserButton({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <Button disabled>
        <ReloadIcon
          aria-label="Update User Button"
          role="button"
          className="mr-2 size-4 animate-spin"
        />
        Please wait
      </Button>
    );
  } else {
    return (
      <Button
        className="bg-foreground"
        aria-label="Update User Button"
        role="button"
        type="submit"
      >
        Update
      </Button>
    );
  }
}
