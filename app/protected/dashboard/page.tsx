"use server";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { getTheUserFromCookie } from "@/pb/pbFunctions";

export default async function Dashboard() {
  const user = await getTheUserFromCookie();

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="rounded-t-md  py-4 text-center text-xl font-bold">
          User Data
        </CardHeader>
        <CardContent className=" rounded-b-md p-6">
          <div className="max-h-60 overflow-auto">
            <code>
              <ul className="list-inside list-disc">
                {!user?.error ? (
                  Object.keys(user).map((key) => (
                    <li key={key}>
                      <span className="font-semibold">{key}:</span>{" "}
                      {user[key].toString()}
                    </li>
                  ))
                ) : (
                  <li>No user data found</li>
                )}
              </ul>
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
