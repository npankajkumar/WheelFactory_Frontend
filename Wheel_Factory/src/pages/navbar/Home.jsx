import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <header className="bg-gray-800 flex text-white p-4">
        <h3 className="text-xl flex font-bold">WHEEL FACTORY</h3>
        <ul className="list-none  p-2 ">
          <li>
            <Link to={"/inventory"} className="text-blue-300 hover:underline">
              INVENTORY
            </Link>
          </li>
          <li>
            {" "}
            <Link to={"/soldering"} className="text-blue-300 hover:underline">
              SOLDERING
            </Link>
          </li>
          <li>
            {" "}
            <Link to={"/packaging"} className="text-blue-300 hover:underline">
              Packging
            </Link>
          </li>
        </ul>
      </header>
      <div className="h-full bg-cover bg-center">
        <img src="public\bg-images\home.jpg" />

        {/* Other content here */}
      </div>
    </>
  );
};

export default Home;
