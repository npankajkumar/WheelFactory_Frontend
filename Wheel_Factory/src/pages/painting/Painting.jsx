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
  const [paintTypes, setPaintTypes] = useState([]);
  const [paintColors, setPaintColors] = useState([]);

  // Fetch order details
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

  // Fetch paint types
  const fetchPaintTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5041/api/PaintTypes');  // Adjust endpoint if necessary
      setPaintTypes(response.data);
    } catch (error) {
      console.error("Error fetching paint types:", error);
      setError('Failed to load paint types. Please try again later.');
    }
  };

  const fetchPaintColors = async () => {
    try {
      const response = await axios.get('http://localhost:5041/api/Colors');  // Adjust endpoint if necessary
      setPaintColors(response.data);
    } catch (error) {
      console.error("Error fetching paint colors:", error);
      setError('Failed to load paint colors. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrderDetails();
      await fetchPaintTypes();
      await fetchPaintColors();
    };

    fetchData();
  }, [orderId]);

  const formik = useFormik({
    initialValues: {
      paint: '',
      typeOfPaint: '',
      notes: '',
      imageUrl: null,
    },
    validationSchema: Yup.object({
      paint: Yup.string().required('Paint is required'),
      typeOfPaint: Yup.string().required('Type of paint is required'),
      notes: Yup.string().required('Notes are required'),
      imageUrl: Yup.mixed().required('Image is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('orderId', orderDetails?.orderId || 0);
      formData.append('pColor', values.paint);
      formData.append('pType', values.typeOfPaint);
      formData.append('status', orderDetails?.status);
      formData.append('notes', values.notes);
      if (values.imageUrl) {
        formData.append('imageUrl', values.imageUrl);
      }
    
      try {
        await axios.post('http://localhost:5041/api/Task/painting', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Painting task submitted successfully');
        resetForm();
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
          onClick={() =>{localStorage.clear(); navigate('/')}}
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
            {/* Paint Color */}
            <div>
              <label className="text-lg font-bold text-black">Paint Color:</label>
              <select
                name="paint"
                className="mt-1 block w-full text-black p-2 border border-gray-300 rounded-md"
                value={formik.values.paint}
                onChange={formik.handleChange}
              >
                <option value="" label="Select paint color" />
                {paintColors.map((color) => (
                  <option key={color.id} >{color.pColor}
                    
                  </option>
                ))}
              </select>
              {formik.errors.paint && formik.touched.paint && (
                <p className="text-red-500">{formik.errors.paint}</p>
              )}
            </div>

            {/* Type of Paint */}
            <div>
              <label className="text-lg font-bold text-black">Type of Paint:</label>
              <select
                name="typeOfPaint"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.typeOfPaint}
                onChange={formik.handleChange}
              >
                <option value="" label="Select paint type" />
                {paintTypes.map((type) => (
                  <option key={type.id} >
                    {type.pType}
                  </option>
                ))}
              </select>
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

            {/* Image File */}
            <div>
              <label className="text-lg font-bold text-black">Upload Image:</label>
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
