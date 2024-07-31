"use server";

import { updateUserData } from "./pbFunctions";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

var Tokens = require("csrf");
const ApiKey = process.env.SECURE_API_KEY as string;

export async function logout() {
  "use server";
  const session = cookies().get("pb-cookie");
  if (!session) {
    // There's no cookie in the first place, just return
    return;
  }
  // Just remove the cookie
  cookies().delete("pb-cookie");
  redirect("/login");
}
