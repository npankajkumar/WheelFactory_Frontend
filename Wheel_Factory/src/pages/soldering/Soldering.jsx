import React, { useState } from 'react';

const Soldering = () => {
  // State to store form values
  const [orderId, setOrderId] = useState("12345"); // Sample order ID from backend
  const [status, setStatus] = useState("In Progress"); // Default status
  const [sandBlastingLevel, setSandBlastingLevel] = useState("");
  const [solderingNote, setSolderingNote] = useState("");
  const [image, setImage] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Handler for image upload
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the data to the backend
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
    <div className="h-screen bg-gray-100 ">
      {/* Header */}
      <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md border border-gray-200">
        <div className="flex space-x-4">
          <button className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition">
            Prev
          </button>
          <h1 className="text-xl text-white pt-1 font-bold">LEVEL 2 - Soldering and SandBlasting</h1>
        </div>
        <button className="border  font-bold  border-red-400 p-2 rounded-md shadow-sm text-red-500 hover:bg-red-300 hover:text-black transition">
          Logout
        </button>
      </header>

      {/* Body */}
      <main className="h-screen">
        {/* First Division */}
        <div className="bg-white p-5 shadow-md border border-gray-200 rounded-md flex justify-between">
          <div>
            <p className="text-lg font-bold">ORDER ID: {orderId}</p>
          </div>
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

        {/* Second Division - Main Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 shadow-md border border-gray-200 rounded-md space-y-5 h-svh"
        >
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Left Side */}
            <div className="flex-1 space-y-5">
              {/* SandBlasting Level */}
              <div>
                <label className="block text-lg font-bold mb-2">
                  SandBlasting Level:
                </label >
                <div className="space-x-4">
                  <label className='text-xl'>
                    <input
                      type="radio"
                      name="sandBlastingLevel"
                      value="Low"
                      onChange={(e) => setSandBlastingLevel(e.target.value)}
                      className="mr-2"
                    />
                    Low
                  </label>
                  
                  <label className='text-xl'>
                    <input
                      type="radio"
                      name="sandBlastingLevel"
                      value="Medium"
                      onChange={(e) => setSandBlastingLevel(e.target.value)}
                      className="mr-2"
                    />
                    Medium
                  </label>
                  <label className='text-xl'>
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
              <br />
              {/* Soldering Note */}
              <div>
                <label className="block text-lg font-bold mb-2">
                  Soldering Note:
                </label>
                <input
                  type="text"
                  value={solderingNote}
                  onChange={(e) => setSolderingNote(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md shadow-sm"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 space-y-5">
              {/* Upload Image */}
              <div>
                <label className="block text-lg font-bold mb-2">
                  Upload Image:
                </label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="border border-gray-300 p-2 rounded-md shadow-sm w-full"
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-lg font-bold mb-2">Add Notes:</label>
                <input
                  type="text"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-gray-900 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Soldering;
