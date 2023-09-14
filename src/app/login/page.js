"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

      const router = useRouter();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.replace("/dashboard");
        console.log('User logged in successfully:', data.userAccount);
      } else {
        console.error('User login failed:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-900 shadow-md rounded-lg px-10 py-8 mb-4 w-96">
        {/* Increased padding, width, and rounded the box */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent px-4 py-3 border rounded-lg"
            // Increased padding and rounded the input field
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-transparent px-4 py-3 border rounded-lg"
            // Increased padding and rounded the input field
          />
        </div>
        <div className="flex items-center">
          {/* Centered the button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
