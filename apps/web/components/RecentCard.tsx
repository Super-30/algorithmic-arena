export default function RecentCard() {
  return (
    <div className="ml-[-30px]">
      <div className="text-xl mb-4 flex items-center w-full max-w-4xl ">
        <h1>Recent Submissions</h1>
        <span className="ml-auto bg-[#3B82F61A] text-[#4E7AFF] text-sm rounded-2xl px-4 py-2  ">
          View all →
        </span>
      </div>


      <div className="space-y-4 ">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-[#F1F5F9] dark:bg-[#0F172A] rounded-lg p-4  w-[815px]"
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
