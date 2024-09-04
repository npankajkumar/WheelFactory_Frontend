import React, { useState } from 'react';

const Packaging = () => {
  // State to store form values
  const [orderId, setOrderId] = useState("12345"); // Placeholder Order ID
  const [status, setStatus] = useState("In Progress");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call the APIs to send the data
    console.log({
      orderId,
      status,
      rating,
      notes,
      image,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* Header */}
      <header className="flex justify-between items-center p-5 bg-white shadow-md border border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => console.log("Redirect to previous page")}
            className="border border-gray-300 p-2 rounded-md shadow-sm hover:bg-gray-200 transition"
          >
            Prev
          </button>
          <h1 className="text-xl font-bold">Level -3 Packaging</h1>
        </div>
        <button className="border border-red-400 p-2 rounded-md shadow-sm text-red-500 hover:bg-red-100 transition">
          Logout
        </button>
      </header>

      {/* Body */}
      <main className="mt-8 space-y-8">
        {/* Order ID and Status */}
        <div className="bg-white p-5 shadow-md border border-gray-200 rounded-md flex justify-between">
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

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 shadow-md border border-gray-200 rounded-md space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rating Input */}
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

            {/* Notes Input */}
            <div>
              <label className="block text-lg font-bold mb-2">Notes:</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded-md shadow-sm hover:border-gray-400 focus:ring focus:ring-gray-200 transition"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-lg font-bold mb-2">Upload Image (Proof of Inspection):</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="border border-gray-300 p-2 w-full rounded-md shadow-sm hover:border-gray-400 focus:ring focus:ring-gray-200 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-600 transition"
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
