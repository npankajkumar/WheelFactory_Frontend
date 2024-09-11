import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [userId, setUserId] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async(e) => {
    e.preventDefault(); 
    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();

      const user = users.find(u => u.userId === userId && u.password === password);

      if (user) {
        if (user.role === 'manager') {
          navigate(`/manager/${user.userId}`);
        } else if (user.role === 'worker') {
          navigate(`/workers/${user.userId}`);
        }
      } else {
        setError('Invalid credentials');
      }
    }
    catch (err) {
      console.error('Error fetching users:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="relative flex h-screen w-full  items-center justify-center bg-gradient-to-r ">
      <img src="/bg-images/bglogin5.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative  backdrop-blur-xl rounded-lg shadow-lg p-8 w-full max-w-[800px] h-auto md:h-[450px] bg-cover bg-center">
        <div className="flex h-full items-center justify-center rounded-lg text-white shadow-lg md:flex-row">
          <div className="relative hidden md:block w-1/4 overflow-hidden rounded-l-lg">
            <img
              src="/bg-images/logins5.jpg"
              alt="Login illustration"
              className="object-cover invert  w-full h-full"
              style={{ aspectRatio: '350/450', objectFit: 'cover' }}
            />
          </div>
          <div className="flex  w-full md:w-1/2 flex-col justify-center gap-6 p-8 md:p-12">
            <div className="space-y-2 border text-white rounded-md p-2">
              <h1 className="text-3xl font-bold">Welcome back!</h1>
              <p className="text-muted-foreground  text-white">Enter your credentials to access your account.</p>
            </div>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2 font-bold">
                <label htmlFor="userId">UserId</label>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  className="w-full text-black bg-slate-100 p-2 border rounded"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <label htmlFor="password">Password</label>
                  <a
                    href="#"
                    className="text-sm font-medium underline underline-offset-4 hover:cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-black bg-slate-100 p-2 border rounded"
                />
              </div>
              <button type="submit" className="w-full border-2 border-teal-500 text-black font-bold px-4 py-2 rounded hover:cursor-pointer hover:bg-teal-300 hover:text-black transition ease-in-out duration-300">
                LOG IN
              </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
