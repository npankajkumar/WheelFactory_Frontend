import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Packaging = () => {
  const [orderId, setOrderId] = useState("12345"); 
  const [status, setStatus] = useState("In Progress");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  const navigate=useNavigate();
    const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      orderId,
      status,
      rating,
      notes,
      image,
    });
  };

  return (
    <div className="min-h-screen  p-4">
      <header className="flex justify-between items-center rounded-md p-5 bg-black shadow-md border border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/workers/:userId')} 
            className="border border-gray-300 text-white p-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition"
          >
            Prev
          </button>
          <h1 className="text-xl font-bold text-white">Level-4  PACKAGING</h1>
        </div>
        <button onClick={()=>navigate('/')} className="border border-red-400 text-red-500 p-2 rounded-md shadow-sm hover:bg-red-100 transition">
          Logout
        </button>
      </header>

      <main className="mt-2 ">
        <div className="bg-white p-5   rounded-md flex justify-between">
          <p className="text-lg font-bold">ORDER ID: {orderId}</p>
          <div>
            <label className="text-lg font-bold mr-2">STATUS: </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 p-2 rounded-md shadow-sm"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-5  rounded-md space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-lg font-bold mb-2">Rating (1-5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded-md shadow-sm hover:border-gray-400 focus:ring focus:ring-gray-200 transition"
              />
            </div>

            <div>
              <label className="block text-lg font-bold mb-2">Notes:</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded-md shadow-sm hover:border-gray-400 focus:ring focus:ring-gray-200 transition"
              
              /> 
            </div>
            <div>
              <label className="block text-lg font-bold mb-2">Upload Image (Proof of Inspection):</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="border border-gray-300 p-2 w-full rounded-md shadow-sm hover:border-gray-400 focus:ring focus:ring-gray-200 transition"
              />
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
