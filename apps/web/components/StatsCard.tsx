export default function StatsCard() {
    return (
        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#020817] shadow-md w-[400px] h-[300px] min-h-[300px] min-w-[400px] border border-[#E2E8F0] dark:border-[#1E293B]">
            <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">Your Contest Stats</div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="bg-gray-100 dark:bg-[#0F172A] rounded-lg p-2 flex flex-col gap-2 h-[62px]">
                    <div className="text-md font-semibold">Problems Solved</div>
                    <div className="text-sm text-[#64748B] dark:text-[#94A3B8]">Your current Rank</div>
                </div>
                <div className="bg-gray-100 dark:bg-[#0F172A] rounded-lg p-2 flex flex-col gap-2 h-[62px]">
                    <div className="text-md font-semibold">Problems Solved</div>
                    <div className="text-sm text-[#64748B] dark:text-[#94A3B8]">Your current Rank</div>
                </div>
                <div className="bg-gray-100 dark:bg-[#0F172A] rounded-lg p-2 flex flex-col gap-2 h-[62px]">
                    <div className="text-md font-semibold">Problems Solved</div>
                    <div className="text-sm text-[#64748B] dark:text-[#94A3B8]">Your current Rank</div>
                </div>
            </div>
        </div>
    );
}
