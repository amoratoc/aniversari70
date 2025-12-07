import { useEffect, useState } from 'react';
import imageList from '../data/images.json';
import { getAssetPath } from '../utils/assetPath';

// List of all images - auto-generated from public/collage
// Apply base URL to each image path for GitHub Pages compatibility
const images = imageList.map(path => getAssetPath(path));

// Generate random rotation between min and max degrees
const getRandomRotation = () => {
  return Math.random() * 30 - 15; // Random between -15 and +15 degrees
};

// Generate random displacement
const getRandomOffset = () => {
  return {
    x: Math.random() * 20 - 10, // Random between -10 and +10 px
    y: Math.random() * 20 - 10, // Random between -10 and +10 px
  };
};

// Pre-generate random positions for each photo (so they don't change on re-render)
const photoTransforms = images.map(() => ({
  rotation: getRandomRotation(),
  offset: getRandomOffset(),
}));

interface PhotoCollageProps {
  maxPhotos: number;
}

export default function PhotoCollage({ maxPhotos }: PhotoCollageProps) {
  const [visiblePhotos, setVisiblePhotos] = useState(0);
  const [isStacking, setIsStacking] = useState(true);
  const [rotationIndex, setRotationIndex] = useState(0);

  // Limit photos to show based on current day
  const photosToShow = Math.min(maxPhotos, images.length);

  useEffect(() => {
    // Animate photos appearing one by one
    const interval = setInterval(() => {
      setVisiblePhotos((prev) => {
        if (prev >= photosToShow) {
          clearInterval(interval);
          setIsStacking(false); // Done stacking
          return prev;
        }
        return prev + 1;
      });
    }, 1000); // Stack a new photo every 1000ms

    return () => clearInterval(interval);
  }, [photosToShow]);

  const handlePhotoClick = () => {
    if (!isStacking && photosToShow > 0) {
      // Cycle through photos: move top photo to bottom
      setRotationIndex((prev) => (prev + 1) % photosToShow);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-3 py-4">
      {/* "Per molts anys!" text on top - more prominent */}
      <div className="transform -rotate-2 w-full z-50" >
        <h2 className="text-7xl p-1 wrap sm:text-6xl md:text-7xl font-bold bg-linear-to-r from-pastel-pink via-pastel-lavender to-pastel-blush bg-clip-text text-transparent drop-shadow-2xl font-['Caveat'] text-center">
          Per molts anys! ✨
        </h2>
      </div>

      {/* Photo stack - larger and more visible */}
      <div
        className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center cursor-pointer"
        onClick={handlePhotoClick}
      >
        {images.slice(0, photosToShow).map((img, index) => {
          // Calculate rotated index to cycle photos
          const rotatedIndex = (index - rotationIndex + photosToShow) % photosToShow;
          const transform = photoTransforms[index];
          const isVisible = rotatedIndex < visiblePhotos;

          return (
            <div
              key={index}
              className="absolute bg-white p-1 sm:p-3 shadow-xl transition-all duration-500 hover:scale-105 rounded-lg"
              style={{
                width: '320px',
                height: '240px',
                transform: `
                  rotate(${transform.rotation}deg)
                  translate(${transform.offset.x}px, ${transform.offset.y}px)
                  translateZ(${rotatedIndex * 2}px)
                `,
                zIndex: rotatedIndex,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.5s ease-out, transform 0.3s ease-out, z-index 0.3s',
              }}
            >
              <img
                src={img}
                alt={`Foto ${index + 1}`}
                className="w-full h-full object-cover rounded"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
