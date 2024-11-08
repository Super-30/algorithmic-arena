"use client"; 

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function OverviewCard() {
    const easySolved = 10;
    const mediumSolved = 15;
    const hardSolved = 12;
    const easyTotal = 25;
    const mediumTotal = 25;
    const hardTotal = 20;

    const easyProgress = (easySolved / easyTotal) * 100;  
    const mediumProgress = (mediumSolved / mediumTotal) * 100; 
    const hardProgress = (hardSolved / hardTotal) * 100;   
    const totalSolved = easySolved + mediumSolved + hardSolved;

    return (
        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#020817] shadow-md w-[400px] h-[300px] min-h-[300px] min-w-[400px] border border-[#E2E8F0] dark:border-[#1E293B]">
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold">Problem-Solving Overview</div>
            </div>
            <div className="flex gap-4 h-full">
                <div className="relative flex items-center justify-center" style={{ height: "180px", width: "180px" }}>
                    <div style={{ position: 'absolute', width: '180px', height: '180px' }}>
                        <CircularProgressbar
                            value={hardProgress}
                            styles={buildStyles({ pathColor: '#DD503F', trailColor: 'rgba(189, 189, 189, 0.4)' })}
                            strokeWidth={5} 
                        />
                    </div>
                    <div style={{ position: 'absolute', width: '150px', height: '150px' }}>
                        <CircularProgressbar
                            value={mediumProgress}
                            styles={buildStyles({ pathColor: '#FB923C', trailColor: 'rgba(189, 189, 189, 0.4)' })}
                            strokeWidth={5} 
                        />
                    </div>
                    <div style={{ position: 'absolute', width: '120px', height: '120px' }}>
                        <CircularProgressbar
                            value={easyProgress}
                            styles={buildStyles({ pathColor: '#3D9C5C', trailColor: 'rgba(189, 189, 189, 0.4)' })}
                            strokeWidth={5} 
                        />
                    </div>
                    <div className="absolute text-center text-xl font-bold text-gray-800 dark:text-gray-200">
                        {totalSolved} <br/> Solved
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-[#F1F5F9] dark:bg-[#0F172A] rounded-lg p-2 flex flex-col gap-2 h-[62px]">
                        <div className="text-md text-green-500">Easy</div>
                        <div className="text-lg">{easySolved}/{easyTotal}</div>
                    </div>
                    <div className="bg-[#F1F5F9] dark:bg-[#0F172A] rounded-lg p-2 flex flex-col gap-2 h-[62px]">
                        <div className="text-md text-orange-500">Medium</div>
                        <div className="text-lg">{mediumSolved}/{mediumTotal}</div>
                    </div>
                    <div className="bg-[#F1F5F9] dark:bg-[#0F172A] rounded-lg p-2 flex flex-col gap-2 h-[62px]">
                        <div className="text-md text-red-500">Hard</div>
                        <div className="text-lg">{hardSolved}/{hardTotal}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
