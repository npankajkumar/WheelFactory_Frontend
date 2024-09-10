import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Soldering = () => {
  const [orderId, setOrderId] = useState("12345");
  const [status, setStatus] = useState("In Progress");
  const [sandBlastingLevel, setSandBlastingLevel] = useState("");
  const [solderingNote, setSolderingNote] = useState("");
  const [image, setImage] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      orderId,
      status,
      sandBlastingLevel,
      solderingNote,
      image,
      additionalNotes,
    });
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
          <h1 className="text-xl text-white pt-1 font-bold">LEVEL-2 SOLDERING</h1>
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
                Status:
              </label>
              <select 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="text-lg font-bold text-black">
                SandBlasting Level:
              </label>
              <div className="mt-1 space-x-4">
                <label>
                  <input
                    type="radio"
                    name="sandBlastingLevel"
                    value="Low"
                    onChange={(e) => setSandBlastingLevel(e.target.value)}
                    className="mr-2"
                  />
                  Low
                </label>
                <label>
                  <input
                    type="radio"
                    name="sandBlastingLevel"
                    value="Medium"
                    onChange={(e) => setSandBlastingLevel(e.target.value)}
                    className="mr-2"
                  />
                  Medium
                </label>
                <label>
                  <input
                    type="radio"
                    name="sandBlastingLevel"
                    value="High"
                    onChange={(e) => setSandBlastingLevel(e.target.value)}
                    className="mr-2"
                  />
                  High
                </label>
              </div>
            </div>
            <div>
              <label className="text-lg font-bold text-black">
                Soldering Note:
              </label>
              <input 
                type="text" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black" 
                value={solderingNote}
                onChange={(e) => setSolderingNote(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-lg font-bold text-black">
                Upload Image:
              </label>
              <input 
                type="file" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black" 
                onChange={handleImageUpload}
              />
            </div>
            <div>
              <label className="text-lg font-bold text-black">
                Additional Notes:
              </label>
              <textarea 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black h-28"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              ></textarea>
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
