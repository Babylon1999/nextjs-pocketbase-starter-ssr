"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaLock } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";

export default function AccountPageSideBar() {
  const pathname = usePathname();

  const isAccountPage = pathname === "/protected/account";
  const isSecurityPage = pathname === "/protected/account/security";

  return (
    <div className="grid w-full lg:min-h-screen">
      {" "}
      <div className="border-r lg:block ">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
              <MdOutlineSettings className="size-6" />
              <span className="">My Account</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <a
                href="/protected/account"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isAccountPage
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                }`}
              >
                <FaUserAstronaut className="size-4" />
                Profile
              </a>
              <a
                href="/protected/account/security"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isSecurityPage
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                }`}
              >
                <FaLock className="size-4" />
                Security
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
