import React from "react";
import SettingAsideBar from "../../components/SettingAsideBar";
import OverviewCard from "../../components/OverviewCard";
import StatsCard from "../../components/StatsCard";
import Calender from "../../components/Calender";
import RecentCard from "../../components/RecentCard";

const Layout = () => {
  return (
    <div className="container mx-auto px-4 mt-6 min-h-screen">
      {/* Main content wrapper */}
      <div className="flex flex-col space-y-6 lg:space-y-0">
        {/* Top section: Sidebar + Cards */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 xl:w-1/5 shrink-0">
            <SettingAsideBar />
          </aside>

          {/* Cards container */}
          <div className="flex flex-col sm:flex-row gap-6 flex-grow">
            {/* Overview Card */}
            <div className="w-full sm:w-1/2 lg:ml-[100px]">
              <OverviewCard />
            </div>
            {/* Stats Card */}
            <div className="w-full sm:w-1/2 -ml-0 sm:-ml-[50px]">
              <StatsCard />
            </div>
          </div>
        </div>

        {/* Bottom section: Calendar + Recent */}
        <div className="flex flex-col space-y-6">
          {/* Calendar section */}
          <div className="w-full lg:w-2/3 lg:ml-[370px]">
            <Calender />
          </div>
          {/* Recent Card section */}
          <div className="w-full lg:w-2/3 lg:ml-[400px] -mt-0 lg:-mt-[40px]">
            <RecentCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;