import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData)).then((result) => {
      if (status !== 'failed') {
        navigate('/login');
        message.success('Inscription réussie. Veuillez vous connecter.');
      } else {
        if (error && error.errors) {
          setFormErrors(error.errors);
        }
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Nom
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {formErrors &&
              formErrors.map((error) =>
                error.param === 'name' ? (
                  <p key={error.msg} className="text-red-500">
                    {error.msg}
                  </p>
                ) : null
              )}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {formErrors &&
              formErrors.map((error) =>
                error.param === 'email' ? (
                  <p key={error.msg} className="text-red-500">
                    {error.msg}
                  </p>
                ) : null
              )}
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {formErrors &&
              formErrors.map((error) =>
                error.param === 'password' ? (
                  <p key={error.msg} className="text-red-500">
                    {error.msg}
                  </p>
                ) : null
              )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Inscription
          </button>
        </form>
        {status === 'loading' && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
