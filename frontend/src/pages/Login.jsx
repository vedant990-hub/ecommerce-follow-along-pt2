import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleClickLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/v2/user/login-user", {
        email,
        password
      });
      console.log(response.data);
    } catch (error) {
      console.error("There was an error logging in..!!", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-200 via-blue-300 to-blue-700">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-500 mt-2">Log In to your account 😊</p>
        </div>
        <form className="space-y-6 mt-6" onSubmit={handleClickLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-600 hover:text-blue-500 transition-colors"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-600 hover:text-blue-500 transition-colors"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember-me"
                id="remember-me"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div>
              <a
                href="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Sign In
            </button>
          </div>

          <div className="flex justify-center items-center mt-4 text-sm">
            <span>Don't have an account?</span>
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-500 ml-2 font-medium transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;