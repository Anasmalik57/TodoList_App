import React from "react";

const Navbar = ({name}) => {
  return <nav className="flex justify-between text-lg px-20 py-4 bg-violet-800 text-white shadow-lg shadow-gray-400 mb-5 ">
    <div className="logo font-semibold tracking-wide">{name}</div>
    <ul className="flex gap-4">
        <li className="cursor-pointer hover:font-semibold transition-all">Home</li>
        <li className="cursor-pointer hover:font-semibold transition-all">Tasks</li>
        <li className="cursor-pointer hover:font-semibold transition-all">Completed</li>
    </ul>
  </nav>
};

export default Navbar;
