"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.replace("/login");
        console.log('User registered successfully:', data.userAccount);
      } else {
        console.error('User registration failed:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent p-2 rounded border border-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-white">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-transparent p-2 rounded border border-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-white">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-transparent p-2 rounded border border-gray-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
