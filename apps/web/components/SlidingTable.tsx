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
      // 
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Check for dark mode
  const isDarkMode = document.documentElement.classList.contains('dark'); 

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
            backdropFilter: 'blur(8px)', 
            zIndex: 999, 
            padding: '20px',
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
          backgroundColor: isDarkMode ? '#020817F2' : '#FFFFFF', 
          color: isDarkMode ? 'white' : 'black', 
          padding: '20px',
          boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          border: '1px solid #1E293B',
        }}
      >

        <div className="px-2 py-3 text-center w-fit">
          <span className="inline-block w-36 h-7 bg-[#3B82F61A] text-[#4E7AFF] text-lg rounded-lg whitespace-normal ml-3"> Quick Sprint #1 </span>
        </div>
        <h2 className='text-3xl font-bold ml-4'>{nodeData ? nodeData?.data?.label : 'No Data'} </h2>
        <p className='text-[#94A3B8] ml-4'>Arrays store elements in a fixed-size sequence, allowing fast access and manipulation through indexing.</p>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            backgroundColor: isDarkMode ? '#020817F2' : '#FFFFFF',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
        >
          <img src="/cross.svg">
          </img>
        </button>

        <div className="mt-6 ml-4 mr-4">
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
                  <span className="inline-block bg-[#22C55E1A] text-[#3D9C5C] text-md rounded-full px-2 py-1">Easy</span>
                </div>
                <div className="px-2 py-2 text-center w-[100px]">-</div>
              </div>
              <div className="flex hover:bg-muted/50 duration-300 border-b">
                <div className="px-2 py-2 flex-1 font-medium capitalize">Problem Two</div>
                <div className="px-2 py-2 text-center w-[100px]">
                  <span className="inline-block bg-[#EA580C1A] text-[#FB923C] text-md rounded-full px-2 py-1">Medium</span>
                </div>
                <div className="px-2 py-2 text-center w-[100px]">-</div>
              </div>
              <div className="flex hover:bg-muted/50 duration-300 border-b">
                <div className="px-2 py-2 flex-1 font-medium capitalize">Problem Three</div>
                <div className="px-2 py-2 text-center w-[100px]">
                  <span className="inline-block bg-[#DC26261A] text-[#DD503F] text-md rounded-full px-2 py-1">Hard</span>
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
