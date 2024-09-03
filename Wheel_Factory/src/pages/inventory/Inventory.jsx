import React from 'react'

const Inventory = () => {
  return (
    <div classname="p-4">
    <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md border border-gray-200">
    <div className="flex space-x-4">
    <button className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition">PREVIOUS
    </button>
    <h1 className="text-xl text-white pt-1 font-bold">LEVEL-1 INVENTORY MANAGEMENT</h1>
    </div>
    <button className="border border-red-400 p-2 rounded-md shadow-sm font-bold text-red-500 hover:bg-red-100 transition">LOGOUT</button>
    </header>
   <form className="mt-4 space-y-4">
        <div className="flex space-x-4">
          <label className="block text-black">
            YEAR:
            <input type="text" className="block w-full rounded mt-1 p-1 border  border-gray-500" />
          </label>
          <label className="block text-black">
            MAKE:
            <input type="text" className="block w-full rounded mt-1 p-1 border border-gray-500" />
          </label>
          <label className="block text-black">
            MODEL:
            <input type="text" className="block w-full rounded mt-1 p-1 border  border-gray-500" />
          </label>
        </div>
        <label className="block text-black">
          DAMAGETYPE:
          <select className="block w-full rounded mt-1 p-1 border  border-gray-500">
          <option value="">SELECT</option>
            <option value="">CHIPPED</option>
            <option value="">PAIN FADE</option>
            <option value="">LIP CRACK</option>
            <option value="">TO BE SCRAPPED</option>
          </select>
        </label>
        <label className="block text-black">
         NOTES
          <textarea className="block w-full rounded mt-1 p-2 border  border-gray-500 h-15"></textarea>
        </label>
        <label className="block text-black">
          IMAGE
          <input type="file" className="block w-full rounded mt-1 p-2 border  border-gray-500" />
        </label>
        <button type="submit" className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm  bg-black  px-4 py-2 mt-4 block mx-auto">SUBMIT</button>
      </form>
      </div>
  )
}

export default Inventory