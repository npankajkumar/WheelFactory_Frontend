import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Soldering = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  const fetchOrderDetails = async () => {
    if (orderId) {
      try {
        const response = await axios.get(`http://localhost:5041/api/Orders/${orderId}`);
        console.log("API Response:", response.data);
        setOrderDetails(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Failed to load order details. Please try again later.');
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
      sandBlastingLevel: '',
      solderingNote: '',
      additionalNotes: '',
    },
    validationSchema: Yup.object({
      sandBlastingLevel: Yup.string().required('Sandblasting level is required'),
      solderingNote: Yup.string().required('Soldering note is required'),
      additionalNotes: Yup.string().required('Additional notes are required'),
    }),

    onSubmit: async (values) => {
      const requestBody = {
        orderId: orderDetails?.orderId,
        status: orderDetails?.status,
        sandBlastingLevel: values.sandBlastingLevel,
        notes: values.solderingNote,
        imageUrl: values.additionalNotes, // Assuming this is an image URL or additional note
      };

      try {
        await axios.post('http://localhost:5041/api/task/soldering', requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert('Form submitted successfully!');
        navigate('/workers/:userId'); // Navigate back after successful submission
      } catch (error) {
        console.error('Error submitting form', error);
        alert('Error submitting form');
      }
    },
  });

  if (loading) {
    return <p>Loading order details...</p>; // Show loading message while data is fetched
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Show error message if there's an issue
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

      {/* Form Section */}
      <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-lg font-bold">SandBlasting Level:</label>
              <input
                type="text"
                name="sandBlastingLevel"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.sandBlastingLevel}
                onChange={formik.handleChange}
              />
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
              <label className="text-lg font-bold">Additional Notes / Image URL:</label>
              <input
                type="text"
                name="additionalNotes"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.additionalNotes}
                onChange={formik.handleChange}
              />
              {formik.errors.additionalNotes && formik.touched.additionalNotes && (
                <p className="text-red-500">{formik.errors.additionalNotes}</p>
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
