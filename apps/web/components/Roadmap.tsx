"use client";

import Progressbar from "./Progressbar";
import RoadmapLanding from "./RoadmapLanding";

export function Roadmap({ problems }: { problems: { id: number; title: string; difficulty: string }[] }) {
  return (
    <div className="flex flex-col items-start p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-semibold mt-6">DSA Roadmap</h1>
      <p className="text-sm md:text-base text-gray-400">
        Welcome to the ultimate DSA roadmap. Whether starting out or enhancing skills, this guide covers concepts,
        key topics, and learning paths for coding success.
      </p>
      <RoadmapLanding />
    </div>
  );
}
