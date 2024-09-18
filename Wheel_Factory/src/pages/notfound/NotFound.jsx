import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const mode = localStorage.getItem("mode") || "dark";

  return (
    <div
      className= "h-screen w-full flex flex-col justify-center items-center gap-1 bg-c100" >
      404 Page Not Found
      <Link to={"/"} className="text-c500 underline">
        go to homepage
      </Link>
    </div>
  );
};

export default NotFound;