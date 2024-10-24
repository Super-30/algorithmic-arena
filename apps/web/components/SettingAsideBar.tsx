// currently its hardcoded but will get dynamic as soon as get api.

"use client";

import { Button } from "@repo/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SettingAsideBar = () => {
  const pathname = usePathname();
  const links = [
    {
      name: "Manage Profile",
      href: "/user/profile-settings",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-sm mx-auto p-4 w-72 ">
      <div className="flex items-center mb-4">
        {/* Profile Image */}
        <img
          src="" // Add profile image URL here
          alt="Profile"
          className="h-24 w-24 rounded-md border border-gray-300 dark:border-gray-600"
        />

        {/* Name */}
        <div className="ml-4 mb-10">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            User Name
          </h2>
          <h2 className=" text-gray-800 dark:text-white">
            Rank #200
          </h2>
        </div>
      </div>

    

      {/* Button Section */}
      <Button
        onClick={() => {
          signOut();
        }}
        className="text-red-500 w-full bg-background hover:bg-red-500 hover:text-white duration-300 text-left flex gap-1 justify-start items-center mb-4"
      >
        <LogOut size={16} />
        Logout
      </Button>


        <h2>Most Used Language</h2>
      {/* Additional Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="bg-green-100 text-gray-300 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">
          Javascript
        </span>
        <span className="bg-green-100 text-gray-300 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">
          C++
        </span>
        {/* Add more tags if needed */}
      </div>
    </div>
  );
};

export default SettingAsideBar;