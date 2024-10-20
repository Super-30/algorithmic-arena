import React, { useEffect } from 'react';

interface SlidingTableProps {
  isVisible: boolean;
  nodeData: any | null; // You can replace `any` with the exact node data structure
  onClose: () => void;
}

const SlidingTable: React.FC<SlidingTableProps> = ({ isVisible, nodeData, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose(); // Close the table on Esc key press
      }
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // Cleanup the event listener
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Check for dark mode
  const isDarkMode = document.documentElement.classList.contains('dark'); // Adjust based on your theme implementation

  return (
    <>
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(5px)', // Blur the main content
            zIndex: 999, // Under the sliding table
          }}
        />
      )}

      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: '700px',
          height: '100vh',
          backgroundColor: isDarkMode ? '#020817F2' : '#FFFFFF', // Background based on theme
          color: isDarkMode ? 'white' : 'black', // Text color based on theme
          padding: '20px',
          boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <h2>{nodeData ? nodeData?.data?.label : 'No Data'} Details</h2>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#F87171',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>

        <div className="mt-6">
          <div className="border-2 rounded-md overflow-hidden dark:bg-background">
            <div className="flex bg-muted font-bold">
              <div className="px-2 py-2 flex-1">Name</div>
              <div className="px-2 py-2 text-center w-[100px]">Difficulty</div>
              <div className="px-2 py-2 text-center w-[100px]">Status</div>
            </div>
            {/* Hardcoded problems */}
            <div>
              <div className="flex hover:bg-muted/50 duration-300 border-b">
                <div className="px-2 py-2 flex-1 font-medium capitalize">Problem One</div>
                <div className="px-2 py-2 text-center w-[100px]">
                  <span className="inline-block bg-green-500 text-white text-sm font-semibold rounded-full px-2 py-1">easy</span>
                </div>
                <div className="px-2 py-2 text-center w-[100px]">-</div>
              </div>
              <div className="flex hover:bg-muted/50 duration-300 border-b">
                <div className="px-2 py-2 flex-1 font-medium capitalize">Problem Two</div>
                <div className="px-2 py-2 text-center w-[100px]">
                  <span className="inline-block bg-yellow-500 text-white text-sm font-semibold rounded-full px-2 py-1">medium</span>
                </div>
                <div className="px-2 py-2 text-center w-[100px]">-</div>
              </div>
              <div className="flex hover:bg-muted/50 duration-300 border-b">
                <div className="px-2 py-2 flex-1 font-medium capitalize">Problem Three</div>
                <div className="px-2 py-2 text-center w-[100px]">
                  <span className="inline-block bg-red-500 text-white text-sm font-semibold rounded-full px-2 py-1">hard</span>
                </div>
                <div className="px-2 py-2 text-center w-[100px]">-</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlidingTable;
