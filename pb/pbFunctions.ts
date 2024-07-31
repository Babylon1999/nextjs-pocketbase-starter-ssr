import "server-only";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const ApiKey = process.env.SECURE_API_KEY as string;

type UpdateUserDataResponse = {
  success: boolean;
  status?: number;
  error?: string;
  response?: any;
};

export async function updateUserData(
  data: Object
): Promise<UpdateUserDataResponse> {
  const userobject = await getTheUserFromCookie();
  const id = await userobject.id;
  const token = cookies().get("pb-cookie");

  if (!token) {
    return {
      success: false,
      error: "There's no user cookie.",
    };
  }
  try {
    const decodedToken = jwt.decode(token.value) as JwtPayload;
    if (!decodedToken) throw new Error("Failed to decode token");

    const response = await fetch(
      `${process.env.PB_URL}/api/collections/users/records/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-POCKETBASE-API-KEY": ApiKey,
          Authorization: token.value,
        },
        body: JSON.stringify(data),
      }
    );
    return {
      success: true,
      response: response,
      status: response.status,
    };
  } catch (error: any) {
    // This is useless really, just to help you debug.
    return {
      success: false,
      error: error,
    };
  }
}

export async function IsLoggedIn() {
  "use server";
  const user = await getTheUserFromCookie();
  if (user !== null) {
    return true;
  } else {
    return false;
  }
}

export async function getTheUserFromCookie() {
  "use server";
  const token = cookies().get("pb-cookie");
  if (!token) return null;

  const decodedToken = jwt.decode(token.value) as JwtPayload;
  if (!decodedToken) throw new Error("Failed to decode token");

  if (!decodedToken || !decodedToken.id) {
    return { error: "Error Decoding" };
  }
  try {
    const response = await fetch(
      `${process.env.PB_URL}/api/collections/users/records/${decodedToken.id}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "X-POCKETBASE-API-KEY": ApiKey,
          Authorization: token.value,
        }),
        // This is nessary because of the CSRF token.
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Error getting the user");
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error getting the user:", error.message);
    return { error: error.message };
  }
}
