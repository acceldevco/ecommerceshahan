
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
          ${
            !sidebarOpen && !mobileSidebarOpen
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
          <a href="/admin/profile"><Settings/></a>
          <div><LogOut /></div>
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

          
              <div className="relative">
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
              </div>
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
                 {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") ?? "{}")?.name[0] : ""}
                </div>
              </div>
            </div>
          </div>
        </header>

   
        <div className="p-4 lg:p-6">
          
          {children}
          
          </div>


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
                  onImageToggle={() => {}}
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
