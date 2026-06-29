"use client";

import './gallery.css';
import { motion, AnimatePresence } from 'framer-motion';
import { BsZoomIn } from 'react-icons/bs';
import { useState, useMemo } from 'react';

export default function GalleryClient({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Extract unique album names dynamically from the images array
  const albums = useMemo(() => {
    const uniqueAlbums = new Set(images.map(img => img.album));
    return ['All', ...Array.from(uniqueAlbums).filter(Boolean)];
  }, [images]);

  // Filter the images based on the active tab
  const filteredImages = useMemo(() => {
    if (activeFilter === 'All') return images;
    return images.filter(img => img.album === activeFilter);
  }, [images, activeFilter]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <main className="gallery-page">
      {/* Banner */}
      <motion.div 
        className="gallery-banner"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1>Glimpses of Pavithram</h1>
        <p>A visual journey through our state-of-the-art facilities, our pure ingredients, and our 75-year legacy of taste.</p>
      </motion.div>

      {/* Filter Tabs */}
      {albums.length > 1 && (
        <motion.div 
          className="gallery-filters"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {albums.map((album, idx) => (
            <button 
              key={idx} 
              className={`filter-btn ${activeFilter === album ? 'active' : ''}`}
              onClick={() => setActiveFilter(album)}
            >
              <span dangerouslySetInnerHTML={{ __html: album }} />
            </button>
          ))}
        </motion.div>
      )}

      {/* Masonry Grid */}
      <motion.div 
        className="masonry-grid"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        // Key changes when filter changes to re-trigger animations
        key={activeFilter} 
      >
        {filteredImages.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem' }}>
            No gallery images found for this category.
          </p>
        ) : (
          filteredImages.map((img, idx) => (
            <motion.div 
              className="masonry-item" 
              key={`${img.id}-${idx}`}
              variants={fadeInUp}
              onClick={() => setSelectedImage(img)}
            >
              <img src={img.url} alt={img.title || "Pavithram Gallery Image"} />
              <div className="overlay">
                <BsZoomIn />
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="gallery-modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedImage(null)}>
                &times;
              </button>
              <img src={selectedImage.url} alt={selectedImage.title} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
