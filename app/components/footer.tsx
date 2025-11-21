"use client"
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="w-full relative bg-gradient-to-b from-[#f8f8f2] to-[#e8e8dd] py-10 px-4 border-t border-[#d4d4c4]">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* About Section */}
          <div className="flex flex-col">
            <div className="flex items-center mb-3">
              <div className="w-2 h-6 bg-[#8a8b7a] rounded-l-md ml-2"></div>
              <h3 className="text-lg font-bold text-[#5a5b4a]">درباره ما</h3>
            </div>
            <p className="text-sm font-normal text-[#5a5b4a] text-right leading-relaxed">
              ما با هدف ارائه بهترین خدمات و محصولات به مشتریان خود فعالیت می‌کنیم. 
            </p>
            <div className="mt-3 flex justify-end">
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#8a8b7a] to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col">
            <div className="flex items-center mb-3">
              <div className="w-2 h-6 bg-[#8a8b7a] rounded-l-md ml-2"></div>
              <h3 className="text-lg font-bold text-[#5a5b4a]">تماس با ما</h3>
            </div>
            <div className="space-y-2 text-right">
              <div className="flex items-center justify-end">
                <svg className="w-4 h-4 text-[#8a8b7a] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-sm font-medium text-[#5a5b4a]">
                  ۰۲۱-۱۲۳۴۵۶۷۸
                </p>
              </div>
              <div className="flex items-center justify-end">
                <svg className="w-4 h-4 text-[#8a8b7a] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium text-[#5a5b4a]">
                  info@example.com
                </p>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#8a8b7a] to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col">
            <div className="flex items-center mb-3">
              <div className="w-2 h-6 bg-[#8a8b7a] rounded-l-md ml-2"></div>
              <h3 className="text-lg font-bold text-[#5a5b4a]">لینک‌های سریع</h3>
            </div>
            <div className="space-y-2 text-right">
              <a href="#" className="block text-sm font-medium text-[#5a5b4a] hover:text-[#8a8b7a] transition-all duration-200 transform hover:translate-x-1 cursor-pointer py-0.5">
                خانه
              </a>
              <a href="#" className="block text-sm font-medium text-[#5a5b4a] hover:text-[#8a8b7a] transition-all duration-200 transform hover:translate-x-1 cursor-pointer py-0.5">
                محصولات
              </a>
              <a href="#" className="block text-sm font-medium text-[#5a5b4a] hover:text-[#8a8b7a] transition-all duration-200 transform hover:translate-x-1 cursor-pointer py-0.5">
                درباره ما
              </a>
              <a href="#" className="block text-sm font-medium text-[#5a5b4a] hover:text-[#8a8b7a] transition-all duration-200 transform hover:translate-x-1 cursor-pointer py-0.5">
                تماس با ما
              </a>
            </div>
            <div className="mt-3 flex justify-end">
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#8a8b7a] to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col">
            <div className="flex items-center mb-3">
              <div className="w-2 h-6 bg-[#8a8b7a] rounded-l-md ml-2"></div>
              <h3 className="text-lg font-bold text-[#5a5b4a]">شبکه‌های اجتماعی</h3>
            </div>
            <div className="flex justify-end gap-3 mb-3">
              {/* Instagram */}
              <a href="#" className="bg-gradient-to-br from-[#FA8F21] to-[#D82D7E] p-1.5 rounded-full transform hover:scale-110 transition-all duration-200 shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* Telegram */}
              <a href="#" className="bg-gradient-to-br from-[#37AEE2] to-[#1E96C8] p-1.5 rounded-full transform hover:scale-110 transition-all duration-200 shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>
              
              {/* Twitter */}
              <a href="#" className="bg-gradient-to-br from-[#1DA1F2] to-[#0d8bd9] p-1.5 rounded-full transform hover:scale-110 transition-all duration-200 shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-.162 0-.32-.008-.477-.024.224.015.442.015.672.015 1.317 0 2.529-.447 3.491-1.203-1.228-.023-2.265-.837-2.621-1.953.429.082.872.082 1.301-.063-1.283-.257-2.247-1.393-2.247-2.753v-.035c.378.21.81.336 1.269.353-1.153-.771-1.529-2.229-.82-3.379 1.322 1.623 3.297 2.691 5.526 2.804-.206-.884.084-1.809.782-2.447 1.093-1.028 2.853-1.002 3.915.049.614-.121 1.189-.345 1.711-.654-.202.631-.628 1.159-1.184 1.494.544-.065 1.064-.209 1.546-.421-.361.541-.816 1.015-1.342 1.392z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a href="#" className="bg-gradient-to-br from-[#0077B5] to-[#00669c] p-1.5 rounded-full transform hover:scale-110 transition-all duration-200 shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
            </div>
            <p className="text-xs font-normal text-[#5a5b4a] text-right">
              ما را در شبکه‌های اجتماعی دنبال کنید
            </p>
            <div className="mt-3 flex justify-end">
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#8a8b7a] to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-2xl h-40 bg-gradient-to-br from-[#d4d4c4] to-[#b7b89f] rounded-xl flex items-center justify-center shadow-md overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRIMjR2LTJoMTJ2MnptMC00SDI0di0yaDEydjJ6bTAgNEgyNHYyaDEydi0yem0tMTItOGgxMnYtMkgyNHYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
            <div className="relative z-10 flex items-center">
              <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-lg font-bold text-white">موقعیت ما روی نقشه</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#d4d4c4] pt-4 text-center">
          <p className="text-xs text-[#5a5b4a] font-medium">
            © ۱۴۰۳ تمامی حقوق برای فروشگاه آنلاین محفوظ است
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <a href="#" className="text-xs text-[#5a5b4a] hover:text-[#8a8b7a] transition-colors duration-200">
              قوانین و مقررات
            </a>
            <a href="#" className="text-xs text-[#5a5b4a] hover:text-[#8a8b7a] transition-colors duration-200">
              حریم خصوصی
            </a>
            <a href="#" className="text-xs text-[#5a5b4a] hover:text-[#8a8b7a] transition-colors duration-200">
              سوالات متداول
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;