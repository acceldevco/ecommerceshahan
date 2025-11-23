'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  image: string;
  alt?: string;
  productCount?: number;
}

interface CategoryGridProps {
  title?: string;
  categories: Category[];
  variant?: 'default' | 'minimal' | 'gradient';
}

export default function CategoryGrid({
  title = "خرید بر اساس دسته",
  categories,
  variant = 'default'
}: CategoryGridProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const getVariantStyles = (isActive: boolean) => {
    const baseStyles = "relative w-20 h-20 lg:w-24 lg:h-24 rounded-2xl transition-all duration-400 ";
    
    switch (variant) {
      case 'minimal':
        return baseStyles + `
          bg-white border border-[#B7B89F]/30
          ${isActive ? 'border-[#B7B89F] shadow-md' : 'shadow-sm hover:shadow-md'}
          transform ${isActive ? 'scale-105' : 'hover:scale-105'}
        `;
      
      case 'gradient':
        return baseStyles + `
          bg-gradient-to-br from-[#B7B89F]/20 to-[#B7B89F]/40
          ${isActive ? 'shadow-lg' : 'shadow-md hover:shadow-lg'}
          transform ${isActive ? 'scale-110' : 'hover:scale-105'}
        `;
      
      default:
        return baseStyles + `
          bg-gradient-to-br from-stone-50 to-[#f8f8f5]
          ${isActive ? 'shadow-lg ring-1 ring-[#B7B89F]' : 'shadow-md hover:shadow-lg'}
          transform ${isActive ? 'scale-105' : 'hover:scale-105'}
        `;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Compact Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-stone-800 mb-3">
          {title}
        </h2>
        <p className="text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          محصولات مورد نظر خود را از بین دسته‌بندی‌های متنوع ما پیدا کنید
        </p>
      </div>

      {/* Compact Categories Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {categories.map((category:any) => {
          const isActive = activeCategory === category.id;
          
          return (
            <div
              key={category.id}
              className="flex flex-col items-center group cursor-pointer"
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
              onClick={() => {
                // Handle category click - you can add routing here
                console.log('Category clicked:', category.name);
              }}
            >
              {/* Compact Category Card */}
              <div className="relative mb-3">
                {/* Main Container */}
                <div className={getVariantStyles(isActive)}>
                  {/* Image Container */}
                  <a href={`archiveproduct?cate=${category.id}`} className={`absolute inset-2 rounded-xl overflow-hidden ${
                    variant === 'gradient' ? 'bg-white/20' : 'bg-white'
                  }`}>
                    <Image
                      src={category.imageUrl ?? "/remove.png"}
                      alt={category.alt || category.name}
                      fill
                      className={`object-cover transition-transform duration-500 ${
                        isActive ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                      sizes="(max-width: 768px) 64px, 80px"
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                      variant === 'gradient' 
                        ? 'bg-stone-500/5 group-hover:bg-stone-500/0' 
                        : 'bg-stone-500/0 group-hover:bg-stone-500/5'
                    } ${isActive ? 'bg-stone-500/5' : ''}`} />
                  </a>

                  {/* Product Count */}
                  {category.productCount && (
                    <div className={`
                      absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium transition-all duration-300
                      ${variant === 'gradient' 
                        ? 'bg-white/90 text-stone-700 shadow-sm' 
                        : 'bg-[#B7B89F] text-white shadow-sm'
                      }
                      ${isActive ? 'scale-110' : 'scale-100'}
                    `}>
                      {category.productCount}
                    </div>
                  )}

                  {/* Hover Icon */}
                  <div className={`
                    absolute -bottom-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300
                    ${variant === 'gradient' 
                      ? 'bg-white/90 text-stone-700 shadow-sm' 
                      : 'bg-white text-stone-700 shadow-sm border border-stone-200'
                    }
                    transform ${isActive ? 'scale-100 rotate-12' : 'scale-0'}
                  `}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path 
                        d="M9 18L15 12L9 6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Pulsing Animation */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-[#B7B89F]/30 animate-ping -z-10" />
                )}
              </div>

              {/* Compact Category Info */}
              <div className="text-center space-y-1">
                <h3 className={`
                  text-xs font-medium transition-colors duration-300 line-clamp-2 leading-tight
                  ${isActive ? 'text-[#8a8b7a] font-semibold' : 'text-stone-600 group-hover:text-stone-800'}
                `}>
                  {category.name}
                </h3>
                
                {/* Animated Underline */}
                <div className={`w-4 h-0.5 bg-[#B7B89F] mx-auto rounded-full transition-all duration-300 ${
                  isActive ? 'w-6 opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:w-4'
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Compact View All Button */}
      <div className="flex justify-center mt-10">
        <button className="
          group relative bg-[#B7B89F] hover:bg-[#a5a68f]
          text-white font-medium text-sm
          py-2.5 px-8 rounded-xl 
          shadow-md hover:shadow-lg
          transition-all duration-300 
          transform hover:scale-105 active:scale-95 
          overflow-hidden border border-[#a5a68f]
        ">
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          
          {/* Content */}
          <span className="relative flex items-center gap-2">
            <span>مشاهده همه</span>
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="transform group-hover:translate-x-0.5 transition-transform duration-300"
            >
              <path 
                d="M10 6L4 12L10 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M4 12H20" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}