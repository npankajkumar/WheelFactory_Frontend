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

  const fetchOrderDetails = async () => {
    if (orderId) {
      try {
        const response = await axios.get(`http://localhost:5041/api/Orders/${orderId}`);
        console.log("API Response:", response.data);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

//  const onhandle = async (values) => {
//     const requestBody = {
//       orderId: orderDetails?.orderId, 
//         status: orderDetails?.status,
//         rating: values.rating,
//         notes: values.notes,
//         imageUrl: values.image,
//     };

//     try {
//       await axios.post(`http://localhost:5041/api/Orders`, requestBody);
//       alert('Order moved to soldering stage');
//     } catch (error) {
//       console.error('Error moving to soldering stage:', error);
//       alert('Failed to move the order to soldering stage');
//     }
//   };

  const formik = useFormik({
    initialValues: {
      rating: '',
      notes: '',
      image: '',
    },
    validationSchema: Yup.object({
      rating: Yup.string().required('Rating is required'),
      notes: Yup.string().required('Notes are required'),
      image: Yup.mixed().required('Proof of Inspection (image) is required'),
    }),
    onSubmit: async (values) => {
      const requestBody = {
        orderId: orderDetails?.orderId, 
        status: orderDetails?.status,
        rating: values.rating,
        notes: values.notes,
        imageUrl: values.image,
      };

      try {
        await axios.post('http://localhost:5041/api/Task/packaging', requestBody);
        alert('Packaging task submitted successfully');
      } catch (error) {
        console.error('Error submitting packaging task:', error);
        alert('Failed to submit the packaging task');
      }
    },
  });

  return (
    <div className="p-4">
      <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md">
        <div className="flex space-x-4">
          <button
            className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm"
            onClick={() => navigate('/workers/:userId')}
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

      <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit} >
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            {/* Rating */}
            <div>
              <label className="text-lg font-bold text-black">Rating (1-5):</label>
              <input
                type="text"
                name="rating"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.rating}
                onChange={formik.handleChange}
              />
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
              <label className="text-lg font-bold text-black">Proof of Inspection (Image URL):</label>
              <input
                type="text"
                name="image"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.image}
                onChange={formik.handleChange}
              />
              {formik.errors.image && formik.touched.image && (
                <p className="text-red-500">{formik.errors.image}</p>
              )}
            </div>
          </div>
        </div>
        {/* <button
          type="submit"
          className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm bg-black px-4 py-2 mt-4 block mx-auto"
          // onClick={handleRedo}
        >
          Redo
        </button> */}
       
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
