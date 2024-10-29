"use client"

import React, { useState } from 'react';
import GitHubCalendar from 'react-github-calendar';

export default function Calendar() {
  const username = "your-github-username"; // Replace with your GitHub username

  // Define a valid theme object with the required colors
  const theme = {
    light: {
      level0: '#ebedf0', // No contributions
      level1: '#d1d5db', // Low contributions
      level2: '#d1d5db', // Medium contributions
      level3: '#d1d5db', // High contributions
      level4: '#d1d5db', // Very high contributions
    },
    dark: {
      level0: '#2e3337', // No contributions
      level1: '#9be9a8', // Low contributions
      level2: '#40c463', // Medium contributions
      level3: '#30a14e', // High contributions
      level4: '#216e39', // Very high contributions
    },
  };

  // Year state
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Function to handle year change
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    // Fetch and update the calendar data based on selectedYear here
  };

  return (
    <div className='border mt-4 rounded-2xl p-[1px] w-[913px] ml-[28px] h-fit'>
      <div className="p-6 rounded-2xl w-fit relative">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
            15 submissions in last 12 months
          </h2>

          {/* Year selection dropdown positioned at the top right */}

          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="p-2 rounded border bg-[#F1F5F9] dark:bg-[#020817] border-gray-300 dark:border-gray-700  text-gray-800 dark:text-white"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        {/* Calendar with responsive custom styles */}
        <div className=" mt-6">
          <GitHubCalendar
            username={username}
            blockSize={12}
            blockMargin={4}
          //  responsive
          // theme={theme.light} // You can toggle between light and dark themes dynamically
          />
        </div>
      </div>

      <div className=' flex w-full rounded-lg gap-4 items-start text-left p-5 bg-[#F1F5F9] dark:bg-[#0F172A]'>
        <p>Current streak : 5</p>
        <p>Highest streak : 15</p>
      </div>
    </div>
  );
}
