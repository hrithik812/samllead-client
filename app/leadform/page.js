// pages/form.js
'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const FormPage = () => {
    const router = useRouter();
  
    // Get the username from localStorage
    const username = localStorage.getItem('username');
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
    mobile: '',
    occupation: '',
    email: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Process the form data (submit it to an API or handle validation)
    console.log(formData)

    // Reset form fields after submission
    setFormData({
      name: '',
      address: '',
      mobile: '',
      occupation: '',
      email: ''
    })
  }

  return (
<div className="max-h-[20%] bg-gray-100 flex flex-col">
  {/* Navbar Section */}
  <div
    className="w-full bg-gray-600 text-white flex justify-between items-center p-2 fixed top-0 left-0 right-0 z-10"
  >
    <div className="text-xl">Dashboard</div>
    <div className="flex items-center">
      <span className="mr-4">{username}</span>
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Logout
      </button>
    </div>
  </div>

  {/* Form Section */}
  <div className="flex items-center justify-center pt-20"> {/* Added pt-20 to give space for the fixed navbar */}
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Personal Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            pattern="[0-9]{10}"
            required
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Enter your occupation"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="submit"
            value="Submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </div>
      </form>
    </div>
  </div>
</div>

  )
}

export default FormPage
