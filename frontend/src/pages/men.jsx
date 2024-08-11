import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import 'aos/dist/aos.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import img1 from '../assets/imp1.jpg';
import img9 from '../assets/img9 (2).jpg';
import img10 from '../assets/img11.jpg';
import img112 from '../assets/img3.jpg';
import img113 from '../assets/téléchargement (1).png';

const Men = () => {
  const [imagesLoaded, setImagesLoaded] = useState(Array(17).fill(false));
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const handleImageLoad = (index) => {
    setImagesLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const images = [
    { src: img113, alt: 'Placeholder Image 1' },
    { src: img9, alt: 'Placeholder Image 2' },
    { src: img112, alt: 'Placeholder Image 3' },
    { src: img10, alt: 'Placeholder Image 4' },
    { src: img1, alt: 'Placeholder Image 5' },
    { src: img10, alt: 'Placeholder Image 6' },
    { src: img1, alt: 'Placeholder Image 7' },
    { src: img112, alt: 'Placeholder Image 8' },
    { src: img10, alt: 'Placeholder Image 9' },
    { src: img1, alt: 'Placeholder Image 10' },
    { src: img1, alt: 'Placeholder Image 11' },
    { src: img113, alt: 'Placeholder Image 12' },
    { src: img10, alt: 'Placeholder Image 13' },
    { src: img1, alt: 'Placeholder Image 14' },
    { src: img112, alt: 'Placeholder Image 15' },
    { src: img10, alt: 'Placeholder Image 16' },
    { src: img1, alt: 'Placeholder Image 17' },
  ];

  return (
    <div
      className={`w-full min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="max-w-5xl mx-auto pb-10  p-6 md:p-8">
        <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 750: 3, 900: 4}}>
          <Masonry gutter="10px">
            {images.map((image, index) => (
              <div key={index} className="relative">
                {!imagesLoaded[index] && <Skeleton height={400} />}
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`rounded-lg shadow-lg object-cover w-full h-auto transition-transform duration-600 transform hover:scale-105 ${imagesLoaded[index] ? '' : 'hidden'}`}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageLoad(index)}
                />
                {imagesLoaded[index] && (
                  <p style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '5px', zIndex: 1 }}>
                    {image.alt}
                  </p>
                )}
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default Men;
