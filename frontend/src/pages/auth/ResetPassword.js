import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';  // Ensure this points to your API base URL

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const { resetToken } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setStatus(null);
      return;
    }

    try {
      const response = await fetch(`${api}/api/auth/reset-password/${resetToken}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.msg || 'Failed to reset password.');
      }

      setStatus('Password reset successful');
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
      setStatus(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Réinitialiser le mot de passe</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Nouveau mot de passe
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block font-medium mb-1">
              Confirmer le mot de passe
            </label>
            <input
              id="confirm-password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Réinitialiser
          </button>
        </form>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'Password reset successful' && (
          <p className="text-green-500">Password has been reset successfully!</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
