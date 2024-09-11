import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Inventory = () => {
  const navigate = useNavigate();
  const [damageOptions, setDamageOptions] = useState([]);

  // Dummy API call to fetch damage types
  useEffect(() => {
    const fetchDamageTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/damageTypes'); // Dummy API
        setDamageOptions(response.data);
      } catch (error) {
        console.error('Error fetching damage types', error);
      }
    };

    fetchDamageTypes();
  }, []);

  const formik = useFormik({
    initialValues: {
      orderId: '12345', // Dummy orderId for now, will come from API later
      year: '',
      make: '',
      model: '',
      damageType: '',
      notes: '',
      image: null,
      status: 'Pending', // Dummy status for now, will come from API later
    },
    validationSchema: Yup.object({
      year: Yup.string().required('Year is required'),
      make: Yup.string().required('Make is required'),
      model: Yup.string().required('Model is required'),
      damageType: Yup.string().required('Damage Type is required'),
      notes: Yup.string().required('Notes are required'),
      image: Yup.mixed().required('Image is required'),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify("submit cliked"));
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      try {
        await axios.post('http://localhost:3000/completedOrders', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Order submitted successfully!');
        navigate('/inventory');
      } catch (error) {
        console.error('Error submitting form', error);
        alert('Error submitting form');
      }
    },
  });

  const handleScrap = async () => {
    const formData = new FormData();
    Object.keys(formik.values).forEach((key) => {
      formData.append(key, formik.values[key]);
    });
    try {
      await axios.post('http://localhost:3000/scrapOrders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Order marked as scrap!');
      navigate('/inventory');
    } catch (error) {
      console.error('Error submitting scrap form', error);
      alert('Error submitting scrap form');
    }
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md border border-gray-200">
        <div className="flex space-x-4">
          <button
            className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition"
            onClick={() => navigate('/workers/:userId')}
          >
            PREVIOUS
          </button>
          <h1 className="text-xl text-white pt-1 font-bold">LEVEL-1 INVENTORY MANAGEMENT</h1>
        </div>
        <button
          className="border border-red-400  hover:text-black p-2 rounded-md shadow-sm font-bold text-red-500 hover:bg-red-600 transition"
          onClick={() => navigate('/')}
        >
          LOGOUT
        </button>
      </header>
      <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-lg font-bold text-black">
                Order Id:
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                value={formik.values.orderId}
                readOnly
              />
            </div>
            <div>
              <label className="text-lg font-bold text-black">Year:</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                name="year"
                value={formik.values.year}
                onChange={formik.handleChange}
              />
              {formik.errors.year && formik.touched.year && (
                <p className="text-red-500">{formik.errors.year}</p>
              )}
            </div>
            
            <div>
              <label className="text-lg font-bold text-black">Make:</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                name="make"
                value={formik.values.make}
                onChange={formik.handleChange}
              />
              {formik.errors.make && formik.touched.make && (
                <p className="text-red-500">{formik.errors.make}</p>
              )}
            </div>
            <div>
              <label className="text-lg font-bold text-black">Model:</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                name="model"
                value={formik.values.model}
                onChange={formik.handleChange}
              />
              {formik.errors.model && formik.touched.model && (
                <p className="text-red-500">{formik.errors.model}</p>
              )}
            </div>
            {/* <div>
              <label className="text-lg font-bold text-black">
                Status:
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                value={formik.values.status}
                readOnly
              />
            </div> */}
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-lg font-bold text-black">
                Damage Type:
              </label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                name="damageType"
                value={formik.values.damageType}
                onChange={formik.handleChange}
              >
                <option value="">Select</option>
                <option value="hii">hiii</option>
                {damageOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formik.errors.damageType && formik.touched.damageType && (
                <p className="text-red-500">{formik.errors.damageType}</p>
              )}
            </div>
            <div>
              <label className="text-lg font-bold text-black">Notes:</label>
              <textarea
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black h-28"
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
              ></textarea>
              {formik.errors.notes && formik.touched.notes && (
                <p className="text-red-500">{formik.errors.notes}</p>
              )}
            </div>
            
            <div>
              <label className="text-lg font-bold text-black">Image:</label>
              <input
                type="file"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
              />
              {formik.errors.image && formik.touched.image && (
                <p className="text-red-500">{formik.errors.image}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            type="submit"
            // className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm bg-black px-4 py-2"
            className='border-2 border-teal-500 text-black
             font-bold px-4 py-2 rounded hover:bg-teal-500 hover:text-black transition ease-in-out duration-300'
          >
            Submit
          </button>
          <button
            type="submit"
            // onClick={handleScrap}
            className='border-2 border-red-400 text-black
             font-bold px-4 py-2 rounded hover:bg-red-500 hover:text-black transition ease-in-out duration-300'
          >
            Scrap
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inventory;
