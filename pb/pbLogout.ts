import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function logout() {
  "use server";
  const session = cookies().get("pb-cookie");
  if (!session) {
    // There's no cookie in the first place, just return
    return;
  }
  // Just remove the cookie
  cookies().delete("pb-cookie");

  redirect("/login", RedirectType.replace);
}
