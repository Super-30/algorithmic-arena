

export default function StatsCard() {
    return (
        <div className="flex flex-col gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md w-96 h-full">
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold">Your Contest Stats</div>
            </div>

            {/* Vertical stacking of 3 "Problems Solved" sections */}
            <div className="flex flex-col gap-4">
                {/* First Problem Solved card */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex flex-col gap-2">
                    <div className="text-md font-bold">Problems Solved</div>
                    <div className="text-sm text-gray-300">Your current Rank</div>
                </div>

                {/* Second Problem Solved card */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex flex-col gap-2">
                    <div className="text-md font-bold">Problems Solved</div>
                    <div className="text-sm text-gray-300">Your current Rank</div>
                </div>

                {/* Third Problem Solved card */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex flex-col gap-2">
                    <div className="text-md font-bold">Problems Solved</div>
                    <div className="text-sm text-gray-300">Your current Rank</div>
                </div>
            </div>
        </div>
    );
}