import React from 'react';
import Imagecard from './Imagecard';

const Hero = () => {
  return (
    <div className="grid grid-cols-2 items-center gap-4 mt-4">
      {/* Left content - 1st column */}
      <div className='w-1/2'>
        <div className="text-[50px]">
          <h2>Fastest Delivery to Your City</h2>
        </div>
        <div className="text-2xl mt-4">
         
            Lorem ipsum dolor sit amet , consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           
        </div>
        <div className="flex space-x-8 mt-6">
          <div className="bg-cyan-400 text-black py-3 px-8 rounded-full font-bold shadow-lg shadow-cyan-500">
            <button>Get Started</button>
          </div>
          <div className="bg-transparent text-white py-3 px-8 rounded-full font-bold shadow-md shadow-cyan-500">
            <button>Order Pressed</button>
          </div>
        </div>
      </div>

      {/* Right image component - 2nd column */}
      <div className='ml-[200px]'>
        <Imagecard />
      </div>
    </div>
  );
};

export default Hero;
