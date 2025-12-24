import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-800 text-gray-400 text-sm relative">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-4 sm:grid-cols-2 gap-6">
        {/* Logo + Tagline */}
        <div>
          <Link
            to="/"
            className="flex items-center text-white font-semibold text-lg mb-2"
          >
            <img
              src="/assets/logo.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-full mr-2"
            />
            GHS Nalyapadavu
          </Link>
          <p className="text-xs mb-1">Empowering Every Learner</p>
          <p className="text-[11px] italic text-gray-300 leading-relaxed">
            “To provide quality education and nurture every student to become responsible citizens and lifelong learners, fostering discipline, creativity, and social values.”
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white mb-2 font-medium">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/academics" className="hover:text-white">Academics</Link></li>
            <li><Link to="/admissions" className="hover:text-white">Admissions</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* More Pages */}
        <div>
          <h4 className="text-white mb-2 font-medium">More Pages</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link to="/facilities" className="hover:text-white">Facilities</Link></li>
            <li><Link to="/events" className="hover:text-white">Events</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white mb-2 font-medium">Contact</h4>
          <p className="flex items-center gap-2 text-xs"><FaEnvelope /> ghsnalyapadavu16@gmail.com</p>
          <p className="flex items-center gap-2 text-xs"><FaPhoneAlt /> +91 98444 98123</p>
          <p className="flex items-start gap-2 text-xs"><FaMapMarkerAlt className="mt-1" /> Shakthinagar, Mangalore</p>

          {/* Social Media */}
          <div className="flex space-x-3 text-lg mt-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-white"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-slate-900 text-center py-3 px-4 border-t border-slate-700">
        <p className="text-xs text-gray-500">
          © 2025 GHS Nalyapadavu — Designed by KPT Students under the valuable guidance of <strong>Mrs. Leelavathi R</strong>
        </p>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
        aria-label="Back to Top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
