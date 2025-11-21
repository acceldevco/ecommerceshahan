'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductFeature {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface Product {
  id: number;
  name: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  alt?: string;
  features: ProductFeature[];
  rating: number;
  reviewCount: number;
  tags?: string[];
  inStock: boolean;
}

interface ProductShowcaseProps {
  product?: Product;
  variant?: 'default' | 'minimal' | 'featured';
}

// داده‌های پیش‌فرض فیک
const defaultProduct: Product = {
  id: 1,
  name: "گوشی هوشمند سامسونگ گلکسی S24",
  title: "گوشی هوشمند سامسونگ گلکسی S24 اولترا - 512GB",
  description: "گوشی هوشمند flagship با جدیدترین تراشه اسنپدراگون 8 نسل 3، دوربین 200 مگاپیکسلی و باتری 5000 میلی‌آمپر ساعتی. طراحی شیک و مقاوم در برابر آب و گرد و غبار با استاندارد IP68.",
  price: 35990000,
  originalPrice: 41990000,
  discount: 14,
  image: "/api/placeholder/600/600",
  alt: "گوشی سامسونگ گلکسی S24 اولترا",
  features: [
    {
      id: 1,
      name: "پردازنده قدرتمند",
      description: "تراشه اسنپدراگون 8 نسل 3 با 12 گیگابایت رم",
      icon: "⚡"
    },
    {
      id: 2,
      name: "دوربین پیشرفته",
      description: "سیستم چهار دوربین 200+50+12+10 مگاپیکسلی",
      icon: "📸"
    },
    {
      id: 3,
      name: "نمایشگر داینامیک",
      description: "صفحه نمایش 6.8 اینچی Dynamic AMOLED 2X با نرخ تازه‌سازی 120Hz",
      icon: "🖥️"
    },
    {
      id: 4,
      name: "باتری قدرتمند",
      description: "باتری 5000 میلی‌آمپر ساعتی با پشتیبانی از شارژ 45 واتی",
      icon: "🔋"
    },
    {
      id: 5,
      name: "ذخیره سازی",
      description: "حافظه داخلی 512GB با پشتیبانی از کارت حافظه تا 1TB",
      icon: "💾"
    },
    {
      id: 6,
      name: "مقاوم در برابر آب",
      description: "مقاوم در برابر آب و گرد و غبار با استاندارد IP68",
      icon: "💧"
    }
  ],
  rating: 4.7,
  reviewCount: 124,
  tags: ["پرچمدار", "جدید", "پرفروش", "تضمین اصل"],
  inStock: true
};

// داده‌های فیک برای تصاویر محصول
const fakeImages = [
  "/api/placeholder/600/600",
  "/api/placeholder/600/600",
  "/api/placeholder/600/600",
  "/api/placeholder/600/600"
];

export default function ProductShowcase({ 
  product = defaultProduct,
  variant = 'default' 
}: ProductShowcaseProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'reviews'>('features');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={index < rating ? "#FBBF24" : "#E5E7EB"}
        className="flex-shrink-0"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  // داده‌های فیک برای نظرات
  const fakeReviews = [
    {
      id: 1,
      name: "علیرضا محمدی",
      rating: 5,
      date: "۱۴۰۲/۱۰/۱۵",
      comment: "عالی هست! کیفیت ساخت فوق‌العاده‌ایه. باتری خیلی خوب دووم میاره و دوربینش واقعاً حرفه‌ایه.",
      verified: true
    },
    {
      id: 2,
      name: "فاطمه کریمی",
      rating: 4,
      date: "۱۴۰۲/۱۰/۱۲",
      comment: "طراحی شیک و امکانات کامل. فقط وزنش یه کم زیاده ولی در کل راضیم.",
      verified: true
    }
  ];

  // داده‌های فیک برای مشخصات فنی
  const fakeSpecs = [
    { name: "ابعاد", value: "۱۶۳.۴ × ۷۸.۱ × ۸.۶ میلی‌متر" },
    { name: "وزن", value: "۲۳۲ گرم" },
    { name: "صفحه نمایش", value: "۶.۸ اینچ Dynamic AMOLED 2X" },
    { name: "رزولوشن", value: "۳۰۸۸ × ۱۴۴۰ پیکسل" },
    { name: "پردازنده", value: "Snapdragon 8 Gen 3" },
    { name: "رم", value: "۱۲ گیگابایت" },
    { name: "حافظه داخلی", value: "۵۱۲ گیگابایت" },
    { name: "دوربین اصلی", value: "۲۰۰ مگاپیکسل" },
    { name: "دوربین سلفی", value: "۱۲ مگاپیکسل" },
    { name: "باتری", value: "۵۰۰۰ میلی‌آمپر ساعتی" },
    { name: "سیستم عامل", value: "Android 14 با One UI 6.1" },
    { name: "مقاومت", value: "IP68" }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
        variant === 'featured' ? 'bg-gradient-to-br from-stone-50 to-[#f8f8f5] rounded-3xl p-8' : ''
      }`}>
        
        {/* Product Images Section */}
        <div className="space-y-6">
          {/* Main Image */}
          <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-stone-100 to-stone-50 overflow-hidden shadow-xl group">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center text-stone-600">
                <div className="text-4xl mb-4">📱</div>
                <p className="text-lg font-semibold">سامسونگ گلکسی S24</p>
                <p className="text-sm mt-2">تصویر محصول</p>
              </div>
            </div>
            
            {/* Discount Badge */}
            {product.discount && product.discount > 0 && (
              <div className="absolute top-4 left-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
                <span className="text-sm font-bold text-white">
                  {product.discount}%
                </span>
              </div>
            )}

            {/* Stock Status */}
            <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${
              product.inStock 
                ? 'bg-emerald-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {product.inStock ? 'موجود' : 'ناموجود'}
            </div>

            {/* Quick Actions */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:bg-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21 8v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 4H3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 2h8" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:bg-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="flex justify-center gap-4">
            {fakeImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square w-20 rounded-xl bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden transition-all duration-300 ${
                  selectedImage === index 
                    ? 'ring-2 ring-[#B7B89F] scale-110' 
                    : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="w-full h-full flex items-center justify-center text-stone-400">
                  <span className="text-lg">📸</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#B7B89F]/20 text-[#8a8b7a] text-xs font-medium rounded-full border border-[#B7B89F]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title & Rating */}
            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-bold text-stone-800 leading-tight">
                {product.title}
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed">
                {product.description}
              </p>
              
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-stone-600">
                  {product.rating} ({product.reviewCount} نظر)
                </span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-stone-800">
                {formatPrice(product.price)} تومان
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-stone-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.discount && product.discount > 0 && (
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                  ذخیره {formatPrice(product.originalPrice! - product.price)} تومان
                </span>
              </div>
            )}
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-2 gap-4">
            {product.features.slice(0, 4).map((feature) => (
              <div key={feature.id} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                <div className="w-8 h-8 bg-[#B7B89F] rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{feature.icon}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-800">{feature.name}</h4>
                  <p className="text-xs text-stone-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add to Cart Section */}
          <div className="space-y-6">
            {/* Quantity Selector */}
            <div className="flex items-center gap-6">
              <span className="text-stone-700 font-medium">تعداد:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <span className="w-12 text-center text-lg font-semibold text-stone-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                disabled={!product.inStock}
                className="flex-1 py-4 px-8 bg-[#B7B89F] hover:bg-[#a5a68f] disabled:bg-stone-300 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M2 2H4L4.4 4M7 13L4.4 4M4.4 4H21L17 13H7ZM7 13L5.5 15.5M17 13V20C17 20.5523 17.4477 21 18 21H19M11 19C11 19.5523 10.5523 20 10 20C9.44772 20 9 19.5523 9 19C9 18.4477 9.44772 18 10 18C10.5523 18 11 18.4477 11 19Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                افزودن به سبد خرید
              </button>
              
              <button className="py-4 px-6 border-2 border-[#B7B89F] text-[#8a8b7a] hover:bg-[#B7B89F] hover:text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                مشاهده سریع
              </button>
            </div>

            {/* Guarantee Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                تضمین اصل بودن کالا
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 12H4M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                ارسال سریع و رایگان
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2"/>
                </svg>
                گارانتی 18 ماهه
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Tabs */}
      <div className="mt-16">
        <div className="border-b border-stone-200">
          <div className="flex gap-8">
            {[
              { id: 'features' as const, name: 'ویژگی‌ها', count: product.features.length },
              { id: 'specs' as const, name: 'مشخصات فنی', count: fakeSpecs.length },
              { id: 'reviews' as const, name: 'نظرات', count: product.reviewCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-[#B7B89F] text-[#8a8b7a] font-semibold'
                    : 'border-transparent text-stone-500 hover:text-stone-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  {tab.name}
                  {tab.count && (
                    <span className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded-full">
                      {tab.count}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feature) => (
                <div key={feature.id} className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl">
                  <div className="w-10 h-10 bg-[#B7B89F] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{feature.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 mb-1">{feature.name}</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="bg-stone-50 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fakeSpecs.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm">
                    <span className="text-stone-600 font-medium">{spec.name}</span>
                    <span className="text-stone-800 font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Average Rating */}
              <div className="bg-stone-50 rounded-2xl p-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-stone-800">{product.rating}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(product.rating)}
                    </div>
                    <div className="text-sm text-stone-600 mt-1">{product.reviewCount} نظر</div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-sm text-stone-600 w-4">{star}</span>
                          <div className="flex-1 bg-stone-200 rounded-full h-2">
                            <div 
                              className="bg-amber-400 h-2 rounded-full"
                              style={{ width: `${(star / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {fakeReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 bg-[#B7B89F] rounded-full flex items-center justify-center text-white font-semibold">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-800">{review.name}</span>
                          {review.verified && (
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                              تایید شده
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-stone-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-stone-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}