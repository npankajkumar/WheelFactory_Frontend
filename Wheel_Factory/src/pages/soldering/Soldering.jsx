// import { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Soldering = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const orderId = location.state?.orderId || 0; 
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(); 

//   const fetchOrderDetails = async () => {
//     if (orderId !== 0) {
//       try {
//         const response = await axios.get(`http://localhost:5041/api/Orders/${orderId}`);
//         console.log("API Response:", response.data);
//         setOrderDetails(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError('Failed to load order details. Please try again later.');
//         setLoading(false);
//       }
//     } else {
//       setError('No orders available.');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [orderId]);

//   const formik = useFormik({
//     initialValues: {
//       sandBlastingLevel: '',
//       solderingNote: '',
//       imageFile: null, // Add image file field
//     },
//     validationSchema: Yup.object({
//       sandBlastingLevel: Yup.string().required('Sandblasting level is required'),
//       solderingNote: Yup.string().required('Soldering note is required'),
//       imageFile: Yup.mixed().required('An image is required'), // Validate image file
//     }),

//     onSubmit: async (values) => {
//       const formData = new FormData();
//       formData.append('orderId', orderDetails?.orderId);
//       formData.append('status', orderDetails?.status); 
//       formData.append('sandBlastingLevel', values.sandBlastingLevel);
//       formData.append('notes', values.solderingNote);

//       if (values.imageFile) {
//         formData.append('imageUrl', values.imageFile);  // Append the uploaded file
//       }
      
//       try {
//         await axios.post('http://localhost:5041/api/task/soldering', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         alert('Form submitted successfully!');
//       } catch (error) {
//         console.error('Error submitting form', error);
//         alert('Error submitting form');
//       }
//     },
    
//   });

//   if (loading) {
//     return <p>Loading order details...</p>; 
//   }

//   return (
//     <div className="p-4">
//       <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md">
//         <div className="flex space-x-4">
//           <button 
//             className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm"
//             onClick={() => navigate('/')}
//           >
//             PREVIOUS
//           </button>
//           <h1 className="text-xl text-white font-bold">SOLDERING</h1>
//         </div>
//         <button 
//           className="border border-red-400 p-2 rounded-md font-bold text-red-500"
//           onClick={() => navigate('/')}
//         >
//           LOGOUT
//         </button>
//       </header>

//       {orderDetails ? (
//         <div className="mt-4 space-y-4">
//           <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
//             <div className="flex-1 space-y-4">
//               <div>
//                 <h2 className="text-lg font-bold">Order Id:</h2>
//                 <p className="mt-1 text-gray-700">{orderDetails.orderId}</p>
//               </div>
//               <div>
//                 <h2 className="text-lg font-bold">Status:</h2>
//                 <p className="mt-1 text-gray-700">{orderDetails.status}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="mt-4 text-center">
//           <h2 className="text-lg font-bold text-red-500"></h2>
//         </div>
//       )}

//       <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
//         <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
//           <div className="flex-1 space-y-4">
//             <div>
//               <label className="text-lg font-bold">SandBlasting Level:</label>
//               <input
//                 type="text"
//                 name="sandBlastingLevel"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={formik.values.sandBlastingLevel}
//                 onChange={formik.handleChange}
//               />
//               {formik.errors.sandBlastingLevel && formik.touched.sandBlastingLevel && (
//                 <p className="text-red-500">{formik.errors.sandBlastingLevel}</p>
//               )}
//             </div>
//           </div>

//           <div className="flex-1 space-y-4">
//             <div>
//               <label className="text-lg font-bold">Soldering Note:</label>
//               <input
//                 type="text"
//                 name="solderingNote"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={formik.values.solderingNote}
//                 onChange={formik.handleChange}
//               />
//               {formik.errors.solderingNote && formik.touched.solderingNote && (
//                 <p className="text-red-500">{formik.errors.solderingNote}</p>
//               )}
//             </div>

//             <div>
//               <label className="text-lg font-bold">Upload Image:</label>
//               <input
//                 type="file"
//                 name="imageFile"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 onChange={(event) => {
//                   formik.setFieldValue("imageFile", event.currentTarget.files[0]);
//                 }}
//               />
//               {formik.errors.imageFile && formik.touched.imageFile && (
//                 <p className="text-red-500">{formik.errors.imageFile}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         <button 
//           type="submit" 
//           className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm bg-black px-4 py-2 mt-4 block mx-auto"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Soldering;
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Soldering = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || 0; 
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(); 
  const [sandBlastingOptions, setSandBlastingOptions] = useState([]); // State for dropdown options

  // Fetch order details
  const fetchOrderDetails = async () => {
    if (orderId !== 0) {
      try {
        const response = await axios.get(`http://localhost:5041/api/Orders/${orderId}`);
        console.log("API Response:", response.data);
        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Failed to load order details. Please try again later.');
        setLoading(false);
      }
    } else {
      setError('No orders available.');
      setLoading(false);
    }
  };

  // Fetch sand blasting levels
  const fetchSandBlastingLevels = async () => {
    try {
      const response = await axios.get('http://localhost:5041/api/SandBlastingLevels'); // Adjust the URL to your API endpoint
      setSandBlastingOptions(response.data);
      console.log(response.data) 
    } catch (error) {
      console.error("Error fetching sand blasting levels:", error);
      setError('Failed to load sand blasting levels.');
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    fetchSandBlastingLevels(); 
  }, [orderId]);

  const formik = useFormik({
    initialValues: {
      sandBlastingLevel: '',
      solderingNote: '',
      imageUrl: null, 
    },
    validationSchema: Yup.object({
      sandBlastingLevel: Yup.string().required('Sandblasting level is required'),
      solderingNote: Yup.string().required('Soldering note is required'),
      imageUrl: Yup.mixed().required('An image is required'), 
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('orderId', orderDetails?.orderId);
      formData.append('status', orderDetails?.status); 
      formData.append('sandBlastingLevel', values.sandBlastingLevel);
      formData.append('notes', values.solderingNote);

      if (values.imageUrl) {
        formData.append('imageUrl', values.imageUrl);  // Append the uploaded file
      }
      
      try {
        await axios.post('http://localhost:5041/api/task/soldering', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting form', error);
        alert('Error submitting form');
      }
    },
  });

  if (loading) {
    return <p>Loading order details...</p>; 
  }

  return (
    <div className="p-4">
      <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md">
        <div className="flex space-x-4">
          <button 
            className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm"
            onClick={() => navigate('/')}
          >
            PREVIOUS
          </button>
          <h1 className="text-xl text-white font-bold">SOLDERING</h1>
        </div>
        <button 
          className="border border-red-400 p-2 rounded-md font-bold text-red-500"
          onClick={() => navigate('/')}
        >
          LOGOUT
        </button>
      </header>

      {orderDetails ? (
        <div className="mt-4 space-y-4">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-lg font-bold">Order Id:</h2>
                <p className="mt-1 text-gray-700">{orderDetails.orderId}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Status:</h2>
                <p className="mt-1 text-gray-700">{orderDetails.status}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 text-center">
          <h2 className="text-lg font-bold text-red-500">{error}</h2>
        </div>
      )}

      <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 space-y-4">
             <div>
              <label className="text-lg font-bold">SandBlasting Level:</label>
              <select
                name="sandBlastingLevel"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.sandBlastingLevel}
                onChange={formik.handleChange}
              >
                <option value="">Select SandBlasting Level</option>
                {sandBlastingOptions.map((option) => (
                  <option key={option.id} >{option.sandBlastingLevel}</option> // Adjust based on your API response
                ))}
              </select>
              {formik.errors.sandBlastingLevel && formik.touched.sandBlastingLevel && (
                <p className="text-red-500">{formik.errors.sandBlastingLevel}</p>
              )}
            </div> 


          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="text-lg font-bold">Soldering Note:</label>
              <input
                type="text"
                name="solderingNote"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.solderingNote}
                onChange={formik.handleChange}
              />
              {formik.errors.solderingNote && formik.touched.solderingNote && (
                <p className="text-red-500">{formik.errors.solderingNote}</p>
              )}
            </div>

            <div>
              <label className="text-lg font-bold">Upload Image:</label>
              <input
                type="file"
                name="imageUrl"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                onChange={(event) => {
                  formik.setFieldValue("imageUrl", event.currentTarget.files[0]);
                }}
              />
              {formik.errors.imageUrl && formik.touched.imageUrl && (
                <p className="text-red-500">{formik.errors.imageUrl}</p>
              )}
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm bg-black px-4 py-2 mt-4 block mx-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Soldering;





// import { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Soldering = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const orderId = location.state?.orderId || 0;
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [sandBlastingOptions, setSandBlastingOptions] = useState([]);

//   // Fetch order details
//   const fetchOrderDetails = async () => {
//     if (orderId !== 0) {
//       try {
//         const token = localStorage.getItem("authorization");
//         if (!token) throw new Error("Authorization token not found.");

//         const response = await axios.get(`http://localhost:5041/api/Orders/${orderId}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("API Response:", response.data);
//         setOrderDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error.response?.data || error.message);
//         setError('Failed to load order details. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       setError('No orders available.');
//       setLoading(false);
//     }
//   };

//   // Fetch sand blasting levels
//   const fetchSandBlastingLevels = async () => {
//     try {
//       const token = localStorage.getItem("authorization");
//       if (!token) throw new Error("Authorization token not found.");

//       const response = await axios.get('http://localhost:5041/api/SandBlastingLevels', {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setSandBlastingOptions(response.data);
//     } catch (error) {
//       console.error("Error fetching sand blasting levels:", error.response?.data || error.message);
//       setError('Failed to load sand blasting levels.');
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetails();
//     fetchSandBlastingLevels();
//   }, [orderId]);

//   const formik = useFormik({
//     initialValues: {
//       sandBlastingLevel: '',
//       solderingNote: '',
//       imageFile: null,
//     },
//     validationSchema: Yup.object({
//       sandBlastingLevel: Yup.string().required('Sandblasting level is required'),
//       solderingNote: Yup.string().required('Soldering note is required'),
//       imageFile: Yup.mixed().required('An image is required'),
//     }),
//     onSubmit: async (values) => {
//       const formData = new FormData();
//       formData.append('orderId', orderDetails?.orderId);
//       formData.append('status', orderDetails?.status);
//       formData.append('sandBlastingLevel', values.sandBlastingLevel);
//       formData.append('notes', values.solderingNote);
//       if (values.imageFile) {
//         formData.append('imageUrl', values.imageFile);
//       }
      
//       try {
//         const token = localStorage.getItem("authorization");
//         if (!token) throw new Error("Authorization token not found.");

//         await axios.post('http://localhost:5041/api/task/soldering', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         alert('Form submitted successfully!');
//       } catch (error) {
//         console.error('Error submitting form', error.response?.data || error.message);
//         alert('Error submitting form');
//       }
//     },
//   });

//   if (loading) {
//     return <p>Loading order details...</p>;
//   }

//   return (
//     <div className="p-4">
//       <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md">
//         <div className="flex space-x-4">
//           <button 
//             className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm"
//             onClick={() => navigate('/')}
//           >
//             PREVIOUS
//           </button>
//           <h1 className="text-xl text-white font-bold">SOLDERING</h1>
//         </div>
//         <button 
//           className="border border-red-400 p-2 rounded-md font-bold text-red-500"
//           onClick={() => navigate('/')}
//         >
//           LOGOUT
//         </button>
//       </header>

//       {orderDetails ? (
//         <div className="mt-4 space-y-4">
//           <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
//             <div className="flex-1 space-y-4">
//               <div>
//                 <h2 className="text-lg font-bold">Order Id:</h2>
//                 <p className="mt-1 text-gray-700">{orderDetails.orderId}</p>
//               </div>
//               <div>
//                 <h2 className="text-lg font-bold">Status:</h2>
//                 <p className="mt-1 text-gray-700">{orderDetails.status}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="mt-4 text-center">
//           <h2 className="text-lg font-bold text-red-500">{error}</h2>
//         </div>
//       )}

//       <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
//         <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
//           <div className="flex-1 space-y-4">
//             <div>
//               <label className="text-lg font-bold">SandBlasting Level:</label>
//               <select
//                 name="sandBlastingLevel"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={formik.values.sandBlastingLevel}
//                 onChange={formik.handleChange}
//               >
//                 <option value="">Select SandBlasting Level</option>
//                 {sandBlastingOptions.map((option) => (
//                   <option key={option.id} value={option.value}>{option.label}</option>
//                 ))}
//               </select>
//               {formik.errors.sandBlastingLevel && formik.touched.sandBlastingLevel && (
//                 <p className="text-red-500">{formik.errors.sandBlastingLevel}</p>
//               )}
//             </div>
//           </div>

//           <div className="flex-1 space-y-4">
//             <div>
//               <label className="text-lg font-bold">Soldering Note:</label>
//               <input
//                 type="text"
//                 name="solderingNote"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={formik.values.solderingNote}
//                 onChange={formik.handleChange}
//               />
//               {formik.errors.solderingNote && formik.touched.solderingNote && (
//                 <p className="text-red-500">{formik.errors.solderingNote}</p>
//               )}
//             </div>

//             <div>
//               <label className="text-lg font-bold">Upload Image:</label>
//               <input
//                 type="file"
//                 name="imageFile"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 onChange={(event) => {
//                   formik.setFieldValue("imageFile", event.currentTarget.files[0]);
//                 }}
//               />
//               {formik.errors.imageFile && formik.touched.imageFile && (
//                 <p className="text-red-500">{formik.errors.imageFile}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         <button 
//           type="submit" 
//           className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm bg-black px-4 py-2 mt-4 block mx-auto"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Soldering;


