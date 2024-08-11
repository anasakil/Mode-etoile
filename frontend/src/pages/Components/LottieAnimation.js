import React from 'react';
import Lottie from 'react-lottie';

const LottieAnimation = ({ animationData }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie style={{ marginTop: '60px' }} options={defaultOptions} height={450} width={355}  />;
};

export default LottieAnimation;
