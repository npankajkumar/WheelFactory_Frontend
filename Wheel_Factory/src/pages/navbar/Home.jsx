import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../login/Login";

const Home = () => {
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate('/login');
  };
  return (
    <>
      <header className="bg-blue-950 flex items-center justify-between text-white p-4" style={{ backgroundColor: '#130f40' }}>
        <h3 className="text-xl font-bold">THE WHEEL FACTORY</h3>
        <ul className="flex list-none space-x-4 p-2">
          <li>
            <Link to={"/inventory"} className="text-white hover:underline">
              INVENTORY
            </Link>
          </li>
          <li>
            <Link to={"/soldering"} className="text-white hover:underline">
              SOLDERING
            </Link>
          </li>
          <li>
            <Link to={"/packaging"} className="text-white hover:underline">
              PACKAGING
            </Link>
          </li>
          <li>
            <Link to={"/painting"} className="text-white hover:underline">
              PAINTING
            </Link>
          </li>
        </ul>
        <button className="bg-teal-500 text-white font-bold px-4 py-2 rounded" onClick={loginHandler}>
          LOGIN
        </button>
      </header>
      <div className="relative h-screen bg-cover bg-center bg-gray-800">
      <img src="public/bg-images/wheel.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex justify-center  bg-blue-950 "></div>
      <div className="grid grid-cols-3 gap-4 p-8 bg-blue-950">
      <div className="text-center">
      <h2 className="text-white mb-2 text-xl font-extrabold underline decoration-4 decoration-teal-500">INVENTORY MANAGEMENT</h2>
        <img
          src="public/bg-images/car2.jpg"
          width={400}
          height={300}
          alt="Image 1"
          className="rounded-lg object-cover"
          style={{ aspectRatio: "400/300", objectFit: "cover" }}
        />
        </div>
        <div className="text-center">
      <h2 className="text-white mb-2 text-xl font-extrabold underline decoration-4 decoration-teal-500">SOLDERING AND SANBLASTING</h2>
        <img
          src="public/bg-images/car3.jpg"
          width={400}
          height={300}
          alt="Image 2"
          className="rounded-lg object-cover "
          style={{ aspectRatio: "400/300", objectFit: "cover" }}
        />
        </div>
        <div className="text-center">
      <h2 className="text-white mb-2 text-xl font-extrabold underline decoration-4 decoration-teal-500">PACKAGING AND DELIVERY <i class="fa fa-bold" aria-hidden="true"></i></h2>
        <img
          src="public/bg-images/car1.jpg"
          width={400}
          height={300}
          alt="Image 2"
          className="rounded-lg object-cover"
          style={{ aspectRatio: "400/300", objectFit: "cover" }}
        />
        </div>
      </div>
    <footer className="w-full border-t-4 border-teal-400 pt-8 pb-12 bg-blue-950">
    <div className="container max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
    <div className="text-center sm:text-left">
      <h4 className="text-xl font-bold text-teal-400 ">Wheel Factory</h4>
      <p className="text-white text-lg">Remanufacturing quality products since 1985.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
      <div>
        <h5 className="text-xl font-bold text-teal-400 mb-2">Partners</h5>
        <ul className="space-y-1 text-lg text-white">
          <li>KIA</li>
          <li>HONDIA</li>
          <li>TATA</li>
          <li>BMW</li>
          <li>MERCEDES</li>
        </ul>
      </div>
      <div>
        <h5 className="text-xl font-bold text-teal-400 mb-2">Contact Us</h5>
        <ul className="space-y-1 text-lg text-white font-sans">
          <li>Email: contact@wheelfactory.com</li>
          <li>Phone: +1 (123) 456-7890</li>
        </ul>
      </div>
      <div>
        <h5 className="text-xl font-bold text-teal-400 mb-2">Head Office</h5>
        <p className="space-y-1 text-lg text-white">
          123 Main Street<br />
          Anytown, USA 12345<br />
          Open: Mon-Fri, 9 AM - 5 PM
        </p>
      </div>
    </div>
  </div>
</footer>
    <div className="bg-blue-950 text-white p-4 flex justify-center font-bold" style={{ backgroundColor: "#130f40" }}>
        <p>&copy; 2023 The Wheel Factory. All rights reserved.</p>
      </div>
    
     </>
  );
};

export default Home;
