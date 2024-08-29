import React from 'react';
import Logo from '../assets/food.png'

const Navbar = () => {
  return (
    <nav className="bg-greenbg  text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-[100px] w-[100px]"
              src={Logo}
              alt="Logo"
              
            />
          </div>

          {/* Navbar Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#"
                className="text-white hover:text-cyan-500 px-3 py-2 rounded-md text-md font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white hover:text-cyan-500 px-3 py-2 rounded-md text-md font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-white hover:text-cyan-500 px-3 py-2 rounded-md text-md font-medium"
              >
                Services
              </a>
              <a
                href="#"
                className="text-white hover:text-cyan-500 px-3 py-2 rounded-md text-md font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
