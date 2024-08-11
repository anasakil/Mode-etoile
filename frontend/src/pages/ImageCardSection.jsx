import React from 'react';
import img1 from '../assets/imp1.jpg'
import img5 from '../assets/img5.jpg'
import img2 from '../assets/img2.jpg'

const ImageCardSection = () => {
  const images = [
    { src: img1, alt: 'Placeholder Image 1' },
    { src: img5, alt: 'Placeholder Image 2' },
    { src: img2, alt: 'Placeholder Image 3' },
    { src: img1, alt: 'Placeholder Image 4' },
  ];

  return (
    <div className="grid grid-cols-2 gap-20 p-12">
      {images.map((image, index) => (
        <div key={index} className="flex-shrink-0">
          <img src={image.src} alt={image.alt} className="rounded-lg shadow-lg object-cover w-full h-auto" />
        </div>
      ))}
    </div>
  );
};

export default ImageCardSection;
