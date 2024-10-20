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
import { FaRocket, FaBalanceScale, FaArrowsAlt } from "react-icons/fa"; // Import icons

export default function RoadmapLanding() {
  const [activeTab, setActiveTab] = useState("quick");

  // const handleTabClick = (tab: string) => {
  //   setActiveTab(tab);
  // };

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
    <div className="mt-8 px-2 md:px-6 lg:px-20">
      <div className="flex flex-col sm:flex-row gap-4 md:gap-12 lg:gap-64 justify-center">
        <button
          className={`flex items-center px-8 py-4 sm:px-12 md:px-16 lg:px-20 py-6 font-semibold rounded border-2 ${
            activeTab === "quick" ? "bg-gray-600 text-white" : "bg-white dark:bg-[#0F172A] dark:text-white text-gray-800"
          } border-[#1E293B]`}
          onClick={() => handleTabClick("quick")}
        >
          <FaRocket className="mr-2" /> Quick Sprint
        </button>

        <button
          className={`flex items-center px-8 py-4 sm:px-12 md:px-16 lg:px-20 py-6 font-semibold rounded border-2 ${
            activeTab === "balance" ? "bg-gray-600 text-white" : "bg-white dark:bg-[#0F172A] dark:text-white text-gray-800"
          } border-[#1E293B]`}
          onClick={() => handleTabClick("balance")}
        >
          <FaBalanceScale className="mr-2" /> Balance Route
        </button>

        <button
          className={`flex items-center px-8 py-4 sm:px-12 md:px-16 lg:px-20 py-6 font-semibold rounded border-2 ${
            activeTab === "in-depth" ? "bg-gray-600 text-white" : "bg-white dark:bg-[#0F172A] dark:text-white text-gray-800"
          } border-[#1E293B]`}
          onClick={() => handleTabClick("in-depth")}
        >
          <FaArrowsAlt className="mr-2" /> In-Depth Journey
        </button>
      </div>

      <div className="mt-6">
        <ProgressBarWithStatus />
      </div>
      
      <div className="mt-6 ml-48">
        <ReactFlowComponent nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}
