// Dashboard.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardContent from '../dashboard/DashboardContent'
const Dashboard = () => {
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     height: "100vh", // Full viewport height
    //   }}
    // >
    //   {/* Sidebar - 30% */}
    //   <div>
    //     <Sidebar />
    //   </div>

    //   {/* Main Content - 70% */}
    
    // </div>
      <div
      style={{
        // flex: "1", // Remaining space (70%)
        backgroundColor: "#ffffff", // Main content background
      }}
    >
      <DashboardContent/>
    </div>
  );
};

export default Dashboard;
