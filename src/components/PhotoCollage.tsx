import { useEffect, useState } from 'react';

// Import all images from the collage folder using Vite's glob import
const imageModules = (import.meta as any).glob('../assets/collage/*.JPG', { eager: true, import: 'default' });
const images = Object.values(imageModules) as string[];

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

export default function PhotoCollage() {
  const [visiblePhotos, setVisiblePhotos] = useState(0);
  const [isStacking, setIsStacking] = useState(true);
  const [rotationIndex, setRotationIndex] = useState(0);

  useEffect(() => {
    // Animate photos appearing one by one
    const interval = setInterval(() => {
      setVisiblePhotos((prev) => {
        if (prev >= images.length) {
          clearInterval(interval);
          setIsStacking(false); // Done stacking
          return prev;
        }
        return prev + 1;
      });
    }, 320); // Stack a new photo every 320ms

    return () => clearInterval(interval);
  }, []);

  const handlePhotoClick = () => {
    if (!isStacking) {
      // Cycle through photos: move top photo to bottom
      setRotationIndex((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-8 py-8">
      {/* "Per molts anys!" text on top - more prominent */}
      <div
        className="transform -rotate-2"
      >
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-pastel-pink via-pastel-lavender to-pastel-blush bg-clip-text text-transparent drop-shadow-2xl font-['Caveat'] whitespace-nowrap">
          Per molts anys! ✨
        </h2>
      </div>

      {/* Photo stack - larger and more visible */}
      <div
        className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center cursor-pointer"
        onClick={handlePhotoClick}
      >
        {images.map((img, index) => {
          // Calculate rotated index to cycle photos
          const rotatedIndex = (index - rotationIndex + images.length) % images.length;
          const transform = photoTransforms[index];
          const isVisible = rotatedIndex < visiblePhotos;

          return (
            <div
              key={index}
              className="absolute bg-white p-2 sm:p-3 shadow-2xl transition-all duration-500 hover:scale-105 rounded-lg"
              style={{
                width: '240px',
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
