// currently its hardcoded but will get dynamic as soon as get api.

"use client";

import { Button } from "@repo/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
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
    <div className="bg-[#F1F5F9] dark:bg-[#0F172A] rounded-2xl shadow-md overflow-hidden max-w-sm mx-auto p-4 w-[fit] h-[fit]">
      <div className="flex items-center mb-4">
        {/* Profile Image */}
        <img
          src="https://s3-alpha-sig.figma.com/img/8fe0/d076/eb8c43e77c4dc1a615c183595a8823b1?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=flAb2hFM9xXCaEnA3PYwuGYr5WkKhA3CBAK5tkSP6z1lRl1IHw5hbCjvDIWl5tp6CSMgsU4qtlq7ru7oM0qwqu4UZAl1Ke8RYEUy~d25hNlIe53z8vcq1l~EaKhrLKL7FvpxVPKW-BnShu6GbKy0e-GFP~LBbJIrMNjug5RGohwheDf9ZyT~zfB0Z6X7rynnwKyJG6MhE8JU4JlaESRbC3r8cZB1Zgv6dGZxSH8gSEyix0ltAPESKP47x9vjbDti6zSnTT3J~uaVZealkNwack-rpQe7EwoJz-sW3fT1YAYoqTHwbUmMjMeL8xHjvslLFCeJhRBMQjH3BIeXAb18UQ__" 
          alt="Profile"
          className="h-[100px] w-[100px] rounded-md border border-gray-300 dark:border-gray-600"
        />

        {/* Name */}
        <div className="ml-4 mb-4 mt-2">
          <h2 className="text-lg text-gray-800 dark:text-white">
            User Name
          </h2>
          <h2 className="text-[#4E7AFF] text-lg whitespace-normal">@username</h2>
          <h2 className="text-lg text-gray-800 dark:text-white">
            Rank #200
          </h2>
        </div>
      </div>

    

      {/* Button Section */}
      <Button
        onClick={() => {
          signOut();
        }}
        className="border-[1px] border-gray-600 px-4 py-2 rounded-sm bg-[#4E7AFF] text-white w-[fit] h-[fit]"
      >
        <LogOut size={16} />
        Logout
      </Button>


        <h2 className="mt-3 text-[#020817] dark:text-[#F8FAFC]">Most Used Language</h2>
      {/* Additional Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="bg-[#64748B1A] text-[#64748B] text-sm px-2.5 py-0.5 rounded-lg dark:bg-[#64748B1A] dark:text-gray-300">
          Javascript
        </span>
        <span className="bg-[#64748B1A] text-[#64748B] text-sm px-2.5 py-0.5 rounded-lg dark:bg-[#64748B1A] dark:text-gray-300">
          CPP
        </span>
        <span className="bg-[#64748B1A] text-[#64748B] text-sm px-2.5 py-0.5 rounded-lg dark:bg-[#64748B1A] dark:text-gray-300">
          python
        </span>
        <span className="bg-[#64748B1A] text-[#64748B] text-sm px-2.5 py-0.5 rounded-lg dark:bg-[#64748B1A] dark:text-gray-300">
          rust
        </span>
        {/* Add more tags if needed */}
      </div>
    </div>
  );
};

export default SettingAsideBar;