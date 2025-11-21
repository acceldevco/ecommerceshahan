"use client"
// pages/account/profile.js
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  // اطلاعات کاربر
  const [userData, setUserData] = useState({
    // اطلاعات شخصی
    firstName: 'امین',
    lastName: 'محمدی',
    email: 'amin.mohammadi@example.com',
    phone: '09123456789',
    birthDate: '1375-03-15',
    gender: 'male',
    
    // اطلاعات آدرس
    addresses: [
      {
        id: 1,
        title: 'منزل',
        address: 'تهران، خیابان ولیعصر، کوچه شهید فلانی، پلاک ۱۲۳',
        postalCode: '1234567890',
        isDefault: true
      },
      {
        id: 2,
        title: 'دفتر کار',
        address: 'تهران، میدان ونک، برج تجاری ونک، طبقه ۸',
        postalCode: '9876543210',
        isDefault: false
      }
    ],
    
    // تنظیمات اعلانات
    notifications: {
      email: true,
      sms: false,
      push: true,
      newsletter: true,
      promotions: false,
      orderUpdates: true,
      stockAlerts: false
    },
    
    // اطلاعات امنیتی
    security: {
      twoFactor: false,
      lastLogin: '۱۴۰۲/۱۰/۱۵ - ۱۴:۳۰',
      loginAlerts: true
    }
  });

  const [newAddress, setNewAddress] = useState({
    title: '',
    address: '',
    postalCode: '',
    city: 'تهران',
    province: 'تهران'
  });

  const [avatar, setAvatar] = useState('/default-avatar.jpg');

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key:any) => {
    setUserData((prev:any) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleAvatarChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e:any) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAddress = () => {
    if (newAddress.title && newAddress.address) {
      const address = {
        id: Date.now(),
        ...newAddress,
        isDefault: userData.addresses.length === 0
      };
      setUserData(prev => ({
        ...prev,
        addresses: [...prev.addresses, address]
      }));
      setNewAddress({ title: '', address: '', postalCode: '', city: 'تهران', province: 'تهران' });
    }
  };

  const handleSetDefaultAddress = (id:any) => {
    setUserData(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    }));
  };

  const handleRemoveAddress = (id:any) => {
    setUserData(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== id)
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    
    // شبیه‌سازی ارسال اطلاعات به سرور
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    console.log('اطلاعات ذخیره شد:', userData);
  };

  // آمار کاربر
  const userStats = [
    { label: 'سفارش‌ها', value: '۱۲', color: 'text-[#8a8b7a]' },
    { label: 'نظرات', value: '۸', color: 'text-[#8a8b7a]' },
    { label: 'امتیاز', value: '۴.۸', color: 'text-[#8a8b7a]' },
    { label: 'اعتبار', value: '۲۵۰,۰۰۰', color: 'text-[#8a8b7a]' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f8f5] to-[#f0f0eb]">
      <Head>
        <title>ویرایش پروفایل | فروشگاه اینترنتی</title>
        <meta name="description" content="مدیریت حساب کاربری و اطلاعات پروفایل" />
      </Head>

   

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* هدر صفحه */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#b7b89e] bg-opacity-10 mb-4">
            <svg className="w-10 h-10 text-[#8a8b7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#5a5b4a]">حساب کاربری من</h1>
          <p className="text-[#8a8b7a] mt-2">مدیریت اطلاعات شخصی، آدرس‌ها و تنظیمات حساب</p>
        </div>

        {/* آمار کاربر */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {userStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#e8e8e0]">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-[#8a8b7a] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* سایدبار ناوبری */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-[#e8e8e0] p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={avatar}
                    alt="پروفایل کاربر"
                    className="w-24 h-24 rounded-full border-4 border-[#f0f0eb] mx-auto shadow-md"
                  />
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-[#b7b89e] rounded-full p-2 cursor-pointer hover:bg-[#9a9b82] transition-all duration-300 shadow-md">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
                <h2 className="font-semibold mt-4 text-[#5a5b4a]">امین محمدی</h2>
                <p className="text-[#b7b89e] text-sm mt-1">عضویت از ۱۴۰۱</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === 'personal' 
                      ? 'bg-[#b7b89e] bg-opacity-10 text-[#5a5b4a] border-r-4 border-[#b7b89e]' 
                      : 'text-[#8a8b7a] hover:bg-[#f8f8f5] hover:text-[#5a5b4a]'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    اطلاعات شخصی
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === 'addresses' 
                      ? 'bg-[#b7b89e] bg-opacity-10 text-[#5a5b4a] border-r-4 border-[#b7b89e]' 
                      : 'text-[#8a8b7a] hover:bg-[#f8f8f5] hover:text-[#5a5b4a]'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    آدرس‌ها
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === 'notifications' 
                      ? 'bg-[#b7b89e] bg-opacity-10 text-[#5a5b4a] border-r-4 border-[#b7b89e]' 
                      : 'text-[#8a8b7a] hover:bg-[#f8f8f5] hover:text-[#5a5b4a]'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    تنظیمات اعلانات
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === 'security' 
                      ? 'bg-[#b7b89e] bg-opacity-10 text-[#5a5b4a] border-r-4 border-[#b7b89e]' 
                      : 'text-[#8a8b7a] hover:bg-[#f8f8f5] hover:text-[#5a5b4a]'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    امنیت
                  </div>
                </button>

                <Link href="/user/order" className="block w-full text-right px-4 py-3 rounded-xl text-[#8a8b7a] hover:bg-[#f8f8f5] hover:text-[#5a5b4a] transition-all duration-300">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    سفارش‌های من
                  </div>
                </Link>

                <Link href="/wishlist" className="block w-full text-right px-4 py-3 rounded-xl text-[#8a8b7a] hover:bg-[#f8f8f5] hover:text-[#5a5b4a] transition-all duration-300">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    لیست علاقه‌مندی‌ها
                  </div>
                </Link>
              </nav>
            </div>
          </div>

          {/* محتوای اصلی */}
          <div className="lg:col-span-3">
            {/* تب اطلاعات شخصی */}
            {activeTab === 'personal' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e8e8e0] p-6">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-8 bg-[#b7b89e] rounded-full ml-3"></div>
                  <h3 className="text-xl font-semibold text-[#5a5b4a]">اطلاعات شخصی</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#5a5b4a] mb-2">نام</label>
                      <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#e8e8e0] rounded-xl focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-300 bg-[#fafaf8]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#5a5b4a] mb-2">نام خانوادگی</label>
                      <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#e8e8e0] rounded-xl focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-300 bg-[#fafaf8]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#5a5b4a] mb-2">ایمیل</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#e8e8e0] rounded-xl focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-300 bg-[#fafaf8]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#5a5b4a] mb-2">شماره تلفن</label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#e8e8e0] rounded-xl focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-300 bg-[#fafaf8]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#5a5b4a] mb-2">تاریخ تولد</label>
                      <input
                        type="date"
                        name="birthDate"
                        value={userData.birthDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#e8e8e0] rounded-xl focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-300 bg-[#fafaf8]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#5a5b4a] mb-2">جنسیت</label>
                      <select
                        name="gender"
                        value={userData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#e8e8e0] rounded-xl focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all duration-300 bg-[#fafaf8]"
                      >
                        <option value="male">مرد</option>
                        <option value="female">زن</option>
                        <option value="other">سایر</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8 pt-6 border-t border-[#e8e8e0]">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3.5 bg-[#b7b89e] text-white rounded-xl hover:bg-[#9a9b82] focus:ring-4 focus:ring-[#b7b89e] focus:ring-opacity-20 transition-all duration-300 font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center shadow-md"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          در حال ذخیره...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          ذخیره تغییرات
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* تب آدرس‌ها */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e8e8e0] p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-8 bg-[#b7b89e] rounded-full ml-3"></div>
                    <h3 className="text-xl font-semibold text-[#5a5b4a]">آدرس‌های من</h3>
                  </div>
                  <span className="text-sm text-[#8a8b7a]">{userData.addresses.length} آدرس</span>
                </div>

                <div className="space-y-4 mb-8">
                  {userData.addresses.map((address) => (
                    <div key={address.id} className="border border-[#e8e8e0] rounded-xl p-5 hover:border-[#b7b89e] transition-all duration-300 bg-[#fafaf8]">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <span className="font-medium text-[#5a5b4a] text-lg">{address.title}</span>
                            {address.isDefault && (
                              <span className="mr-3 bg-[#b7b89e] bg-opacity-10 text-[#5a5b4a] text-xs px-3 py-1 rounded-full border border-[#b7b89e] border-opacity-30">پیش‌فرض</span>
                            )}
                          </div>
                          <p className="text-[#5a5b4a] text-sm mb-2 leading-6">{address.address}</p>
                          <div className="flex items-center text-[#8a8b7a] text-xs">
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            کد پستی: {address.postalCode}
                          </div>
                        </div>
                        <div className="flex space-x-3 space-x-reverse">
                          {!address.isDefault && (
                            <button
                              onClick={() => handleSetDefaultAddress(address.id)}
                              className="text-[#b7b89e] hover:text-[#9a9b82] transition-colors text-sm bg-[#b7b89e] bg-opacity-10 hover:bg-opacity-20 px-3 py-1 rounded-lg"
                            >
                              پیش‌فرض
                            </button>
                          )}
                          <button
                            onClick={() => handleRemoveAddress(address.id)}
                            className="text-[#8a8b7a] hover:text-[#5a5b4a] transition-colors text-sm bg-[#f0f0eb] hover:bg-[#e8e8e0] px-3 py-1 rounded-lg"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#e8e8e0] pt-6">
                  <h4 className="font-medium text-[#5a5b4a] text-lg mb-4">افزودن آدرس جدید</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5a5b4a] mb-1">عنوان آدرس</label>
                      <input
                        type="text"
                        value={newAddress.title}
                        onChange={(e) => setNewAddress(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="مثلاً: منزل، دفتر کار"
                        className="w-full px-3 py-2.5 border border-[#e8e8e0] rounded-lg focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all bg-[#fafaf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5a5b4a] mb-1">کد پستی</label>
                      <input
                        type="text"
                        value={newAddress.postalCode}
                        onChange={(e) => setNewAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                        placeholder="۱۰ رقمی"
                        className="w-full px-3 py-2.5 border border-[#e8e8e0] rounded-lg focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all bg-[#fafaf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5a5b4a] mb-1">استان</label>
                      <select
                        value={newAddress.province}
                        onChange={(e) => setNewAddress(prev => ({ ...prev, province: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-[#e8e8e0] rounded-lg focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all bg-[#fafaf8]"
                      >
                        <option value="تهران">تهران</option>
                        <option value="البرز">البرز</option>
                        <option value="اصفهان">اصفهان</option>
                        <option value="فارس">فارس</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5a5b4a] mb-1">شهر</label>
                      <select
                        value={newAddress.city}
                        onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-[#e8e8e0] rounded-lg focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all bg-[#fafaf8]"
                      >
                        <option value="تهران">تهران</option>
                        <option value="کرج">کرج</option>
                        <option value="اصفهان">اصفهان</option>
                        <option value="شیراز">شیراز</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#5a5b4a] mb-1">آدرس کامل</label>
                      <textarea
                        value={newAddress.address}
                        onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                        // rows="3"
                        placeholder="آدرس کامل را وارد کنید..."
                        className="w-full px-3 py-2.5 border border-[#e8e8e0] rounded-lg focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e] transition-all bg-[#fafaf8] resize-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAddAddress}
                    className="mt-4 px-6 py-2.5 bg-[#b7b89e] text-white rounded-lg hover:bg-[#9a9b82] transition-all duration-300 font-medium flex items-center"
                  >
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    افزودن آدرس جدید
                  </button>
                </div>
              </div>
            )}

            {/* تب تنظیمات اعلانات */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e8e8e0] p-6">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-8 bg-[#b7b89e] rounded-full ml-3"></div>
                  <h3 className="text-xl font-semibold text-[#5a5b4a]">تنظیمات اعلانات</h3>
                </div>
                
                <div className="space-y-1">
                  {Object.entries(userData.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-4 px-3 rounded-lg hover:bg-[#f8f8f5] transition-colors">
                      <div>
                        <h4 className="font-medium text-[#5a5b4a]">
                          {key === 'email' && 'اعلانات ایمیلی'}
                          {key === 'sms' && 'اعلانات پیامکی'}
                          {key === 'push' && 'اعلانات مرورگر'}
                          {key === 'newsletter' && 'خبرنامه'}
                          {key === 'promotions' && 'تخفیف‌ها و پیشنهادات'}
                          {key === 'orderUpdates' && 'به‌روزرسانی سفارش'}
                          {key === 'stockAlerts' && 'اعلانات موجودی'}
                        </h4>
                        <p className="text-sm text-[#8a8b7a] mt-1">
                          {key === 'email' && 'دریافت اطلاعیه‌ها از طریق ایمیل'}
                          {key === 'sms' && 'دریافت اطلاعیه‌ها از طریق SMS'}
                          {key === 'push' && 'دریافت نوتیفیکیشن در مرورگر'}
                          {key === 'newsletter' && 'دریافت آخرین اخبار و مقالات'}
                          {key === 'promotions' && 'دریافت اطلاعیه‌های تخفیف ویژه'}
                          {key === 'orderUpdates' && 'دریافت وضعیت سفارش‌های شما'}
                          {key === 'stockAlerts' && 'اعلان بازگشت محصولات مورد علاقه'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(key)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                          value ? 'bg-[#b7b89e]' : 'bg-[#e8e8e0]'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-md ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* تب امنیت */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e8e8e0] p-6">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-8 bg-[#b7b89e] rounded-full ml-3"></div>
                  <h3 className="text-xl font-semibold text-[#5a5b4a]">امنیت حساب</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-[#e8e8e0] rounded-xl p-5 bg-[#fafaf8]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-[#5a5b4a]">احراز هویت دو مرحله‌ای</h4>
                        <p className="text-sm text-[#8a8b7a] mt-1">افزایش امنیت حساب با تأیید دو مرحله‌ای</p>
                      </div>
                      <button
                        onClick={() => setUserData(prev => ({
                          ...prev,
                          security: { ...prev.security, twoFactor: !prev.security.twoFactor }
                        }))}
                        className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                          userData.security.twoFactor 
                            ? 'bg-[#b7b89e] text-white border-[#b7b89e]' 
                            : 'bg-white text-[#5a5b4a] border-[#e8e8e0] hover:border-[#b7b89e]'
                        }`}
                      >
                        {userData.security.twoFactor ? 'فعال' : 'فعال‌سازی'}
                      </button>
                    </div>
                  </div>

                  <div className="border border-[#e8e8e0] rounded-xl p-5 bg-[#fafaf8]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-[#5a5b4a]">اعلانات ورود</h4>
                        <p className="text-sm text-[#8a8b7a] mt-1">دریافت اعلان هنگام ورود از دستگاه جدید</p>
                      </div>
                      <button
                        onClick={() => setUserData(prev => ({
                          ...prev,
                          security: { ...prev.security, loginAlerts: !prev.security.loginAlerts }
                        }))}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                          userData.security.loginAlerts ? 'bg-[#b7b89e]' : 'bg-[#e8e8e0]'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-md ${
                            userData.security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="border border-[#e8e8e0] rounded-xl p-5 bg-[#fafaf8]">
                    <div>
                      <h4 className="font-medium text-[#5a5b4a] mb-2">آخرین ورود</h4>
                      <div className="flex items-center text-sm text-[#8a8b7a]">
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>تاریخ و زمان: {userData.security.lastLogin}</span>
                      </div>
                      <div className="flex items-center text-sm text-[#b7b89e] mt-1">
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>✓ این دستگاه</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-[#e8e8e0] rounded-xl p-5 bg-[#fafaf8]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-[#5a5b4a]">تغییر رمز عبور</h4>
                        <p className="text-sm text-[#8a8b7a] mt-1">به‌روزرسانی رمز عبور حساب کاربری</p>
                      </div>
                      <button className="px-4 py-2 bg-[#b7b89e] text-white rounded-lg hover:bg-[#9a9b82] transition-colors text-sm">
                        تغییر رمز عبور
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}