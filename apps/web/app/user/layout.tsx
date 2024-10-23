import React from "react";
import SettingAsideBar from "../../components/SettingAsideBar";
import OverviewCard from "../../components/OverviewCard";
import StatsCard from "../../components/StatsCard";
import Calender from "../../components/Calender"; // Fixed spelling here

const Layout = () => {
  return (
    <div className="container mx-auto grid grid-cols-12 gap-12 mt-6"> {/* Adjusted gap here */}
      {/* First card: SettingAsideBar (Fixed size, positioned on the extreme left) */}
      <aside className="col-span-12 md:col-span-3 flex-col">
        <SettingAsideBar />
      </aside>

      {/* Second and third cards: OverviewCard and StatsCard (Taking equal space and aligned horizontally) */}
      <div className="col-span-12 md:col-span-8 grid grid-cols-2 md:grid-cols-2 gap-6"> {/* Reduced gap */}
        {/* Second card: OverviewCard */}
        <aside className="flex flex-col">
          <OverviewCard />
        </aside>

        {/* Third card: StatsCard */}
        <aside className="flex flex-col">
          <StatsCard />
        </aside>
      </div>

      {/* Calendar component with margin to shift it to the right */}
      <div className="col-span-12 md:col-span-4 flex-col ml-80"> {/* Adjusted margin */}
        <Calender />
      </div>
    </div>
  );
};

export default Layout;