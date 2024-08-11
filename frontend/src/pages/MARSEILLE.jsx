import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img4 from '../assets/img4.jpg'
import img5 from '../assets/1.jpg'
import img6 from '../assets/3.jpg'
import img2 from '../assets/img2.jpg'
import img112 from '../assets/2.jpg'

const Marseille = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const images = [
    { src: img4, alt: 'Placeholder Image 1' },
    { src: img5, alt: 'Placeholder Image 1' },
    { src: img6, alt: 'Placeholder Image 1' },
    { src: img112, alt: 'Placeholder Image 1' },
    { src: img2, alt: 'Placeholder Image 1' },
    { src: img4, alt: 'Placeholder Image 1' },
    { src: img5, alt: 'Placeholder Image 1' },
    { src: img6, alt: 'Placeholder Image 1' },
    { src: img2, alt: 'Placeholder Image 1' },
    { src: img4, alt: 'Placeholder Image 1' },
    { src: img5, alt: 'Placeholder Image 1' },
    { src: img6, alt: 'Placeholder Image 1' },
    { src: img2, alt: 'Placeholder Image 1' },
    { src: img4, alt: 'Placeholder Image 1' },
    { src: img5, alt: 'Placeholder Image 1' },
    { src: img112, alt: 'Placeholder Image 1' },
    { src: img2, alt: 'Placeholder Image 1' },


  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl pb-10 mx-auto mb-10 mt-40 ">
            {images.map((image, index) => (
        <div key={index} className="flex-shrink-0 " style={{ position: 'relative' }} data-aos="fade-up">
          <img   src={image.src} alt={image.alt} className="rounded-lg shadow-lg object-cover w-full h-auto transition-transform duration-600 transform hover:scale-105 " />
          <p data-aos="fade-up" data-aos-delay="800" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '5px', zIndex: 1 }}>{image.alt}</p>
        </div>
      ))}
    </div>
  );
};

export default Marseille;