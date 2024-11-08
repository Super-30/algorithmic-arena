"use client"

import React, { useState } from 'react';
import GitHubCalendar from 'react-github-calendar';

export default function Calendar() {
  const username = "your-github-username"; 


  const theme = {
    light: {
      level0: '#ebedf0', 
      level1: '#d1d5db', 
      level2: '#d1d5db',
      level3: '#d1d5db', 
      level4: '#d1d5db', 
    },
    dark: {
      level0: '#2e3337', 
      level1: '#9be9a8', 
      level2: '#40c463', 
      level3: '#30a14e', 
      level4: '#216e39', 
    },
  };

  
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  
  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
    
  };

  return (
    <div className='border mt-4 rounded-2xl p-[1px] w-fit  h-fit ml-16'>
      <div className="p-6 rounded-2xl w-fit relative">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
            15 submissions in last 12 months
          </h2>

          

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

        
        <div className=" mt-6">
          <GitHubCalendar
            username={username}
            blockSize={12}
            blockMargin={2.5}
          //  responsive
          // theme={theme.light} y
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
