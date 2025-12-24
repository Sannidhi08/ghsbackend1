import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-slate-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and School Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/assets/logo.jpg"
            alt="School Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-xl md:text-2xl font-bold text-white">
            GHS Nalyapadavu
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center relative">
          {navLinks.map((link) =>
            link.name === 'About' ? (
              <div key="About" className="relative">
                <div className="flex items-center gap-1">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `px-2 py-1 transition duration-300 ${
                        isActive
                          ? 'text-blue-400 font-semibold'
                          : 'text-white hover:text-blue-400'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                  <button
                    onClick={() => setAboutDropdownOpen((prev) => !prev)}
                    className="text-white hover:text-blue-400 transition text-xs mt-1"
                  >
                    <FaChevronDown />
                  </button>
                </div>

                {/* Dropdown */}
                {aboutDropdownOpen && (
                  <div className="bg-slate-700 mt-1 rounded shadow-md overflow-hidden absolute left-0 w-40 z-50">
                    <NavLink
                      to="/achievements"
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm transition ${
                          isActive
                            ? 'bg-blue-500 text-white font-semibold'
                            : 'text-white hover:bg-blue-600'
                        }`
                      }
                      onClick={() => setAboutDropdownOpen(false)}
                    >
                      Achievements
                    </NavLink>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-2 py-1 transition duration-300 ${
                    isActive
                      ? 'text-blue-400 font-semibold'
                      : 'text-white hover:text-blue-400'
                  }`
                }
              >
                {link.name}
              </NavLink>
            )
          )}

          {/* ✅ Admin Login Button */}
          <Link
            to="/admin/login"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition"
          >
            Admin Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-700 px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <div key={link.name}>
              <NavLink
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-2 rounded transition duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white font-semibold'
                      : 'text-white hover:bg-blue-600'
                  }`
                }
              >
                {link.name}
              </NavLink>

              {link.name === 'About' && (
                <NavLink
                  to="/achievements"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `ml-4 block py-1 px-2 rounded transition duration-200 ${
                      isActive
                        ? 'bg-blue-500 text-white font-semibold'
                        : 'text-white hover:bg-blue-600'
                    }`
                  }
                >
                  └ Achievements
                </NavLink>
              )}
            </div>
          ))}

          {/* ✅ Admin Login Button for Mobile */}
          <Link
            to="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-center"
          >
            Admin Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
