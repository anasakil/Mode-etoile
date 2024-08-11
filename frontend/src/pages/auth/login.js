import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials)).then((result) => {
      if (result.payload && !result.error) {
        console.log('Login successful:', result.payload);
        navigate('/admin/dashboard');
      } else {
        console.log('Login failed:', result.error);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white ">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-6 bg-white  rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              className="w-full px-3 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500  "
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-gray-900 d rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Connexion
          </button>
        </form>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
