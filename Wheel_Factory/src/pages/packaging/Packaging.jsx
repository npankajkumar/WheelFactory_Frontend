// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const Packaging = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const orderId = location.state?.orderId;
//   const [orderDetails, setOrderDetails] = useState(null);

//   const fetchOrderDetails = async () => {
//     if (orderId) {
//       try {
//         const response = await axios.get(`http://localhost:5041/api/Orders/${orderId}`);
//         console.log("API Response:", response.data);
//         setOrderDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [orderId]);

//   const formik = useFormik({
//     initialValues: {
//       rating: '',
//       notes: '',
//       imageUrl: null,
//     },
//     validationSchema: Yup.object({
//       rating: Yup.string().required('Rating is required'),
//       notes: Yup.string().required('Notes are required'),
//       imageUrl: Yup.string().required('Proof of Inspection (image) is required'),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       const formData = new FormData();
//       formData.append('orderId', orderDetails?.orderId); 
//       formData.append('status', orderDetails?.status);
//       formData.append('rating', values.rating);
//       formData.append('notes', values.notes);
//       if (values.imageUrl) {
//         formData.append('imageFile', values.imageUrl);
//       }

//       try {
//         await axios.post('http://localhost:5041/api/Task/packaging', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         alert('Packaging task submitted successfully');
//         resetForm();
//       } catch (error) {
//         console.error('Error submitting packaging task:', error);
//         alert('Failed to submit the packaging task');
//       }
//     },
//   });

//   return (
//     <div className="p-4">
//       <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md">
//         <div className="flex space-x-4">
//           <button
//             className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm"
//             onClick={() => navigate('/workers/:userId')}
//           >
//             PREVIOUS
//           </button>
//           <h1 className="text-xl text-white pt-1 font-bold">PACKAGING</h1>
//         </div>
//         <button
//           className="border border-red-400 p-2 rounded-md shadow-sm font-bold text-red-500"
//           onClick={() => navigate('/')}
//         >
//           LOGOUT
//         </button>
//       </header>
//       {orderDetails && (
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
//       )}

//       <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
//         <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
//           {/* Left Column */}
//           <div className="flex-1 space-y-4">
//             {/* Rating */}
//             <div>
//               <label className="text-lg font-bold text-black">Rating (1-5):</label>
//               <input
//                 type="text"
//                 name="rating"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={formik.values.rating}
//                 onChange={formik.handleChange}
//               />
//               {formik.errors.rating && formik.touched.rating && (
//                 <p className="text-red-500">{formik.errors.rating}</p>
//               )}
//             </div>

//             {/* Notes */}
//             <div>
//               <label className="text-lg font-bold text-black">Notes:</label>
//               <textarea
//                 name="notes"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-28"
//                 value={formik.values.notes}
//                 onChange={formik.handleChange}
//               ></textarea>
//               {formik.errors.notes && formik.touched.notes && (
//                 <p className="text-red-500">{formik.errors.notes}</p>
//               )}
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="flex-1 space-y-4">
//             {/* Image */}
//             <div>
//               <label className="text-lg font-bold text-black">Proof of Inspection (Image):</label>
//               <input
//                 type="file"
//                 name="imageUrl"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 onChange={(event) => {
//                   formik.setFieldValue('imageFile', event.currentTarget.files[0]);
//                 }}
//               />
//               {formik.errors.imageUrl && formik.touched.imageUrl && (
//                 <p className="text-red-500">{formik.errors.imageUrl}</p>
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

// export default Packaging;
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Packaging = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [orderDetails, setOrderDetails] = useState(null);
  const [ratingOptions, setRatingOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details
  const fetchOrderDetails = async () => {
    if (orderId) {
      try {
        const response = await axios.get(`http://localhost:5041/api/Orders/${orderId}`);
        console.log("API Response:", response.data);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Failed to load order details.');
      }
    }
  };

 
  const fetchRatingOptions = async () => {
    try {
      const response = await axios.get('http://localhost:5041/api/Ratings'); 
      setRatingOptions(response.data);
    } catch (error) {
      console.error("Error fetching rating options:", error);
      setError('Failed to load rating options.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrderDetails();
      await fetchRatingOptions();
      setLoading(false);
    };

    fetchData();
  }, [orderId]);

  const formik = useFormik({
    initialValues: {
      rating: '',
      notes: '',
      imageUrl: null,
    },
    validationSchema: Yup.object({
      rating: Yup.string().required('Rating is required'),
      notes: Yup.string().required('Notes are required'),
      imageUrl: Yup.mixed().required('Proof of Inspection (image) is required'), // Use Yup.mixed() for file
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('orderId', orderDetails?.orderId || 0);
      formData.append('status', orderDetails?.status || '');
      formData.append('rating', values.rating);
      formData.append('notes', values.notes);
      if (values.imageUrl) {
        formData.append('imageFile', values.imageUrl);
      }

      try {
        await axios.post('http://localhost:5041/api/Task/packaging', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Packaging task submitted successfully');
        resetForm();
      } catch (error) {
        console.error('Error submitting packaging task:', error);
        alert('Failed to submit the packaging task');
      }
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md">
        <div className="flex space-x-4">
          <button
            className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm"
            onClick={() => navigate('/workers/:userId')} // Update with correct route
          >
            PREVIOUS
          </button>
          <h1 className="text-xl text-white pt-1 font-bold">PACKAGING</h1>
        </div>
        <button
          className="border border-red-400 p-2 rounded-md shadow-sm font-bold text-red-500"
          onClick={() => navigate('/')}
        >
          LOGOUT
        </button>
      </header>

      {error && <p className="text-red-500">{error}</p>}

      {orderDetails && (
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
      )}

      <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            {/* Rating */}
            <div>
              <label className="text-lg font-bold text-black">Rating:</label>
              <select
                name="rating"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.rating}
                onChange={formik.handleChange}
              >
                <option value="" label="Select rating" />
                {ratingOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formik.errors.rating && formik.touched.rating && (
                <p className="text-red-500">{formik.errors.rating}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="text-lg font-bold text-black">Notes:</label>
              <textarea
                name="notes"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-28"
                value={formik.values.notes}
                onChange={formik.handleChange}
              ></textarea>
              {formik.errors.notes && formik.touched.notes && (
                <p className="text-red-500">{formik.errors.notes}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-4">
            {/* Image */}
            <div>
              <label className="text-lg font-bold text-black">Proof of Inspection (Image):</label>
              <input
                type="file"
                name="imageUrl"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                onChange={(event) => {
                  formik.setFieldValue('imageUrl', event.currentTarget.files[0]);
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

export default Packaging;


// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const Painting = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const orderId = location.state?.orderId;
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [paintTypes, setPaintTypes] = useState([]);
//   const [paintColors, setPaintColors] = useState([]);

//   // Fetch order details
//   const fetchOrderDetails = async () => {
//     if (orderId) {
//       try {
//         const token = localStorage.getItem("authorization");
//         if (!token) throw new Error("Authorization token not found.");

//         const response = await axios.get(`http://localhost:5041/api/Orders/${orderId}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOrderDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching order details:", error.response?.data || error.message);
//         setError('Failed to load order details. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       setError('Order ID is missing.');
//       setLoading(false);
//     }
//   };

//   // Fetch paint types
//   const fetchPaintTypes = async () => {
//     try {
//       const token = localStorage.getItem("authorization");
//       if (!token) throw new Error("Authorization token not found.");

//       const response = await axios.get('http://localhost:5041/api/PaintTypes', {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setPaintTypes(response.data);
//     } catch (error) {
//       console.error("Error fetching paint types:", error.response?.data || error.message);
//       setError('Failed to load paint types. Please try again later.');
//     }
//   };

//   // Fetch paint colors
//   const fetchPaintColors = async () => {
//     try {
//       const token = localStorage.getItem("authorization");
//       if (!token) throw new Error("Authorization token not found.");

//       const response = await axios.get('http://localhost:5041/api/Colors', {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setPaintColors(response.data);
//     } catch (error) {
//       console.error("Error fetching paint colors:", error.response?.data || error.message);
//       setError('Failed to load paint colors. Please try again later.');
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchOrderDetails();
//       await fetchPaintTypes();
//       await fetchPaintColors();
//     };

//     fetchData();
//   }, [orderId]);

//   const formik = useFormik({
//     initialValues: {
//       paint: '',
//       typeOfPaint: '',
//       notes: '',
//       imageFile: null,
//     },
//     validationSchema: Yup.object({
//       paint: Yup.string().required('Paint is required'),
//       typeOfPaint: Yup.string().required('Type of paint is required'),
//       notes: Yup.string().required('Notes are required'),
//       imageFile: Yup.mixed().required('Image is required'),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       const formData = new FormData();
//       formData.append('orderId', orderDetails?.orderId || 0);
//       formData.append('pColor', values.paint);
//       formData.append('pType', values.typeOfPaint);
//       formData.append('status', orderDetails?.status);
//       formData.append('notes', values.notes);
//       if (values.imageFile) {
//         formData.append('imageUrl', values.imageFile);
//       }

//       try {
//         const token = localStorage.getItem("authorization");
//         if (!token) throw new Error("Authorization token not found.");

//         await axios.post('http://localhost:5041/api/Task/painting', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         alert('Painting task submitted successfully');
//         resetForm();
//       } catch (error) {
//         console.error('Error submitting painting task:', error.response?.data || error.message);
//         alert('Failed to submit the painting task');
//       }
//     },
//   });

//   return (
//     <div className="p-4">
//       <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md">
//         <div className="flex space-x-4">
//           <button
//             className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm"
//             onClick={() => navigate('')}
//           >
//             PREVIOUS
//           </button>
//           <h1 className="text-xl text-white pt-1 font-bold">PAINTING</h1>
//         </div>
//         <button
//           className="border border-red-400 p-2 rounded-md shadow-sm font-bold text-red-500"
//           onClick={() => navigate('/')}
//         >
//           LOGOUT
//         </button>
//       </header>

//       {/* Order Details or Error Message */}
//       {loading ? (
//         <p>Loading order details...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : orderDetails ? (
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
//         <p className="mt-4 text-gray-700">No order details available.</p>
//       )}

//       {/* Painting Form */}
//       <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
//         <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
//           {/* Left Column */}
//           <div className="flex-1 space-y-4">
//             {/* Paint Color */}
//             <div>
//               <label className="text-lg font-bold text-black">Paint Color:</label>
//               <select
//                 name="paint"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={formik.values.paint}
//                 onChange={formik.handleChange}
//               >
//                 <option value="" label="Select paint color" />
//                 {paintColors.map((color) => (
//                   <option key={color.id} value={color.value}>
//                     {color.label}
//                   </option>
//                 ))}
//               </select>
//               {formik.errors.paint && formik.touched.paint && (
//                 <p className="text-red-500">{formik.errors.paint}</p>
//               )}
//             </div>

//             {/* Type of Paint */}
//             <div>
//               <label className="text-lg font-bold text-black">Type of Paint:</label>
//               <select
//                 name="typeOfPaint"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={formik.values.typeOfPaint}
//                 onChange={formik.handleChange}
//               >
//                 <option value="" label="Select paint type" />
//                 {paintTypes.map((type) => (
//                   <option key={type.id} value={type.value}>
//                     {type.label}
//                   </option>
//                 ))}
//               </select>
//               {formik.errors.typeOfPaint && formik.touched.typeOfPaint && (
//                 <p className="text-red-500">{formik.errors.typeOfPaint}</p>
//               )}
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="flex-1 space-y-4">
//             {/* Notes */}
//             <div>
//               <label className="text-lg font-bold text-black">Notes:</label>
//               <textarea
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-28"
//                 name="notes"
//                 value={formik.values.notes}
//                 onChange={formik.handleChange}
//               ></textarea>
//               {formik.errors.notes && formik.touched.notes && (
//                 <p className="text-red-500">{formik.errors.notes}</p>
//               )}
//             </div>

//             {/* Image File */}
//             <div>
//               <label className="text-lg font-bold text-black">Upload Image:</label>
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

//         {/* Submit Button */}
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

// export default Painting;

