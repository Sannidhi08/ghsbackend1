import React from 'react';
import { motion } from 'framer-motion';
import {
  FaBook,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaUserGraduate,
} from 'react-icons/fa';

const academicsData = [
  {
    title: 'Curriculum',
    content:
      'We follow the Karnataka State Education Board curriculum designed to promote holistic growth through academics, arts, and physical education.',
    icon: <FaBook className="text-blue-500 text-4xl" />,
  },
  {
    title: 'Subjects Offered',
    content:
      'Subjects include English, Kannada, Hindi, Mathematics, Science, Social Science, Physical Education, and Moral Education.',
    icon: <FaChalkboardTeacher className="text-green-500 text-4xl" />,
  },
  {
    title: 'Assessment & Grading',
    content:
      'Our Continuous and Comprehensive Evaluation (CCE) system uses both formative and summative assessments to track student progress.',
    icon: <FaClipboardCheck className="text-purple-500 text-4xl" />,
  },
  {
    title: 'Extra Academic Support',
    content:
      'We offer remedial classes and one-on-one mentoring to support students academically and emotionally.',
    icon: <FaUserGraduate className="text-yellow-500 text-4xl" />,
  },
];

const Academics = () => {
  return (
    <section className="bg-sky-100 py-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          className="text-4xl font-bold text-slate-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Academics
        </motion.h2>
        <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
          Excellence in education through structured learning and student support.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {academicsData.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md border hover:border-blue-400 hover:bg-blue-50 transition duration-300 ease-in-out"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              {item.icon}
              <h3 className="text-xl font-semibold text-slate-800">{item.title}</h3>
            </div>
            <p className="text-gray-700 text-sm">{item.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Academics;
