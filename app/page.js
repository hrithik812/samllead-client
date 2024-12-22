// pages/login.js
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Cookies from 'js-cookie';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic client-side validation
    if (!username || !password) {
      toast.error('Please enter both email and password.');
      return;
    }
  
    try {
      // Call backend API for authentication
        const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      const { token } = response.data; // Extract the token from the API response
        
      console.log("Response-----",response);
      
      // Set the token in cookies
      Cookies.set('authToken', token, { 
        expires: 1, // Cookie expiration in days  
        sameSite: 'Strict', // SameSite attribute
      });
        // Safe to use browser-specific APIs like localStorage
        localStorage.setItem('username', response?.data?.data?.user?.username); // Store username in localStorage
      

      // Handle successful authentication
      toast.success('Login successful!');
      if(response?.data?.data?.user?.Roles[0]?.name=="IFA"){
         
      }
      router.push('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      // Handle server and network errors
      if (error.response) {
        // Server responded with a status other than 200 range
        setError(error.response.data.message || 'Authentication failed. Please try again.');
      } else {
        // Network error or other unexpected issues
        console.error('Error during authentication:', error);
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };
  

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://cms.shanta-aml.com/admin/uploads/page/home/1705210090pjHKK.jpg')",
      }}
    >
      <div className="w-full max-w-sm p-6 bg-white bg-opacity-90 rounded-lg shadow-md">
      <div className="flex justify-center items-center">
  <Image
    src="https://www.shanta-aml.com/images/static/logo-white.png"
    alt="Shanta Asset Management Limited"
    width={200}
    height={200}
    className="filter invert hue-rotate-180"
  />
</div>
        {/* <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2> */}
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">UserName</label>
            <input
              // type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
