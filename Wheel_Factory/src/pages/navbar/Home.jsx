import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../login/Login";

const Home = () => {
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/login");
  };
  return (
    <>
      <header className="bg-white bg-opacity-10 backdrop-blur-lg flex items-center justify-between text-white p-4 fixed w-full z-10">
        <h3 className="text-xl text-black font-bold">THE WHEEL FACTORY</h3>
        <ul className="flex list-none space-x-4 p-2">
          <li>
            <Link
              to={"/inventory"}
              className="text-white font-bold hover:underline"
            >
              INVENTORY
            </Link>
          </li>
          <li>
            <Link
              to={"/soldering"}
              className="text-white font-bold hover:underline"
            >
              SOLDERING
            </Link>
          </li>
          <li>
            <Link
              to={"/packaging"}
              className="text-white font-bold hover:underline"
            >
              PACKAGING
            </Link>
          </li>
          <li>
            <Link
              to={"/painting"}
              className="text-white font-bold hover:underline"
            >
              PAINTING
            </Link>
          </li>
        </ul>
        <button
          className="border-2 border-teal-500 text-white font-bold px-4 py-2 rounded hover:bg-teal-500 hover:text-black transition ease-in-out duration-300"
          onClick={loginHandler}
        >
          LOGIN
        </button>
      </header>
      <div className="relative h-screen bg-cover bg-center bg-gray-800">
        <img
          src="public/bg-images/wheel.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center  bg-blue-950 "></div>
      {/* <div className="grid grid-cols-3 gap-4 p-8 bg-blue-950">
        <div className="text-center">
          <h2 className="text-white mb-2 text-xl font-extrabold underline decoration-4 decoration-teal-500">
            INVENTORY MANAGEMENT
          </h2>
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
          <h2 className="text-white mb-2 text-xl font-extrabold underline decoration-4 decoration-teal-500">
            SOLDERING AND SANBLASTING
          </h2>
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
          <h2 className="text-white mb-2 text-xl font-extrabold underline decoration-4 decoration-teal-500">
            PACKAGING AND DELIVERY <i class="fa fa-bold" aria-hidden="true"></i>
          </h2>
          <img
            src="public/bg-images/car1.jpg"
            width={400}
            height={300}
            alt="Image 2"
            className="rounded-lg object-cover"
            style={{ aspectRatio: "400/300", objectFit: "cover" }}
          />
        </div>
      </div> */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 bg-blue-950">
        {[
          { title: "INVENTORY MANAGEMENT", image: "public/bg-images/car1.jpg" },
          { title: "SOLDERING AND SANDBLASTING", image: "public/bg-images/car2.jpg" },
          { title: "PACKAGING AND DELIVERY", image: "public/bg-images/car3.jpg" },
        ].map((item, index) => (
          <>
          {/* <h2 className="text-white mb-2 text-xl font-extrabold underline decoration-4 decoration-teal-500">
            PACKAGING AND DELIVERY <i class="fa fa-bold" aria-hidden="true"></i>
          </h2> */}
          <div key={index} className="group relative w-full h-full">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-75 transition-all duration-500 ease-in-out rounded-lg"></div>
            
            <img
              src={item.image}
              alt={item.title}
              className="rounded-lg w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:rotate-y-180"
            />
            <div className="absolute inset-0 flex justify-center items-center text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {item.title}
            </div>
          </div>
          </>
        ))}
      </div>
      <footer className="w-full border-t-4 border-teal-400 pt-8 pb-12 bg-blue-950">
        <div className="container max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold text-teal-400 ">Wheel Factory</h4>
            <p className="text-white text-lg">
              Remanufacturing quality products since 1985.
            </p>
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
              <h5 className="text-xl font-bold text-teal-400 mb-2">
                Contact Us
              </h5>
              <ul className="space-y-1 text-lg text-white font-sans">
                <li>Email: contact@wheelfactory.com</li>
                <li>Phone: +1 (123) 456-7890</li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-bold text-teal-400 mb-2">
                Head Office
              </h5>
              <p className="space-y-1 text-lg text-white">
                123 Main Street
                <br />
                Anytown, USA 12345
                <br />
                Open: Mon-Fri, 9 AM - 5 PM
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div
        className="bg-blue-950 text-white p-4 flex justify-center font-bold"
        style={{ backgroundColor: "#130f40" }}
      >
        <p>&copy; 2023 The Wheel Factory. All rights reserved.</p>
      </div>
    </>
  );
};

export default Home;
