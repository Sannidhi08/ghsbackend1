import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../admin/AdminDashboard.css"; // ✅ Reuse same sidebar styles

function AdminEvents() {
  const navigate = useNavigate();
  const location = useLocation();

  const [events, setEvents] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:5000/api/events";

  // ✅ Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await axios.get(API_URL);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Handle file selection + preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // ✅ Add or Update event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description)
      return alert("⚠️ Please fill all fields");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (selectedFile) formData.append("image", selectedFile);

    try {
      setLoading(true);
      if (editMode) {
        await axios.put(`${API_URL}/${editEventId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("✅ Event updated successfully!");
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("✅ Event added successfully!");
      }

      resetForm();
      fetchEvents();
    } catch (err) {
      console.error("Error saving event:", err);
      setMessage("❌ Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete event
  const deleteEvent = async (id) => {
    if (window.confirm("🗑️ Delete this event?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setEvents(events.filter((ev) => ev._id !== id));
        setMessage("✅ Event deleted successfully!");
      } catch (err) {
        console.error("Error deleting event:", err);
        setMessage("❌ Failed to delete event");
      }
    }
  };

  // ✅ Edit event
  const startEdit = (event) => {
    setForm({ title: event.title, description: event.description });
    setPreview(event.image);
    setEditEventId(event._id);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Cancel edit
  const cancelEdit = () => {
    resetForm();
    setMessage("❌ Edit cancelled.");
  };

  // ✅ Reset form
  const resetForm = () => {
    setForm({ title: "", description: "" });
    setSelectedFile(null);
    setPreview("");
    setEditMode(false);
    setEditEventId(null);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  // ✅ Sidebar button highlight
  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>School Admin</h2>
        <button
          onClick={() => navigate("/admin/dashboard")}
          style={{
            background: isActive("/admin/dashboard") ? "#3b82f6" : "#334155",
          }}
        >
          🏠 Dashboard
        </button>
        <button
          onClick={() => navigate("/admin/gallery")}
          style={{
            background: isActive("/admin/gallery") ? "#3b82f6" : "#334155",
          }}
        >
          📷 Gallery
        </button>
        <button
          onClick={() => navigate("/admin/events")}
          style={{
            background: isActive("/admin/events") ? "#3b82f6" : "#334155",
          }}
        >
          🗓 Events
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="content">
        <h1 style={{ marginBottom: "25px", color: "#1e293b" }}>
          {editMode ? "✏️ Edit Event" : "🗓 Manage Events"}
        </h1>

        {/* Upload / Edit Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            maxWidth: "500px",
            marginBottom: "30px",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "10px",
            }}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
          )}
          <input
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <textarea
            placeholder="Event Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            rows="3"
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                backgroundColor: loading ? "#60a5fa" : "#2563eb",
                color: "#fff",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "0.3s",
              }}
            >
              {loading
                ? editMode
                  ? "Updating..."
                  : "Adding..."
                : editMode
                ? "Update Event"
                : "Add Event"}
            </button>

            {editMode && (
              <button
                type="button"
                onClick={cancelEdit}
                style={{
                  flex: 1,
                  backgroundColor: "#6b7280",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && (
          <p style={{ textAlign: "center", marginBottom: "20px", color: "#374151" }}>
            {message}
          </p>
        )}

        {/* Events List */}
        <h3 style={{ color: "#1e293b", marginBottom: "20px" }}>📌 All Events</h3>
        {events.length === 0 ? (
          <p style={{ color: "#64748b" }}>No events added yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {events.map((event) => (
              <div
                key={event._id}
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <h4 style={{ fontWeight: "600", color: "#1e293b" }}>
                  {event.title}
                </h4>
                <p
                  style={{
                    color: "#475569",
                    fontSize: "14px",
                    marginBottom: "10px",
                  }}
                >
                  {event.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => startEdit(event)}
                    style={{
                      flex: 1,
                      backgroundColor: "#10b981",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEvent(event._id)}
                    style={{
                      flex: 1,
                      backgroundColor: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminEvents;
