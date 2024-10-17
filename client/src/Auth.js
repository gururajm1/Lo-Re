import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if(localStorage.getItem('lo-re-auth')) {
      navigate('/dash');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignIn
      ? 'http://localhost:7001/api/auth/register'
      : 'http://localhost:7001/api/auth/login'; 

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to log in or register');
      }

      const data = await response.json();
      console.log(`${isSignIn ? 'Registration' : 'Login'} successful:`, data);

      if(!localStorage.setItem('lo-re-auth', data.token)){
        localStorage.setItem('lo-re-auth', data.token);
      }
      if(!localStorage.setItem('user', JSON.stringify(data.user))){
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dash')
      }

      if (!isSignIn) {
        navigate('/dash');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleMode = (mode) => {
    setIsSignIn(mode);
    setFormData({
      name: '',
      dob: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-lg shadow-xl">
        <div className="flex justify-center space-x-4 text-center">
          <button
            className={`text-2xl font-bold ${isSignIn ? 'text-teal-400 border-b-2 border-teal-400' : 'text-white'} pb-2 px-4 transition-all duration-300 ease-in-out focus:outline-none`}
            onClick={() => toggleMode(true)}
          >
            SIGN IN
          </button>
          <button
            className={`text-2xl font-bold ${!isSignIn ? 'text-teal-400 border-b-2 border-teal-400' : 'text-white'} pb-2 px-4 transition-all duration-300 ease-in-out focus:outline-none`}
            onClick={() => toggleMode(false)}
          >
            LOGIN
          </button>
        </div>
        <div className="flex justify-center mt-6 mb-4">
          <div className="p-4 bg-slate-700 rounded-full">
            <User className="w-12 h-12 text-slate-400" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignIn && (
            <>
              <div className="space-y-2">
                <label htmlFor="name" className="text-white">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={isSignIn}
                  className="w-full px-3 py-2 text-white bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="dob" className="text-white">Date of Birth</label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required={isSignIn}
                  className="w-full px-3 py-2 text-white bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="text-white">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 text-white bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-white">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 text-white bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {!isSignIn && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-teal-400 border-slate-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-slate-400">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                {/* <a href="#" className="text-teal-400 hover:text-teal-300">
                  Forgot your password?
                </a> */}
              </div>
            </div>
          )}
          <button type="submit" className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300">
            {isSignIn ? 'Sign In' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
