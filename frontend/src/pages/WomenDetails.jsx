import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loader from './loading';
import api  from '../utils/api';


const DComponent = () => {
  const { id } = useParams();
  const [imageData, setImageData] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [animateImageChange, setAnimateImageChange] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchImageDetail(id);
  }, [id]);

  const fetchImageDetail = async (id) => {
    try {
      const response = await axios.get(`${api}/api/images/${id}`);
      setImageData(response.data);
    } catch (error) {
      console.error('Error fetching image details:', error);
    }
  };

  const handleThumbnailClick = (index) => {
    setAnimateImageChange(true); 
    setTimeout(() => {
      setMainImageIndex(index); 
      setAnimateImageChange(false); 
    }, 500); 

    AOS.refresh();
  };

  if (!imageData) {
    return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  }

  return (
    <div className="flex flex-col md:flex-row p-4 mt-28 mb-14">
      <div className="flex flex-col items-center md:w-1/2">
        <img
          style={{
            width: '32rem',
            height: 'auto',
            objectFit: 'cover',
            marginBottom: '1rem',
            borderRadius: '10px',
            imageRendering: 'auto',
            transition: 'opacity 0.5s ease', 
            opacity: animateImageChange ? 0 : 1,

          }}
          src={`${api}${imageData.images[mainImageIndex].url}`}
          alt={`${imageData.name}`}
          crossOrigin="anonymous"
          loading="lazy"
        />

        <div className="flex space-x-2">
          {imageData.images.map((image, index) => (
            <img
              key={index}
              style={{ borderRadius: '10px' }}
              className="w-17 h-20 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
              src={`${api}${image.url}`}
              alt={`${imageData.name} view ${index + 1}`}
              crossOrigin="anonymous"
              onClick={() => handleThumbnailClick(index)}
              loading="lazy"
            />
          ))}
        </div>
        <br />
        <br />
      </div>

      <div className="md:w-1/2 md:pl-8 ml-10 mt-8">
        <h1 className="text-3xl font-bold text-zinc-700 mb-4 uppercase" data-aos="fade-up" data-aos-delay="900">
          {imageData.name}
        </h1>
        <br />
        <div className="text-2xl text-zinc-700 mb-4 uppercase" data-aos="fade-up" data-aos-delay="1000">
          Taille: {imageData.taille} cm
        </div>
        <br />
        <div className="text-2xl text-zinc-700 mb-4 uppercase" data-aos="fade-up" data-aos-delay="1100">
          Ville: {imageData.ville}
        </div>
        <br />
        <div className="flex space-x-4 text-2xl font-semibold mb-2">
          <h1 className="border-b-2 border-black" data-aos="fade-up" data-aos-delay="1200">
            DESCRIPTION
          </h1>
        </div>
        <p className="text-2xl text-zinc-700 mb-10" data-aos="fade-up" data-aos-delay="1200">
          {imageData.description}.
        </p>
      </div>
    </div>
  );
};

export default DComponent;
