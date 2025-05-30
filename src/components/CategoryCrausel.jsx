import React from 'react';

const categories = [
  { id: 1, name: 'Ring', image: '/product-1.jpg' },
  { id: 2, name: 'Women', image: '/product-2.jpg' },
  { id: 3, name: 'Kids', image: '/product-3.jpg' },
  { id: 4, name: 'Accessories', image: '/product-4.jpg' },
  { id: 5, name: 'More', image: '/product-5.jpg' }, // fixed duplicate ID
    { id: 2, name: 'Women', image: '/product-2.jpg' },
  { id: 3, name: 'Kids', image: '/product-3.jpg' },
];

const CategoryCarousel = () => {
  return (
<div className="w-full overflow-x-auto scrollbar-hide px-6 py-0">
  <div className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 min-w-max justify-start items-center">
    {categories.map((cat) => (
      <div
        key={cat.id}
        className="flex flex-col items-center min-w-[2rem]"
      >
        <div className="w-24 h-24 md:w-36 md:h-36 lg:w-[10.5rem] lg:h-[10.5rem] rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
          <img
            src={cat.image}
            alt={cat.name}
            className="w-full h-full object-cover"
          />
        </div>
        <p
          className="mt-4 text-base md:text-lg font-semibold text-gray-800 text-center"
          style={{ fontFamily: "'Italiana', serif" }}
        >
          {cat.name}
        </p>
      </div>
    ))}
  </div>
</div>

  );
};

export default CategoryCarousel;
