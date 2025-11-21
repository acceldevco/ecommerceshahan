"use client";
import { useState, useRef, useEffect } from 'react';

// آیکون‌ها
const ChevronDownIcon = ({ isOpen }: { isOpen?: boolean }) => (
  <svg 
    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// انواع داده‌ها (همان نمونه قبلی)
interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  subcategories?: SubCategory[];
  featured?: boolean;
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  products?: Product[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

// داده‌های نمونه (همان نمونه قبلی)
const sampleCategories: Category[] = [
  {
    id: 1,
    name: "الکترونیک",
    slug: "electronics",
    description: "جدیدترین محصولات الکترونیکی",
    featured: true,
    subcategories: [
      {
        id: 101,
        name: "گوشی موبایل",
        slug: "mobile-phones",
        products: [
          { id: 1001, name: "گوشی سامسونگ S24", price: 28900000, isNew: true },
          { id: 1002, name: "آیفون 15 پرو", price: 45500000, isPopular: true },
          { id: 1003, name: "شیائومی 13", price: 12500000 },
        ]
      },
      {
        id: 102,
        name: "لپ‌تاپ",
        slug: "laptops",
        products: [
          { id: 1004, name: "مک‌بوک پرو", price: 68500000, isNew: true },
          { id: 1005, name: "لپ‌تاپ ایسوس", price: 32500000 },
        ]
      }
    ]
  },
  {
    id: 2,
    name: "مد و پوشاک",
    slug: "fashion",
    description: "برترین برندهای پوشاک",
    subcategories: [
      {
        id: 201,
        name: "لباس مردانه",
        slug: "men-clothing",
        products: [
          { id: 2001, name: "پیراهن مردانه", price: 450000 },
          { id: 2002, name: "شلوار جین", price: 680000 },
        ]
      }
    ]
  }
  // ... سایر دسته‌بندی‌ها
];

// کامپوننت مگامنو
const MegaMenu = () => {



  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleMouseEnter = (category: Category) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 200);
  };

  const handleCategoryClick = (category: Category) => {
    if (window.innerWidth < 1024) {
      // اگر روی همان دسته کلیک شد، بسته شود
      if (mobileOpenCategory === category.id) {
        setMobileOpenCategory(null);
      } else {
        // اگر روی دسته دیگری کلیک شد، قبلی بسته و جدید باز شود
        setMobileOpenCategory(category.id);
      }
    }
  };

  const handleSubcategoryClick = () => {
    // هنگام کلیک روی زیردسته، منوی موبایل بسته شود
    setIsMobileMenuOpen(false);
    setMobileOpenCategory(null);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileOpenCategory(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveCategory(null);
        setIsMobileMenuOpen(false);
        setMobileOpenCategory(null);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setMobileOpenCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* دکمه منو برای موبایل */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-2 text-[#5a5b4a] hover:text-[#8a8b7a] transition-colors"
      >
        <MenuIcon />
      </button>

      {/* دکمه دسته‌بندی‌ها برای دسکتاپ */}
      <button
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#5a5b4a] hover:text-[#8a8b7a] transition-all duration-200 cursor-pointer group"
      >
        <span>دسته‌بندی‌ها</span>
        <ChevronDownIcon isOpen={isOpen} />
        <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#8a8b7a] transition-all duration-200 group-hover:w-full"></span>
      </button>

      {/* مگامنو - دسکتاپ */}
      {isOpen && (
        <div
          className="hidden lg:block absolute top-full right-0 w-screen max-w-6xl bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50 animate-fadeIn"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* محتوای دسکتاپ - همانند قبل */}
          <div className="p-6">
            <div className="grid grid-cols-4 gap-8">
              {/* ستون دسته‌بندی‌ها */}
              <div className="col-span-1 border-l border-gray-100 pl-6">
                <h3 className="text-lg font-bold text-[#5a5b4a] mb-4">همه دسته‌بندی‌ها</h3>
                <div className="space-y-1">
                  {sampleCategories.map((category) => (
                    <button
                      key={category.id}
                      onMouseEnter={() => handleMouseEnter(category)}
                      className={`w-full text-right px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                        activeCategory?.id === category.id
                          ? 'bg-[#B7B89F]/20 text-[#8a8b7a] border-r-2 border-[#8a8b7a]'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        {category.featured && (
                          <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ستون محتوای فعال */}
              <div className="col-span-3">
                {activeCategory ? (
                  <div className="animate-slideIn">
                    {/* محتوای دسته فعال */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {activeCategory.name}
                        </h3>
                        {activeCategory.description && (
                          <p className="text-gray-600 mt-1">{activeCategory.description}</p>
                        )}
                      </div>
                      <button className="text-[#8a8b7a] hover:text-[#5a5b4a] text-sm font-medium transition-colors">
                        مشاهده همه →
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {activeCategory.subcategories?.map((subcategory) => (
                        <div key={subcategory.id} className="space-y-4">
                          <h4 className="font-semibold text-gray-900 text-lg border-b border-gray-200 pb-2">
                            {subcategory.name}
                          </h4>
                          <div className="space-y-3">
                            {subcategory.products?.slice(0, 3).map((product) => (
                              <a
                                key={product.id}
                                href={`/products/${product.id}`}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                              >
                                <div className="w-12 h-12 bg-gradient-to-br from-[#B7B89F] to-[#8a8b7a] rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                  {product.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-[#8a8b7a]">
                                      {product.name}
                                    </p>
                                    {product.isNew && (
                                      <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                        جدید
                                      </span>
                                    )}
                                    {product.isPopular && (
                                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                                        پرفروش
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-green-600 font-semibold">
                                    {product.price.toLocaleString('fa-IR')} تومان
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                          {subcategory.products && subcategory.products.length > 3 && (
                            <button className="w-full text-center text-sm text-[#8a8b7a] hover:text-[#5a5b4a] font-medium py-2 border border-dashed border-gray-300 rounded-lg hover:border-[#8a8b7a] transition-colors">
                              + {subcategory.products.length - 3} محصول دیگر
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium">دسته‌بندی مورد نظر خود را انتخاب کنید</p>
                      <p className="text-sm mt-1">محصولات و زیردسته‌ها در اینجا نمایش داده می‌شوند</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* منوی موبایل - نسخه اصلاح شده */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl animate-slideInRight">
            {/* هدر منوی موبایل */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
              <h2 className="text-lg font-bold text-[#5a5b4a]">دسته‌بندی‌ها</h2>
              <button
                onClick={handleCloseMobileMenu}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* محتوای منوی موبایل */}
            <div className="h-full overflow-y-auto pb-20">
              <div className="p-4 space-y-1">
                {sampleCategories.map((category) => (
                  <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`w-full flex items-center justify-between p-3 text-right rounded-lg transition-colors ${
                        mobileOpenCategory === category.id
                          ? 'bg-[#B7B89F]/20 text-[#8a8b7a]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {category.featured && (
                          <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                        )}
                        <span className="font-medium text-right">{category.name}</span>
                      </div>
                      <ChevronDownIcon isOpen={mobileOpenCategory === category.id} />
                    </button>

                    {/* زیردسته‌ها در موبایل */}
                    {mobileOpenCategory === category.id && (
                      <div className="pr-4 pb-3 space-y-2 animate-fadeIn">
                        {category.subcategories?.map((subcategory) => (
                          <div key={subcategory.id} className="space-y-1">
                            <a
                              href={`/categories/${subcategory.slug}`}
                              onClick={handleSubcategoryClick}
                              className="block py-2 px-3 text-sm font-medium text-gray-600 hover:text-[#8a8b7a] hover:bg-gray-50 rounded-lg transition-colors border-r-2 border-[#B7B89F] mr-2"
                            >
                              {subcategory.name}
                            </a>
                            
                            {/* محصولات در موبایل */}
                            {subcategory.products && subcategory.products.length > 0 && (
                              <div className="pr-4 space-y-1 mt-1">
                                {subcategory.products.slice(0, 3).map((product) => (
                                  <a
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    onClick={handleSubcategoryClick}
                                    className="block py-1.5 px-3 text-xs text-gray-500 hover:text-gray-700 bg-gray-50 rounded transition-colors border-r border-gray-200 mr-2"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-right">{product.name}</span>
                                      <span className="text-green-600 font-medium text-left">
                                        {product.price.toLocaleString('fa-IR')}
                                      </span>
                                    </div>
                                    <div className="flex gap-1 mt-1 justify-end">
                                      {product.isNew && (
                                        <span className="px-1 py-0.5 bg-green-100 text-green-700 text-[10px] rounded">
                                          جدید
                                        </span>
                                      )}
                                      {product.isPopular && (
                                        <span className="px-1 py-0.5 bg-amber-100 text-amber-700 text-[10px] rounded">
                                          پرفروش
                                        </span>
                                      )}
                                    </div>
                                  </a>
                                ))}
                                {subcategory.products.length > 3 && (
                                  <button 
                                    onClick={handleSubcategoryClick}
                                    className="w-full text-center text-xs text-[#8a8b7a] hover:text-[#5a5b4a] font-medium py-1 border border-dashed border-gray-300 rounded transition-colors"
                                  >
                                    + {subcategory.products.length - 3} محصول دیگر
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* فوتر منوی موبایل */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
              <button
                onClick={handleCloseMobileMenu}
                className="w-full bg-[#B7B89F] text-white py-2 rounded-lg font-medium hover:bg-[#8a8b7a] transition-colors"
              >
                بستن منو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;