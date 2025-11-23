"use client";
import { CarrotIcon, Search, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLoading } from "../hook/loadingData";
import SimpleBeautifulSearch from "./SimpleBeautifulSearch";
import { useStorage } from "../hook/localstorage";

// آیکون‌ها
const ChevronDownIcon = ({ isOpen }: { isOpen?: boolean }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
      }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
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

const MegaMenu = ({ datacategory }: any) => {
  const { data, loading, error, submitData }: any = datacategory; //{};
  // var sampleCategories: any = data?.data;

  // useLoading({
  //   url: "/api/getdata",
  //   submitUrl: "/api/main",

  //   initialData: {
  //     pageSize: 10000,
  //     table: "category",
  //     filters: {
  //       where: { parentId: null },
  //       include: {
  //         subcategories: {
  //           include: {
  //             subcategories: {
  //               include: {
  //                 subcategories: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // [
  //   {
  //     id: 1,
  //     name: "الکترونیک",
  //     slug: "electronics",
  //     description: "جدیدترین محصولات الکترونیکی",
  //     featured: true,
  //     subcategories: [
  //       {
  //         id: 101,
  //         name: "گوشی موبایل",
  //         slug: "mobile-phones",
  //         subcategories: [
  //           {
  //             id: 1001,
  //             name: "اندروید",
  //             slug: "android-phones",
  //             subcategories: [
  //               { id: 10001, name: "سامسونگ", slug: "samsung" },
  //               { id: 10002, name: "شیائومی", slug: "xiaomi" },
  //               { id: 10003, name: "هوآوی", slug: "huawei" },
  //             ],
  //           },
  //           {
  //             id: 1002,
  //             name: "iOS",
  //             slug: "ios-phones",
  //             subcategories: [
  //               { id: 10004, name: "آیفون ۱۵", slug: "iphone-15" },
  //               { id: 10005, name: "آیفون ۱۴", slug: "iphone-14" },
  //               { id: 10006, name: "آیفون SE", slug: "iphone-se" },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         id: 102,
  //         name: "لپ‌تاپ",
  //         slug: "laptops",
  //         subcategories: [
  //           {
  //             id: 1007,
  //             name: "گیمینگ",
  //             slug: "gaming-laptops",
  //             subcategories: [
  //               { id: 10007, name: "ایسوس ROG", slug: "asus-rog" },
  //               { id: 10008, name: "ام‌اس‌آی", slug: "msi" },
  //               { id: 10009, name: "لنوو لژیون", slug: "lenovo-legion" },
  //             ],
  //           },
  //           {
  //             id: 1008,
  //             name: "اداری",
  //             slug: "office-laptops",
  //             subcategories: [
  //               { id: 10010, name: "دل", slug: "dell" },
  //               { id: 10011, name: "اچ‌پی", slug: "hp" },
  //               { id: 10012, name: "لنوو", slug: "lenovo" },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         id: 103,
  //         name: "هدفون و هندزفری",
  //         slug: "headphones",
  //         subcategories: [
  //           {
  //             id: 1009,
  //             name: "بی‌سیم",
  //             slug: "wireless",
  //             subcategories: [
  //               { id: 10013, name: "ایرپاد", slug: "airpods" },
  //               { id: 10014, name: "گیمینگ", slug: "gaming-wireless" },
  //             ],
  //           },
  //           {
  //             id: 1010,
  //             name: "باسیم",
  //             slug: "wired",
  //             subcategories: [
  //               { id: 10015, name: "استودیویی", slug: "studio" },
  //               { id: 10016, name: "گیمینگ", slug: "gaming-wired" },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "مد و پوشاک",
  //     slug: "fashion",
  //     description: "برترین برندهای پوشاک",
  //     subcategories: [
  //       {
  //         id: 201,
  //         name: "لباس مردانه",
  //         slug: "men-clothing",
  //         subcategories: [
  //           {
  //             id: 2001,
  //             name: "بالاتنه",
  //             slug: "men-tops",
  //             subcategories: [
  //               { id: 20001, name: "پیراهن", slug: "men-shirts" },
  //               { id: 20002, name: "تی‌شرت", slug: "men-tshirts" },
  //               { id: 20003, name: "پولوشرت", slug: "men-polo" },
  //             ],
  //           },
  //           {
  //             id: 2002,
  //             name: "پایین‌تنه",
  //             slug: "men-bottoms",
  //             subcategories: [
  //               { id: 20004, name: "شلوار جین", slug: "men-jeans" },
  //               { id: 20005, name: "شلوار کتان", slug: "men-cotton" },
  //               { id: 20006, name: "شلوار ورزشی", slug: "men-sport" },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         id: 202,
  //         name: "لباس زنانه",
  //         slug: "women-clothing",
  //         subcategories: [
  //           {
  //             id: 2003,
  //             name: "لباس",
  //             slug: "women-dresses",
  //             subcategories: [
  //               { id: 20007, name: "مجلسی", slug: "women-formal" },
  //               { id: 20008, name: "روزمره", slug: "women-casual" },
  //               { id: 20009, name: "تابستانی", slug: "women-summer" },
  //             ],
  //           },
  //           {
  //             id: 2004,
  //             name: "کفش",
  //             slug: "women-shoes",
  //             subcategories: [
  //               { id: 20010, name: "کفش تخت", slug: "women-flats" },
  //               { id: 20011, name: "پاشنه بلند", slug: "women-heels" },
  //               { id: 20012, name: "کفش ورزشی", slug: "women-sneakers" },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  // ★ مدیریت چندلایه موبایل
  const [openPath, setOpenPath] = useState<number[]>([]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  // ---------- Desktop ----------
  const handleMouseEnter = (category: Category) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 200);
  };

  // ---------- Mobile Toggles ----------
  const handleCategoryClick = (category: Category) => {
    setOpenPath((prev) => {
      if (prev[0] === category.id) return [];
      return [category.id];
    });
  };

  const handleMobileSubcategoryClick = (
    id: number,
    parentId: number | null
  ) => {
    setOpenPath((prev) => {
      if (prev.includes(id)) {
        return prev.slice(0, prev.indexOf(id));
      }

      if (parentId !== null) {
        const parentIndex = prev.indexOf(parentId);
        if (parentIndex !== -1) {
          return [...prev.slice(0, parentIndex + 1), id];
        }
      }

      return [id];
    });
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenPath([]);
  };

  // ---------- Recursive Rendering – Mobile ----------
  const renderMobileSubcategories = (
    subcategories: Category[] | undefined,
    parentId: number | null
  ) => {
    if (!subcategories || subcategories.length === 0) return null;

    return (
      <div className="pr-4 pb-2 space-y-1 animate-fadeIn">
        {subcategories.map((subcategory: any) => {
          const isOpen = openPath.includes(subcategory.id);

          return (
            <div key={subcategory.id} className="space-y-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMobileSubcategoryClick(subcategory.id, parentId);
                }}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-right transition-colors ${isOpen
                  ? "bg-[#B7B89F]/20 text-[#8a8b7a]"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <span className="text-sm font-medium">{subcategory.name}</span>

                {subcategory.subcategories?.length > 0 && (
                  <ChevronDownIcon isOpen={isOpen} />
                )}
              </button>

              {isOpen &&
                subcategory.subcategories &&
                subcategory.subcategories.length > 0 && (
                  <div className="pr-4">
                    {renderMobileSubcategories(
                      subcategory.subcategories,
                      subcategory.id
                    )}
                  </div>
                )}
            </div>
          );
        })}
      </div>
    );
  };

  // ---------- Desktop Recursive ----------
  const renderDesktopSubcategories = (
    subcategories: Category[] | undefined,
    level: number = 0
  ) => {
    if (!subcategories || subcategories.length === 0) return null;

    return (
      <div
        className={`space-y-1 ${level > 0 ? "pr-4 border-r border-gray-100" : ""
          }`}
      >
        {subcategories.map((subcategory) => (
          <div key={subcategory.id} className="space-y-2">
            <a
              href={`archiveproduct?cate=${subcategory.id}`}
              // href={`/categories/${subcategory.slug}`}
              className="block px-3 py-2 text-sm text-gray-600 hover:text-[#8a8b7a] hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              {subcategory.name}
            </a>
            {renderDesktopSubcategories(subcategory.subcategories, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  // ---------- Close on outside click ----------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveCategory(null);
        setIsMobileMenuOpen(false);
        setOpenPath([]);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setOpenPath([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative z-99" ref={menuRef}>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-2 text-[#5a5b4a] hover:text-[#8a8b7a]"
      >
        <MenuIcon />
      </button>

      {/* DESKTOP BUTTON */}
      <button
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#5a5b4a] hover:text-[#8a8b7a] transition-all duration-200 cursor-pointer group"
      >
        <span>دسته‌بندی‌ها</span>
        <ChevronDownIcon isOpen={isOpen} />
        <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#8a8b7a] transition-all duration-200 group-hover:w-full"></span>
      </button>

      {/* DESKTOP MEGA MENU */}
      {isOpen && (
        <div
          className="hidden lg:block absolute top-full right-0 w-screen max-w-6xl bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50 animate-fadeIn"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-6">
            <div className="grid grid-cols-4 gap-8">
              {/* LEFT CATEGORY LIST */}
              <div className="col-span-1 border-l border-gray-100 pl-6">
                <h3 className="text-lg font-bold text-[#5a5b4a] mb-4">
                  همه دسته‌بندی‌ها
                </h3>

                <div className="space-y-1">
                  {data?.data?.map((category: any) => (
                    <button
                      key={category.id}
                      onMouseEnter={() => handleMouseEnter(category)}
                      className={`w-full text-right px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory?.id === category.id
                        ? "bg-[#B7B89F]/20 text-[#8a8b7a] border-r-2 border-[#8a8b7a]"
                        : "text-gray-600 hover:bg-gray-50"
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

              {/* RIGHT CONTENT */}
              <div className="col-span-3">
                {activeCategory ? (
                  <div className="animate-slideIn">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {activeCategory.name}
                        </h3>
                        {activeCategory.description && (
                          <p className="text-gray-600 mt-1">
                            {activeCategory.description}
                          </p>
                        )}
                      </div>

                      <a
                        href={`/categories/${activeCategory.slug}`}
                        className="text-[#8a8b7a] hover:text-[#5a5b4a] text-sm font-medium"
                      >
                        مشاهده همه →
                      </a>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {activeCategory.subcategories?.map((subcategory: any) => (
                        <div key={subcategory.id} className="space-y-4">
                          <a
                            href={`archiveproduct?cate=${subcategory.id}`}
                            className="font-semibold text-lg text-gray-900 border-b border-gray-200 pb-2"
                          >
                            {subcategory.name}
                          </a>
                          {renderDesktopSubcategories(
                            subcategory.subcategories
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none">
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <p className="text-lg font-medium">یک دسته انتخاب کنید</p>
                      <p className="text-sm mt-1 text-gray-400">
                        زیرمجموعه‌ها در اینجا نمایش داده می‌شوند
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden h-[100vh] z-99 fixed inset-0 bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl animate-slideInRight">
            {/* HEADER */}
            <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
              <h2 className="text-lg font-bold text-[#5a5b4a]">دسته‌بندی‌ها</h2>
              <button
                onClick={handleCloseMobileMenu}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <CloseIcon />
              </button>
            </div>

            {/* CONTENT */}
            <div className="overflow-y-auto pb-20">
              <div className="p-4 space-y-1">
                {/* {JSON.stringify(data?.data)} */}
                {data?.data?.map((category: any) => {
                  const open = openPath[0] === category.id;

                  return (
                    <div
                      key={category.id}
                      className="border-b last:border-none"
                    >
                      <button
                        onClick={() => handleCategoryClick(category)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${open
                          ? "bg-[#B7B89F]/20 text-[#8a8b7a]"
                          : "text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          {category.featured && (
                            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                          )}
                          <span className="font-medium">{category.name}</span>
                        </div>

                        <ChevronDownIcon isOpen={open} />
                      </button>

                      {open && (
                        <div className="pr-4">
                          {renderMobileSubcategories(
                            category.subcategories,
                            category.id
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FOOTER */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4">
              <button
                onClick={handleCloseMobileMenu}
                className="w-full bg-[#B7B89F] text-white py-2 rounded-lg font-medium hover:bg-[#8a8b7a]"
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

const UserProfile: any = () => (
  <a href="/admin" className="flex items-center gap-3">
    {/* Notification Badge */}
    {/* <div className="relative">
      <div className="w-8 h-8 overflow-hidden rounded-xl bg-[#8a8b7a] flex items-center justify-center shadow cursor-pointer hover:scale-105 transition-transform duration-200">
        <span className="text-white text-xs font-bold">۳</span>
      </div>
    </div> */}

    {/* User Info */}
    <div className="flex flex-col items-end">
      <span className="text-sm text-[#5a5b4a] font-medium">
        {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") ?? "{}")?.name : ""}
      </span>
      <span className="text-[10px] text-[#5a5b4a]/70 mt-0.5">
        {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") ?? "{}")?.email : ""}
      </span>
    </div>

    {/* Profile Avatar */}
    {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") ?? "{}")?.email ? <div className="w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-[#B7B89F] to-[#8a8b7a] border border-[#B7B89F]/50 shadow cursor-pointer hover:shadow-md transition-all duration-200" /> : <a href="/auth"><User className="text-[#5a5b4a]" /></a> : ""}

  </a>
);
function Header({ datacategory }: any) {
  var [cart, setcart]: any = useStorage<any>("cart", {});
  return (
    <header className="w-full z-9999 h-16 bg-[#B7B89F]/30 backdrop-blur-md  ">
      <div className=" p-5 w-full h-full flex items-center justify-between px-4">
        {/* Navigation Section */}
        <div className="flex items-center gap-6 w-[50%]">
          {/* Shopping Cart with Badge */}

          {/* Navigation Menu */}
          <MegaMenu datacategory={datacategory} />
          {[
            { name: "خانه", href: "/", key: 1 },
            { name: "محصولات", href: "/archiveproduct", key: 2 },
            // { name: "خانه", link: "#" },
          ].map((item, i) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-[#5a5b4a] hover:text-[#8a8b7a] transition-all duration-200 cursor-pointer relative group"
            >
              {item.name}
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#8a8b7a] transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
          {/* --------------------------search--------------------- */}
          <SimpleBeautifulSearch />
          {/* --------------------------search--------------------- */}
          {/* <div className="relative w-full ">
            <input
              type="text"
              className="w-full px-2 py-1  bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-700"
              placeholder="جستجو..."
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
          </div> */}
          {/* <input type="text" className="bg-white" placeholder="جستجو..."/> */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-sm font-medium text-[#5a5b4a] hover:text-[#8a8b7a] transition-all duration-200 cursor-pointer relative group"
              >
                {item.label}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#8a8b7a] transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))} */}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 w-[50%] justify-end">
          <div className="relative">
            {/* <button className="p-2 hover:scale-105 transition-all duration-200 cursor-pointer group">
              <div className="relative">
                <svg
                  width="36"
                  height="34"
                  viewBox="0 0 50 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-[#5a5b4a] group-hover:text-[#8a8b7a] transition-colors duration-200"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M17.4915 47.5424C18.8298 47.5424 19.9147 46.4573 19.9147 45.1188C19.9147 43.7804 18.8298 42.6953 17.4915 42.6953C16.1533 42.6953 15.0684 43.7804 15.0684 45.1188C15.0684 46.4573 16.1533 47.5424 17.4915 47.5424Z"
                    fill="currentColor"
                  />
                  <path
                    d="M35.8997 47.5424C37.238 47.5424 38.3229 46.4573 38.3229 45.1188C38.3229 43.7804 37.238 42.6953 35.8997 42.6953C34.5615 42.6953 33.4766 43.7804 33.4766 45.1188C33.4766 46.4573 34.5615 47.5424 35.8997 47.5424Z"
                    fill="currentColor"
                  />
                  <path
                    d="M14.6414 30.5823H32.5471C36.0429 30.5823 37.7908 30.5823 39.1958 29.7143C40.6007 28.8464 41.3869 27.2756 42.9591 24.1342C46.7563 16.5477 48.6551 12.7545 46.9506 9.99469C45.2461 7.23498 41.0266 7.23498 32.5878 7.23498H9.26028M14.6414 30.5823L9.381 7.71173L8.91924 5.88832C8.38537 3.78034 8.11848 2.72635 7.3307 2.1132C6.54298 1.5 5.45584 1.5 3.28162 1.5H1.5M14.6414 30.5823H13.0162C10.9419 30.5823 9.26028 32.2641 9.26028 34.3387C9.26028 36.4134 10.9419 38.0952 13.0162 38.0952H39.7319"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="absolute -top-1 -left-1 w-4 h-4 bg-[#8a8b7a] text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow">
                  3
                </span>
                <div className="da">dsad</div>
              </div>
            </button> */}

            <button className="p-2 hover:scale-105 transition-all duration-200 cursor-pointer group relative">
              <a href="/checkout" className="relative flex flex-col items-center">
                <svg
                  width="36"
                  height="34"
                  viewBox="0 0 50 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-[#5a5b4a] group-hover:text-[#8a8b7a] transition-colors duration-200"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M17.4915 47.5424C18.8298 47.5424 19.9147 46.4573 19.9147 45.1188C19.9147 43.7804 18.8298 42.6953 17.4915 42.6953C16.1533 42.6953 15.0684 43.7804 15.0684 45.1188C15.0684 46.4573 16.1533 47.5424 17.4915 47.5424Z"
                    fill="currentColor"
                  />
                  <path
                    d="M35.8997 47.5424C37.238 47.5424 38.3229 46.4573 38.3229 45.1188C38.3229 43.7804 37.238 42.6953 35.8997 42.6953C34.5615 42.6953 33.4766 43.7804 33.4766 45.1188C33.4766 46.4573 34.5615 47.5424 35.8997 47.5424Z"
                    fill="currentColor"
                  />
                  <path
                    d="M14.6414 30.5823H32.5471C36.0429 30.5823 37.7908 30.5823 39.1958 29.7143C40.6007 28.8464 41.3869 27.2756 42.9591 24.1342C46.7563 16.5477 48.6551 12.7545 46.9506 9.99469C45.2461 7.23498 41.0266 7.23498 32.5878 7.23498H9.26028M14.6414 30.5823L9.381 7.71173L8.91924 5.88832C8.38537 3.78034 8.11848 2.72635 7.3307 2.1132C6.54298 1.5 5.45584 1.5 3.28162 1.5H1.5M14.6414 30.5823H13.0162C10.9419 30.5823 9.26028 32.2641 9.26028 34.3387C9.26028 36.4134 10.9419 38.0952 13.0162 38.0952H39.7319"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="absolute -top-1 -left-1 w-4 h-4 bg-[#8a8b7a] text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow">
                  {Object.values(cart ?? []).length}
                </span>

                {/* متن که هنگام هاور نمایش داده می‌شود */}
                <div className="opacity-0 absolute top-full left-0 group-hover:opacity-100 transition-opacity duration-200 mt-2 text-xs text-[#5a5b4a] bg-white shadow-lg rounded-lg border border-gray-200 p-3 z-50 min-w-[200px]">
                  <div className="space-y-2">
                    {/* هدر */}
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <div className="font-medium">عنوان</div>
                      <div className="font-medium">مقدار</div>
                    </div>

                    {/* ردیف‌ها */}
                    {Object.values(cart).map((d: any) => (
                      <div key={d.id}>
                        <div className="flex justify-between py-1 border-b border-gray-100">
                          <div>{d.name}</div>
                          <div>{d.price * d.qty}</div>
                        </div>
                      </div>
                    ))}

                    {/* <div className="flex justify-between py-1 border-b border-gray-100">
                      <div>محصول ۲</div>
                      <div>۱۵۰,۰۰۰ تومان</div>
                    </div> */}

                    <div className="flex justify-between py-1 font-medium">
                      <div>جمع</div>
                      <div>
                        {
                          Object.values(cart ?? {}).reduce(
                            (sum: any, item: any) => {
                              return sum + item.price * item.qty;
                            },
                            0
                          ) as any
                        }
                        تومان
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </button>
          </div>

          <UserProfile />
        </div>
      </div>
    </header>

    // <div className="w-full h-16 bg-[#B7B89F]/30 backdrop-blur-md  flex justify-between">
    //   <div className="bg-red-500"><MegaMenu /></div>
    //   <div>asd</div>

    // </div>
  );
}

export default Header;

// export default MegaMenu;
