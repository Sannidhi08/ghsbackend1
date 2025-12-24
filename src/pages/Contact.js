import React, { useState, useRef } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_98mkktj',     // 🔁 Replace with your actual Service ID
        'template_j1xlbrv',    // 🔁 Replace with your actual Template ID
        formRef.current,
        'f_M0Fqq9aKjiZpTIp'      // 🔁 Replace with your actual Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          setSubmitted(true);
          formRef.current.reset(); // Clear form
          setTimeout(() => setSubmitted(false), 3000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen flex flex-col items-center justify-center p-6 space-y-10">
      <motion.div
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold text-blue-700 text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Contact Us
        </motion.h2>

        <AnimatePresence>
          {submitted && (
            <motion.div
              className="mb-6 p-4 text-green-800 bg-green-100 border border-green-300 rounded"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              ✅ Message sent successfully!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 text-gray-700 text-sm">
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-blue-600 mt-1" />
              <span>+91 98444 98123</span>
            </div>
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-blue-600 mt-1" />
              <span>ghsnalyapadavu16@gmail.com</span>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-blue-600 mt-1" />
              <span>
                GHS Nalyapadavu, <br />
                Shakthinagar Post, <br />
                Mangalore, Karnataka – 575016
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
            <input
              type="email"
              name="from_email"
              placeholder="Your Email"
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            ></textarea>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Google Map */}
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg">
        <iframe
          title="GHS Nalyapadavu Location"
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d243.07534749634343!2d74.86875336617233!3d12.894499766798063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ssgh%20nalyapadavu!5e0!3m2!1sen!2sin!4v1752673615681!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
