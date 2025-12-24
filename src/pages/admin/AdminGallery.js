import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../admin/AdminDashboard.css"; // ✅ same sidebar styling

function AdminGallery() {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = "http://localhost:5000/api/gallery";

  // ✅ Fetch all images
  const fetchImages = async () => {
    try {
      const res = await axios.get(API_URL);
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ✅ Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Upload / Update Image
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) formData.append("image", selectedFile);
    formData.append("caption", caption);

    try {
      setLoading(true);
      setMessage(editingId ? "Updating..." : "Uploading...");

      let res;

      // ✅ Always use multipart/form-data — even if no image uploaded
      if (editingId) {
        res = await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setMessage(res.data.message || "✅ Operation successful!");
      resetForm();
      await fetchImages();
    } catch (error) {
      console.error("❌ Upload/Update error:", error);
      const msg = error.response?.data?.message || "❌ Upload failed.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Image
  const handleDelete = async (id) => {
    if (window.confirm("🗑️ Delete this image?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setImages(images.filter((img) => img._id !== id));
        setMessage("✅ Image deleted successfully!");
      } catch (error) {
        console.error("Error deleting image:", error);
        setMessage("❌ Failed to delete image.");
      }
    }
  };

  // ✅ Edit Image
  const handleEdit = (img) => {
    setEditingId(img._id);
    setCaption(img.caption);
    setPreview(img.image);
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Cancel Edit
  const handleCancelEdit = () => {
    resetForm();
    setMessage("❌ Edit cancelled.");
  };

  // ✅ Reset form
  const resetForm = () => {
    setCaption("");
    setSelectedFile(null);
    setPreview("");
    setEditingId(null);
    setLoading(false);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>School Admin</h2>

        <button
          onClick={() => navigate("/admin/dashboard")}
          className={location.pathname.includes("/admin/dashboard") ? "active" : ""}
        >
          🏠 Dashboard
        </button>

        <button
          onClick={() => navigate("/admin/gallery")}
          className={location.pathname.includes("/admin/gallery") ? "active" : ""}
        >
          📷 Gallery
        </button>

        <button
          onClick={() => navigate("/admin/events")}
          className={location.pathname.includes("/admin/events") ? "active" : ""}
        >
          🗓 Events
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="content">
        <h1 style={{ color: "#1e293b", marginBottom: "25px" }}>
          🖼️ Admin Gallery Management
        </h1>

        {/* Upload / Edit Form */}
        <div
          style={{
            maxWidth: "500px",
            margin: "auto",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
            {editingId ? "✏️ Edit Image" : "📤 Upload Image"}
          </h2>

          <form onSubmit={handleUpload}>
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
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            )}

            <input
              type="text"
              placeholder="Enter caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "10px",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: loading ? "#60a5fa" : "#2563eb",
                color: "#fff",
                padding: "10px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "0.3s",
              }}
            >
              {loading ? "Saving..." : editingId ? "Update" : "Upload"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                style={{
                  backgroundColor: "#6b7280",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "100%",
                  marginTop: "10px",
                  transition: "0.3s",
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>

          {message && (
            <p style={{ textAlign: "center", marginTop: "10px", color: "#374151" }}>
              {message}
            </p>
          )}
        </div>

        {/* Gallery Display */}
        <h3 style={{ color: "#1e293b", marginBottom: "20px" }}>🖼 Gallery Images</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {images.length === 0 ? (
            <p style={{ color: "#6b7280" }}>No images uploaded yet.</p>
          ) : (
            images.map((img) => (
              <div
                key={img._id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={img.image}
                  alt={img.caption}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <p style={{ fontWeight: "600", color: "#1e293b" }}>{img.caption}</p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => handleEdit(img)}
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
                    onClick={() => handleDelete(img._id)}
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
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminGallery;
