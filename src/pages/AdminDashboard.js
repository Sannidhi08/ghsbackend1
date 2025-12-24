import React from "react";
import { useNavigate } from "react-router-dom";
import "./admin/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>School Admin</h2>
        <button onClick={() => navigate("/admin/gallery")}>📷 Gallery</button>
        <button onClick={() => navigate("/admin/events")}>🗓 Events</button>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </aside>

      {/* Main content */}
      <main className="content">
        <h1>Welcome, Admin 👋</h1>
        <div className="cards">
          <div className="card" onClick={() => navigate("/admin/gallery")}>
            <h3>📷 Gallery</h3>
            <p>Upload & Manage Images</p>
            <span>Go ➝</span>
          </div>

          <div className="card" onClick={() => navigate("/admin/events")}>
            <h3>🗓 Events</h3>
            <p>Create & Manage School Events</p>
            <span>Go ➝</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
