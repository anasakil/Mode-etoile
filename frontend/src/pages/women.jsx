import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import Loader from './loading';
import api  from '../utils/api';


const Women = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 500 });
    fetchImagesFromAPI();
  }, []);

  const fetchImagesFromAPI = async () => {
    try {
      const response = await fetch(`${api}/api/images`);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const imageData = await response.json();
      setImages(imageData);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(true); 
    }
  };

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl pb-10 mx-auto mb-10 mt-40">
      {images.map((image, index) => (
        <div
          key={index}
          className="flex-shrink-0 cursor-pointer relative image-container"
          data-aos="fade-up"
          onClick={() => handleClick(image._id)}
        >
          <img
            loading="lazy"
            src={`${api}${image.images[0].url}`}
            alt={image.name}
            className="rounded-lg shadow-lg object-cover w-full h-auto"
          />
          <div className="description-container">
            <p className="description">
              {image.name}
              <br />
              {image.description}
            </p>
          </div>
        </div>
      ))}
      <style jsx>{`
        .description-container {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 0 0 10px 10px;
          overflow: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(1px);
        }

        .description {
          margin: 0;
          padding: 5px;
          color: black;
          text-align: center;
          transition: padding 0.1s ease, height 0.1s ease;
        }

        .image-container:hover .description-container {
          height: max-content;
          padding: 10px;
          backdrop-filter: blur(5px);
        }
      `}</style>
    </div>
  );
};

export default Women;
