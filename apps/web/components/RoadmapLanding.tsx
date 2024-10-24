import { useState } from "react";
import ReactFlowComponent from "./ReactFlowComponent";
import {
  quickSprintNodes,
  quickSprintEdges,
  balanceRouteNodes,
  balanceRouteEdges,
  inDepthJourneyNodes,
  inDepthJourneyEdges
} from "./diagramData";
import ProgressBarWithStatus from "./Progressbar";
import { FaRocket, FaBalanceScale, FaArrowsAlt } from "react-icons/fa";
import { FileTextIcon } from "lucide-react";

type DiagramData = {
  nodes: any[];
  edges: any[];
};

export default function RoadmapLanding() {
  const [activeTab, setActiveTab] = useState("quick");
  
  // Store diagram data configurations in state
  const [diagramConfigs] = useState<Record<string, DiagramData>>({
    quick: { nodes: quickSprintNodes, edges: quickSprintEdges },
    balance: { nodes: balanceRouteNodes, edges: balanceRouteEdges },
    "in-depth": { nodes: inDepthJourneyNodes, edges: inDepthJourneyEdges }
  });

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Get current diagram data directly from state
  const { nodes, edges } = diagramConfigs[activeTab] || { nodes: [], edges: [] };

  return (
    <div className="mt-6 mx-4 my-4 max-w-[75%] ml-60">
      <div className="flex flex-col gap-2 sm:flex-row md:gap-12 lg:gap-4 ml-44 justify-center h-auto sm:h-[80px] mr-36 ">
        <button
          className={`flex items-center justify-between p-4 sm:px-4 sm:py-6 font-semibold rounded-lg border-2 ${
            activeTab === "quick" 
              ? "bg-white dark:bg-[#0F172A]" 
              : "bg-white dark:bg-[#0F172A] dark:text-white text-gray-800"
          } border-[#4E7AFF] w-[323px]`}
          onClick={() => handleTabClick("quick")}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-200 dark:bg-[#3259E8] rounded mr-2 sm:mr-4">
            <FaRocket className="text-xl sm:text-2xl" />
          </div>
          <div className="flex flex-col items-start w-72">
            <span className="text-left text-base sm:text-lg mb-4">Quick Sprint</span>
            <div className="flex text-xs sm:text-sm text-[#94A3B8] gap-1">
              <FileTextIcon />
              <span>0/50 questions</span>
            </div>
          </div>
        </button>

        <button
          className={`flex items-center justify-between p-4 sm:px-4 sm:py-6 font-semibold rounded-lg border-2 ${
            activeTab === "balance" 
              ? "bg-white dark:bg-[#0F172A]" 
              : "bg-white dark:bg-[#0F172A] dark:text-white text-gray-800"
          } border-[#E2E8F0] dark:border-[#1E293B] w-[323px]`}
          onClick={() => handleTabClick("balance")}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded mr-2 sm:mr-4">
            <FaBalanceScale className="text-xl sm:text-2xl" />
          </div>
          <div className="flex flex-col items-start w-72">
            <span className="text-left text-base sm:text-lg mb-4">Balance Route</span>
            <div className="flex text-xs sm:text-sm text-[#94A3B8] gap-1">
              <FileTextIcon />
              <span>0/150 questions</span>
            </div>
          </div>
        </button>

        <button
          className={`flex items-center justify-between p-4 sm:px-4 sm:py-6 font-semibold rounded-lg border-2 ${
            activeTab === "in-depth" 
              ? "bg-white dark:bg-[#0F172A]" 
              : "bg-white dark:bg-[#0F172A] dark:text-white text-gray-800"
          } border-[#E2E8F0] dark:border-[#1E293B] w-[323px]`}
          onClick={() => handleTabClick("in-depth")}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded mr-2 sm:mr-4">
            <FaArrowsAlt className="text-xl sm:text-2xl" />
          </div>
          <div className="flex flex-col items-start w-72">
            <span className="text-left text-base sm:text-lg mb-4">In-Depth Journey</span>
            <div className="flex text-xs sm:text-sm text-[#94A3B8] gap-1">
              <FileTextIcon />
              <span>0/200 questions</span>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-6 w-full ml-4">
        <ProgressBarWithStatus />
      </div>

      <div className="mt-6 ml-4 sm:ml-12">
        <ReactFlowComponent nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}