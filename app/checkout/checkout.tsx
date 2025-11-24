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
  const LocationPicker = dynamic(() => import("../components/LocationPicker"), {
    ssr: false,
  });

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
      name: "",
      phone: "",
      email: "",
      address: "",
      lat: "",
      lng: "",
      // postalCode: "",
      // paymentMethod: "card",
      // deliveryMethod: "standard",
    },
  });

  const onSubmit = async (data: any) => {
    // console.log("سفارش ثبت شد:", {
    //   ...data,
    //   userId: 1,
    //   items: Object.values(cart).map((d: any) => ({
    //     productId: d.id,
    //     quantity: d.qty,
    //   })),
    // });
    await axios
      .post("/api/order", {
        userData: { ...data },

        userId: 1,
        items: Object.values(cart).map((d: any) => ({
          productId: d.id,
          quantity: d.qty,
        })),
      })
      .then(() => {
        alert("محصول با موفقیت ثبت شد");
      })
      .catch((d: any) => {
        alert(d.response.data.error);
      });
  };
  var [maps, setmap]: any = useStorage("location", {});
  // همگام‌سازی state نقشه با فرم
  useEffect(() => {
    setValue("address", maps.address || "");
    setValue("lat", maps.lat || "");
    setValue("lng", maps.lng || "");
    // setValue("postalCode", maps.postcode || "");
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
                  {/* <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 text-[#B7B89F]" /> نام و نام
                      خانوادگی *
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: "نام و نام خانوادگی الزامی است",
                        minLength: {
                          value: 3,
                          message: "نام باید حداقل ۳ کاراکتر باشد",
                        },
                      })}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all"
                      placeholder="نام کامل خود را وارد کنید"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div> */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 text-[#B7B89F]" /> نام و نام
                        خانوادگی *
                      </label>
                      <input
                        type="text"
                        {...register("name", {
                          required: "نام و نام خانوادگی الزامی است",
                          minLength: {
                            value: 3,
                            message: "نام باید حداقل ۳ کاراکتر باشد",
                          },
                        })}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#B7B89F] focus:ring-4 focus:ring-[#B7B89F]/10 outline-none transition-all"
                        placeholder="نام کامل خود را وارد کنید"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
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
                    {/* <div>
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
                    </div> */}
                  </div>
                </div>
              </div>

              {/* آدرس */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#B7B89F]/20 overflow-hidden">
                <div className="bg-gradient-to-r from-[#B7B89F] to-[#9a9b7f] px-6 py-4 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-bold text-white">آدرس تحویل</h2>
                </div>

                <LocationPicker
                  exportlocation={(e: any) => {
                    console.log(e);

                    setMap(e);
                  }}
                />

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
                    {/* <div>
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
                    </div> */}
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
