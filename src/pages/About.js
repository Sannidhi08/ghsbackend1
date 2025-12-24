import React, { useState } from 'react';
import {
  FaBullseye,
  FaEye,
  FaUserTie,
  FaSchool,
  FaHeart,
  FaHandsHelping,
  FaBookOpen,
  FaPhoneAlt,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DropdownCard = ({ title, icon, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border hover:border-blue-400 transition duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-600">
          {icon} {title}
        </h2>
        {open ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-blue-600" />}
      </button>
      {open && <div className="mt-4 text-gray-700">{children}</div>}
    </div>
  );
};

const About = () => {
  return (
    <section className="bg-blue-100 text-gray-800 py-16 px-4 relative min-h-screen overflow-hidden">
      {/* Background logo */}
      <motion.img
        src="/assets/logo.png"
        alt="School Emblem"
        className="absolute opacity-10 w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 2 }}
      />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        <motion.h1
          className="text-4xl font-bold text-center text-slate-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-10">
          <DropdownCard title="Our School" icon={<FaSchool />}>
            <img
              src="/assets/school.jpg"
              alt="Our School"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p>
              GHS Nalyapadavu, founded on 21st July 2006, is a government high school in Mangalore
              committed to providing quality education to common people. We emphasize academic and
              co-curricular excellence in a student-friendly atmosphere.
            </p>
          </DropdownCard>

          <DropdownCard title="Our Mission" icon={<FaBullseye />}>
            <p>
              To provide a nurturing environment that promotes personal development, academic growth,
              and ethical values, empowering every student to succeed.
            </p>
          </DropdownCard>

          <DropdownCard title="Our Vision" icon={<FaEye />}>
            <p>
              To be a center of excellence offering holistic education, especially for underprivileged
              students.
            </p>
          </DropdownCard>

          <DropdownCard title="Principal's Message" icon={<FaUserTie />}>
            <p>
              "We believe education transforms lives. At GHS Nalyapadavu Shakthinagar, every child is nurtured to grow
              into a confident, capable individual." <br />
              <span className="italic">– Headmaster</span>
            </p>
          </DropdownCard>
        </div>

        {/* Timeline section */}
        <div className="bg-white p-6 rounded-lg shadow-md border hover:border-blue-400 hover:bg-blue-50 hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2 text-blue-600">
            <FaBookOpen /> Our History
          </h2>

          <div className="flex flex-col space-y-8">
            {[
              {
                title: '2006 - Foundation',
                desc: 'GHS Nalyapadavu was established to provide affordable, quality education to rural communities.',
                icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
              },
              {
                title: '2010 - Development',
                desc: 'New classrooms, facilities, and community programs were added to support holistic learning.',
                icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
              },
              {
                title: '2015 - Excellence',
                desc: 'Our students achieved consistent SSLC results and participated in state-level events.',
                icon: (
                  <>
                    <circle cx="12" cy="5" r="3" />
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3" />
                  </>
                ),
              },
              {
                title: '2016 - Modernization',
                desc: 'Digital classrooms, smart teaching aids, and online learning environments were introduced.',
                icon: (
                  <>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </>
                ),
              },
            ].map((step, idx) => (
              <div className="flex relative" key={idx}>
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  {idx !== 3 && <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>}
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    {step.icon}
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    {step.title}
                  </h2>
                  <p className="leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* More info cards */}
        <div className="grid md:grid-cols-2 gap-10">
          <DropdownCard title="Core Values" icon={<FaHeart />}>
            <ul className="list-disc pl-5 space-y-1">
              <li>Quality and Inclusive Education</li>
              <li>Personal Development First</li>
              <li>Discipline and Responsibility</li>
              <li>Supportive and Friendly Environment</li>
              <li>Community Collaboration</li>
            </ul>
          </DropdownCard>

          <DropdownCard title="Supporters & Affiliations" icon={<FaHandsHelping />}>
            <p>
              Backed by Padavu Friends Club, Vidya Divige Charitable Trust, Manipal Foundation, and Saraswatha Learning
              Foundation (USA), GHS Nalyapadavu is affiliated with KSEEB.
            </p>
          </DropdownCard>

          <DropdownCard title="Governance" icon={<FaUsers />}>
            <p>
              Our SDMC is led by Mr. Bharath Kumar, ensuring effective planning and student welfare at every stage.
            </p>
          </DropdownCard>

          <DropdownCard title="Community Engagement" icon={<FaHandsHelping />}>
            <p>
              Through clean-up drives, parent meetings, and awareness events, we stay connected with the local
              community and involve them in the students' educational journey.
            </p>
          </DropdownCard>
        </div>
      </div>

      {/* Floating Contact Button */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <Link to="/contact">
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition duration-300">
            <FaPhoneAlt className="text-xl" />
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default About;
