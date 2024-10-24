"use client";

import RoadmapLanding from "./RoadmapLanding";

export function Roadmap({ problems }: { problems: { id: number; title: string; difficulty: string }[] }) {
  return (
    <div className="w-fit flex flex-col items-start p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl m-2  font-semibold">DSA Roadmap</h1>
      <p className="text-sm md:text-base text-gray-400 mt-4  w-[1000px]">
        Welcome to the ultimate DSA roadmap. Whether starting out or enhancing skills, this guide covers concepts,
        key topics, and learning paths for coding success.
      </p>
      <RoadmapLanding />
      
    </div>
  );
}