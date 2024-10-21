"use client"

import React, { useState } from 'react';
import GitHubCalendar from 'react-github-calendar';

export default function Calendar() {
  const username = "your-github-username"; // Replace with your GitHub username

  // Define a valid theme object with the required colors
  const theme = {
    light: {
      level0: '#ebedf0', // No contributions
      level1: '#d1d5db', // Low contributions (changed to gray)
      level2: '#d1d5db', // Medium contributions (changed to gray)
      level3: '#d1d5db', // High contributions (changed to gray)
      level4: '#d1d5db', // Very high contributions (changed to gray)
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
    <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 w-[calc(100vw*1.5)] mx-auto max-w-screen-lg relative">
      <h2 className="text-lg font-bold mb-4 text-center text-gray-800 dark:text-white">
        15 submissions in last 12 months
      </h2>

      {/* Year selection dropdown positioned at the top right */}
      <div className="absolute top-4 right-4">
        <select 
          value={selectedYear} 
          onChange={handleYearChange}
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white"
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

      {/* Calendar with custom styles */}
      <div className="calendar-container grid grid-cols-7 gap-2 mt-4">
        <GitHubCalendar 
          username={username} 
          blockSize={12} 
          blockMargin={5}
         // theme={theme} // Ensure the theme is correctly passed
        />
      </div>

      {/* Gap after each month */}
      <style jsx>{`
        .calendar-container {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px; /* You can adjust the gap between blocks */
        }
        .calendar-container > div {
          margin-bottom: 20px; /* Gap after each month */
        }
      `}</style>
    </div>
  );
}