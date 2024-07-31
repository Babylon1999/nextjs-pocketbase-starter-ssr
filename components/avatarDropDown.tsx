"use server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/pb/pbLogout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function AvatarDropDown({ SrcLink }: any) {
  return (
    <div className="hover:cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src={SrcLink}
            alt="Avatar"
            width={50}
            height={50}
            className="border-spacing-0 rounded-full border-2 border-solid border-blue-600 shadow-2xl"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          {" "}
          {/* Adjusted width */}
          <Link href="/protected/account">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
          </Link>
          <DropdownMenuSeparator />
          <form action={logout} className="w-full">
            <button
              type="submit"
              className="w-full text-left hover:cursor-pointer"
            >
              {" "}
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
