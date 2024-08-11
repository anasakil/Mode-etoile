import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };



  return (
    <nav  className='navbar flex items-center justify-between p-4 fixed top-0 left-0 w-full z-20 transition-all duration-300 bg-white shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-100'>
      <button onClick={() => navigate('/admin/dashboard')} className="text-black  text-2xl font-bold" style={{ fontFamily: 'Didot', marginLeft: '20px' }}>espace admin</button>


      <div className="text-black md:hidden">
        {isOpen ? (
          <FaTimes onClick={toggleNavbar} className="text-3xl cursor-pointer" />
        ) : (
          <FaBars onClick={toggleNavbar} className="text-3xl cursor-pointer" />
        )}
      </div>

      <div className={`md:hidden ${isOpen ? 'flex' : 'hidden'} flex-col absolute top-full left-0 w-full bg-white mt-2 p-4 rounded-md shadow-md transition-all duration-300 ease-in-out`}>
        <ul className="flex flex-col items-center">
          <li className="my-2">
            <button onClick={() => { navigate('/admin/dashboard'); closeNavbar(); }} className="text-black hover:text-gray-600" style={{ textTransform: 'uppercase' }}>dashboard</button>
          </li>
          <li className="my-2">
            <button onClick={() => { navigate('/admin/ajouter'); closeNavbar(); }} className="text-black hover:text-gray-600 cursor-pointer" style={{  textTransform: 'uppercase' }}>ajoute</button>
          </li>
          <li className="my-2">
            <button onClick={() => { navigate('/admin/candidats'); closeNavbar(); }} className="text-black hover:text-gray-600 cursor-pointer" style={{  textTransform: 'uppercase' }}>candidats
            </button>
          </li>

        </ul>
      </div>

      <div className="hidden md:flex md:items-center">
        <ul className="md:flex">
          <li className="mx-2">
            <button onClick={() => navigate('/admin/dashboard')} className="text-black font-semibold hover:text-gray-600" style={{textTransform: 'uppercase' }}>dashboard</button>
          </li>
          <li className="mx-2 ">
            <button onClick={() => navigate('/admin/ajouter')} className="text-black hover:text-gray-600 cursor-pointer" style={{  textTransform: 'uppercase' }}>ajouter model</button>
          </li>

          <li className="mx-2">
            <button onClick={() => navigate('/admin/candidats')} className="text-black hover:text-gray-600" style={{ textTransform: 'uppercase' }}>candidats</button>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
