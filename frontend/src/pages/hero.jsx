import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import backgroundVideo from '../assets/model.mp4';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import api from '../utils/api';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



import { EffectCards } from 'swiper/modules';









export default function Hero() {


  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${api}/api/images`)
      .then(response => response.json())
      .then(data => {
        const imageUrls = data.flatMap(item => item.images.map(img => img.url));
        setImages(imageUrls);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
    AOS.init();

  }, []);


  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <LazyLoad>
          <video data-aos="zoom-out" autoPlay loop muted playsInline className="absolute inset-0 object-cover w-full h-full z-0">
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </LazyLoad>
        <div className="absolute top-0 left-0 w-full h-full z-1 flex flex-col items-center justify-center">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white z-10 text-center px-4 sm:px-8 lg:px-0"
            data-aos="fade-up"
            data-aos-delay="500"
            style={{ fontFamily: 'Didot' }}
          >
            BIENVENUE CHEZ LUMINIS
          </h1>
          <div className="flex flex-col lg:flex-row">
            <Link to="/rabat">
              <button
                data-aos="fade-right"
                data-aos-delay="1000"
                className="p-2 lg:p-3 mr-4 mb-4 lg:mb-0 text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl transition-all duration-300 ease-in-out focus:outline-none  text-white"
                style={{ fontFamily: 'Didot', transform: 'scale(1)', fontSize: '2.5rem' }}
                onMouseEnter={(e) => e.target.style.color = '#8A2BE2'}
                onMouseLeave={(e) => e.target.style.color = 'white'}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.06)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                RABAT
              </button>
            </Link>
            <Link to="/marseille">
              <button
                data-aos="fade-left"
                data-aos-delay="1200"
                className="p-2 lg:p-3 mr-4 text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl transition-all duration-300 ease-in-out focus:outline-none  text-white"
                style={{ fontFamily: 'Didot', transform: 'scale(1)', fontSize: '2.5rem' }}
                onMouseEnter={(e) => e.target.style.color = '#8A2BE2'}
                onMouseLeave={(e) => e.target.style.color = 'white'}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.06)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                MARSEILLE
              </button>
            </Link>
          </div>
        </div>

      </div>
      <section className="  overflow-hidden py-12 md:py-24 lg:py-32  flex flex-col items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Latest Collections</h2>
              <p className=" text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our latest fashion collections, showcasing the cutting-edge designs and trends.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">

          </div>
        </div>
      </section>
      <section className="  overflow-hidden h-full flex flex-col md:flex-row justify-center items-center">
        <div className='w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0'>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center md:text-left">Our Latest Collections</h2>
        </div>
        <div className="w-full md:w-1/2">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="w-72 h-94 md:w-80 md:h-94"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center rounded-lg text-2xl font-bold text-white bg-gray-300">
                <img src={`${api}${image}`} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>



    </>
  );
}
