'use client'
import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Table from '../components/Table';
import axios from 'axios';

const DashboardContent = () => {
  const router = useRouter();
  const [userInfo,setUserInfo]=useState("");
  const [tableData,setTableData]=useState("")
  const getUserId=()=>{
    const userJson = localStorage.getItem('userInfo');
    
 // Parse the JSON string to get the object
 if (userJson) {

   const userInfo = JSON.parse(userJson);

   getTableInfo(userInfo?.userId);

   setUserInfo(userInfo)
 } else {
   console.log('No user found in localStorage');
 }
  }
  const getTableInfo=async(userId)=>{    
     try {
    const response = await axios.get(`http://localhost:5000/ifa/clientInfo/${userId}`);
    
    setTableData(response?.data?.data[0]?.clientInfo)
  } catch (error) {
    console.error('Error fetching data:', error.message);
    // Handle specific error response
  }
}
  useEffect(()=>{
    getUserId();
  },[])
  // Get the username from localStorage

  // Logout function to clear user data
  const handleLogout = () => {
    // Clear the token from cookies and the username from localStorage
    Cookies.remove('authToken');
    localStorage.removeItem('username');
    
    // Redirect to login page
    router.push('/');
  };

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
  <div className="w-full bg-gradient-to-r from-gray-800 to-black text-white flex justify-between items-center px-4 py-2 fixed top-0 left-0 right-0 z-20 shadow-lg border-b border-gray-700">
    {/* Logo & Title */}
    <div className="flex items-center space-x-2">
  <Image
    src="/images.png"
    alt="Shanta Asset Management Limited"
    width={20}
    height={20}
    className="filter invert hue-rotate-180"
  />
  </div>

    {/* Navigation Links */}
    <div className="hidden md:flex space-x-4">
      <a href="#home" className="text-gray-300 hover:text-white text-xs font-medium transition duration-200">Home</a>
      <a href="#about" className="text-gray-300 hover:text-white text-xs font-medium transition duration-200">About</a>
      <a href="#contact" className="text-gray-300 hover:text-white text-xs font-medium transition duration-200">Contact</a>
    </div>

    {/* User Info */}
    <div className="flex items-center space-x-2">
      <span className="font-medium text-xs text-gray-300 hidden sm:block">{userInfo?.userName}</span>
      <button
        onClick={handleLogout}
        className="py-1 px-3 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-md"
      >
        Logout
      </button>
    </div>
  </div>

      {/* Main Content */}
 <Table />
    </div>
  );
};

export default DashboardContent;
