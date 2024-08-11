import React from 'react';
import LottieAnimation from './Components/LottieAnimation';
import animationData2 from '../assets/Animation - 1720452416579.json'; 


const Loader = () => {
  return (
    <div className='flex space-x-2 justify-center items-center bg-white h-screen '>
        <LottieAnimation animationData={animationData2}  />
    </div>
  );
};

export default Loader;
