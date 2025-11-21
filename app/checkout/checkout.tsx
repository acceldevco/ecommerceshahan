// "use client";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   ShoppingCart,
//   User,
//   MapPin,
//   CreditCard,
//   Package,
//   Check,
//   Phone,
//   Mail,
//   Home,
//   Calendar,
//   Truck,
//   Wallet,
//   FileText,
//   Minus,
//   Plus,
//   Trash2,
// } from "lucide-react";
// import { useStorage } from "../hook/localstorage";
// import { usecartstorage } from "../hook/usecartstorage";
// import OrderSummery from "../components/OrderSummery";
// import LocationPicker from "../components/LocationPicker";

// export default function OrderForm() {
//   const [map, setMap]: any = useState({});
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     setValue,
//   }:any = useForm({
//     defaultValues: {
//       fullName: "",
//       phone: "",
//       email: "",
//       address: "",
//       city: "",
//       postalCode: "",
//       paymentMethod: "card",
//       deliveryMethod: "standard",
//       lat: "",
//       lng: "",
//     },
//   });

//   // usecartstorage("");
//   const [cart, setcart]: any = useStorage("cart", "");

//   const onSubmit = (data: any) => {
//     console.log(data);
//     // alert("سفارش شما با موفقیت ثبت شد!");
//   };

//   useEffect(() => {
//     fetch("https://api.tapin.ir/api/v2/public/state/tree/", {
//       method: "post",
//     });
//   }, []);

//   // محاسبه قیمت کل سبد خرید
//   const calculateTotal = () => {
//     if (!cart) return 0;
//     return Object.values(cart).reduce((total: number, item: any) => {
//       return total + (item.price * item.qty || 0);
//     }, 0);
//   };

//   const totalPrice: any = calculateTotal();
//   const shippingCost: any = 0; // رایگان
//   const tax: any = Math.floor(totalPrice * 0.08); // 8% مالیات
//   const discount: any = totalPrice > 500000 ? 50000 : 0; // تخفیف شرطی
//   const finalPrice: any = totalPrice + shippingCost + tax - discount;

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-[#B7B89F]/10 via-white to-[#B7B89F]/5"
//       dir="rtl"
//     >
//       {/* Header */}
//       <div className="bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 bg-gradient-to-br from-[#B7B89F] to-[#9a9b7f] rounded-2xl flex items-center justify-center shadow-lg">
//                 <ShoppingCart className="w-7 h-7 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   فرم ثبت سفارش
//                 </h1>
//                 <p className="text-sm text-gray-500 mt-1">
//                   لطفاً اطلاعات زیر را تکمیل کنید
//                 </p>
//               </div>
//             </div>
//             <div className="hidden md:flex items-center gap-3 bg-gradient-to-r from-[#B7B89F]/10 to-[#B7B89F]/5 px-5 py-3 rounded-2xl border border-[#B7B89F]/20">
//               <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
//               <span className="text-sm font-medium text-gray-700">
//                 خرید امن و مطمئن
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Form */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Personal Information */}
//               <div className="bg-white rounded-3xl shadow-xl border border-[#B7B89F]/20 overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#B7B89F] to-[#9a9b7f] px-6 py-4 flex items-center gap-3">
//                   <User className="w-6 h-6 text-white" />
//                   <h2 className="text-xl font-bold text-white">اطلاعات شخصی</h2>
//                 </div>
//                 <div className="p-6 space-y-5">
//                   <div>
//                     <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                       <User className="w-4 h-4 text-[#B7B89F]" />
//                       نام و نام خانوادگی *
//                     </label>
//                     <input
//                       type="text"
//                       {...register("fullName", {
//                         required: "نام و نام خانوادگی الزامی است",
//                         minLength: {
//                           value: 3,
//                           message: "نام باید حداقل ۳ کاراکتر باشد",
//                         },
//                       })}
//                       className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all"
//                       placeholder="نام کامل خود را وارد کنید"
//                     />
//                     {errors.fullName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.fullName.message}
//                       </p>
//                     )}
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     <div>
//                       <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                         <Phone className="w-4 h-4 text-[#B7B89F]" />
//                         شماره تماس *
//                       </label>
//                       <input
//                         type="tel"
//                         {...register("phone", {
//                           required: "شماره تماس الزامی است",
//                           pattern: {
//                             value: /^09[0-9]{9}$/,
//                             message: "شماره تماس معتبر نیست",
//                           },
//                         })}
//                         className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all"
//                         placeholder="09123456789"
//                       />
//                       {errors.phone && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.phone.message}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                         <Mail className="w-4 h-4 text-[#B7B89F]" />
//                         ایمیل
//                       </label>
//                       <input
//                         type="email"
//                         {...register("email", {
//                           pattern: {
//                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                             message: "ایمیل معتبر نیست",
//                           },
//                         })}
//                         className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all"
//                         placeholder="example@email.com"
//                       />
//                       {errors.email && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.email.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Address Information */}
//               <div className="bg-white rounded-3xl shadow-xl border border-[#B7B89F]/20 overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#B7B89F] to-[#9a9b7f] px-6 py-4 flex items-center gap-3">
//                   <MapPin className="w-6 h-6 text-white" />
//                   <h2 className="text-xl font-bold text-white">آدرس تحویل</h2>
//                 </div>

//                 <LocationPicker
//                   exportlocation={(e: any) => {
//                     setMap(e);
//                     console.log(e);
//                   }}
//                 />
//                 <input
//                   type="hidden"
//                   value={map.lat}
//                   {...register("lat", {
//                     // required: "آدرس الزامی است",
//                     // minLength: {
//                     //   value: 10,
//                     //   message: "آدرس باید حداقل ۱۰ کاراکتر باشد",
//                     // },
//                   })}
//                 />
//                 <input
//                   type="hidden"
//                   value={map.lng}
//                   {...register("lng", {
//                     // required: "آدرس الزامی است",
//                     // minLength: {
//                     //   value: 10,
//                     //   message: "آدرس باید حداقل ۱۰ کاراکتر باشد",
//                     // },
//                   })}
//                 />
//                 <div className="p-6 space-y-5">
//                   <div>
//                     <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                       <Home className="w-4 h-4 text-[#B7B89F]" />
//                       آدرس کامل *
//                     </label>
//                     <textarea
//                       {...register("address", {
//                         required: "آدرس الزامی است",
//                         value:map.address,
//                         minLength: {
//                           value: 10,
//                           message: "آدرس باید حداقل ۱۰ کاراکتر باشد",
//                         },
//                       })}
//                       value={map.address}
//                       // rows="3"
//                       className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all resize-none"
//                       placeholder="آدرس دقیق محل تحویل را وارد کنید..."
//                     ></textarea>
//                     {errors.address && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.address.message}
//                       </p>
//                     )}
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//                     {/* <div>
//                       <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                         <MapPin className="w-4 h-4 text-[#B7B89F]" />
//                         شهر *
//                       </label>
//                       <select
//                         {...register("city", {
//                           required: "انتخاب شهر الزامی است",
//                         })}
//                         className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all appearance-none bg-white cursor-pointer"
//                       >
//                         <option value="">انتخاب شهر</option>
//                         <option value="tehran">تهران</option>
//                         <option value="isfahan">اصفهان</option>
//                         <option value="shiraz">شیراز</option>
//                         <option value="mashhad">مشهد</option>
//                         <option value="tabriz">تبریز</option>
//                         <option value="karaj">کرج</option>
//                       </select>
//                       {errors.city && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.city.message}
//                         </p>
//                       )}
//                     </div> */}
//                     <div>
//                       <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                         <Mail className="w-4 h-4 text-[#B7B89F]" />
//                         کد پستی *
//                       </label>
//                       <input
//                         type="text"
//                         {...register("postalCode", {
//                           required: "کد پستی الزامی است",
//                           pattern: {
//                             value: /^[0-9]{10}$/,
//                             message: "کد پستی باید ۱۰ رقم باشد",
//                           },
//                         })}
//                         className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all"
//                         placeholder="1234567890"
//                       />
//                       {errors.postalCode && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.postalCode.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full py-4 bg-gradient-to-r from-[#B7B89F] to-[#9a9b7f] text-white text-lg font-bold rounded-2xl hover:shadow-2xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
//               >
//                 <Check className="w-6 h-6" />
//                 تایید و ثبت سفارش
//               </button>
//             </div>

//             {/* Order Summary Sidebar */}
//             <OrderSummery />
//             {/* <div className="lg:col-span-1">
//               <div className="bg-white rounded-3xl shadow-xl border border-[#B7B89F]/20 overflow-hidden sticky top-8">
//                 <div className="bg-gradient-to-r from-[#B7B89F] to-[#9a9b7f] px-6 py-4">
//                   <h3 className="text-xl font-bold text-white">خلاصه سفارش</h3>
//                 </div>

//                 <div className="p-6 space-y-5">
//                   <div className="space-y-3">
//                     {cart && Object.values(cart).map((item: any, index: number) => (
//                       <div
//                         key={item.id}
//                         className="relative flex items-center gap-3 p-3 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden"
//                       >
//                         <div className="relative w-16 h-16 bg-gradient-to-br from-[#B7B89F]/10 to-[#B7B89F]/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#B7B89F]/15 group-hover:scale-105 transition-transform duration-300">
//                           <Package className="w-8 h-8 text-[#B7B89F]" />
//                           <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#B7B89F] text-white text-xs flex items-center justify-center rounded-full font-bold">
//                             {item.qty}
//                           </div>
//                         </div>

//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-start justify-between">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-bold text-gray-900 truncate text-base">
//                                 {item.name}
//                               </h3>
//                               <div className="flex items-center gap-2 mt-1">
//                                 <span className="text-xs text-gray-500">
//                                   تعداد:
//                                 </span>
//                                 <span className="text-xs font-medium text-gray-700">
//                                   {item.qty} عدد
//                                 </span>
//                               </div>
//                             </div>

//                             <div className="flex flex-col items-end gap-1.5">
//                               <div className="text-base font-bold text-[#B7B89F] bg-[#B7B89F]/10 px-2 py-1 rounded-md">
//                                 {item.price.toLocaleString()} تومان
//                               </div>

//                               <div className="flex items-center gap-1.5 bg-gray-100 rounded-md p-1">
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setcart({
//                                       ...cart,
//                                       [item.id]: {
//                                         // ...item,
//                                         productId:item.id,
//                                         quantity:
//                                         // qty:
//                                           cart[item.id]?.qty > 0
//                                             ? cart[item.id]?.qty - 1
//                                             : 0,
//                                       },
//                                     });
//                                   }}
//                                   className="w-6 h-6 flex items-center justify-center bg-white text-gray-700 rounded shadow-sm hover:bg-gray-50 transition-colors text-xs"
//                                 >
//                                   <Minus className="w-3 h-3" />
//                                 </button>
//                                 <span className="text-xs font-medium w-5 text-center">
//                                   {item.qty}
//                                 </span>
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setcart({
//                                       ...cart,
//                                       [item.id]: {
//                                         // ...item,
//                                         productId:item.id,
//                                         quantity:
//                                         // qty:
//                                           item.stock > cart[item.id]?.qty
//                                             ? cart[item.id]?.qty + 1
//                                             : item.stock,
//                                       }
//                                       // {
//                                       //   ...item,
//                                       //   qty:
//                                       //     item.stock > cart[item.id]?.qty
//                                       //       ? cart[item.id]?.qty + 1
//                                       //       : item.stock,
//                                       // },
//                                     });
//                                   }}
//                                   className="w-6 h-6 flex items-center justify-center bg-white text-gray-700 rounded shadow-sm hover:bg-gray-50 transition-colors text-xs"
//                                 >
//                                   <Plus className="w-3 h-3" />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         <button
//                           type="button"
//                           onClick={() => {
//                             const newCart = { ...cart };
//                             delete newCart[item.id];
//                             setcart(newCart);
//                           }}
//                           className="absolute top-2 left-2 w-7 h-7 flex items-center justify-center bg-white/80 text-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50 hover:text-red-500 text-xs"
//                         >
//                           <Trash2 className="w-3.5 h-3.5" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="border-t-2 border-gray-100 pt-4 space-y-3">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-600">جمع کل:</span>
//                       <span className="font-bold text-gray-900">
//                         {totalPrice.toLocaleString()} تومان
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-600">هزینه ارسال:</span>
//                       <span className="font-bold text-green-600">
//                         {shippingCost === 0 ? "رایگان" : `${shippingCost.toLocaleString()} تومان`}
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-600">تخفیف:</span>
//                       <span className="font-bold text-red-500">
//                         -{discount.toLocaleString()} تومان
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-600">مالیات:</span>
//                       <span className="font-bold text-gray-900">
//                         {tax.toLocaleString()} تومان
//                       </span>
//                     </div>
//                   </div>

//                   <div className="border-t-2 border-[#B7B89F]/30 pt-4 bg-gradient-to-br from-[#B7B89F]/5 to-transparent rounded-xl p-4 -mx-2">
//                     <div className="flex items-center justify-between">
//                       <span className="text-lg font-bold text-gray-900">
//                         مبلغ قابل پرداخت:
//                       </span>
//                       <span className="text-3xl font-black text-[#B7B89F]">
//                         {finalPrice.toLocaleString()}
//                       </span>
//                     </div>
//                     <div className="text-left text-xs text-gray-500 mt-1">
//                       تومان
//                     </div>
//                   </div>

//                   <div className="space-y-2 pt-2">
//                     {[
//                       "ضمانت اصالت کالا",
//                       "پشتیبانی 24 ساعته",
//                       "7 روز ضمانت بازگشت",
//                     ].map((feature, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-center gap-2 text-sm text-gray-700"
//                       >
//                         <Check className="w-4 h-4 text-[#B7B89F] flex-shrink-0" />
//                         <span>{feature}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
//                     <div className="flex items-center justify-center gap-2 mb-2">
//                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       <span className="text-sm font-bold text-green-800">
//                         پرداخت امن
//                       </span>
//                     </div>
//                     <p className="text-xs text-green-700">
//                       اطلاعات شما کاملاً محفوظ است
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
//////////////////////////////////////////////////////////////////
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ShoppingCart,
  User,
  MapPin,
  Home,
  Phone,
  Mail,
  Check,
} from "lucide-react";
import { useStorage } from "../hook/localstorage";
import OrderSummery from "../components/OrderSummery";
// import LocationPicker from "../components/LocationPicker";
import axios from "axios";
import dynamic from "next/dynamic";



export default function CheckOut() {



const LocationPicker = dynamic(
  () => import("../components/LocationPicker"),
  { ssr: false }
);



  const [map, setMap]: any = useState<{
    lat?: number;
    lng?: number;
    address?: string;
    postcode?: string;
  }>({});
  const [cart, setcart]: any = useStorage("cart", "");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      lat: "",
      lng: "",
      postalCode: "",
      paymentMethod: "card",
      deliveryMethod: "standard",
    },
  });

  const onSubmit =async (data: any) => {
    // console.log("سفارش ثبت شد:", {
    //   ...data,
    //   userId: 1,
    //   items: Object.values(cart).map((d: any) => ({
    //     productId: d.id,
    //     quantity: d.qty,
    //   })),
    // });
   await axios.post("/api/order",{
      ...data,
      userId: 1,
      items: Object.values(cart).map((d: any) => ({
        productId: d.id,
        quantity: d.qty,
      })),
    })
  };
var [maps, setmap]:any = useStorage("location", {});
  // همگام‌سازی state نقشه با فرم
  useEffect(() => {
    setValue("address", maps.address || "");
    setValue("lat", maps.lat || "");
    setValue("lng", maps.lng || "");
    setValue("postalCode", maps.postcode || "");
  }, [maps, setmap]);

  // محاسبه قیمت کل سبد خرید
//   const calculateTotal = () => {
//     if (!cart) return 0;
//     return Object.values(cart).reduce((total: number, item: any) => {
//       return total + (item.price * item.qty || 0);
//     }, 0);
//   };
//   const totalPrice = calculateTotal();
//   const shippingCost = 0;
//   const tax = Math.floor(totalPrice * 0.08);
//   const discount = totalPrice > 500000 ? 50000 : 0;
//   const finalPrice = totalPrice + shippingCost + tax - discount;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#B7B89F]/10 via-white to-[#B7B89F]/5"
      dir="rtl"
    >
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#B7B89F] to-[#9a9b7f] rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                فرم ثبت سفارش
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                لطفاً اطلاعات زیر را تکمیل کنید
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* فرم اصلی */}
            <div className="lg:col-span-2 space-y-6">
              {/* اطلاعات شخصی */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#B7B89F]/20 overflow-hidden">
                <div className="bg-gradient-to-r from-[#B7B89F] to-[#9a9b7f] px-6 py-4 flex items-center gap-3">
                  <User className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-bold text-white">اطلاعات شخصی</h2>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 text-[#B7B89F]" /> نام و نام
                      خانوادگی *
                    </label>
                    <input
                      type="text"
                      {...register("fullName", {
                        required: "نام و نام خانوادگی الزامی است",
                        minLength: {
                          value: 3,
                          message: "نام باید حداقل ۳ کاراکتر باشد",
                        },
                      })}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all"
                      placeholder="نام کامل خود را وارد کنید"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 text-[#B7B89F]" /> شماره تماس
                        *
                      </label>
                      <input
                        type="tel"
                        {...register("phone", {
                          required: "شماره تماس الزامی است",
                          pattern: {
                            value: /^09[0-9]{9}$/,
                            message: "شماره تماس معتبر نیست",
                          },
                        })}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all"
                        placeholder="09123456789"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 text-[#B7B89F]" /> ایمیل
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "ایمیل معتبر نیست",
                          },
                        })}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all"
                        placeholder="example@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* آدرس */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#B7B89F]/20 overflow-hidden">
                <div className="bg-gradient-to-r from-[#B7B89F] to-[#9a9b7f] px-6 py-4 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-bold text-white">آدرس تحویل</h2>
                </div>

                <LocationPicker exportlocation={(e: any) => {
                    
                    console.log(e);
                    
                    
                    
                    setMap(e)}} />

                <input type="hidden" {...register("lat")} />
                <input type="hidden" {...register("lng")} />

                <div className="p-6 space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Home className="w-4 h-4 text-[#B7B89F]" /> آدرس کامل *
                    </label>
                    <textarea
                      {...register("address", {
                        required: "آدرس الزامی است",
                        minLength: 10,
                      })}
                      placeholder="آدرس دقیق محل تحویل را وارد کنید..."
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all resize-none"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        کد پستی *
                      </label>
                      <input
                        type="text"
                        {...register("postalCode", {
                          required: "کد پستی الزامی است",
                          pattern: {
                            value: /^\d{5}-?\d{5}$/, // ۵ رقم + اختیاری '-' + ۵ رقم
                            message:
                              "کد پستی باید ۱۰ رقم و با فرمت 12345-67890 باشد",
                          },
                        })}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all"
                        placeholder="1234567890"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#B7B89F] to-[#9a9b7f] text-white text-lg font-bold rounded-2xl hover:shadow-2xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <Check className="w-6 h-6" /> تایید و ثبت سفارش
              </button>
            </div>

            {/* خلاصه سفارش */}
            <OrderSummery />
          </div>
        </form>
      </div>
    </div>
  );
}
