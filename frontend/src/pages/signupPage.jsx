import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSubmit = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData();
    formData.append("file", avatar);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v2/user/create-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (res.status === 201) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 px-6 py-12 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black drop-shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:text-gray-800">
          Register as a New User
        </h2>
      </div>

      <div className="mt-8 sm:w-full sm:max-w-md mx-auto">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 hover:shadow-2xl transition-all duration-300">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-transform duration-200 hover:scale-105"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-transform duration-200 hover:scale-105"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-transform duration-200 hover:scale-105"
                  placeholder="Enter your password"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-blue-500"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-blue-500"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-9 w-9 rounded-full overflow-hidden bg-gray-200">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-9 w-9 text-gray-400" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-200"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileSubmit}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-[40px] flex justify-center items-center py-2 px-4 border text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>

            <div className="flex justify-center w-full mt-4">
              <h4 className="text-gray-600">Already have an account?</h4>
              <Link
                to="/login"
                className="text-blue-500 pl-2 hover:underline transition-all duration-200"
              >
                Login To Your Account 😊
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;