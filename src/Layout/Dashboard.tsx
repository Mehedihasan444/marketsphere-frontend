import { Outlet } from "react-router-dom";
import DashboardSidebar from "../Components/DashboardSidebar";

const Dashboard = () => {
  return (
    <div>
      {/* sidebar */}
      <DashboardSidebar />
      {/* main content */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
