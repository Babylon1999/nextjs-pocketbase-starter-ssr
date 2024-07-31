"use server";

import AccountPageSideBar from "@/components/accountPageSideBar";
import PassWordUpdateForm from "@/components/passwordUpdateForm";
import { generateToken } from "@/pb/pbCsrfToken";

export default async function SecurityPage() {
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
                  <h1 className="text-2xl font-bold">Security Settings</h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    Update your Security settings.
                  </p>
                </div>
                <PassWordUpdateForm csrfToken={token} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
