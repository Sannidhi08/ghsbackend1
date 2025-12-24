import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "http://localhost:5000/api/gallery";

const excludedImages = [10, 14, 20];
const photoTitles = {
  1: "Poshan Pakhwada",
  2: "Group Study",
  3: "Poshan Pakhwada",
  4: "Poshan Pakhwada",
  5: "Poshan Pakhwada",
  6: "Meeting",
  7: "Gandhi Jayanthi",
  8: "Poshan Pakhwada",
  9: "Ambedkar Jayanthi",
  11: "Faculties",
  12: "PPT Presentation",
  13: "Assembly",
  15: "Interactive Session",
  16: "Learning in Progress",
  17: "Mass PT",
  18: "Samudayadatta Shala Karyakrama",
  19: "Yoga Day",
  21: "Table Tennis",
  22: "Carrom",
  23: "Flag Hosting",
  24: "Sports Day",
  25: "Varli Art",
  26: "Varli Art",
  27: "Assembly",
  28: "Teachers Meeting",
};

const localGalleryItems = Array.from({ length: 28 }, (_, i) => i + 1)
  .filter((num) => !excludedImages.includes(num))
  .map((num) => ({
    type: "image",
    src: `/assets/${num}.jpg`,
    title: photoTitles[num] || `Photo ${num}`,
  }));

localGalleryItems.push({
  type: "video",
  src: "/assets/29.mp4",
  title: "School Event Video",
});

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const openModal = (item) => setSelectedMedia(item);
  const closeModal = () => setSelectedMedia(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(API_URL);
        setUploadedImages(res.data);
      } catch (error) {
        console.error("❌ Error fetching gallery:", error);
      }
    };
    fetchGallery();
  }, []);

  const allItems = [
    ...uploadedImages.map((img) => ({
      type: "image",
      src: img.image,
      title: img.caption,
    })),
    ...localGalleryItems,
  ];

  return (
    <section className="bg-blue-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
          Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
              onClick={() => openModal(item)}
            >
              {item.type === "image" ? (
                <>
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="px-3 py-2 text-sm font-semibold text-center text-gray-700">
                    {item.title}
                  </div>
                </>
              ) : (
                <div className="relative">
                  <video
                    src={item.src}
                    className="w-full h-48 object-cover"
                    muted
                    loop
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold hover:bg-opacity-70 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(item);
                    }}
                  >
                    ▶ Play Video
                  </button>
                  <div className="px-3 py-2 text-sm font-semibold text-center text-gray-700">
                    {item.title}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-red-400"
            >
              &times;
            </button>

            {selectedMedia.type === "image" ? (
              <img
                src={selectedMedia.src}
                alt={selectedMedia.title}
                className="w-full max-h-[80vh] object-contain rounded-md"
              />
            ) : (
              <video
                src={selectedMedia.src}
                controls
                autoPlay
                className="w-full max-h-[80vh] rounded-md"
              />
            )}
            <p className="text-center text-white mt-4 text-lg font-semibold">
              {selectedMedia.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
