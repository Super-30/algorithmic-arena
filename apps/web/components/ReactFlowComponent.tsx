import React, { useEffect, useRef, useState } from 'react';
import { ReactFlow } from '@xyflow/react';
import SlidingTable from './SlidingTable'; // Import the SlidingTable component
import '@xyflow/react/dist/style.css';

interface FlowProps {
  nodes: any[];
  edges: any[];
  onNodeClick?: (node: any) => void; // Optional prop for node click handler
}

export default function ReactFlowComponent({ nodes, edges }: FlowProps) {
  const [selectedNode, setSelectedNode] = useState<any | null>(null); // State to store clicked node data
  const [isTableVisible, setIsTableVisible] = useState(false); // State to manage table visibility

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        container.scrollBy(0, event.deltaY); // Scroll vertically
      };

      container.addEventListener('wheel', handleWheel);
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  // Handle node click
  const handleNodeClick = (node: any) => {
    setSelectedNode(node); // Set the selected node data
    setIsTableVisible(true); // Show the sliding table
  };

  // Close the SlidingTable
  const closeSlidingTable = () => {
    setIsTableVisible(false); // Hide the sliding table
  };

  const nodeStyle = {
    backgroundColor: 'var(--tw-bg-opacity)',
    border: '2px solid #1E293B',
    borderRadius: '5px',
    padding: '10px',
    width: 'fit-content',
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'default',
      }}
    >
      <div style={{ height: '280vh', width: '100%' }}>
        <ReactFlow
          nodes={nodes.map(node => ({
            ...node,
            style: node.style || nodeStyle,
          }))}
          edges={edges.map(edge => ({
            ...edge,
            markerEnd: { type: 'arrow', color: '#4E7AFF', width: 12, height: 12 },
          }))}
          fitViewOptions={{ padding: 0.2 }}
          panOnDrag={false}
          style={{
            backgroundColor: 'var(--tw-bg-opacity)',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          minZoom={1.5}
          maxZoom={1.5}
          draggable={false}
          className="bg-white dark:bg-gray-900"
          onNodeClick={(event, node) => handleNodeClick(node)} // Handle node click event
        />

        {/* SlidingTable Component */}
        <SlidingTable
          isVisible={isTableVisible}
          nodeData={selectedNode} // Pass the clicked node data
          onClose={closeSlidingTable} // Handle closing of the table
        />
      </div>
    </div>
  );
}
