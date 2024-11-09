"use client";

import { ProblemStatement } from "./ProblemStatement";
import { ProblemSubmitBar } from "./ProblemSubmitBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useEffect, useState } from "react";

export default function ProblemPageClient({ problem }: { problem: any }) {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Handle screen resize to adjust panel sizes
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    // Set initial window width
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <PanelGroup direction={isMobile ? "vertical" : "horizontal"}>
      <Panel defaultSize={isMobile ? 50 : 25}>
        <div>
          <ProblemStatement description={problem.description} />
        </div>
      </Panel>
      <PanelResizeHandle className="w-4 bg-gray-600" />
      <Panel defaultSize={isMobile ? 50 : 25}>
        <div>
          <ProblemSubmitBar problem={problem} />
        </div>
      </Panel>
    </PanelGroup>
  );
}
