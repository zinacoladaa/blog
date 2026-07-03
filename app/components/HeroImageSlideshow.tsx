'use client';

import { useEffect, useState } from 'react';

const IMAGES = [
  {
    src: 'https://res.cloudinary.com/dky6bti4g/image/upload/v1783114140/food_hcr1qn.jpg',
    alt: 'A spread of comfort food from across Asia',
  },
  {
    src: 'https://res.cloudinary.com/dky6bti4g/image/upload/v1783114787/delicious-rice-and-assorted-dishes-served-on-leave-2026-01-09-08-09-18-utc_di7qtb.jpg',
    alt: 'Rice and assorted dishes served on banana leaves',
  },
  {
    src: 'https://res.cloudinary.com/dky6bti4g/image/upload/v1783115258/various-middle-eastern-dishes-on-wooden-table-2026-01-11-08-47-16-utc_tfodom.jpg',
    alt: 'Middle Eastern dishes on a wooden table',
  },
  {
    src: 'https://res.cloudinary.com/dky6bti4g/image/upload/v1783115401/shrimp-soup-with-lime-and-chili-peppers-2026-03-19-10-43-09-utc_uaaevu.jpg',
    alt: 'Shrimp soup with lime and chili peppers',
  },
];

export default function HeroImageSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-[4/3] max-w-xl mx-auto lg:mx-0 rounded-[2rem] overflow-hidden border-4 border-[#e8b84b] shadow-2xl">
      {IMAGES.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}
