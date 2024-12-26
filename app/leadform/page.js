// pages/form.js
'use client'
import { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';

const FormPage = () => {
    const router = useRouter();
  
    // Get the username from localStorage
    const handleLogout = () => {
      // Clear the token from cookies and the username from localStorage
      Cookies.remove('authToken');
      localStorage.removeItem('username');
      
      // Redirect to login page
      router.push('/');
    };
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobileNo: '',
    occupation: '',
    email: ''
  })
  const[showMenu,setShowMenu]=useState("")
  const [userInfo,setUserInfo]=useState("")
  useEffect(()=>{
     getUserId();
  },[])
 const getUserId=()=>{
   const userJson = localStorage.getItem('userInfo');

// Parse the JSON string to get the object
if (userJson) {
  const userInfo = JSON.parse(userJson);
  console.log(userInfo); // Access the 'username' property

  setUserInfo(userInfo)
} else {
  console.log('No user found in localStorage');
}
 }
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset form fields after submission
    const newFormData={
      ...formData,
      userId:userInfo?.userId
    }  
    console.log("New Form Data----",newFormData);
      

    try {
      // Making the POST request
      const response = await axios.post('http://localhost:5000/ifa/saveInfo', newFormData);
  
      // Handle success
      console.log('Response:', response.data);
  
      // Reset form fields after successful submission
      setFormData({
        name: '',
        address: '',
        mobileNo: '',
        occupation: '',
        email: ''
      });
      toast.success('User Info saved successfully');

    } catch (error) {
      // Handle error
      console.error('Error submitting the form:', error);
    }


  }

  return (
<div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
  {/* Navbar Section */}
  <div className="w-full bg-gradient-to-r from-gray-800 to-black text-white flex justify-between items-center px-4 py-2 fixed top-0 left-0 right-0 z-20 shadow-lg border-b border-gray-700">
    {/* Logo & Title */}
    <div className="flex items-center space-x-2">
  <Image
    src="/images.png"
    alt="Shanta Asset Management Limited"
    width={20}
    height={20}
    className="filter invert hue-rotate-180"
  />    </div>

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

  {/* Content Section */}
  <div className="flex-grow pt-[4rem] flex justify-center items-center">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Personal Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="block text-xs font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="block text-xs font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobileNo" className="block text-xs font-medium text-gray-700">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="occupation" className="block text-xs font-medium text-gray-700">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Enter your occupation"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div className="mt-4">
          <input
            type="submit"
            value="Submit"
            className="w-full py-2 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
          />
        </div>
      </form>
    </div>
  </div>
</div>


  )
}

export default FormPage
