import { Line } from 'rc-progress';

const ProgressBarWithStatus = () => {
  const percentComplete = 25; // Set this value dynamically if needed
  const statusText = 'Completed 5/50'; // You can adjust this text

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-md shadow-md mx-4">
      {/* Left Side - Progress Label */}
      <div className="text-left text-sm font-semibold">
        Progress
      </div>

      {/* Progress Bar */}
      <div className="flex-grow mx-4 relative">
        <Line
          percent={percentComplete}
          strokeWidth={4}
          strokeColor="#4CAF50"
          trailColor="#D3D3D3"
          className="h-2 rounded-md"
        />
      </div>

      {/* Right Side - Percentage */}
      <div className="text-sm font-semibold">
        {percentComplete}%
      </div>

      {/* Status Text */}
      <div className="text-right text-sm mt-2 sm:mt-0">
        {statusText}
      </div>
    </div>
  );
};

export default ProgressBarWithStatus;
