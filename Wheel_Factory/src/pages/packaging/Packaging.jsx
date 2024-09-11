import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Packaging = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');
  const [ratingOptions, setRatingOptions] = useState([]);
  const navigate = useNavigate();

  // Fetch order ID, status, and rating options from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dummy API calls for orderId, status, and ratings
        const orderResponse = await axios.get('http://localhost:3000/api/order'); // Dummy endpoint
        const ratingResponse = await axios.get('http://localhost:3000/api/ratings'); // Dummy endpoint

        setOrderId(orderResponse.data.orderId);
        setStatus(orderResponse.data.status);
        setRatingOptions(ratingResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Formik for form handling and validation
  const formik = useFormik({
    initialValues: {
      rating: '',
      notes: '',
      image: null,
    },
    validationSchema: Yup.object({
      rating: Yup.string().required('Rating is required'),
      notes: Yup.string().required('Notes are required'),
      image: Yup.mixed().required('Proof of Inspection (image) is required'),
    }),
    onSubmit: async (values) => {
      // Prepare the data to send, including orderId and status from API
      const formData = new FormData();
      formData.append('orderId', orderId);
      formData.append('status', status);
      formData.append('rating', values.rating);
      formData.append('notes', values.notes);
      formData.append('image', values.image);

      try {
        // Post the form data to API
        await axios.post('http://localhost:3000/api/submitPackaging', formData); // Dummy API endpoint
        alert('Packaging task submitted successfully');
        navigate('/inventory');
      } catch (error) {
        console.error('Error submitting packaging task:', error);
        alert('Failed to submit the packaging task');
      }
    },
  });

  return (
    <div className="min-h-screen p-4">
      <header className="flex justify-between items-center rounded-md p-5 bg-black shadow-md border border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/workers/:userId')}
            className="border border-gray-300 text-white p-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition"
          >
            Prev
          </button>
          <h1 className="text-xl font-bold text-white">Level-4 PACKAGING</h1>
        </div>
        <button
          onClick={() => navigate('/')}
          className="border border-red-400 text-red-500 p-2 rounded-md shadow-sm hover:bg-red-100 transition"
        >
          Logout
        </button>
      </header>

      <main className="mt-2">
        <div className="bg-white p-5 rounded-md flex justify-between">
          <p className="text-lg font-bold">ORDER ID: {orderId}</p>
          <div>
            <label className="text-lg font-bold mr-2">STATUS: </label>
            <input
              type="text"
              value={status}
              readOnly
              className="border border-gray-300 p-2 rounded-md shadow-sm"
            />
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-5 rounded-md space-y-5"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-lg font-bold mb-2">Rating (1-5):</label>
              <select
                name="rating"
                value={formik.values.rating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 p-2 w-full rounded-md shadow-sm hover:border-gray-400 focus:ring focus:ring-gray-200 transition"
              >
                <option value="">Select Rating</option>
                {ratingOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
              {formik.errors.rating && formik.touched.rating && (
                <p className="text-red-500">{formik.errors.rating}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-bold mb-2">Notes:</label>
              <textarea
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 p-2 w-full rounded-md shadow-sm hover:border-gray-400 focus:ring focus:ring-gray-200 transition"
                rows="4"
              ></textarea>
              {formik.errors.notes && formik.touched.notes && (
                <p className="text-red-500">{formik.errors.notes}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-bold mb-2">Upload Image (Proof of Inspection):</label>
              <input
                type="file"
                name="image"
                onChange={(event) => {
                  formik.setFieldValue('image', event.currentTarget.files[0]);
                }}
                className="border border-gray-300 p-2 w-full rounded-md shadow-sm hover:border-gray-400 focus:ring focus:ring-gray-200 transition"
              />
              {formik.errors.image && formik.touched.image && (
                <p className="text-red-500">{formik.errors.image}</p>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-black font-bold text-white border h py-2 px-6 rounded-md shadow-md hover:bg-white hover:font-bold hover:text-black transition"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Packaging;
