import React from 'react';

const ServiceCard = ({ title, description, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">        
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 text-base md:text-lg">{description}</p> 
      </div>
    </div>
  );
};

export default ServiceCard;
