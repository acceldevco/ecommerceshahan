'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MiniProductProps {
  title: string;
  image: string;
  price: number;
  discountPrice?: number;
}

export default function MiniProduct({
  title= "محصول ویژه",
  image="",
  price= 200000,
  discountPrice = 150000,
}: MiniProductProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="flex items-center w-full max-w-xs p-2 gap-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
      
      {/* Image */}
      <div className="flex-shrink-0">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold text-gray-900 truncate mb-1">
          {title}
        </h4>
        
        <div className="flex items-center gap-1">
          {discountPrice ? (
            <>
              <span className="text-xs font-bold text-gray-900">
                {formatPrice(discountPrice)}
              </span>
              <span className="text-[10px] text-gray-500 line-through">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="text-xs font-bold text-gray-900">
              {formatPrice(price)}
            </span>
          )}
        </div>

        <button className="mt-1 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-medium py-1 px-2 rounded-md transition-colors duration-200">
          خرید
        </button>
      </div>
    </div>
  );
}