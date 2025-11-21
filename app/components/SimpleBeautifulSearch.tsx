"use client"
import { useState, useRef } from "react";
import { useLoading } from "../hook/loadingData";
import { Search } from "lucide-react";

const MinimalShopSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  var configmain: any = {
    table: "product",

    pageSize: 1,
    filters: {
      include: { categories: true, files: true },
    },
  };
  const { data, fetchData, loading, hasMore, loadMore, submitData }:any ={}

    // useLoading({
    //   url: "/api/getdata",
    //   initialData: configmain,
    // });
  const products = [
    {
      id: 1,
      name: "گوشی سامسونگ گلکسی S24",
      category: "موبایل",
      price: "۳۵,۹۹۰,۰۰۰ تومان",
    },
    {
      id: 2,
      name: "لپ تاپ ایسوس ROG Strix",
      category: "لپ تاپ",
      price: "۴۸,۷۵۰,۰۰۰ تومان",
    },
    {
      id: 3,
      name: "هدفون سونی WH-1000XM5",
      category: "هدفون",
      price: "۱۲,۳۰۰,۰۰۰ تومان",
    },
    {
      id: 4,
      name: "اپل واچ سری 9",
      category: "ساعت",
      price: "۱۸,۹۰۰,۰۰۰ تومان",
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-[50%] ">
      {/* نوار جستجوی مینیمال */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={async (e) => {
            console.log("ad");
            setSearchTerm(e.target.value);
            await fetchData(
              true,
              {
                table: "product",

                pageSize: 1,
                // filters:
                //   ...configmain,
                // initialData: configmain,
                filters: {
                  where: {
                    AND: [
                      {
                        name: {
                          contains: e.target.value ?? "",
                          mode: "insensitive",
                        },
                      },
                    //   e.target.value
                    //     ? {
                    //         categories: {
                    //           name: { id: e.target.value },
                    //         },
                    //       }
                    //     : {},
                    ],
                  },
                  include: {
                    categories: true,
                  },
                },
              }
            );
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full px-2 py-1  bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors duration-150 placeholder:text-gray-400 text-gray-700"
          placeholder="جستجو در محصولات..."
        />
  {/* <Search className=" opacity-25"/> */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* لیست پیشنهادات ساده */}
      {showSuggestions && searchTerm && filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10">
          {data.data.map((product: any) => (
            <div
              key={product.id}
              className="px-4 py-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors duration-100"
              onClick={() => {
                setSearchTerm(product.name);
                setShowSuggestions(false);
              }}
            >
              {/* {JSON.stringify(data.data)} */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {product.category}
                </span>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-800">
                    {product.name}
                  </div>
                  <div className="text-xs text-green-600">{product.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinimalShopSearch;

// //////////////////////////////////////////////////////
// import { useState, useRef, useEffect } from 'react';

// const ProfessionalShopSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [searchHistory, setSearchHistory] = useState([]);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const inputRef = useRef(null);
//   const suggestionsRef = useRef(null);

//   const products = [
//     {
//       id: 1,
//       name: "گوشی موبایل سامسونگ گلکسی S24 اولترا",
//       category: "موبایل",
//       subCategory: "گوشی هوشمند",
//       brand: "Samsung",
//       price: 35990000,
//       originalPrice: 41990000,
//       image: "📱",
//       discount: 15,
//       rating: 4.8,
//       reviews: 1247,
//       tags: ["پرچمدار", "5G", "دوربین پیشرفته", "قلم S-Pen"],
//       inStock: true,
//       fastDelivery: true
//     },
//     {
//       id: 2,
//       name: "لپ تاپ گیمینگ ایسوس ROG Strix G16",
//       category: "لپ تاپ",
//       subCategory: "گیمینگ",
//       brand: "ASUS",
//       price: 48750000,
//       originalPrice: 54900000,
//       image: "💻",
//       discount: 12,
//       rating: 4.6,
//       reviews: 892,
//       tags: ["RTX 4060", "Intel i9", "32GB RAM", "1TB SSD"],
//       inStock: true,
//       fastDelivery: true
//     },
//     {
//       id: 3,
//       name: "هدفون بی سیم سونی WH-1000XM5",
//       category: "هدفون",
//       subCategory: "بی سیم",
//       brand: "Sony",
//       price: 12300000,
//       originalPrice: 14900000,
//       image: "🎧",
//       discount: 18,
//       rating: 4.9,
//       reviews: 2156,
//       tags: ["نویزکنسلینگ", "30h باتری", "شارژ سریع", "کیفیت استودیویی"],
//       inStock: true,
//       fastDelivery: false
//     },
//     {
//       id: 4,
//       name: "ساعت هوشمند اپل واچ سری 9 45mm",
//       category: "ساعت هوشمند",
//       subCategory: "اپل",
//       brand: "Apple",
//       price: 18900000,
//       originalPrice: 19900000,
//       image: "⌚",
//       discount: 5,
//       rating: 4.7,
//       reviews: 1789,
//       tags: ["همراه اپل", "GPS", "ضد آب", "مانیتور سلامت"],
//       inStock: false,
//       fastDelivery: true
//     },
//     {
//       id: 5,
//       name: "دوربین کانن EOS R6 Mark II",
//       category: "دوربین",
//       subCategory: "میرورلس",
//       brand: "Canon",
//       price: 52500000,
//       originalPrice: 58900000,
//       image: "📷",
//       discount: 11,
//       rating: 4.8,
//       reviews: 567,
//       tags: ["24MP", "4K video", "Stabilization", "Professional"],
//       inStock: true,
//       fastDelivery: true
//     },
//     {
//       id: 6,
//       name: "تبلت اپل آیپد پرو 12.9 اینچ M2",
//       category: "تبلت",
//       subCategory: "پریمیوم",
//       brand: "Apple",
//       price: 41200000,
//       originalPrice: 45900000,
//       image: "📱",
//       discount: 10,
//       rating: 4.9,
//       reviews: 1342,
//       tags: ["M2 Chip", "5G", "Apple Pencil", "Liquid Retina"],
//       inStock: true,
//       fastDelivery: true
//     }
//   ];

//   const filters = [
//     { id: 'all', name: 'همه', count: products.length },
//     { id: 'mobile', name: 'موبایل', count: products.filter(p => p.category === 'موبایل').length },
//     { id: 'laptop', name: 'لپ تاپ', count: products.filter(p => p.category === 'لپ تاپ').length },
//     { id: 'audio', name: 'صوتی', count: products.filter(p => p.category === 'هدفون').length },
//     { id: 'watch', name: 'ساعت', count: products.filter(p => p.category === 'ساعت هوشمند').length }
//   ];

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

//     const matchesFilter = activeFilter === 'all' ||
//       (activeFilter === 'mobile' && product.category === 'موبایل') ||
//       (activeFilter === 'laptop' && product.category === 'لپ تاپ') ||
//       (activeFilter === 'audio' && product.category === 'هدفون') ||
//       (activeFilter === 'watch' && product.category === 'ساعت هوشمند');

//     return matchesSearch && matchesFilter;
//   });

//   const handleKeyDown = (e) => {
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       setSelectedIndex(prev => prev < filteredProducts.length - 1 ? prev + 1 : 0);
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       setSelectedIndex(prev => prev > 0 ? prev - 1 : filteredProducts.length - 1);
//     } else if (e.key === 'Enter' && selectedIndex >= 0) {
//       e.preventDefault();
//       handleProductSelect(filteredProducts[selectedIndex]);
//     } else if (e.key === 'Escape') {
//       setShowSuggestions(false);
//     }
//   };

//   const handleProductSelect = (product) => {
//     setSearchTerm(product.name);
//     setShowSuggestions(false);
//     if (!searchHistory.includes(product.name)) {
//       setSearchHistory(prev => [product.name, ...prev.slice(0, 4)]);
//     }
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
//   };

//   useEffect(() => {
//     if (selectedIndex >= 0 && suggestionsRef.current) {
//       const selectedElement = suggestionsRef.current.children[selectedIndex];
//       selectedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
//     }
//   }, [selectedIndex]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-3 sm:p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header - کاملاً ریسپانسیو */}
//         <header className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
//           {/* Logo and Title Container */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4">
//             {/* Logo */}
//             <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-slate-800 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold shadow-lg">
//               🛍️
//             </div>

//             {/* Title and Subtitle */}
//             <div className="text-center sm:text-right">
//               <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-1 sm:mb-2">
//                 جستجوی پیشرفته محصولات
//               </h1>
//               <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
//                 بیش از <span className="font-semibold text-slate-700">{products.length}</span> محصول اصل با بهترین قیمت
//               </p>
//             </div>
//           </div>

//           {/* Stats Bar - فقط در دسکتاپ */}
//           <div className="hidden lg:flex items-center justify-center gap-6 md:gap-8 mt-4">
//             <div className="flex items-center gap-2 text-slate-600">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               <span className="text-sm">ارسال رایگان</span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-600">
//               <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//               <span className="text-sm">ضمانت اصالت</span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-600">
//               <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//               <span className="text-sm">پرداخت امن</span>
//             </div>
//           </div>

//           {/* Mobile Stats - فقط در موبایل */}
//           <div className="lg:hidden flex items-center justify-center gap-4 mt-3">
//             <div className="flex items-center gap-1 text-slate-600">
//               <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
//               <span className="text-xs">ارسال رایگان</span>
//             </div>
//             <div className="flex items-center gap-1 text-slate-600">
//               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
//               <span className="text-xs">ضمانت</span>
//             </div>
//           </div>
//         </header>

//         {/* Search Container */}
//         <div className="relative max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto mb-6 sm:mb-8">
//           {/* Search Box */}
//           <div className="relative">
//             {/* Search Icon */}
//             <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
//               <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>

//             {/* Input */}
//             <input
//               ref={inputRef}
//               type="text"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setSelectedIndex(-1);
//                 setShowSuggestions(true);
//               }}
//               onFocus={() => setShowSuggestions(true)}
//               onKeyDown={handleKeyDown}
//               className="w-full px-4 sm:px-5 py-3 sm:py-4 pr-10 sm:pr-12 bg-white border-2 border-slate-200 rounded-xl sm:rounded-2xl shadow-sm focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all duration-300 text-slate-800 text-sm sm:text-base placeholder:text-slate-400 placeholder:text-sm sm:placeholder:text-base"
//               placeholder="نام محصول، برند یا ویژگی مورد نظر..."
//             />

//             {/* Clear Button */}
//             {searchTerm && (
//               <button
//                 onClick={() => {
//                   setSearchTerm('');
//                   inputRef.current?.focus();
//                 }}
//                 className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
//               >
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             )}
//           </div>

//           {/* Suggestions Panel */}
//           {showSuggestions && (
//             <div className="absolute top-full left-0 right-0 mt-2 sm:mt-3 bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-xl z-50 max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] overflow-hidden">
//               {/* Header */}
//               <div className="sticky top-0 bg-white border-b border-slate-100 px-3 sm:px-4 py-3 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm sm:text-base font-semibold text-slate-800">نتایج جستجو</span>
//                   {searchTerm && (
//                     <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
//                       {filteredProducts.length} محصول
//                     </span>
//                   )}
//                 </div>
//                 <button
//                   onClick={() => setShowSuggestions(false)}
//                   className="text-slate-400 hover:text-slate-600 transition-colors p-1"
//                 >
//                   <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Filters */}
//               <div className="sticky top-[53px] sm:top-[57px] bg-white border-b border-slate-100 px-3 sm:px-4 py-2 overflow-x-auto scrollbar-hide">
//                 <div className="flex gap-1 sm:gap-2 min-w-max">
//                   {filters.map(filter => (
//                     <button
//                       key={filter.id}
//                       onClick={() => setActiveFilter(filter.id)}
//                       className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
//                         activeFilter === filter.id
//                           ? 'bg-slate-800 text-white shadow-md'
//                           : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
//                       }`}
//                     >
//                       <span>{filter.name}</span>
//                       <span className={`text-xs ${activeFilter === filter.id ? 'text-slate-300' : 'text-slate-500'}`}>
//                         {filter.count}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="overflow-y-auto max-h-[calc(60vh-100px)] sm:max-h-[calc(70vh-110px)] md:max-h-[calc(80vh-120px)]" ref={suggestionsRef}>
//                 {searchTerm && filteredProducts.length > 0 ? (
//                   <div className="p-2 sm:p-3">
//                     {filteredProducts.map((product, index) => (
//                       <div
//                         key={product.id}
//                         onClick={() => handleProductSelect(product)}
//                         onMouseEnter={() => setSelectedIndex(index)}
//                         className={`relative p-3 sm:p-4 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
//                           selectedIndex === index
//                             ? 'bg-slate-50 border-2 border-slate-300 shadow-md'
//                             : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm'
//                         }`}
//                       >
//                         <div className="flex gap-3 sm:gap-4">
//                           <div className="flex-shrink-0">
//                             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xl sm:text-2xl">
//                               {product.image}
//                             </div>
//                           </div>

//                           <div className="flex-1 min-w-0">
//                             <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
//                               {product.inStock ? (
//                                 <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded border border-emerald-200">
//                                   <span className="hidden sm:inline">موجود</span>
//                                   <span className="sm:hidden">✓</span>
//                                 </span>
//                               ) : (
//                                 <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded border border-red-200">
//                                   <span className="hidden sm:inline">ناموجود</span>
//                                   <span className="sm:hidden">✗</span>
//                                 </span>
//                               )}
//                               {product.discount > 0 && (
//                                 <span className="px-1.5 sm:px-2 py-0.5 bg-rose-50 text-rose-700 text-xs rounded border border-rose-200 font-semibold">
//                                   %{product.discount}
//                                 </span>
//                               )}
//                             </div>

//                             <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-1 line-clamp-1">
//                               {product.name}
//                             </h3>

//                             <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-slate-600 mb-2">
//                               <span className="font-medium">{product.brand}</span>
//                               <span className="hidden sm:inline">•</span>
//                               <span className="hidden sm:inline">{product.category}</span>
//                             </div>

//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-1 text-amber-500">
//                                 <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
//                                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                 </svg>
//                                 <span className="text-xs sm:text-sm font-semibold text-slate-700">{product.rating}</span>
//                               </div>

//                               <div className="text-left">
//                                 <span className="text-sm sm:text-base font-bold text-slate-800">
//                                   {formatPrice(product.price)}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : searchTerm ? (
//                   <div className="p-6 sm:p-8 text-center">
//                     <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-slate-100 rounded-full flex items-center justify-center text-2xl sm:text-3xl">
//                       🔍
//                     </div>
//                     <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-2">
//                       محصولی یافت نشد
//                     </h3>
//                     <p className="text-xs sm:text-sm text-slate-600 mb-4">
//                       متاسفانه محصولی با عنوان "{searchTerm}" پیدا نکردیم
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-2 justify-center">
//                       <button
//                         onClick={() => setShowSuggestions(false)}
//                         className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-xs sm:text-sm"
//                       >
//                         بستن
//                       </button>
//                       <button
//                         onClick={() => setSearchTerm('')}
//                         className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:border-slate-300 transition-colors text-xs sm:text-sm"
//                       >
//                         جستجوی جدید
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="p-3 sm:p-4">
//                     <div className="mb-4">
//                       <h4 className="text-xs sm:text-sm font-semibold text-slate-600 mb-2">
//                         جستجوهای پرطرفدار
//                       </h4>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                         {['گوشی سامسونگ', 'لپ تاپ گیمینگ', 'هدفون بی سیم', 'اپل واچ'].map((item, index) => (
//                           <button
//                             key={index}
//                             onClick={() => setSearchTerm(item)}
//                             className="text-right p-2 sm:p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
//                           >
//                             <div className="flex items-center justify-between text-xs sm:text-sm">
//                               <span className="text-slate-700">{item}</span>
//                               <svg className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                               </svg>
//                             </div>
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <h4 className="text-xs sm:text-sm font-semibold text-slate-600 mb-2">
//                         برندهای برتر
//                       </h4>
//                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                         {['Samsung', 'Apple', 'Sony', 'ASUS', 'Canon', 'Xiaomi'].map((brand, index) => (
//                           <button
//                             key={index}
//                             onClick={() => setSearchTerm(brand)}
//                             className="p-2 sm:p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-200 text-xs sm:text-sm text-slate-700 font-medium"
//                           >
//                             {brand}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Info Cards - فقط در دسکتاپ */}
//         <div className="hidden lg:grid grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
//           <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
//             <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">
//               🚚
//             </div>
//             <h3 className="font-semibold text-slate-800 mb-1">ارسال رایگان</h3>
//             <p className="text-sm text-slate-600">برای خرید بالای 500 هزار تومان</p>
//           </div>
//           <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
//             <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">
//               ✓
//             </div>
//             <h3 className="font-semibold text-slate-800 mb-1">ضمانت اصالت</h3>
//             <p className="text-sm text-slate-600">تمام کالاها اصل و گارانتی دار</p>
//           </div>
//           <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
//             <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">
//               💳
//             </div>
//             <h3 className="font-semibold text-slate-800 mb-1">پرداخت امن</h3>
//             <p className="text-sm text-slate-600">درگاه پرداخت معتبر و امن</p>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProfessionalShopSearch;
