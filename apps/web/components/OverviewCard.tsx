"use client"; 

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";


export default function OverviewCard() {
    // Calculate progress percentages
    // we will make this dynamic
    const easySolved = 10;
    const mediumSolved = 15;
    const hardSolved = 12;
    const easyTotal = 25;
    const mediumTotal = 25;
    const hardTotal = 20;

    const easyProgress = (easySolved / easyTotal) * 100;  // Example: 10 solved out of 25
    const mediumProgress = (mediumSolved / mediumTotal) * 100; // Example: 15 solved out of 25
    const hardProgress = (hardSolved / hardTotal) * 100;   // Example: 12 solved out of 20

    // Calculate total solved questions
    const totalSolved = easySolved + mediumSolved + hardSolved;

    return (
        <div className="flex flex-col gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md w-96">
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold">Problem-Solving Overview</div>
            </div>

            {/* Main Content with Circular Progress Bars and Solved Cards */}
            <div className="flex gap-4">
                {/* Circular Progress Bar Section */}
                <div className="relative flex items-center justify-center mt-12" style={{ height: "200px", width: "200px" }}>
                    {/* Hard Progress (Largest Circle) */}
                    <div style={{ position: 'absolute', width: '200px', height: '200px' }}>
                        <CircularProgressbar
                            value={hardProgress}
                            styles={buildStyles({
                                pathColor: '#ef4444', // Red color for hard
                                trailColor: 'rgba(189, 189, 189, 0.4)', // Gray trail for unhighlighted section
                            })}
                            strokeWidth={5} // Adjust thickness
                        />
                    </div>
                    
                    {/* Medium Progress (Middle Circle) */}
                    <div style={{ position: 'absolute', width: '150px', height: '150px' }}>
                        <CircularProgressbar
                            value={mediumProgress}
                            styles={buildStyles({
                                pathColor: '#f97316', // Orange color for medium
                                trailColor: 'rgba(189, 189, 189, 0.4)', // Gray trail for unhighlighted section
                            })}
                            strokeWidth={5} // Adjust thickness
                        />
                    </div>
                    
                    {/* Easy Progress (Smallest Circle) */}
                    <div style={{ position: 'absolute', width: '100px', height: '100px' }}>
                        <CircularProgressbar
                            value={easyProgress}
                            styles={buildStyles({
                                pathColor: '#22c55e', // Green color for easy
                                trailColor: 'rgba(189, 189, 189, 0.4)', // Gray trail for unhighlighted section
                            })}
                            strokeWidth={5} // Adjust thickness
                        />
                    </div>

                    {/* Center Text for Total Solved Questions */}
                    <div className="absolute text-center text-xl font-bold text-gray-800 dark:text-gray-200">
                        {totalSolved} <br/> Solved
                    </div>
                </div>

                {/* Solved Problem Cards Section */}
                <div className="flex-1 flex flex-col gap-4">
                    {/* First Problem Solved card */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex flex-col gap-2">
                        <div className="text-md text-green-500">Easy</div>
                        <div className="text-lg">{easySolved}/{easyTotal}</div>
                    </div>

                    {/* Second Problem Solved card */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex flex-col gap-2">
                        <div className="text-md text-orange-500">Medium</div>
                        <div className="text-lg">{mediumSolved}/{mediumTotal}</div>
                    </div>

                    {/* Third Problem Solved card */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex flex-col gap-2">
                        <div className="text-md text-red-500">Hard</div>
                        <div className="text-lg">{hardSolved}/{hardTotal}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}