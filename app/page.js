"use client"

import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [weight, setWeight] = useState('');
  const [convertedValue, setConvertedValue] = useState(null);

  const handleConvert = () => {
    // Replace this with your calculation logic
    const result = weight * 2; // Example placeholder calculation
    setConvertedValue(result);
  };

  return (
    <>
      <Head>
        <title>Weight Converter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      </Head>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Weight Converter
          </h1>
          <div className="mb-4">
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Enter weight (grams)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
              placeholder="Enter weight in grams"
              inputMode="decimal" // Helps with numeric keyboards
            />
            {weight && (
              <p className="mt-2 text-sm text-gray-600">
                You entered: <span className="font-medium text-purple-600">{weight} grams</span>
              </p>
            )}
          </div>
          <button
            onClick={handleConvert}
            className="w-full bg-purple-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-300 text-lg"
          >
            Convert
          </button>
          {convertedValue !== null && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center shadow-sm">
              <p className="text-gray-800 font-semibold">
                Converted Value: <span className="text-purple-600">{convertedValue}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
