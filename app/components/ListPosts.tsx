// import Card from "./Card";

// export default function ListPosts() {
//   const posts = [1, 2, 3, 4]; // در آینده می‌تونی اینو از API بگیری

//   return (
//     <section className="p-6 bg-gray-50 rounded-2xl shadow-sm">
//       {/* Title */}
//       <h2 className="text-xl font-bold text-gray-800 mb-6 text-right">
//         لیست پست‌ها
//       </h2>

//       {/* Posts Container */}
//       <div className="flex flex-wrap justify-end gap-6">
//         {posts.map((id) => (
//           <Card key={id} />
//         ))}
//       </div>
//     </section>
//   );
// }
////////////////////////////////////////////////////////////////////////////////
"use client"
import Card from "./Card";

// نوع داده پست
interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  category: string;
}

export default function ListPosts() {
  // داده‌های پیش‌فرض
  const defaultPosts: Post[] = [
    {
      id: 1,
      title: "آموزش Next.js - از پایه تا پیشرفته",
      description: "در این پست به بررسی کامل فریمورک Next.js می‌پردازیم و ویژگی‌های جدید آن را بررسی می‌کنیم.",
      date: "۱۴۰۲/۱۰/۱۵",
      author: "علیرضا محمدی",
      category: "برنامه‌نویسی",
      image: "/images/post-1.jpg"
    },
    {
      id: 2,
      title: "تکنیک‌های پیشرفته Tailwind CSS",
      description: "آموزش تکنیک‌های حرفه‌ای برای کار با تیلویند و ایجاد کامپوننت‌های ریسپانسیو.",
      date: "۱۴۰۲/۱۰/۱۲",
      author: "فاطمه کریمی",
      category: "طراحی",
      image: "/images/post-2.jpg"
    },
    {
      id: 3,
      title: "بهینه‌سازی عملکرد در React",
      description: "راهکارهای عملی برای بهبود performance در اپلیکیشن‌های ری‌اکتی.",
      date: "۱۴۰۲/۱۰/۱۰",
      author: "محمد جعفری",
      category: "برنامه‌نویسی",
      image: "/images/post-3.jpg"
    },
    {
      id: 4,
      title: "معماری Clean Code در پروژه‌های بزرگ",
      description: "چگونه کدهای تمیز و قابل نگهداری بنویسیم و معماری مناسب انتخاب کنیم.",
      date: "۱۴۰۲/۱۰/۰۸",
      author: "سارا احمدی",
      category: "مهندسی نرم‌افزار",
      image: "/images/post-4.jpg"
    },
    {
      id: 5,
      title: "آموزش TypeScript برای توسعه‌دهندگان React",
      description: "یادگیری TypeScript به همراه مثال‌های عملی در محیط ری‌اکت.",
      date: "۱۴۰۲/۱۰/۰۵",
      author: "رضا نوروزی",
      category: "برنامه‌نویسی",
      image: "/images/post-5.jpg"
    },
    {
      id: 6,
      title: "استراتژی‌های SEO در Next.js",
      description: "بهترین روش‌های سئو در Next.js برای رتبه‌بندی بهتر در گوگل.",
      date: "۱۴۰۲/۱۰/۰۳",
      author: "نازنین صادقی",
      category: "سئو",
      image: "/images/post-6.jpg"
    },
    {
      id: 7,
      title: "مدیریت حالت در اپلیکیشن‌های بزرگ",
      description: "مقایسه Redux, Zustand, Context API و انتخاب ابزار مناسب.",
      date: "۱۴۰۲/۱۰/۰۱",
      author: "امیرحسین علیزاده",
      category: "برنامه‌نویسی",
      image: "/images/post-7.jpg"
    },
    {
      id: 8,
      title: "تست‌نویسی در پروژه‌های React",
      description: "آموزش جامع تست‌نویسی با Jest و React Testing Library.",
      date: "۱۴۰۲/۰۹/۲۸",
      author: "لیلا رضایی",
      category: "تست نرم‌افزار",
      image: "/images/post-8.jpg"
    }
  ];

  // برای شبیه‌سازی لودینگ - در حالت واقعی از API می‌گیریم
  const isLoading = false;
  const error = null;
  const posts = defaultPosts;

  // حالت لودینگ
  if (isLoading) {
    return (
      <section className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200/60">
        <div className="animate-pulse">
          <div className="h-7 w-48 bg-gray-300 rounded-lg mb-6 ml-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
              <div key={id} className="bg-gray-300 rounded-2xl h-80"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // حالت خطا
  if (error) {
    return (
      <section className="p-4 sm:p-6 lg:p-8 bg-[#B7B89F]/30  rounded-2xl sm:rounded-3xl shadow-lg ">
        <div className="text-center py-8">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            خطا در دریافت پست‌ها
          </h3>
          <p className="text-gray-600 text-sm">
            متاسفانه امکان بارگذاری پست‌ها وجود ندارد.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-4 sm:p-6 lg:p-8 bg-[#B7B89F]/30 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200/60 backdrop-blur-sm">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-right order-2 sm:order-1">
          لیست پست‌ها
          <span className="text-sm font-medium text-gray-500 bg-gray-200/60 px-3 py-1 rounded-full mr-3 align-middle">
            {posts.length} پست
          </span>
        </h2>
        
        {/* فیلتر و جستجو */}
        {/* <div className="flex gap-3 order-1 sm:order-2">
          <select className="text-sm border border-gray-300 rounded-xl px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200">
            <option value="newest">جدیدترین پست‌ها</option>
            <option value="popular">پربازدیدترین</option>
            <option value="oldest">قدیمی‌ترین</option>
          </select>
          
          <select className="text-sm border border-gray-300 rounded-xl px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200">
            <option value="">همه دسته‌بندی‌ها</option>
            <option value="programming">برنامه‌نویسی</option>
            <option value="design">طراحی</option>
            <option value="seo">سئو</option>
            <option value="testing">تست نرم‌افزار</option>
          </select>
        </div> */}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center lg:justify-items-end">
        {posts.slice(0, 4).map((post) => (
          <div 
            key={post.id} 
            className="w-full max-w-sm transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
          >
            <Card 
              id={post.id}
              title={post.title}
              description={post.description}
              date={post.date}
              author={post.author}
              category={post.category}
              image={post.image}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8 lg:mt-12">
        <button className="px-8 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-white hover:border-gray-400 hover:shadow-md transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
          <span>بارگذاری پست‌های بیشتر</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* آمار کلی */}
      {/* <div className="mt-8 pt-6 border-t border-gray-200/60">
        <div className="flex flex-wrap justify-center gap-6 text-center text-sm text-gray-600">
          <div>
            <span className="font-semibold text-gray-800">{posts.length}</span> پست منتشر شده
          </div>
          <div>
            <span className="font-semibold text-gray-800">
              {new Set(posts.map(post => post.category)).size}
            </span> دسته‌بندی
          </div>
          <div>
            <span className="font-semibold text-gray-800">
              {new Set(posts.map(post => post.author)).size}
            </span> نویسنده
          </div>
        </div>
      </div> */}
    </section>
  );
}