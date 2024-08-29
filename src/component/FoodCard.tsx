import React from "react";

const FoodCard = ({ imageSrc, title, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-md flex justify-center items-center shadow-cyan-500 m-2 p-2">
      <img className="w-[100px] h-[100px]" src={imageSrc} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-white text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FoodCard;
