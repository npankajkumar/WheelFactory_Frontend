import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Painting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderDetails = async () => {
    if (orderId) {
      try {
        const response = await axios.get(`http://localhost:5041/api/Orders/${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError('Failed to load order details. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Order ID is missing.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);
  

  const formik = useFormik({
    initialValues: {
      paint: '',
      typeOfPaint: '',
      notes: '',
      image: '',
    },
    validationSchema: Yup.object({
      paint: Yup.string().required('Paint is required'),
      typeOfPaint: Yup.string().required('Type of paint is required'),
      notes: Yup.string().required('Notes are required'),
      image: Yup.string().required('Image URL is required'),
    }),
    onSubmit: async (values) => {
      const requestBody = {
        orderId: orderDetails?.orderId || 0,  
        pColor: values.paint,
        pType: values.typeOfPaint,
        status: orderDetails?.status,
        notes: values.notes,
        imageUrl: values.image,
      };

      try {
        await axios.post('http://localhost:5041/api/Task/painting', requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert('Painting task submitted successfully');
      } catch (error) {
        console.error('Error submitting painting task:', error);
        alert('Failed to submit the painting task');
      }
    },
  });

  return (
    <div className="p-4">
      <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md">
        <div className="flex space-x-4">
          <button
            className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm"
            onClick={() => navigate('')}
          >
            PREVIOUS
          </button>
          <h1 className="text-xl text-white pt-1 font-bold">PAINTING</h1>
        </div>
        <button
          className="border border-red-400 p-2 rounded-md shadow-sm font-bold text-red-500"
          onClick={() => navigate('/')}
        >
          LOGOUT
        </button>
      </header>

      {/* Order Details or Error Message */}
      {loading ? (
        <p>Loading order details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orderDetails ? (
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
        <p className="mt-4 text-gray-700">No order details available.</p>
      )}

      {/* Painting Form */}
      <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            {/* Paint */}
            <div>
              <label className="text-lg font-bold text-black">Paint:</label>
              <input
                type="text"
                name="paint"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.paint}
                onChange={formik.handleChange}
              />
              {formik.errors.paint && formik.touched.paint && (
                <p className="text-red-500">{formik.errors.paint}</p>
              )}
            </div>

            {/* Type of Paint */}
            <div>
              <label className="text-lg font-bold text-black">Type of Paint:</label>
              <input
                type="text"
                name="typeOfPaint"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.typeOfPaint}
                onChange={formik.handleChange}
              />
              {formik.errors.typeOfPaint && formik.touched.typeOfPaint && (
                <p className="text-red-500">{formik.errors.typeOfPaint}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-4">
            {/* Notes */}
            <div>
              <label className="text-lg font-bold text-black">Notes:</label>
              <textarea
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-28"
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
              ></textarea>
              {formik.errors.notes && formik.touched.notes && (
                <p className="text-red-500">{formik.errors.notes}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="text-lg font-bold text-black">Image URL:</label>
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

        {/* Submit Button */}
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

export default Painting;
