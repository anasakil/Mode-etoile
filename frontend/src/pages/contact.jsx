import React from 'react';
import { useSelector } from 'react-redux';
import animationData from '../assets/Animation - 1720451985923.json';
import LottieAnimation from './Components/LottieAnimation';

const Contact = () => {
    const darkMode = useSelector((state) => state.darkMode.darkMode);

    return (
        <div
            className={`min-h-screen flex flex-col items-center justify-center ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
            }`}
        >
            <div
                className={`w-full max-w-6xl p-6 md:p-8 ${
                    darkMode ? 'bg-gray-900' : 'bg-white'
                }`}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 md:p-8">
                        <h2 className="text-2xl font-bold mb-4">Nous Contacter</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Entrez votre nom"
                                    className={`block w-full rounded-md border-input px-3 py-2 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary ${
                                        darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
                                    }`}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Entrez votre email"
                                    className={`block w-full rounded-md border-input px-3 py-2 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary ${
                                        darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
                                    }`}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="Entrez votre message"
                                    className={`block w-full rounded-md border-input px-3 py-2 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary ${
                                        darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
                                    }`}
                                />
                            </div>
                            <button
                                type="submit"
                                className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
                                    darkMode ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-black text-white hover:bg-white hover:text-black'
                                }`}
                            >
                                Envoyer
                            </button>
                        </form>
                    </div>

                    <div className="flex items-center justify-center">
                        <LottieAnimation animationData={animationData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
