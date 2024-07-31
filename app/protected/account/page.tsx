"use server";

import AccountPageSideBar from "@/components/accountPageSideBar";
import UserMetaUpdateForm from "@/components/userMetaUpdateForm";
import { generateToken } from "@/pb/pbCsrfToken";
import { getTheUserFromCookie } from "@/pb/pbFunctions";

export default async function AccountPage() {
  const user = await getTheUserFromCookie();
  const userName = user.name;
  const token = await generateToken();
  return (
    <div className="grid w-full lg:min-h-screen lg:grid-cols-[280px_1fr]">
      <AccountPageSideBar />
      <div className="flex flex-col">
        <main className="flex-1 overflow-y-auto">
          <section className="p-6 md:p-10">
            <div className="mx-auto max-w-3xl">
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold">Profile</h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    Update your profile settings.
                  </p>
                </div>
                <UserMetaUpdateForm user={userName} csrfToken={token} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
