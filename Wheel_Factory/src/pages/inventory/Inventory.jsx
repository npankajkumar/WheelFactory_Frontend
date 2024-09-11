import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Inventory = () => {
  const [orderId, setOrderId] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [damageType, setDamageType] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('orderId', orderId);
    formData.append('year', year);
    formData.append('make', make);
    formData.append('model', model);
    formData.append('damageType', damageType);
    formData.append('notes', notes);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:3000/completedOrders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setOrderId('');
      setYear('');
      setMake('');
      setModel('');
      setDamageType('');
      setNotes('');
      setImage(null);
      alert('Order added successfully!');
      navigate('/inventory');
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Error submitting form');
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
          className="border border-red-400 p-2 rounded-md shadow-sm font-bold text-red-500 hover:bg-red-100 transition"
          onClick={() => navigate('/')}
        >
          LOGOUT
        </button>
      </header>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-lg font-bold text-black">
                Order Id:
              </label>
              <input 
                type="text" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <div>
              <label className="text-lg font-bold text-black">
                Year:
              </label>
              <input 
                type="text" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black" 
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div>
              <label className="text-lg font-bold text-black">
                Make:
              </label>
              <input 
                type="text" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black" 
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
            </div>
            <div>
              <label className="text-lg font-bold text-black">
                Model:
              </label>
              <input 
                type="text" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black" 
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-lg font-bold text-black">
                DamageType:
              </label>
              <select 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                value={damageType}
                onChange={(e) => setDamageType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="CHIPPED">Chipped</option>
                <option value="PAINT FADE">Paint Fade</option>
                <option value="LIP CRACK">Lip Crack</option>
                <option value="TO BE SCRAPPED">To be Scrapped</option>
              </select>
            </div>
            <div>
              <label className="text-lg font-bold text-black">
                Notes:
              </label>
              <textarea 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black h-28"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="text-lg font-bold text-black">
                Image:
              </label>
              <input 
                type="file" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black" 
                onChange={handleImageChange}
              />
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

export default Inventory;

