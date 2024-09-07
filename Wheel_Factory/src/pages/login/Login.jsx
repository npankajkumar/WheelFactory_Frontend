// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const Login = () => {
//   const [userId, setUserId] = useState(''); 
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); 

//   const handleLogin = async(e) => {
//     e.preventDefault(); 
//     try {
//       const response = await fetch('http://localhost:3000/users');
//       const users = await response.json();

//       const user = users.find(u => u.userId === userId && u.password === password);

//     if (user) {
//       navigate(`/workers/${user.userId}`);
//     } else {
//       setError('Invalid credentials');
//     }
//   }
//   catch (err) {
//     console.error('Error fetching users:', err);
//     setError('An error occurred. Please try again later.');
//   }
// };
//   return (
//     <div className="flex h-screen w-full items-center justify-center">
//       <img src="/bg-images/bglogin5.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
//       <div className="relative w-full max-w-[800px] h-auto md:h-[450px] bg-cover bg-center">
//         <div className="flex h-full items-center justify-center rounded-lg bg-card shadow-lg md:flex-row">
//           <div className="relative hidden md:block w-1/4 overflow-hidden rounded-l-lg">
//             <img
//               src="/bg-images/logins5.jpg"
//               alt="Login illustration"
//               className="object-cover w-full h-full"
//               style={{ aspectRatio: '350/450', objectFit: 'cover' }}
//             />
//           </div>
//           <div className="flex w-full md:w-1/2 flex-col justify-center gap-6 p-8 md:p-12">
//             <div className="space-y-2">
//               <h1 className="text-3xl font-bold">Welcome back!</h1>
//               <p className="text-muted-foreground">Enter your credentials to access your account.</p>
//             </div>
//             <form className="space-y-4" onSubmit={handleLogin}>
//               <div className="space-y-2 font-bold">
//                 <label htmlFor="userId">UserId</label>
//                 <input
//                   id="userId"
//                   type="text"
//                   value={userId}
//                   onChange={(e) => setUserId(e.target.value)}
//                   required
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between font-bold">
//                   <label htmlFor="password">Password</label>
//                   <a
//                     href="#"
//                     className="text-sm font-medium underline underline-offset-4 hover:text-primary"
//                   >
//                     Forgot password?
//                   </a>
//                 </div>
//                 <input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <button type="submit" className="w-full p-2 bg-primary text-white rounded font-bold">
//                 LOG IN
//               </button>
//             </form>
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


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
          // Redirect to manager dashboard
          navigate(`/manager/${user.userId}`);
        } else if (user.role === 'worker') {
          // Redirect to worker's page based on their stage
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
    <div className="flex h-screen w-full items-center justify-center">
      <img src="/bg-images/bglogin5.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative w-full max-w-[800px] h-auto md:h-[450px] bg-cover bg-center">
        <div className="flex h-full items-center justify-center rounded-lg bg-card shadow-lg md:flex-row">
          <div className="relative hidden md:block w-1/4 overflow-hidden rounded-l-lg">
            <img
              src="/bg-images/logins5.jpg"
              alt="Login illustration"
              className="object-cover w-full h-full"
              style={{ aspectRatio: '350/450', objectFit: 'cover' }}
            />
          </div>
          <div className="flex w-full md:w-1/2 flex-col justify-center gap-6 p-8 md:p-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Welcome back!</h1>
              <p className="text-muted-foreground">Enter your credentials to access your account.</p>
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
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <label htmlFor="password">Password</label>
                  <a
                    href="#"
                    className="text-sm font-medium underline underline-offset-4 hover:text-primary"
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
                  className="w-full p-2 border rounded"
                />
              </div>
              <button type="submit" className="w-full p-2 bg-primary text-white rounded font-bold">
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
