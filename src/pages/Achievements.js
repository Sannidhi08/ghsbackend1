import React from 'react';

const Achievements = () => {
  return (
    <div className="min-h-screen bg-orange-100 text-gray-800 py-10 px-4 md:px-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-slate-800">
        Achievements
      </h1>

      {/* General Achievements */}
      <ul className="list-disc list-inside text-lg mb-10 space-y-2">
        <li>Focus on sports and extracurricular excellence</li>
        <li>Participation in Taluk and State-level competitions</li>
        <li>Community-driven education success stories</li>
      </ul>

      {/* Student Highlights */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Deepashree */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 flex flex-col items-center text-center">
          <img
            src="/assets/de.jpg"
            alt="Deepashree"
            className="w-40 h-40 object-cover rounded-full mb-4 border-4 border-blue-500"
          />
          <h2 className="text-xl font-semibold text-slate-700">Deepashree</h2>
          <p className="mt-2 text-gray-600">
            Former student of GHS Nalyapadavu up to SSLC. She became a{' '}
            <span className="font-semibold text-blue-600">State-level Topper</span> in the Commerce stream, making our school proud.
          </p>
        </div>

        {/* Manjushree */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 flex flex-col items-center text-center">
          <img
            src="/assets/ma.jpg"
            alt="Manjushree"
            className="w-40 h-40 object-cover rounded-full mb-4 border-4 border-green-500"
          />
          <h2 className="text-xl font-semibold text-slate-700">Manjushree</h2>
          <p className="mt-2 text-gray-600">
            In the SSLC Examination, she emerged as the{' '}
            <span className="font-semibold text-green-600">Topper in Mangalore Taluk</span>, setting a great example for all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
