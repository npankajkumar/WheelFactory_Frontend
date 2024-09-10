import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Painting = () => {
  const [orderId, setOrderId] = useState('');
  const [paint, setPaint] = useState('');
  const [typeOfPaint, setTypeOfPaint] = useState('powder');
  const [status, setStatus] = useState('inprogress');
  const [notes, setNotes] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!orderId || !paint || !typeOfPaint || !status || !notes) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    const payload = {
      orderId,
      paint,
      typeOfPaint,
      status,
      notes,
    };

    try {
      await axios.post('http://localhost:3000/completedOrders', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setOrderId('');
      setPaint('');
      setTypeOfPaint('powder');
      setStatus('inprogress');
      setNotes('');

      alert('Painting details submitted successfully!');
      navigate('/painting');
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
          <h1 className="text-xl text-white pt-1 font-bold">LEVEL-3 PAINTING</h1>
        </div>
        <button 
          className="border border-red-400 p-2 rounded-md shadow-sm font-bold text-red-500 hover:bg-red-100 transition"
          onClick={() => navigate('/')}
        >
          LOGOUT
        </button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-lg font-bold mr-2">Order ID</label>
            <input 
              type="text" 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-bold mr-2">Paint Color</label>
            <input 
              type="text" 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black" 
              placeholder="Enter paint color (e.g., chrome, gray, black)"
              value={paint}
              onChange={(e) => setPaint(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-bold mr-2">Type of Paint</label>
            <select 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black" 
              value={typeOfPaint}
              onChange={(e) => setTypeOfPaint(e.target.value)}
            >
              <option value="powder">Powder</option>
              <option value="urethane">Urethane</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-lg font-bold mr-2">Status</label>
            <select 
              className="block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black" 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="text-lg font-bold mr-2">Notes</label>
            <textarea 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black" 
              rows="4" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </div>
       
      <div className="mt-5 flex justify-center">
        <button 
          className="bg-black text-white p-3 rounded-md shadow-md hover:bg-gray-800 transition"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Painting;
