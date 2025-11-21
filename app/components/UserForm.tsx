"use client"
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ContextMain } from "../context/context";

const UserForm = ({ data, onClose }: any) => {
  var ui = useContext(ContextMain);
  console.log("data:", data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm({
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      role: data?.role || "CUSTOMER",
      address: data?.address || "",
      storeId: data?.storeId || "",
    },
  });

  const onSubmit = (formData: any) => {
    console.log("Form Data:", formData);
    data.submitData({
      ...(data.id
        ? {
            action: "update",
            id: data.id,
          }
        : {
            action: "create",
          }),

      nameTable: "user",

      data: {
        ...formData,
      },
    });
    // در اینجا منطق ارسال فرم را اضافه کنید
  };

  const colorPalette = {
    primary: "#b7b89e",
    primaryHover: "#9a9b82",
    primaryLight: "#e8e8e0",
    primaryLighter: "#f5f5f1",
    text: "#2d3748",
    textLight: "#718096",
    border: "#e2e8f0",
    borderFocus: "#b7b89e",
    error: "#e53e3e",
    background: "#ffffff",
  };

  return (
    <div
      // className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-hidden shadow-2xl transform animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `linear-gradient(135deg, ${colorPalette.background} 0%, ${colorPalette.primaryLighter} 100%)`,
        }}
      >
        {/* Header */}
        <div
          className="relative p-8 border-b border-opacity-20"
          style={{ borderColor: colorPalette.primary }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colorPalette.text }}
              >
                {data?.id ? "ویرایش اطلاعات کاربر" : "افزودن کاربر جدید"}
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: colorPalette.textLight }}
              >
                {data?.id
                  ? "اطلاعات کاربر را ویرایش کنید"
                  : "کاربر جدید به سیستم اضافه کنید"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: colorPalette.primaryLight,
                color: colorPalette.text,
              }}
            >
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
            </button>
          </div>

          {/* Decorative elements */}
          <div
            className="absolute top-0 left-0 w-2 h-full opacity-60"
            style={{ backgroundColor: colorPalette.primary }}
          ></div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 space-y-8 max-h-[70vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* نام کامل */}
            <div className="col-span-1 md:col-span-2">
              <label
                className="block text-sm font-semibold mb-3 tracking-wide"
                style={{ color: colorPalette.text }}
              >
                نام کامل
                <span className="text-red-500 mr-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("name", { required: "نام کامل الزامی است" })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm md:text-base font-medium backdrop-blur-sm
                    ${
                      errors.name
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : `border-gray-200 bg-white/80 focus:border-[${colorPalette.primary}] focus:ring-4 focus:ring-opacity-20 focus:ring-[${colorPalette.primary}]`
                    }`}
                  style={{
                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  }}
                  placeholder="نام و نام خانوادگی را وارد کنید"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60">
                  <svg
                    className="w-5 h-5"
                    style={{ color: colorPalette.primary }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1 font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* ایمیل */}
            <div>
              <label
                className="block text-sm font-semibold mb-3 tracking-wide"
                style={{ color: colorPalette.text }}
              >
                ایمیل
                <span className="text-red-500 mr-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", {
                    required: "ایمیل الزامی است",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "ایمیل معتبر نیست",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm md:text-base font-medium backdrop-blur-sm
                    ${
                      errors.email
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : `border-gray-200 bg-white/80 focus:border-[${colorPalette.primary}] focus:ring-4 focus:ring-opacity-20 focus:ring-[${colorPalette.primary}]`
                    }`}
                  style={{
                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  }}
                  placeholder="example@domain.com"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60">
                  <svg
                    className="w-5 h-5"
                    style={{ color: colorPalette.primary }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1 font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* تلفن */}
            <div>
              {}
              <label
                className="block text-sm font-semibold mb-3 tracking-wide"
                style={{ color: colorPalette.text }}
              >
                تلفن همراه
              </label>
              <div className="relative">
                <input
                  type="tel"
                  {...register("phone", {
                    pattern: {
                      value: /^09[0-9]{9}$/,
                      message: "شماره تلفن معتبر نیست (09xxxxxxxxx)",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm md:text-base font-medium backdrop-blur-sm
                    ${
                      errors.phone
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : `border-gray-200 bg-white/80 focus:border-[${colorPalette.primary}] focus:ring-4 focus:ring-opacity-20 focus:ring-[${colorPalette.primary}]`
                    }`}
                  style={{
                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  }}
                  placeholder="09123456789"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60">
                  <svg
                    className="w-5 h-5"
                    style={{ color: colorPalette.primary }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1 font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* نقش */}
            <div>
              <label
                className="block text-sm font-semibold mb-3 tracking-wide"
                style={{ color: colorPalette.text }}
              >
                نقش کاربری
                <span className="text-red-500 mr-1">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("role", { required: "انتخاب نقش الزامی است" })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm md:text-base font-medium backdrop-blur-sm appearance-none
                    ${
                      errors.role
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : `border-gray-200 bg-white/80 focus:border-[${colorPalette.primary}] focus:ring-4 focus:ring-opacity-20 focus:ring-[${colorPalette.primary}]`
                    }`}
                  style={{
                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  }}
                >
                  <option value="CUSTOMER">مشتری</option>
                  <option value="ADMIN">مدیر سیستم</option>
                  <option value="SELLER">فروشنده</option>
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60">
                  <svg
                    className="w-5 h-5"
                    style={{ color: colorPalette.primary }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="absolute left-10 top-1/2 transform -translate-y-1/2 opacity-40">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {errors.role && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1 font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* آدرس */}
            <div className="col-span-1 md:col-span-2">
              <label
                className="block text-sm font-semibold mb-3 tracking-wide"
                style={{ color: colorPalette.text }}
              >
                آدرس
              </label>
              <div className="relative">
                <textarea
                  {...register("address")}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm md:text-base font-medium backdrop-blur-sm resize-none
                    ${
                      errors.address
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : `border-gray-200 bg-white/80 focus:border-[${colorPalette.primary}] focus:ring-4 focus:ring-opacity-20 focus:ring-[${colorPalette.primary}]`
                    }`}
                  style={{
                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  }}
                  placeholder="آدرس کامل را وارد کنید..."
                />
                <div className="absolute left-3 top-3 opacity-60">
                  <svg
                    className="w-5 h-5"
                    style={{ color: colorPalette.primary }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              {errors.address && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1 font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* شناسه فروشگاه */}
            <div>
              <label
                className="block text-sm font-semibold mb-3 tracking-wide"
                style={{ color: colorPalette.text }}
              >
                شناسه فروشگاه
              </label>
              <div className="relative">
                <input
                  type="number"
                  {...register("storeId", {
                    min: {
                      value: 1,
                      message: "شناسه فروشگاه باید بزرگتر از ۰ باشد",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm md:text-base font-medium backdrop-blur-sm
                    ${
                      errors.storeId
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : `border-gray-200 bg-white/80 focus:border-[${colorPalette.primary}] focus:ring-4 focus:ring-opacity-20 focus:ring-[${colorPalette.primary}]`
                    }`}
                  style={{
                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  }}
                  placeholder="مثال: ۱۲۳۴"
                  min="1"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60">
                  <svg
                    className="w-5 h-5"
                    style={{ color: colorPalette.primary }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
              {errors.storeId && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1 font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.storeId.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row justify-end gap-3 pt-8 border-t border-opacity-20"
            style={{ borderColor: colorPalette.primary }}
          >
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-xl border-2 transition-all duration-200 font-semibold order-2 sm:order-1 transform hover:scale-105 active:scale-95"
              style={{
                borderColor: colorPalette.primary,
                color: colorPalette.text,
                backgroundColor: "transparent",
              }}
              onMouseOver={(e: any) => {
                e.target.style.backgroundColor = colorPalette.primaryLight;
              }}
              onMouseOut={(e: any) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg order-1 sm:order-2 transform hover:scale-105 active:scale-95"
              style={{
                backgroundColor: colorPalette.primary,
                color: "#ffffff",
                boxShadow: `0 4px 15px ${colorPalette.primary}40`,
              }}
              onMouseOver={(e: any) => {
                e.target.style.backgroundColor = colorPalette.primaryHover;
                e.target.style.boxShadow = `0 6px 20px ${colorPalette.primary}60`;
              }}
              onMouseOut={(e: any) => {
                e.target.style.backgroundColor = colorPalette.primary;
                e.target.style.boxShadow = `0 4px 15px ${colorPalette.primary}40`;
              }}
            >
              <div className="flex items-center gap-2">
                {data?.id ? "ذخیره تغییرات" : "افزودن کاربر"}
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
                    d={data?.id ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"}
                  />
                </svg>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
