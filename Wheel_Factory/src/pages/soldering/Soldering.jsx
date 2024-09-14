import  { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Soldering = () => {
  const navigate = useNavigate();
  const [sandBlastingLevels, setSandBlastingLevels] = useState([]);

  // Fetch dummy orderId and status from API (replace later with real API)
  const fetchOrderDetails = async () => {
    return {
      orderId: '12345', // Dummy order ID
      status: 'In Progress', // Dummy status
    };
  };

  // Fetch sandblasting levels from API
  useEffect(() => {
    const fetchSandBlastingLevels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sandblastinglevels'); // Dummy API
        setSandBlastingLevels(response.data);
      } catch (error) {
        console.error('Error fetching sandblasting levels', error);
      }
    };
    fetchSandBlastingLevels();
  }, []);

  // Formik with Yup validation
  const formik = useFormik({
    initialValues: {
      orderId: 'ORD001',
      status: '',
      sandBlastingLevel: '',
      solderingNote: '',
      image: null,
      additionalNotes: '',
    },
    validationSchema: Yup.object({
      sandBlastingLevel: Yup.string().required('Sandblasting level is required'),
      solderingNote: Yup.string().required('Soldering note is required'),
      image: Yup.mixed().required('Image is required'),
      additionalNotes: Yup.string().required('Additional notes are required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      try {
        await axios.post('http://localhost:3000/api/task', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Form submitted successfully!');
        navigate('/workers/:userId');
      } catch (error) {
        console.error('Error submitting form', error);
        alert('Error submitting form');
      }
    },
  });

  // Fetch order details and set them in the form
  useEffect(() => {
    const setOrderDetails = async () => {
      const { orderId, status } = await fetchOrderDetails();
      formik.setFieldValue('orderId', orderId);
      formik.setFieldValue('status', status);
    };
    setOrderDetails();
  }, []);

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
          <h1 className="text-xl text-white font-bold">SOLDERING</h1>
        </div>
        <button 
          className="border border-red-400 p-2 rounded-md font-bold text-red-500"
          onClick={() => navigate('/')}
        >
          LOGOUT
        </button>
      </header>

      <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-lg font-bold">Order Id:</label>
              <input 
                type="text" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.orderId}
                readOnly
              />
            </div>
            <div>
              <label className="text-lg font-bold">Status:</label>
              <input 
                type="text" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formik.values.status}
                readOnly
              />
            </div>
            <div>
              <label className="text-lg font-bold">SandBlasting Level:</label>
              <div className="mt-1 space-x-4">
                {sandBlastingLevels.map((level) => (
                  <label key={level.id}>
                    <input
                      type="radio"
                      name="sandBlastingLevel"
                      value={level.name}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    {level.name}
                  </label>
                ))}
              </div>
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
              />
              {formik.errors.image && formik.touched.image && (
                <p className="text-red-500">{formik.errors.image}</p>
              )}
            </div>

            <div>
              <label className="text-lg font-bold">Additional Notes:</label>
              <textarea
                name="additionalNotes"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-28"
                value={formik.values.additionalNotes}
                onChange={formik.handleChange}
              ></textarea>
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
