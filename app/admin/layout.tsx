
"use client";
import { useContext, useState } from "react";
import { ContextMain } from "../context/context";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Files,
  Flag,
  MessageCircle,
  LogOut,
} from "lucide-react";

import ImageManagerPanel from "../components/ImageManagerPanel";
import UserForm from "../components/UserForm";
import { usePathname } from "next/navigation";

const Layout = ({ children }: any) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const ui = useContext(ContextMain);

  const menuItems = [
    { id: "dashboard", icon: BarChart3, label: "داشبورد", url: "/admin" },
    { id: "comments", icon: MessageCircle, label: "کامنت ها", url: "/admin/comments" },
    { id: "products", icon: Package, label: "محصولات", url: "/admin/products" },
    { id: "banner", icon: Flag, label: "بنر", url: "/admin/banner" },
    { id: "media", icon: Files, label: "رسانه ها", url: "/admin/files" },
    {
      id: "orders",
      icon: ShoppingCart,
      label: "سفارشات",
      url: "/admin/orders",
    },
    { id: "customers", icon: Users, label: "مشتریان", url: "/admin/users" },
    // { id: "settings", icon: Settings, label: "تنظیمات", url: "/admin/profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative" dir="rtl">

      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}


      <aside
        className={`
          fixed right-0 top-0 h-full bg-[#B7B89F] text-white z-50
          transition-all duration-300 flex justify-between flex-col
          ${mobileSidebarOpen ? "w-64" : "w-0"}
          lg:${sidebarOpen ? "w-64" : "w-20"}
          overflow-hidden
        `}

      >
        <div className="p-4 lg:p-6 h-full flex flex-col">

          <div className="flex items-center justify-between mb-8">
            <h1
              className={`text-xl font-bold transition-all
                ${!sidebarOpen && !mobileSidebarOpen ? "lg:hidden" : "block"}
              `}
            >
              فروشگاه شاهان
            </h1>


            <button
              onClick={() => {
                setMobileSidebarOpen(false);
                setSidebarOpen(false);
              }}
              className="lg:hidden"
            >
              <X size={24} />
            </button>
          </div>


          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const active = pathname === item.url;

              return (
                <a
                  key={item.id}
                  href={item.url}
                  className={`
          flex items-center
          gap-3 px-3 py-3 rounded-lg transition-all
          ${active ? "bg-white/20 shadow-lg" : "hover:bg-white/10"}
          ${!sidebarOpen && !mobileSidebarOpen
                      ? "lg:justify-center lg:px-3"
                      : ""
                    }
        `}
                  title={!sidebarOpen && !mobileSidebarOpen ? item.label : ""}
                >
                  <item.icon
                    size={22}
                    className="shrink-0 w-5 h-5 text-white"
                  />

                  <span
                    className={`
            font-medium transition-all
            ${!sidebarOpen && !mobileSidebarOpen ? "hidden lg:hidden" : "block"}
          `}
                  >
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
        <div className="flex justify-between p-2">
          <a href="/admin/profile"><Settings /></a>
          <a onClick={() => {
            typeof window !== "undefined" ? localStorage.removeItem('user') : ""
          }} href="/api/logout"><LogOut /></a>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <div
        className={`transition-all duration-300 min-h-screen
          ${mobileSidebarOpen ? "" : ""}
          ${sidebarOpen ? "lg:mr-64" : "lg:mr-0"}
        `}
      >

        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 py-3 lg:px-6 lg:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 lg:gap-4">

              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setMobileSidebarOpen(!mobileSidebarOpen);
                  } else {
                    setSidebarOpen(!sidebarOpen);
                  }
                }}
                className="text-gray-600 hover:text-gray-900 p-1"
              >
                <Menu size={24} />
              </button>


              {/* <div className="relative">
                <Search
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg w-60 lg:w-80
                  focus:outline-none focus:ring-2 focus:ring-[#B7B89F] text-sm lg:text-base"
                />
              </div> */}
            </div>


            <div className="flex items-center gap-3 lg:gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="flex items-center gap-2 pr-2 lg:pr-4 border-r border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">
                    {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") ?? "{}")?.name : ""}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-500">
                    {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") ?? "{}")?.email : ""}
                  </p>
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#B7B89F] rounded-full flex items-center justify-center text-white font-bold">
                  {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") ?? "{}")?.name?.[0] : ""}
                </div>
              </div>
            </div>
          </div>
        </header>


        <div className="p-4 lg:p-6">

          {children}

        </div>
        <ui.DrawerComponent id="dialogorder">

          {(data: any) => {




  const colorPalette:any = {
    primary: '#B7B89F',
    secondary: '#777C6D',
    background: '#F5F5F0',
    text: '#1a1a1a',
    lightText: '#555555',
    border: '#E0E0D5',
    accent: '#D4AF37',
  };


            // تابع برای فرمت کردن تاریخ
            // const formatDate = (dateString: any) => {
            //   const date = new Date(dateString);
            //   return date.toLocaleDateString('fa-IR', {
            //     year: 'numeric',
            //     month: 'long',
            //     day: 'numeric',
            //     hour: '2-digit',
            //     minute: '2-digit'
            //   });
            // };

            // تابع برای نمایش وضعیت سفارش
            // const getStatusBadge: any = (status: any) => {
            //   const statusConfig: any = {
            //     PROCESSING: { text: 'در حال پردازش', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
            //     COMPLETED: { text: 'تکمیل شده', color: 'bg-green-100 text-green-800 border-green-200' },
            //     CANCELLED: { text: 'لغو شده', color: 'bg-red-100 text-red-800 border-red-200' },
            //     SHIPPED: { text: 'ارسال شده', color: 'bg-blue-100 text-blue-800 border-blue-200' }
            //   };

            //   const config = statusConfig[status] || { text: status, color: 'bg-gray-100 text-gray-800 border-gray-200' };

            // }


            var orderData = data

            
  const formatDate:any = (date:any) => {
    return new Date(date).toLocaleDateString('fa-IR');
  };

  const formatCurrency = (amount:any) => {
    return amount.toLocaleString('fa-IR');
  };

  const calculateTotal = () => {
    return orderData.item?.items?.reduce((sum:any, item:any) => {
      return sum + item.quantity * item.unitPrice;
    }, 0) || 0;
  };

  const getStatusBadge:any = (status:any) => {
    const statusMap:any = {
      pending: { label: 'در انتظار', color: '#FFA500' },
      confirmed: { label: 'تایید شده', color: '#4CAF50' },
      shipped: { label: 'ارسال شده', color: '#2196F3' },
      delivered: { label: 'تحویل داده شده', color: '#8BC34A' },
      cancelled: { label: 'لغو شده', color: '#F44336' },
    };
    const current = statusMap[status] || statusMap.pending;
    return current;
  };

  const total = calculateTotal();
  const statusBadge = getStatusBadge(orderData.status);












return (<>

<div
      className="fixed inset-0 bg-black/50  flex items-center justify-center p-4 z-50"
      // onClick={onClose}
    >
      {/* دیالوگ اصلی */}
      <div
        className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: colorPalette.background }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر دیالوگ */}
        <div
          className="p-6 flex items-center justify-between"
          style={{ backgroundColor: colorPalette.primary }}
        >
          <div>
            <h2 className="text-2xl font-bold" style={{ color: colorPalette.background }}>
              سفارش #{orderData.id}
            </h2>
            <p style={{ color: colorPalette.background }} className="opacity-90 text-sm mt-1">
              {formatDate(orderData.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: statusBadge.color }}
            >
              {statusBadge.label}
            </span>
            <button
              onClick={()=>{

                ui.close('dialogorder',{})
              }}
              className="hover:opacity-80 transition-opacity"
              style={{ color: colorPalette.background }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* محتوای دیالوگ */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {/* بخش اطلاعات کاربر */}
          <section className="mb-8">
            <h3
              className="text-lg font-bold mb-4 pb-2 border-b-2"
              style={{
                color: colorPalette.secondary,
                borderBottomColor: colorPalette.primary,
              }}
            >
              اطلاعات مشتری
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p style={{ color: colorPalette.lightText }} className="text-sm font-medium mb-1">
                  نام مشتری
                </p>
                <p style={{ color: colorPalette.text }} className="font-semibold">
                  {orderData.item?.user?.name}
                </p>
              </div>
              <div>
                <p style={{ color: colorPalette.lightText }} className="text-sm font-medium mb-1">
                  ایمیل
                </p>
                <p style={{ color: colorPalette.text }} className="font-semibold">
                  {orderData.item?.user?.email}
                </p>
              </div>
              <div className="col-span-2">
                <p style={{ color: colorPalette.lightText }} className="text-sm font-medium mb-1">
                  آدرس
                </p>
                <p style={{ color: colorPalette.text }} className="font-semibold">
                  {orderData.item?.user?.address}
                </p>
              </div>
            </div>
          </section>

          {/* بخش محصولات */}
          <section className="mb-8">
            <h3
              className="text-lg font-bold mb-4 pb-2 border-b-2"
              style={{
                color: colorPalette.secondary,
                borderBottomColor: colorPalette.primary,
              }}
            >
              محصولات سفارش
            </h3>
            <div className="space-y-3">
              {orderData.item?.items?.map((item:any, index:any) => (
                <div
                  key={index}
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: colorPalette.border }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p style={{ color: colorPalette.text }} className="font-semibold">
                      {item.product.name}
                    </p>
                    <p style={{ color: colorPalette.accent }} className="font-bold">
                      {formatCurrency(item.quantity * item.unitPrice)} تومان
                    </p>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: colorPalette.lightText }}>
                    <span>قیمت واحد: {formatCurrency(item.unitPrice)} تومان</span>
                    <span>تعداد: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* بخش جمع کل */}
          <section>
            <div
              className="p-4 rounded-lg flex justify-between items-center"
              style={{ backgroundColor: colorPalette.primary }}
            >
              <p style={{ color: colorPalette.background }} className="font-bold text-lg">
                جمع کل سفارش
              </p>
              <p style={{ color: colorPalette.accent }} className="font-bold text-xl">
                {formatCurrency(total)} تومان
              </p>
            </div>
          </section>
        </div>

        {/* فوتر دیالوگ */}
        <div
          className="p-4 flex justify-end gap-3"
          style={{ backgroundColor: colorPalette.border }}
        >
          <button
            // onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium transition-all hover:opacity-80"
            style={{
              backgroundColor: colorPalette.secondary,
              color: colorPalette.background,
            }}
          >
            بستن
          </button>
          <button
            className="px-6 py-2 rounded-lg font-medium transition-all hover:opacity-80"
            style={{
              backgroundColor: colorPalette.primary,
              color: colorPalette.text,
            }}
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>

</>)

//             return (<>

// <div
//   className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 z-[999999]"
//   onClick={() => ui.close("edituser")}
// >
//   <div
//     className="w-full max-w-md mx-auto"
//     onClick={(e) => e.stopPropagation()}
//   >
//     <div
//       className="bg-white rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-hidden shadow-2xl transform animate-scaleIn"
//       onClick={(e) => e.stopPropagation()}
//       style={{
//         background: `linear-gradient(135deg, #B7B89F 0%, #777C6D 100%)`,
//       }}
//     >
//       {/* Header */}
//       <div
//         className="relative p-8 border-b border-opacity-20"
//         style={{ borderColor: "#777C6D" }}
//       >
//         <div className="flex justify-between items-center">
//           <div>
//             <h2
//               className="text-2xl font-bold"
//               style={{ color: "#1a202c" }}
//             >
//               {data?.id ? "ویرایش اطلاعات کاربر" : "افزودن کاربر جدید"}
//             </h2>
//             <p
//               className="text-sm mt-1"
//               style={{ color: "#4a5568" }}
//             >
//               {data?.id
//                 ? "اطلاعات کاربر را ویرایش کنید"
//                 : "کاربر جدید به سیستم اضافه کنید"}
//             </p>
//           </div>
//           <button
//             // onClick={onClose}
//             className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110"
//             style={{
//               backgroundColor: "#B7B89F",
//               color: "#1a202c",
//             }}
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Decorative elements */}
//         <div
//           className="absolute top-0 left-0 w-2 h-full opacity-60"
//           style={{ backgroundColor: "#777C6D" }}
//         ></div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden m-4">
//         {/* اطلاعات کاربر */}
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//             <svg className="w-5 h-5 ml-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//             اطلاعات مشتری
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//               <div className="bg-blue-100 p-2 rounded-lg ml-3">
//                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">نام مشتری</p>
//                 <p className="font-medium text-gray-800">{orderData?.item?.user?.name}</p>
//               </div>
//             </div>

//             <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//               <div className="bg-green-100 p-2 rounded-lg ml-3">
//                 <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">ایمیل</p>
//                 <p className="font-medium text-gray-800">{orderData?.item?.user?.email}</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//             <div className="bg-orange-100 p-2 rounded-lg ml-3">
//               <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">آدرس</p>
//               <p className="font-medium text-gray-800">{orderData?.item?.user?.address}</p>
//             </div>
//           </div>
//         </div>

//         {/* محصولات سفارش */}
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//             <svg className="w-5 h-5 ml-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//             </svg>
//             محصولات سفارش
//           </h3>

//           <div className="space-y-3">
//             {orderData?.item?.items?.map((item: any) => (
//               <div key={item.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all">
//                 <div className="flex items-center">
//                   <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center ml-3 shadow-md">
//                     <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-800">{item.product.name}</h4>
//                     <p className="text-sm text-gray-500 mt-1">قیمت واحد: {item.unitPrice.toLocaleString()} تومان</p>
//                   </div>
//                 </div>

//                 <div className="text-left">
//                   <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
//                     تعداد: {item.quantity}
//                   </div>
//                   <p className="font-bold text-gray-800 mt-2 text-lg">
//                     {(item.quantity * item.unitPrice).toLocaleString()} تومان
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>



//             </>)
          }}
        </ui.DrawerComponent>

        <ui.DrawerComponent id="edituser">
          {(data: any) => (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 z-[999999]"
              onClick={() => ui.close("edituser")}
            >
              <div
                className="w-full max-w-md mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <UserForm
                  onClose={() => ui.close("edituser")}
                  data={data ?? {}}
                />
              </div>
            </div>
          )}
        </ui.DrawerComponent>


        <ui.DrawerComponent id="showimage">
          {(data: any) => (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[999999]">
              <div
                className="w-full max-w-4xl mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <ImageManagerPanel
                  onClose={() => ui.close("showimage")}
                  onImageToggle={() => { }}
                  isOpen={true}
                  mode="dialog"
                />
              </div>
            </div>
          )}
        </ui.DrawerComponent>
      </div>
    </div>
  );
};

export default Layout;
