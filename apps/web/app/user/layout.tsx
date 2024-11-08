import React from "react";
import SettingAsideBar from "../../components/SettingAsideBar";
import OverviewCard from "../../components/OverviewCard";
import StatsCard from "../../components/StatsCard";
import Calender from "../../components/Calender";
import RecentCard from "../../components/RecentCard";

const Layout = () => {
  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">

      <div className="flex flex-col space-y-6 lg:space-y-0 ml-16">


        <div className="flex flex-col lg:flex-row gap-6">


          <aside className="w-full lg:w-1/4 xl:w-1/5">
            <SettingAsideBar />
          </aside>


          <div className="flex flex-col sm:flex-row gap-4 w-fit">

            <div className="w-full sm:w-1/2">
              <OverviewCard />
            </div>

            <div className="w-full sm:w-1/2">
              <StatsCard />
            </div>
          </div>
        </div>


        <div className="flex flex-col space-y-6 items-center  ">

          <div className="w-full lg:w-2/3">
            <Calender />
          </div>

          <div className="w-full lg:w-2/4">
            <RecentCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
