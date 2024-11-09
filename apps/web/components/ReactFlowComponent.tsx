import React, { useEffect, useRef, useState } from 'react';
import { ReactFlow } from '@xyflow/react';
import SlidingTable from './SlidingTable';
import '@xyflow/react/dist/style.css';

interface FlowProps {
  nodes: any[];
  edges?: any[]; 
  onNodeClick?: (node: any) => void;
}

export default function ReactFlowComponent({ nodes, edges = [] }: FlowProps) { 
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        container.scrollBy(0, event.deltaY);
      };

      container.addEventListener('wheel', handleWheel);
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
    setIsTableVisible(true);
  };

  const closeSlidingTable = () => {
    setIsTableVisible(false);
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
        minWidth: '320px', 
       
      
        
      }}
    >
      <div style={{ height: '340vh', width: '120%', minWidth: '250px' }}>
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
            minWidth: '320px'
          }}
          minZoom={1.2}
          maxZoom={1.2}
          draggable={false}
          className="bg-white dark:bg-gray-900"
          onNodeClick={(event, node) => handleNodeClick(node)}
        />

        <SlidingTable
          isVisible={isTableVisible}
          nodeData={selectedNode}
          onClose={closeSlidingTable}
        />
      </div>
    </div>
  );
}
