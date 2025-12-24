// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Website Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Facilities from "./pages/Facilities";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Achievements from "./pages/Achievements";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminEvents from "./pages/admin/AdminEvents";


function AppWrapper() {
  // wrapper so we can use useLocation()
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Re-check token whenever route changes (e.g., after login sets localStorage)
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />

      {/* ✅ Show Public Header & Footer Only on Website Pages */}
      {!location.pathname.startsWith("/admin") && <Header />}

      <Routes>
        {/* 🌐 Public Website Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/achievements" element={<Achievements />} />

        {/* 🔐 Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ✅ Protected Route (only accessible when logged in) */}
        <Route
          path="/admin/dashboard"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />}
        />

        {/* ✅ Admin Gallery & Events Routes */}
        <Route
          path="/admin/gallery"
          element={isAuthenticated ? <AdminGallery /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/events"
          element={isAuthenticated ? <AdminEvents /> : <Navigate to="/admin/login" />}
        />

        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* ✅ Show Footer only on Public Pages */}
      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}

function App() {
  // Router must wrap components that use hooks from react-router
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;