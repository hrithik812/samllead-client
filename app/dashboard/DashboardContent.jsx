'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const DashboardContent = () => {
  const router = useRouter();

  // Get the username from localStorage
  const username = localStorage.getItem('username');

  // Logout function to clear user data
  const handleLogout = () => {
    // Clear the token from cookies and the username from localStorage
    Cookies.remove('authToken');
    localStorage.removeItem('username');
    
    // Redirect to login page
    router.push('/');
  };
  const generateIframeSrc = (username) => {
    if (username === 'ceo') {
      return 'https://app.powerbi.com/view?r=eyJrIjoiNDcxYTUzNTMtZDgxOC00NWQyLTgzZmYtYzhiYmU5N2NhMjg4IiwidCI6ImE3MTQzNzA2LTkwZjEtNDM3NS1iZjdhLTU2NWRkZTMxOTgxZCIsImMiOjEwfQ%3D%3D';
    } else if (username === 'coo') {
      return 'https://app.powerbi.com/view?r=eyJrIjoiNDk0NmQ1ZWItMDQ5NC00YTk1LTgyNDEtNzExNjJmMmQ5NTg0IiwidCI6ImE3MTQzNzA2LTkwZjEtNDM3NS1iZjdhLTU2NWRkZTMxOTgxZCIsImMiOjEwfQ%3D%3D';
    } else if (username=="dgm") {
      return 'https://app.powerbi.com/view?r=eyJrIjoiNWNkNjIxYjQtMDM3OC00ZThhLTk5MGUtZjUzYTJiMzM4NGRkIiwidCI6ImE3MTQzNzA2LTkwZjEtNDM3NS1iZjdhLTU2NWRkZTMxOTgxZCIsImMiOjEwfQ%3D%3D';
    }
  };

  const iframeSrc = generateIframeSrc(username);
  return (
    <div
      style={{
        width: "100vw", // Full width of the viewport
        height: "100vh", // Full height of the viewport
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9f9f9", // Optional background color
      }}
    >
      {/* Navbar */}
      <div
        style={{
          width: "100%",
        //   padding: "10px 20px",
          backgroundColor: "#808080", // Dark background for the navbar
          color: "#fff", // White text color
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "18px" }}>Dashboard</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "10px" }}>{username}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: "5px 10px",
              backgroundColor: "#36454F", // Red background for logout
              border: "none",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 50px)", // Make space for the navbar
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
        <iframe
          title="Unit1"
          style={{
            width: "100%", // Full width of parent container
            height: "100%", // Full height of parent container
            border: "none", // Removes border for a clean look
          }}
          src={iframeSrc}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default DashboardContent;
