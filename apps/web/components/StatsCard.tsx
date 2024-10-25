

export default function StatsCard() {
    return (
        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#020817] shadow-md w-[440px] h-[336px] border border-[#E2E8F0] dark:border-[#1E293B]">
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold">Your Contest Stats</div>
            </div>

            {/* Vertical stacking of 3 "Problems Solved" sections */}
            <div className="flex flex-col gap-4">
                {/* First Problem Solved card */}
                <div className="bg-gray-100 dark:bg-[#0F172A] rounded-lg p-2 flex flex-col gap-2">
                    <div className="text-md font-bold">Problems Solved</div>
                    <div className="text-sm text-[#64748B] dark:text-[#94A3B8]">Your current Rank</div>
                </div>

                {/* Second Problem Solved card */}
                <div className="bg-gray-100 dark:bg-[#0F172A] rounded-lg p-2 flex flex-col gap-2">
                    <div className="text-md font-bold">Problems Solved</div>
                    <div className="text-sm text-[#64748B] dark:text-[#94A3B8]">Your current Rank</div>
                </div>

                {/* Third Problem Solved card */}
                <div className="bg-gray-100 dark:bg-[#0F172A] rounded-lg p-2 flex flex-col gap-2">
                    <div className="text-md font-bold">Problems Solved</div>
                    <div className="text-sm text-[#64748B] dark:text-[#94A3B8]">Your current Rank</div>
                </div>
            </div>
        </div>
    );
}