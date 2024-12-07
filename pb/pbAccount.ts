"use server";

import { solveToken } from "./pbCsrfToken";
import { updateUserData } from "./pbFunctions";
import { logout } from "./pbLogout";
import DOMPurify from "isomorphic-dompurify";

export async function updateUserMeta(formData: FormData) {
  "use server";

  const name = DOMPurify.sanitize(formData.get("name") as string);
  const csrf = DOMPurify.sanitize(formData.get("csrf") as string);

  if ((await solveToken(csrf)) === false) {
    return {
      success: false,
      error: "Token is invalid, try refreshing the page and submitting again.",
    };
  }
  try {
    const update = await updateUserData({ name: name });
    if (update?.status === 200) {
      return {
        success: true,
      };
    } else {
      return {
        error: update.response?.statusText,
      };
    }
  } catch (error: any) {
    if (error.message === "Failed to Authenticate.") {
      return {
        error:
          "Something wrong with the server, please contact the admin for assistance.",
      };
    }
    return { error: error.message };
  }
}

export async function updatePassword(formData: FormData) {
  "use server";
  const currentPassword = DOMPurify.sanitize(
    formData.get("current-password") as string
  );
  const newPassword = DOMPurify.sanitize(
    formData.get("new-password") as string
  );
  const confirmPassword = DOMPurify.sanitize(
    formData.get("confirm-password") as string
  );
  const csrf = DOMPurify.sanitize(formData.get("csrf") as string);

  // Make sure the passwords match here before calling PB.
  if (newPassword !== confirmPassword) {
    return {
      success: false,
      error: "Passwords do not match.",
    };
  }
  if ((await solveToken(csrf)) === false) {
    return {
      success: false,
      error: "Token is invalid, try refreshing the page and submitting again.",
    };
  }

  try {
    const update = await updateUserData({
      password: newPassword,
      oldPassword: currentPassword,
      passwordConfirm: confirmPassword,
    });
    if (update.status === 200 && update.success === true) {
      // If the password is updated, log the user out, their token is no good anyway.
      return logout();
    } else {
      return {
        error:
          "Something went wrong, please make sure the password is bettween 8 and 72 characters.",
      };
    }
  } catch (error) {
    // Probably better to not show the error real message to the user.
    return { error: "Something went wrong!" };
  }
}
