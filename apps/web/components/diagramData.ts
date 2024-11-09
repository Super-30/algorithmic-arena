export const quickSprintNodes = [
    { id: '1', position: { x: 70, y: 0 }, data: { label: 'Quick Sprint' }, sourcePosition: 'bottom', style: { opacity: 0 } }, // Title node
    { id: '2', position: { x: 93, y: 90 }, data: { label: 'Quick Sprint', type: 'text' }, sourcePosition: 'bottom', targetPosition: 'top', style: {border: 'none', background: 'var(--bg-color, #FFFFFF, #020817)',width: 'fit-content', fontSize: '15px', color: 'var(--Content-Secondary, #fffff)'} }, // First vertical node
    { id: '3', position: { x: 200, y: 200 }, data: { label: 'Array' }, sourcePosition: 'right', targetPosition: 'left', style: {border: '2px solid #3D9C5C', padding: '10px', background: 'var(--bg-color, #FFFFFF, #020817)', borderRadius: '4px', width: 'fit-content'} }, // First horizontal
    { id: '4', position: { x: 360, y: 200 }, data: { label: 'String' }, sourcePosition: 'right', targetPosition: 'left', style: {border: '2px solid #3D9C5C', padding: '10px', background: 'var(--bg-color, #FFFFFF, #020817)', borderRadius: '4px', width: 'fit-content'} }, // First horizontal
    { id: '5', position: { x: 540, y: 200 }, data: { label: 'LinkedList' }, sourcePosition: 'right', targetPosition: 'left' }, // First horizontal

    // Zigzag node between String and LinkedList
    { id: 'zigzag-box', position: { x: 420, y: 300 }, data: { label: 'Zigzag Text Box' }, sourcePosition: 'top', style: { color: 'var(--Content-Secondary, #94A3B8)', backgroundColor: 'var(--bg-color, #FFFFFF, #020817)', border: 'dashed 2px #1E293B' } },



    { id: '6', position: { x: 600, y: 450 }, data: { label: 'Stack' }, sourcePosition: 'left', targetPosition: 'right' },
    { id: '7', position: { x: 390, y: 450 }, data: { label: 'Queues' }, sourcePosition: 'left', targetPosition: 'right' },

    // New zigzag node between Queues and Hashing
    { id: 'zigzag-box-queue-hashing', position: { x: 250, y: 540 }, data: { label: 'Zigzag Text Box' }, sourcePosition: 'top', targetPosition: 'top', style: { color: 'var(--Content-Secondary, #94A3B8)', backgroundColor: 'var(--bg-color, #FFFFFF, #020817)', border: 'dashed 2px #1E293B' } },

    { id: '8', position: { x: 175, y: 450 }, data: { label: 'Hashing' }, sourcePosition: 'left', targetPosition: 'right' }, // Updated handle position
    { id: '9', position: { x: 220, y: 700 }, data: { label: 'Sorting Algorithms' }, sourcePosition: 'right', targetPosition: 'left' },

    // New zigzag node between Sorting Algorithms and Binary Search
    { id: 'zigzag-box-sorting-binary', position: { x: 370, y: 800 }, data: { label: 'Zigzag Text Box' }, sourcePosition: 'top', targetPosition: 'top', style: { color: 'var(--Content-Secondary, #94A3B8)', backgroundColor: 'var(--bg-color, #FFFFFF, #020817)', border: 'dashed 2px #1E293B' } },

    { id: '10', position: { x: 530, y: 700 }, data: { label: 'Binary Search' }, sourcePosition: 'right', targetPosition: 'left' },
    { id: '11', position: { x: 480, y: 950 }, data: { label: 'Recursion & Backtracking' }, sourcePosition: 'left', targetPosition: 'right' },
    { id: '12', position: { x: 185, y: 950 }, data: { label: 'Dynamic Programming' }, sourcePosition: 'left', targetPosition: 'right' },
    { id: '13', position: { x: 250, y: 1200 }, data: { label: 'Binary Tree' }, sourcePosition: 'right', targetPosition: 'left' },
    { id: '14', position: { x: 580, y: 1200 }, data: { label: 'Graphs' }, sourcePosition: 'right', targetPosition: 'left' },

    { id: '15', position: { x: 350, y: 1450 }, data: { label: 'Greedy Algorithm' }, sourcePosition: 'left', targetPosition: 'right' },

    // New zigzag node after Greedy Algorithm
    { id: 'zigzag-box-greedy', position: { x: 500, y: 1320 }, data: { label: 'Zigzag Text Box' }, targetPosition: 'bottom', style: { color: 'var(--Content-Secondary, #94A3B8)', backgroundColor: 'var(--bg-color, #FFFFFF, #020817)', border: 'dashed 2px #1E293B' } },

    { id: '16', position: { x: 250, y: 1630 }, data: { label: 'Finished', type: 'text' }, sourcePosition: 'top',  style: {border: 'none', background: 'var(--bg-color, #FFFFFF, #020817)',width: 'fit-content', fontSize: '15px', color: 'var(--Content-Secondary, #fffff)' }}, // This is the text node
];




export const quickSprintEdges = [
    { id: 'e1-2', source: '1', target: '2', type: 'zigzag', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e4-5', source: '4', target: '5', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },


    // Edge from zigzag box to LinkedList
    { id: 'e-zigzag-box-5', source: 'zigzag-box', target: '5', type: 'smoothstep', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { width: 12, height: 12 } },
    { id: 'e-zigzag-box-queue-hashing-8', source: 'zigzag-box-queue-hashing', target: '8', type: 'smoothstep', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { width: 12, height: 12 } },
    { id: 'e-zigzag-box-sorting-binary-10', source: 'zigzag-box-sorting-binary', target: '10', type: 'smoothstep', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { width: 12, height: 12 } },
    { id: 'e-zigzag-box-greedy-15', source: 'zigzag-box-greedy', target: '15', type: 'smoothstep', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { width: 12, height: 12 } },
    

    { id: 'e5-6', source: '5', target: '6', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e6-7', source: '6', target: '7', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e7-8', source: '7', target: '8', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e8-9', source: '8', target: '9', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e9-10', source: '9', target: '10', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e10-11', source: '10', target: '11', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e11-12', source: '11', target: '12', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e12-13', source: '12', target: '13', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e13-14', source: '13', target: '14', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e14-15', source: '14', target: '15', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e15-16', source: '15', target: '16', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
];



// Balance Route Diagram
export const balanceRouteNodes = [
    { id: '1', position: { x: 70, y: 0 }, data: { label: 'Quick Sprint' }, sourcePosition: 'bottom', style: { opacity: 0 } }, // Title node
    { id: '2', position: { x: 85, y: 90 }, data: { label: 'Balance Route', type: 'text' }, sourcePosition: 'bottom', targetPosition: 'top', style: {border: 'none', background: 'var(--bg-color, #FFFFFF, #020817)',width: 'fit-content', fontSize: '15px', color: 'var(--Content-Secondary, #fffff)'} }, // First vertical node
    { id: '3', position: { x: 200, y: 200 }, data: { label: 'Array' }, sourcePosition: 'right', targetPosition: 'left', style: {border: '2px solid #3D9C5C', padding: '10px', background: 'var(--bg-color, #FFFFFF, #020817)', borderRadius: '4px', width: 'fit-content'} }, // First horizontal
    { id: '4', position: { x: 360, y: 200 }, data: { label: 'String' }, sourcePosition: 'right', targetPosition: 'left', style: {border: '2px solid #3D9C5C', padding: '10px', background: 'var(--bg-color, #FFFFFF, #020817)', borderRadius: '4px', width: 'fit-content'} }, // First horizontal
    { id: '5', position: { x: 540, y: 200 }, data: { label: 'LinkedList' }, sourcePosition: 'right', targetPosition: 'left' }, // First horizontal

    // Zigzag node between String and LinkedList
    { id: 'zigzag-box', position: { x: 420, y: 300 }, data: { label: 'Zigzag Text Box' }, sourcePosition: 'top', style: { color: 'var(--Content-Secondary, #94A3B8)', backgroundColor: 'var(--bg-color, #FFFFFF, #020817)', border: 'dashed 2px #1E293B' } },



    { id: '6', position: { x: 600, y: 450 }, data: { label: 'Stack' }, sourcePosition: 'left', targetPosition: 'right' },
    { id: '7', position: { x: 390, y: 450 }, data: { label: 'Queues' }, sourcePosition: 'left', targetPosition: 'right' },

    // New zigzag node between Queues and Hashing
    { id: 'zigzag-box-queue-hashing', position: { x: 250, y: 540 }, data: { label: 'Zigzag Text Box' }, sourcePosition: 'top', targetPosition: 'top', style: { color: 'var(--Content-Secondary, #94A3B8)', backgroundColor: 'var(--bg-color, #FFFFFF, #020817)', border: 'dashed 2px #1E293B' } },

    { id: '8', position: { x: 175, y: 450 }, data: { label: 'Hashing' }, sourcePosition: 'left', targetPosition: 'right' }, // Updated handle position
    { id: '9', position: { x: 220, y: 700 }, data: { label: 'Sorting Algorithms' }, sourcePosition: 'right', targetPosition: 'left' },

    // New zigzag node between Sorting Algorithms and Binary Search
    { id: 'zigzag-box-sorting-binary', position: { x: 370, y: 800 }, data: { label: 'Zigzag Text Box' }, sourcePosition: 'top', targetPosition: 'top', style: { color: 'var(--Content-Secondary, #94A3B8)', backgroundColor: 'var(--bg-color, #FFFFFF, #020817)', border: 'dashed 2px #1E293B' } },

    { id: '10', position: { x: 530, y: 700 }, data: { label: 'Binary Search' }, sourcePosition: 'right', targetPosition: 'left' },
    { id: '11', position: { x: 480, y: 950 }, data: { label: 'Recursion & Backtracking' }, sourcePosition: 'left', targetPosition: 'right' },
    { id: '12', position: { x: 185, y: 950 }, data: { label: 'Dynamic Programming' }, sourcePosition: 'left', targetPosition: 'right' },
    { id: '13', position: { x: 250, y: 1200 }, data: { label: 'Binary Tree' }, sourcePosition: 'right', targetPosition: 'left' },
    { id: '14', position: { x: 580, y: 1200 }, data: { label: 'Graphs' }, sourcePosition: 'right', targetPosition: 'left' },

    { id: '15', position: { x: 350, y: 1450 }, data: { label: 'Greedy Algorithm' }, sourcePosition: 'left', targetPosition: 'right' },

    // New zigzag node after Greedy Algorithm
    { id: 'zigzag-box-greedy', position: { x: 500, y: 1320 }, data: { label: 'Zigzag Text Box' }, targetPosition: 'bottom', style: { color: 'var(--Content-Secondary, #94A3B8)', backgroundColor: 'var(--bg-color, #FFFFFF, #020817)', border: 'dashed 2px #1E293B' } },

    { id: '16', position: { x: 250, y: 1630 }, data: { label: 'Finished', type: 'text' }, sourcePosition: 'top',  style: {border: 'none', background: 'var(--bg-color, #FFFFFF, #020817)',width: 'fit-content', fontSize: '15px', color: 'var(--Content-Secondary, #fffff)' }},

];

export const balanceRouteEdges = [
    { id: 'e1-2', source: '1', target: '2', type: 'zigzag', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e4-5', source: '4', target: '5', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },


    // Edge from zigzag box to LinkedList
    { id: 'e-zigzag-box-5', source: 'zigzag-box', target: '5', type: 'smoothstep', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { width: 12, height: 12 } },
    { id: 'e-zigzag-box-queue-hashing-8', source: 'zigzag-box-queue-hashing', target: '8', type: 'smoothstep', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { width: 12, height: 12 } },
    { id: 'e-zigzag-box-sorting-binary-10', source: 'zigzag-box-sorting-binary', target: '10', type: 'smoothstep', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { width: 12, height: 12 } },
    { id: 'e-zigzag-box-greedy-15', source: 'zigzag-box-greedy', target: '15', type: 'smoothstep', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { width: 12, height: 12 } },
    

    { id: 'e5-6', source: '5', target: '6', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e6-7', source: '6', target: '7', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e7-8', source: '7', target: '8', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e8-9', source: '8', target: '9', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e9-10', source: '9', target: '10', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e10-11', source: '10', target: '11', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e11-12', source: '11', target: '12', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e12-13', source: '12', target: '13', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e13-14', source: '13', target: '14', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e14-15', source: '14', target: '15', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e15-16', source: '15', target: '16', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },

];

// In-Depth JouIn-Depth Journey
export const inDepthJourneyNodes = [
    { id: '1', position: { x: 70, y: 0 }, data: { label: 'Quick Sprint' }, sourcePosition: 'bottom', style: { opacity: 0 } }, // Title node
    { id: '2', position: { x: 76, y: 90 }, data: { label: 'In-Depth Journey', type: 'text' }, sourcePosition: 'bottom', targetPosition: 'top', style: {border: 'none', background: 'var(--bg-color, #FFFFFF, #020817)',width: 'fit-content', fontSize: '15px', color: 'var(--Content-Secondary, #fffff)'} }, // First vertical node
    { id: '3', position: { x: 200, y: 200 }, data: { label: 'Array' }, sourcePosition: 'right', targetPosition: 'left', style: {border: '2px solid #3D9C5C', padding: '10px', background: 'var(--bg-color, #FFFFFF, #020817)', borderRadius: '4px', width: 'fit-content'} }, // First horizontal
    { id: '4', position: { x: 360, y: 200 }, data: { label: 'String' }, sourcePosition: 'right', targetPosition: 'left', style: {border: '2px solid #3D9C5C', padding: '10px', background: 'var(--bg-color, #FFFFFF, #020817)', borderRadius: '4px', width: 'fit-content'} }, // First horizontal
    { id: '5', position: { x: 540, y: 200 }, data: { label: 'LinkedList' }, sourcePosition: 'right', targetPosition: 'left' }, // First horizontal

    // Zigzag node between String and LinkedList
    { id: 'zigzag-box', position: { x: 420, y: 300 }, data: { label: 'Zigzag Text Box' }, sourcePosition: 'top', style: { color: 'var(--Content-Secondary, #94A3B8)', backgroundColor: 'var(--bg-color, #FFFFFF, #020817)', border: 'dashed 2px #1E293B' } },



    { id: '6', position: { x: 600, y: 450 }, data: { label: 'Stack' }, sourcePosition: 'left', targetPosition: 'right' },
    { id: '7', position: { x: 390, y: 450 }, data: { label: 'Queues' }, sourcePosition: 'left', targetPosition: 'right' },

    // New zigzag node between Queues and Hashing
    { id: 'zigzag-box-queue-hashing', position: { x: 250, y: 540 }, data: { label: 'Zigzag Text Box' }, sourcePosition: 'top', targetPosition: 'top', style: { color: 'var(--Content-Secondary, #94A3B8)', backgroundColor: 'var(--bg-color, #FFFFFF, #020817)', border: 'dashed 2px #1E293B' } },

    { id: '8', position: { x: 175, y: 450 }, data: { label: 'Hashing' }, sourcePosition: 'left', targetPosition: 'right' }, // Updated handle position
    { id: '9', position: { x: 220, y: 700 }, data: { label: 'Sorting Algorithms' }, sourcePosition: 'right', targetPosition: 'left' },

    // New zigzag node between Sorting Algorithms and Binary Search
    { id: 'zigzag-box-sorting-binary', position: { x: 370, y: 800 }, data: { label: 'Zigzag Text Box' }, sourcePosition: 'top', targetPosition: 'top', style: { color: 'var(--Content-Secondary, #94A3B8)', backgroundColor: 'var(--bg-color, #FFFFFF, #020817)', border: 'dashed 2px #1E293B' } },

    { id: '10', position: { x: 530, y: 700 }, data: { label: 'Binary Search' }, sourcePosition: 'right', targetPosition: 'left' },
    { id: '11', position: { x: 480, y: 950 }, data: { label: 'Recursion & Backtracking' }, sourcePosition: 'left', targetPosition: 'right' },
    { id: '12', position: { x: 185, y: 950 }, data: { label: 'Dynamic Programming' }, sourcePosition: 'left', targetPosition: 'right' },
    { id: '13', position: { x: 250, y: 1200 }, data: { label: 'Binary Tree' }, sourcePosition: 'right', targetPosition: 'left' },
    { id: '14', position: { x: 580, y: 1200 }, data: { label: 'Graphs' }, sourcePosition: 'right', targetPosition: 'left' },

    { id: '15', position: { x: 350, y: 1450 }, data: { label: 'Greedy Algorithm' }, sourcePosition: 'left', targetPosition: 'right' },

    // New zigzag node after Greedy Algorithm
    { id: 'zigzag-box-greedy', position: { x: 500, y: 1320 }, data: { label: 'Zigzag Text Box' }, targetPosition: 'bottom', style: { color: 'var(--Content-Secondary, #94A3B8)', backgroundColor: 'var(--bg-color, #FFFFFF, #020817)', border: 'dashed 2px #1E293B' } },

    { id: '16', position: { x: 250, y: 1630 }, data: { label: 'Finished', type: 'text' }, sourcePosition: 'top',  style: {border: 'none', background: 'var(--bg-color, #FFFFFF, #020817)',width: 'fit-content', fontSize: '15px', color: 'var(--Content-Secondary, #fffff)' }},
];

export const inDepthJourneyEdges = [
    { id: 'e1-2', source: '1', target: '2', type: 'zigzag', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e4-5', source: '4', target: '5', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },


    // Edge from zigzag box to LinkedList
    { id: 'e-zigzag-box-5', source: 'zigzag-box', target: '5', type: 'smoothstep', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { width: 12, height: 12 } },
    { id: 'e-zigzag-box-queue-hashing-8', source: 'zigzag-box-queue-hashing', target: '8', type: 'smoothstep', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { width: 12, height: 12 } },
    { id: 'e-zigzag-box-sorting-binary-10', source: 'zigzag-box-sorting-binary', target: '10', type: 'smoothstep', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { width: 12, height: 12 } },
    { id: 'e-zigzag-box-greedy-15', source: 'zigzag-box-greedy', target: '15', type: 'smoothstep', animated: true, style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { width: 12, height: 12 } },
    

    { id: 'e5-6', source: '5', target: '6', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e6-7', source: '6', target: '7', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e7-8', source: '7', target: '8', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e8-9', source: '8', target: '9', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e9-10', source: '9', target: '10', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e10-11', source: '10', target: '11', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e11-12', source: '11', target: '12', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e12-13', source: '12', target: '13', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e13-14', source: '13', target: '14', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e14-15', source: '14', target: '15', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },
    { id: 'e15-16', source: '15', target: '16', type: 'smoothstep', style: { stroke: '#4E7AFF', strokeWidth: 2 }, markerEnd: { type: 'arrow', width: 12, height: 12 } },

];
