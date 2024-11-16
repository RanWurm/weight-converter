"use client";
import { useState, useRef } from "react";
import Head from "next/head";

export default function Home() {
  const [weight, setWeight] = useState("");
  const [percentage, setPercentage] = useState("");
  const [convertedValue, setConvertedValue] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const audioRef = useRef(null);

  const handleConvert = async () => {
    if (percentage === "0") {
      // Start music and animation
      setShowImage(true);

      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Audio play failed", error);
      }

      // Stop music and hide image after 15 seconds
      setTimeout(() => {
        setShowImage(false);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        setConvertedValue(null);
      }, 15000); // Match animation duration
    } else {
      if (weight == 0 || percentage == 0) {
        setConvertedValue(0);
      }
      const p = percentage / 100;
      const x = weight / p;
      const result = x - weight;
      setConvertedValue(result);
    }
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
              תכניס משקל בגרמים כפרה
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
              placeholder="Enter weight in grams"
            />
            {weight && (
              <p className="mt-2 text-sm text-gray-600">
                 בחרת <span className="font-medium text-purple-600">{weight} גרם אבא</span>
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="percentage"
              className="block text-sm font-medium text-gray-700"
            >
               כמה אחוז ישך ביד ? אם אתה בוחר 0 אתה מת
            </label>
            <input
              type="number"
              id="percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
              placeholder="Enter percentage"
            />
            {percentage && (
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium text-purple-600">בחרת {percentage} אחוז אבא</span>
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
        {/* Animation and Music */}
        {showImage && (
          <img
            src="/i_said_no.jpg"
            alt="Falling Animation"
            className="absolute top-0 w-64 h-64 animate-fall"
            style={{ animationDuration: "15s" }}
          />
        )}
        <audio ref={audioRef}>
          <source src="/clown_music.mp3" type="audio/mpeg" />
        </audio>
      </div>
      <style jsx>{`
        @keyframes fall {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(100vh);
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: 1;
        }
      `}</style>
    </>
  );
}
