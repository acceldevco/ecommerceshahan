"use client";
// pages/auth.js
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [authMode, setAuthMode]: any = useState("login"); // 'login', 'register', 'forgot-password'
  const [isLoading, setIsLoading]: any = useState(false);
  const [emailSent, setEmailSent]: any = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getValues,
  }: any = useForm();
  var router = useRouter()
  const password = watch("password");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // شبیه‌سازی درخواست API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (authMode === "forgot-password") {
        setEmailSent(true);
        console.log("Reset password email sent to:", data.email);
      } else {
        var datas =
          authMode === "login"
            ?
            // await axios.post(
            //     "/api/sendverify",
            //     { ...data },
            //     { withCredentials: true }   // ⬅⬅ مهم‌ترین قسمت!
            //   )
            await axios
              .post("api/auth/login", {
                name: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
              }).catch(() => {
                alert('خطا در تایید اعتبار')
              })
            :
            // await axios.post(
            //     "/api/sendverify",
            //     { ...data },
            //     { withCredentials: true }   // ⬅⬅ این هم
            //   );

            await axios
              .post("api/auth/signup", {
                name: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
              }).catch(() => {
                alert('این کاربر قبلا ثبت نام کرده است')
              })
        localStorage.user = JSON.stringify(datas?.data?.user ?? '{}')
        router.push('/')
        // console.log(datas.data.user);

        // .then((d) => {
        //   console.log('test',d);
        // });
        // console.log(
        //   `${

        //   } data:`,
        //   data
        // );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (mode: any) => {
    setAuthMode(mode);
    setEmailSent(false);
    reset();
  };

  const renderHeader = () => {
    const titles: any = {
      login: "ورود به حساب کاربری",
      register: "ایجاد حساب جدید",
      "forgot-password": "بازیابی رمز عبور",
    };

    const descriptions: any = {
      login: {
        text: "حساب کاربری ندارید؟ ",
        link: "ثبت‌نام کنید",
        mode: "register",
      },
      register: {
        text: "قبلاً حساب دارید؟ ",
        link: "وارد شوید",
        mode: "login",
      },
      "forgot-password": {
        text: "رمز عبور خود را یادآوری کردید؟ ",
        link: "وارد شوید",
        mode: "login",
      },
    };

    return (
      <div className="text-center">
        <div className="mx-auto h-12 w-12 bg-[#b7b89e] rounded-full flex items-center justify-center">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          {titles[authMode]}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {descriptions[authMode].text}
          <button
            onClick={() => switchMode(descriptions[authMode].mode)}
            className="font-medium text-[#b7b89e] hover:text-[#9a9b82] transition-colors duration-200"
          >
            {descriptions[authMode].link}
          </button>
        </p>
      </div>
    );
  };

  const renderLoginForm = () => (
    <>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          آدرس ایمیل
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "ایمیل الزامی است",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "ایمیل معتبر نیست",
            },
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-200 outline-none"
          placeholder="example@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>



      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          رمز عبور
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "رمز عبور الزامی است",
            minLength: {
              value: 6,
              message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
            },
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-200 outline-none"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            {...register("rememberMe")}
            className="h-4 w-4 text-[#b7b89e] focus:ring-[#b7b89e] border-gray-300 rounded"
          />
          <label
            htmlFor="rememberMe"
            className="mr-2 block text-sm text-gray-900"
          >
            مرا به خاطر بسپار
          </label>
        </div>

        <button
          type="button"
          onClick={() => switchMode("forgot-password")}
          className="text-sm text-[#b7b89e] hover:text-[#9a9b82] transition-colors duration-200"
        >
          رمز عبور خود را فراموش کرده‌اید؟
        </button>
      </div>
    </>
  );

  const renderRegisterForm = () => (
    <>
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          نام و نام خانوادگی
        </label>
        <input
          id="firstName"
          type="text"
          {...register("firstName", {
            required: "نام الزامی است",
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-200 outline-none"
          placeholder="نام خود را وارد کنید"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          آدرس ایمیل
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "ایمیل الزامی است",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "ایمیل معتبر نیست",
            },
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-200 outline-none"
          placeholder="example@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          رمز عبور
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "رمز عبور الزامی است",
            minLength: {
              value: 6,
              message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
            },
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-200 outline-none"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          تکرار رمز عبور
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "تکرار رمز عبور الزامی است",
            validate: (value: any) =>
              value === password || "رمز عبور با تکرار آن مطابقت ندارد",
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-200 outline-none"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex items-start">
        <input
          id="agreeToTerms"
          type="checkbox"
          {...register("agreeToTerms", {
            required: "پذیرش قوانین الزامی است",
          })}
          className="h-4 w-4 text-[#b7b89e] focus:ring-[#b7b89e] border-gray-300 rounded mt-1"
        />
        <label
          htmlFor="agreeToTerms"
          className="mr-2 block text-sm text-gray-900"
        >
          با{" "}
          <Link
            href="/terms"
            className="text-[#b7b89e] hover:text-[#9a9b82] transition-colors duration-200"
          >
            قوانین و مقررات
          </Link>{" "}
          موافقم
        </label>
      </div>
    </>
  );

  const renderForgotPasswordForm = () => (
    <>
      {emailSent ? (
        <div className="text-center py-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            ایمیل بازیابی ارسال شد
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            لینک بازیابی رمز عبور به آدرس{" "}
            <span className="font-medium">{getValues("email")}</span> ارسال شد.
            لطفاً صندوق ایمیل خود را بررسی کنید.
          </p>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => switchMode("login")}
              className="w-full bg-[#b7b89e] hover:bg-[#9a9b82] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200"
            >
              بازگشت به صفحه ورود
            </button>
            <button
              onClick={() => setEmailSent(false)}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
            >
              ارسال مجدد ایمیل
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mr-3">
                <h3 className="text-sm font-medium text-blue-800">
                  بازیابی رمز عبور
                </h3>
                <div className="mt-1 text-sm text-blue-700">
                  <p>
                    آدرس ایمیل خود را وارد کنید. لینک بازیابی رمز عبور برای شما
                    ارسال خواهد شد.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              آدرس ایمیل
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "ایمیل الزامی است",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "ایمیل معتبر نیست",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-200 outline-none"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </>
      )}
    </>
  );

  const renderForm = () => {
    if (authMode === "forgot-password") {
      return renderForgotPasswordForm();
    }

    return (
      <>
        {authMode === "login" ? renderLoginForm() : renderRegisterForm()}

        {authMode !== "forgot-password" && (
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#b7b89e] hover:bg-[#9a9b82] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-[#b7b89e] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {authMode === "login" ? "در حال ورود..." : "در حال ثبت‌نام..."}
              </>
            ) : authMode === "login" ? (
              "ورود به حساب"
            ) : (
              "ایجاد حساب"
            )}
          </button>
        )}
      </>
    );
  };

  const renderSocialLogin = () => {
    if (authMode === "forgot-password" && emailSent) return null;

    return (
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">یا ادامه با</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="mr-2">گوگل</span>
          </button>

          <button
            type="button"
            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="mr-2">فیسبوک</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {renderHeader()}

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {renderForm()}
          </form>

          {renderSocialLogin()}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>© 2024 شرکت شما. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </div>
  );
}
