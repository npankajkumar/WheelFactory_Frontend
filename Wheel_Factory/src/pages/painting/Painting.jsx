import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Painting = () => {
  const navigate = useNavigate();
  const [paintOptions, setPaintOptions] = useState([]);
  const [typeOfPaintOptions, setTypeOfPaintOptions] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');

  // Fetch paint options and type of paint options from APIs
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch paint options
        const paintResponse = await axios.get('http://localhost:3000/api/paints'); // Dummy API
        setPaintOptions(paintResponse.data);

        // Fetch type of paint options
        const typeOfPaintResponse = await axios.get('http://localhost:3000/api/painttypes'); // Dummy API
        setTypeOfPaintOptions(typeOfPaintResponse.data);

        // Fetch order details (orderId and status)
        const orderResponse = await axios.get('http://localhost:3000/api/order'); // Dummy API
        setOrderId(orderResponse.data.orderId);
        setStatus(orderResponse.data.status);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const formik = useFormik({
    initialValues: {
      orderId: orderId || '',
      paint: '',
      typeOfPaint: '',
      status: status || '',
      notes: '',
      image: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      paint: Yup.string().required('Paint is required'),
      typeOfPaint: Yup.string().required('Type of paint is required'),
      notes: Yup.string().required('Notes are required'),
      image: Yup.mixed().required('Image is required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('orderId', values.orderId);
      formData.append('paint', values.paint);
      formData.append('typeOfPaint', values.typeOfPaint);
      formData.append('status', values.status);
      formData.append('notes', values.notes);
      formData.append('image', values.image);

      try {
        await axios.post('http://localhost:3000/api/task', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Painting task submitted successfully');
        navigate('/inventory');
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
            onClick={() => navigate('/workers/:userId')}
          >
            PREVIOUS
          </button>
          <h1 className="text-xl text-white pt-1 font-bold">LEVEL-3 PAINTING</h1>
        </div>
        <button
          className="border border-red-400 p-2 rounded-md shadow-sm font-bold text-red-500"
          onClick={() => navigate('/')}
        >
          LOGOUT
        </button>
      </header>

      <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            {/* Order ID */}
            <div>
              <label className="text-lg font-bold text-black">Order Id:</label>
              <input
                type="text"
                name="orderId"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.orderId}
                readOnly
              />
            </div>

            {/* Paint */}
            <div>
              <label className="text-lg font-bold text-black">Paint:</label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                name="paint"
                value={formik.values.paint}
                onChange={formik.handleChange}
              >
                <option value="">Select</option>
                {paintOptions.map((paint) => (
                  <option key={paint.id} value={paint.name}>
                    {paint.name}
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                name="typeOfPaint"
                value={formik.values.typeOfPaint}
                onChange={formik.handleChange}
              >
                <option value="">Select</option>
                {typeOfPaintOptions.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
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
            {/* Status */}
            <div>
              <label className="text-lg font-bold text-black">Status:</label>
              <input
                type="text"
                name="status"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.status}
                readOnly
              />
            </div>

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

            {/* Image Upload */}
            <div>
              <label className="text-lg font-bold text-black">Upload Image:</label>
              <input
                type="file"
                name="image"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                onChange={(event) => {
                  formik.setFieldValue('image', event.currentTarget.files[0]);
                }}
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
