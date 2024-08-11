import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import leftImage from '../assets/img2.jpg';
import rightImage from '../assets/imp1.jpg';

const ImagePage = ({ leftImageSrc, rightImageSrc }) => {
  const [imagesLoaded, setImagesLoaded] = useState({ left: false, right: false });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  const handleImageLoad = (image) => {
    setImagesLoaded((prevState) => ({
      ...prevState,
      [image]: true,
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row sm:p-0 p-5 lg:p-20 overflow-x-hidden ">
      <Link to="/women" className="w-full sm:w-1/2 relative mb-4 sm:mr-4 p-6 sm:p-0" data-aos="fade-right">
        {!imagesLoaded.left && <Skeleton height="70vh" />}
        <img
          src={leftImageSrc}
          loading="lazy"
          alt="Left"
          className={`w-full h-auto sm:h-full object-cover rounded ${imagesLoaded.left ? '' : 'hidden'}`}
          style={{ maxHeight: '70vh' }}
          onLoad={() => handleImageLoad('left')}
          onError={() => handleImageLoad('left')} 
        />
        {imagesLoaded.left && (
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="pt-80 hover:text-blue-700 text-white font-bold py-2 px-4 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" data-aos="fade-up" data-aos-delay="1200">FEMMES</h1>
          </div>
        )}
      </Link>
      <Link to="/men" className="w-full sm:w-1/2 relative mb-4 sm:mr-4 p-6 sm:p-0" data-aos="fade-left">
        {!imagesLoaded.right && <Skeleton height="70vh" />}
        <img
          src={rightImageSrc}
          loading="lazy"
          alt="Right"
          className={`w-full h-auto sm:h-full object-cover rounded ${imagesLoaded.right ? '' : 'hidden'}`}
          style={{ maxHeight: '70vh' }}
          onLoad={() => handleImageLoad('right')}
          onError={() => handleImageLoad('right')} // In case of error, to stop the loading state
        />
        {imagesLoaded.right && (
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="pt-80 hover:text-blue-700 text-white font-bold py-2 px-4 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" data-aos="fade-up" data-aos-delay="1200">HOMMES</h1>
          </div>
        )}
      </Link>
    </div>
  );
};

const Nosmannequins = () => {
  return <ImagePage leftImageSrc={leftImage} rightImageSrc={rightImage} />;
};

export default Nosmannequins;
