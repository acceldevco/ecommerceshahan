"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  List,
  Pin,
  Files,
  Flag,
} from "lucide-react";
import { useLoading } from "../hook/loadingData";
import axios from "axios";
import MonthlyRevenueChart from "../components/MonthlyRevenueChart";

const EcommerceAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  var [data,setdata]=useState<any>({})
//   var {data}=useLoading({
//     url:"/api/analiz",
//     initialData:{
// pageSize:5
//     }
    
//   })
  useEffect(()=>{
   async function data() {
     await axios.post("/api/analiz").then((d)=>{
      setdata(d.data.data)
     })
    }
    data()
  },[])
  const stats = [
    {
      title: "فروش کل",
      value: `تومان${data?.products?.total}`,//"۱,۲۳۴,۵۶۷ تومان",
      // change: "+۱۲.۵%",
      icon: DollarSign,
      trend: "up",
    },
    // {
    //   title: "سفارشات",
    //   value: data.totalOrders,//"۳۴۵",
    //   // change: "+۸.۲%",
    //   icon: ShoppingCart,
    //   trend: "up",
    // },
    // orders
      {
      title: "سفارشات",
      value: data?.orders?.current
,
      change: `${data.orders?.change?.status === 'up'?"+":"-"}${data.orders?.change?.change}%`,
      icon: ShoppingCart,
      trend: data.orders?.change?.status,
    },
    {
      title: "مشتریان",
      value: data.users?.current
,
      change: `${data.users?.change?.status === 'up'?"+":"-"}${data.users?.change?.change}%`,
      icon: Users,
      trend: data.users?.change?.status,
    },

    {
      title: "محصولات",
      value: data?.products?.current,
      change: `${data.products?.change?.status === 'up'?"+":"-"}${data.products?.change?.change}%`,
      // change: "-۲.۱%",
      icon: Package,
      trend: data.products?.change?.status,
    },
  ];

  const recentOrders = [
    {
      id: "#۱۲۳۴۵",
      customer: "علی محمدی",
      product: "لپ‌تاپ ایسوس",
      price: "۲۵,۰۰۰,۰۰۰",
      status: "تکمیل شده",
      date: "۱۴۰۳/۰۸/۱۵",
    },
    {
      id: "#۱۲۳۴۶",
      customer: "سارا احمدی",
      product: "گوشی سامسونگ",
      price: "۱۵,۰۰۰,۰۰۰",
      status: "در حال پردازش",
      date: "۱۴۰۳/۰۸/۱۵",
    },
    {
      id: "#۱۲۳۴۷",
      customer: "محمد رضایی",
      product: "هدفون بی‌سیم",
      price: "۲,۵۰۰,۰۰۰",
      status: "ارسال شده",
      date: "۱۴۰۳/۰۸/۱۴",
    },
    {
      id: "#۱۲۳۴۸",
      customer: "فاطمه کریمی",
      product: "تبلت اپل",
      price: "۲۰,۰۰۰,۰۰۰",
      status: "تکمیل شده",
      date: "۱۴۰۳/۰۸/۱۴",
    },
    {
      id: "#۱۲۳۴۹",
      customer: "حسین نوری",
      product: "ساعت هوشمند",
      price: "۳,۵۰۰,۰۰۰",
      status: "در انتظار",
      date: "۱۴۰۳/۰۸/۱۳",
    },
  ];

  const topProducts = [
    {
      name: "لپ‌تاپ ایسوس ROG",
      sales: "۱۲۳",
      revenue: "۳۰۷,۵۰۰,۰۰۰",
      stock: "۱۵",
    },
    {
      name: "گوشی سامسونگ S24",
      sales: "۸۹",
      revenue: "۱۳۳,۵۰۰,۰۰۰",
      stock: "۲۳",
    },
    {
      name: "هدفون سونی WH-1000XM5",
      sales: "۶۷",
      revenue: "۱۶۷,۵۰۰,۰۰۰",
      stock: "۳۴",
    },
    {
      name: "تبلت اپل iPad Pro",
      sales: "۴۵",
      revenue: "۹۰,۰۰۰,۰۰۰",
      stock: "۸",
    },
  ];

  const menuItems = [
    { id: "dashboard", icon: BarChart3, label: "داشبورد" },
    { id: "products", icon: Package, label: "محصولات" },
    { id: "category", icon: List, label: "دسته بندی" },
    { id: "posts", icon: Pin, label: "پست ها" },
    { id: "banner", icon: Flag, label: "بنر" },
    { id: "media", icon: Files, label: "رسانه ها" },
    { id: "orders", icon: ShoppingCart, label: "سفارشات" },
    { id: "customers", icon: Users, label: "مشتریان" },
    { id: "analytics", icon: TrendingUp, label: "تحلیل و گزارش" },
    { id: "settings", icon: Settings, label: "تنظیمات" },
  ];

  const getStatusColor = (status:any) => {
    switch (status) {
      case "تکمیل شده":
        return "bg-green-100 text-green-800";
      case "در حال پردازش":
        return "bg-yellow-100 text-yellow-800";
      case "ارسال شده":
        return "bg-blue-100 text-blue-800";
      case "در انتظار":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
        <main className="p-6">
          {/* {JSON.stringify(data)} */}
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      stat.trend === "up" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <stat.icon
                      size={24}
                      className={
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }
                    />
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  سفارشات اخیر
                </h2>
                <button className="text-[#B7B89F] hover:text-[#a5a68a] font-medium text-sm flex items-center gap-1">
                  مشاهده همه
                  <ChevronDown size={16} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">
                        شماره سفارش
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">
                        مشتری
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">
                        محصول
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">
                        مبلغ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">
                        وضعیت
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {
                    // recentOrders
                    data?.recentOrders?.map((order:any, index:any) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {order.user.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {order.items.length}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {order.price}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                              <Eye size={16} />
                            </button>
                            <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                              <Edit size={16} />
                            </button>
                            <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  محصولات برتر
                </h2>
                <button className="p-2 text-[#B7B89F] hover:bg-gray-50 rounded-lg">
                  <Plus size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>فروش: {product.sales}</span>
                        <span>موجودی: {product.stock}</span>
                      </div>
                      <p className="text-[#B7B89F] font-bold mt-1">
                        {product.revenue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              نمودار فروش ماهانه
            </h2>
            <div className=" from-[#B7B89F]/10 to-transparent rounded-lg flex items-center justify-center">
              <div className="text-center w-full">
                <MonthlyRevenueChart />
                {/* <BarChart3 size={48} className="text-[#B7B89F] mx-auto mb-2" />
                <p className="text-gray-500">
                   
                  نمودار فروش در اینجا نمایش داده می‌شود
                </p> */}
              </div>
            </div>
          </div>
        </main>
  );
};

export default EcommerceAdmin;
