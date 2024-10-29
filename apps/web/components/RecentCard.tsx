export default function RecentCard() {
    return (
      <div>
        <div className="text-3xl mb-4 flex gap-[565px]">
          <h1>Recent Submission</h1>
          <span className="bg-[#3B82F61A] text-[#4E7AFF] text-lg rounded-2xl px-3 py-2">
                View all 
                </span>
        </div>
        
  
        {/* Card Container */}
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-[#F1F5F9] dark:bg-[#0F172A] rounded-lg p-4 w-full max-w-full md:max-w-[910px] h-auto "
            >
              <div className="flex justify-between items-center">
                <div className="text-md">Problems Solved</div>
                <span className="bg-[#64748B1A] text-[#94A3B8] text-lg rounded-lg px-2 py-1">
                  1 hour ago
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  