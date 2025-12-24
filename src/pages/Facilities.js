import React from 'react';

const facilities = [
  {
    title: 'Smart Classrooms',
    description:
      'All classrooms are equipped with digital boards and projectors to enhance interactive learning.',
    image: '/assets/16.jpg',
  },
  {
    title: 'Computer Lab',
    description:
      'A modern computer lab with high-speed internet and the latest systems to support digital learning.',
    image: '/assets/smartclass.jpg',
  },
  {
    title: 'Science Lab',
    description:
      'Fully-equipped Physics, Chemistry, and Biology labs to support hands-on experiments and exploration.',
      image: '/assets/sc.jpg',
  },
  {
    title: 'Sports Facilities',
    description:
      'The campus includes a playground,indoor and outdoor games area, and equipment for various sports.',
      image: '/assets/s.jpg',
  },
  {
    title: 'Drinking Water Facility',
    description:
      'Clean and purified drinking water is available across the campus with regular quality checks.',
      image: '/assets/d.jpg',
  },
  {
    title: 'Food Facility',
    description:
      'Nutritious and hygienic mid-day meals are served to students, promoting healthy eating habits.',
      image: '/assets/f.jpg',
  },
];

const Facilities = () => {
  return (
    <section className="bg-blue-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">Our Facilities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-transparent hover:border-blue-400 hover:bg-blue-50 hover:scale-105 transform transition duration-300 ease-in-out"
            >
              {facility.image && (
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{facility.title}</h3>
              <p className="text-gray-700 text-sm">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;