import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <h3 className="text-xl font-bold">WHEEL FACTORY</h3>
        <ul className="list-none">
          <li>
            <Link to={'/inventory'} className="text-blue-300 hover:underline">INVENTORY</Link>
            <Link to={'/soldering'} className="text-blue-300 hover:underline">SOLDERING</Link>

          </li>
        </ul>
      </header>
      <div 
        className="h-full bg-cover bg-center" >
       <img src="public\bg-images\home.jpg"/>
      
        {/* Other content here */}
      </div>
    </>
  )
}

export default Home
