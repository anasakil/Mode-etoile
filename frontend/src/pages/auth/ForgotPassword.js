import React, { useState } from 'react';
import api  from '../../utils/api';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    try {
      await fetch(`${api}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      setStatus('Email sent');
    } catch (err) {
      setError('Failed to send email. Please try again.');
      setStatus(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Mot de passe oublié</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Envoyer
          </button>
        </form>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'Email sent' && <p className="text-green-500">Email sent successfully!</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
