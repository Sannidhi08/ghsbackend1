import React from 'react';
import { motion } from 'framer-motion';

const admissionInfo = [
  {
    title: 'Admission Process',
    content: `Admissions for the academic year 2025–26 are open for Grade 9 and Grade 10.
Parents are welcome to visit the school office to collect the admission form.
Completed forms must be submitted with necessary documents.`,
  },
  {
    title: 'Eligibility',
    content: (
      <ul className="list-disc pl-5 space-y-1">
       
        <li>Grade 1 and above: Submission of previous school records is mandatory</li>
        <li>Transfer Certificate and Birth Certificate required for all admissions</li>
      </ul>
    ),
  },
  {
    title: 'Required Documents',
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Birth Certificate (original + photocopy)</li>
        <li>Previous year’s report card</li>
        <li>Transfer Certificate</li>
        <li>Caste Certificate</li>
        <li>Bagyalakshmi Bond (for girls)</li>
        <li>Aadhar Card</li>
        <li>2 passport size photographs</li>
      </ul>
    ),
  },
  {
    title: 'Contact for Admission',
    content: (
      <p>
        Visit us at the school campus between 9:00 AM to 4:00 PM (Mon–Sat)
        <br />
        📞 <strong>Phone:</strong> +91 9844498123
        <br />
        📧 <strong>Email:</strong> ghsnalyapadavu16@gmail.com
      </p>
    ),
  },
];

const Admissions = () => {
  return (
    <section className="bg-blue-100 py-16 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center text-slate-800 mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Admissions
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {admissionInfo.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border hover:border-blue-400 hover:bg-blue-50 transition duration-300 ease-in-out"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-3">{item.title}</h3>
              <div className="text-gray-700 text-sm">{item.content}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Admissions;
