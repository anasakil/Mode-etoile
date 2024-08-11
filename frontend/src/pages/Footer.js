import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = () => {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <footer
      className={`footer p-4 bottom-0 left-0 w-full z-20 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-100 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center md:space-x-4">
          <button
            onClick={() => navigate('/')}
            className={`font-semibold hover:text-gray-600 mb-2 md:mb-0 ${
              darkMode ? 'text-white hover:text-gray-400' : 'text-black'
            }`}
            style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
          >
            Accueil
          </button>
          <button
            onClick={() => navigate('/men')}
            className={`font-semibold hover:text-gray-600 mb-2 md:mb-0 ${
              darkMode ? 'text-white hover:text-gray-400' : 'text-black'
            }`}
            style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
          >
            Hommes
          </button>
          <button
            onClick={() => navigate('/women')}
            className={`font-semibold hover:text-gray-600 mb-2 md:mb-0 ${
              darkMode ? 'text-white hover:text-gray-400' : 'text-black'
            }`}
            style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
          >
            Femmes
          </button>
          <button
            onClick={() => navigate('/services')}
            className={`font-semibold hover:text-gray-600 mb-2 md:mb-0 ${
              darkMode ? 'text-white hover:text-gray-400' : 'text-black'
            }`}
            style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
          >
            nos services
          </button>
          <button
            onClick={() => navigate('/contact')}
            className={`font-semibold hover:text-gray-600 mb-2 md:mb-0 ${
              darkMode ? 'text-white hover:text-gray-400' : 'text-black'
            }`}
            style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
          >
            Contactez-nous
          </button>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-gray-600 ${
              darkMode ? 'text-white hover:text-gray-400' : 'text-black'
            }`}
          >
            <FaFacebook className="text-2xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-gray-600 ${
              darkMode ? 'text-white hover:text-gray-400' : 'text-black'
            }`}
          >
            <FaTwitter className="text-2xl" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-gray-600 ${
              darkMode ? 'text-white hover:text-gray-400' : 'text-black'
            }`}
          >
            <FaInstagram className="text-2xl" />
          </a>
        </div>
        <div className="flex flex-col mt-4 md:mt-0 md:ml-4">
          <div className={`flex items-center mb-2 ${
            darkMode ? 'text-white hover:text-gray-400' : 'text-black hover:text-gray-600'
          }`}>
            <FaEnvelope className="text-xl mr-2" />
            <a
              href="mailto:contact@luminis.com"
              className={`font-semibold ${
                darkMode ? 'text-white hover:text-gray-400' : 'text-black'
              }`}
              style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
            >
              contact@luminis.com
            </a>
          </div>
          <div className={`flex items-center mb-2 ${
            darkMode ? 'text-white hover:text-gray-400' : 'text-black hover:text-gray-600'
          }`}>
            <FaPhone className="text-xl mr-2" />
            <span
              className={`font-semibold ${
                darkMode ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
            >
              +1 (234) 567-890
            </span>
          </div>
          <div className={`flex items-center ${
            darkMode ? 'text-white' : 'text-black'
          }`}>
            <span
              className={`font-semibold ${
                darkMode ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
            >
              1234 Avenue St, City, Country
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
