"use client";

import RoadmapLanding from "./RoadmapLanding";

export function Roadmap({ problems }: { problems: { id: number; title: string; difficulty: string }[] }) {
  return (
    <div className="flex flex-col items-center px-4 py-6">
      <h1 className="text-3xl md:text-4xl font-semibold text-center">DSA Roadmap</h1>
      <p className="text-sm md:text-base text-gray-400 text-center max-w-3xl mt-2">
        Welcome to the ultimate DSA roadmap. Whether starting out or enhancing skills, this guide covers concepts,
        key topics, and learning paths for coding success.
      </p>
      <div className="w-full mt-6">
        <RoadmapLanding />
      </div>
    </div>
  );
}
