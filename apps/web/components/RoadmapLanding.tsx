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

export default function RoadmapLanding() {
  const [activeTab, setActiveTab] = useState("quick");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const getDiagramData = () => {
    switch (activeTab) {
      case "quick":
        return { nodes: quickSprintNodes, edges: quickSprintEdges };
      case "balance":
        return { nodes: balanceRouteNodes, edges: balanceRouteEdges };
      case "in-depth":
        return { nodes: inDepthJourneyNodes, edges: inDepthJourneyEdges };
      default:
        return { nodes: [], edges: [] };
    }
  };

  const { nodes, edges } = getDiagramData();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 justify-center w-full">
        
        <button
          className={`flex items-center justify-between p-4 sm:p-6 font-semibold rounded-lg border-2 w-full sm:max-w-[320px] ${
            activeTab === "quick" ? "bg-white dark:bg-[#0F172A]" : "bg-gray-50 dark:bg-[#0F172A] text-gray-800 dark:text-white"
          } border-[#4E7AFF] dark:border-[#1E293B] h-[80px]`}
          onClick={() => handleTabClick("quick")}
        >
          <div className="w-[56px] h-[56px] sm:w-[56px] sm:h-[56px] flex items-center justify-center bg-gray-200 dark:bg-[#3259E8] rounded mr-4">
            <FaRocket className="text-xl sm:text-2xl" />
          </div>
          <div className="flex flex-col items-start w-full">
            <span className="text-md mb-2">Quick Sprint</span>
            <div className="flex text-sm text-gray-500 gap-1 dark:text-gray-400">
              <FileTextIcon />
              <span>0/50 questions</span>
            </div>
          </div>
        </button>

        <button
          className={`flex items-center justify-between p-4 sm:p-6 font-semibold rounded-lg border-2 w-full sm:max-w-[320px] ${
            activeTab === "balance" ? "bg-white dark:bg-[#0F172A]" : "bg-gray-50 dark:bg-[#0F172A] text-gray-800 dark:text-white"
          } border-[#E2E8F0] dark:border-[#1E293B] h-[80px]`}
          onClick={() => handleTabClick("balance")}
        >
          <div className="w-[56px] h-[56px] sm:w-[56px] sm:h-[56px] flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded mr-4">
            <FaBalanceScale className="text-xl sm:text-2xl" />
          </div>
          <div className="flex flex-col items-start w-full">
            <span className="text-md mb-2">Balance Route</span>
            <div className="flex text-sm text-gray-500 gap-1 dark:text-gray-400">
              <FileTextIcon />
              <span>0/150 questions</span>
            </div>
          </div>
        </button>

        <button
          className={`flex items-center justify-between p-4 sm:p-6 font-semibold rounded-lg border-2 w-full sm:max-w-[320px] ${
            activeTab === "in-depth" ? "bg-white dark:bg-[#0F172A]" : "bg-gray-50 dark:bg-[#0F172A] text-gray-800 dark:text-white"
          } border-[#E2E8F0] dark:border-[#1E293B] h-[80px]`}
          onClick={() => handleTabClick("in-depth")}
        >
          <div className="w-[56px] h-[56px] sm:w-[56px] sm:h-[56px] flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded mr-4">
            <FaArrowsAlt className="text-xl sm:text-2xl" />
          </div>
          <div className="flex flex-col items-start w-full">
            <span className="text-md mb-2">In-Depth Journey</span>
            <div className="flex text-sm text-gray-500 gap-1 dark:text-gray-400">
              <FileTextIcon />
              <span>0/200 questions</span>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-8">
        <ProgressBarWithStatus />
      </div>

      <div className="mt-8 ">
        <ReactFlowComponent nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}
