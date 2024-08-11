import React from 'react';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../slices/darkModeSlice';
import ScrollingText from './ScrollingText/ScrollingText';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`navbar flex items-center justify-between fixed top-0 left-0 w-full z-20 transition-all duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      } shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-100`}
    >
      <button
        onClick={() => navigate('/')}
        className="text-2xl font-bold"
        style={{ fontFamily: 'Didot', marginLeft: '20px' }}
      >
        LUMINIS
      </button>

      <ScrollingText />

      <div className="text-black md:hidden">
        {isOpen ? (
          <FaTimes
            onClick={toggleNavbar}
            className={`text-3xl cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}
          />
        ) : (
          <FaBars
            onClick={toggleNavbar}
            className={`text-3xl cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}
          />
        )}
      </div>

      <button
        onClick={() => dispatch(toggleDarkMode())}
        className="md:hidden text-2xl px-4 py-2 rounded-md"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <div
        className={`md:hidden ${
          isOpen ? 'flex' : 'hidden'
        } flex-col absolute top-full left-0 w-full ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } mt-2 p-4 rounded-md shadow-md transition-all duration-300 ease-in-out`}
      >
        <ul className="flex flex-col items-center">
          <li className="my-2">
            <button
              onClick={() => {
                navigate('/');
                closeNavbar();
              }}
              className="hover:text-gray-600"
              style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
            >
              Accueil
            </button>
          </li>
          <li className="my-2">
            <button
              onClick={() => {
                navigate('/Nosmannequins');
                closeNavbar();
              }}
              className="hover:text-gray-600"
              style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
            >
              Nos mannequins
            </button>
          </li>
          <li className="my-2">
            <button
              onClick={() => {
                navigate('/model');
                closeNavbar();
              }}
              className="hover:text-gray-600"
              style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
            >
              Devenir Modèle
            </button>
          </li>
          <li className="my-2">
            <button
              onClick={() => {
                navigate('/services');
                closeNavbar();
              }}
              className="hover:text-gray-600"
              style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
            >
              NOS SERVICES
            </button>
          </li>
          <li className="my-2">
            <button
              onClick={() => {
                navigate('/contact');
                closeNavbar();
              }}
              className="hover:text-gray-600"
              style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
            >
              Contactez-nous
            </button>
          </li>
        </ul>
      </div>

      <div className="hidden md:flex md:items-center">
        <ul className="md:flex">
          <li className="mx-2">
            <button
              onClick={() => navigate('/Nosmannequins')}
              className="hover:text-gray-600"
              style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
            >
              Nos mannequins
            </button>
          </li>
          <li className="mx-2">
            <button
              onClick={() => navigate('/services')}
              className="hover:text-gray-600"
              style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
            >
              NOS SERVICES
            </button>
          </li>
          <li className="mx-2">
            <button
              onClick={() => navigate('/model')}
              className="hover:text-gray-600"
              style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
            >
              Devenir Modèle
            </button>
          </li>
          <li className="mx-2">
            <button
              onClick={() => navigate('/contact')}
              className="hover:text-gray-600"
              style={{ fontFamily: 'Didot', textTransform: 'uppercase' }}
            >
              Contactez-nous
            </button>
          </li>
        </ul>
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="ml-4 text-2xl"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
