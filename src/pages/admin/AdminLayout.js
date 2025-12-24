// src/components/AdminLayout.js
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#1e293b",
      color: "#fff",
      padding: "30px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    navLinks: {
      display: "flex",
      flexDirection: "column",
      gap: "18px",
    },
    link: {
      color: "#e2e8f0",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "500",
      padding: "10px 15px",
      borderRadius: "8px",
      transition: "background 0.3s",
    },
    linkHover: {
      backgroundColor: "#334155",
    },
    logout: {
      marginTop: "40px",
      backgroundColor: "#dc2626",
      border: "none",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      transition: "background 0.3s",
    },
    main: {
      flex: 1,
      padding: "40px",
      overflowY: "auto",
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div>
          <h2 style={{ color: "#fff", fontWeight: "700", fontSize: "22px", marginBottom: "30px" }}>
            🧭 Admin Panel
          </h2>
          <nav style={styles.navLinks}>
            <Link
              to="/admin/dashboard/gallery"
              style={styles.link}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              🖼 Gallery
            </Link>
            <Link
              to="/admin/dashboard/events"
              style={styles.link}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              🗓 Events
            </Link>
          </nav>
        </div>

        <button
          style={styles.logout}
          onClick={handleLogout}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#b91c1c")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#dc2626")}
        >
          Logout
        </button>
      </aside>

      <main style={styles.main}>
        <Outlet /> {/* Renders Gallery or Events */}
      </main>
    </div>
  );
}

export default AdminLayout;
