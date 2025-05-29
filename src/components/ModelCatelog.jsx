import React, { useEffect, useRef } from "react";

const modelImages = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/46.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/22.jpg",
  "https://randomuser.me/api/portraits/women/33.jpg",
  "https://randomuser.me/api/portraits/men/55.jpg",
];

const ModelCatalog = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const slideInterval = setInterval(() => {
      if (!scrollContainer) return;

      scrollAmount += 1; // speed of scrolling
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        // reset scroll to start for infinite effect
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    }, 20); // adjust speed here (lower is faster)

    return () => clearInterval(slideInterval);
  }, []);

  // To create seamless infinite scroll, we duplicate the images array once
  const duplicatedImages = [...modelImages, ...modelImages];

  return (
    <div className="w-full max-w-8xl mt-20 mx-auto p-4">
      {/* <h2 className="text-2xl font-semibold mb-6 text-center">Model Catalog</h2> */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-hidden select-none cursor-pointer"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Model ${idx + 1}`}
            className="flex-shrink-0 rounded-lg object-cover
              w-40 h-56
              md:w-56 md:h-80
              lg:w-72 lg:h-[380px]"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
};

export default ModelCatalog;
