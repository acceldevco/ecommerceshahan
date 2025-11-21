"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, X, ArrowRight } from "lucide-react";
import { useLoading } from "@/app/hook/loadingData";
import ImageManagerPanel from "@/app/components/ImageManagerPanel";

export default function BannerManagement() {
  var config = {
    table: "banner",
    // initialData: {
    // filters: {
    //   include: {
    //     file: true,
    //   },
    // },
    // },
  };
  const {
    fetchData,
    data,
    loading,
    error,
    page,
    total,
    // search,
    // setSearch,
    loadMore,
    refetch,
    submitData,
  } = useLoading({
    url: "/api/getdata",
    submitUrl: "/api/main",

    initialData: config,
    // pageSize: 5,
    // immediate: true,
    // lazy: false,
  });

  var [dialog, setdialog]: any = useState<any>(false);
  const [banners, setBanners]: any = useState<any>([
    // ...(data?.data ?? [])
    // {
    //   id: 1,
    //   title: 'تخفیف ویژه بهاره',
    //   image: '../uploads/photo-1762881321734.jpg',
    //   link: '/spring-sale',
    //   position: 'اصلی',
    //   status: true,
    //   createdAt: '1403/08/15'
    // },
    // {
    //   id: 2,
    //   title: 'محصولات جدید',
    //   image: 'https://via.placeholder.com/800x300/7C3AED/ffffff?text=Banner+2',
    //   link: '/new-products',
    //   position: 'ثانویه',
    //   status: true,
    //   createdAt: '1403/08/10'
    // },
    // {
    //   id: 3,
    //   title: 'فروش ویژه',
    //   image: 'https://via.placeholder.com/800x300/DB2777/ffffff?text=Banner+3',
    //   link: '/special-offer',
    //   position: 'فوتر',
    //   status: false,
    //   createdAt: '1403/08/05'
    // }
  ]);
  useEffect(() => {
    console.log('data?.data',data?.data);
    
    if (data?.data) {
      setBanners(data?.data);
    }
  }, [data]);

  const [view, setView] = useState("list"); // 'list', 'add', 'edit'
  const [editingBanner, setEditingBanner]:any = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    link: "",
    position: "اصلی",
    status: true,
  });

  const handleAdd = () => {
    setEditingBanner(null);
    setFormData({
      title: "",
      image: "",
      link: "",
      position: "اصلی",
      status: true,
    });
    setView("add");
  };

  const handleEdit = (banner:any) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      image: banner.image,
      link: banner.link,
      position: banner.position,
      status: banner.status,
    });
    setView("edit");
  };

  const handleDelete = (id:any) => {
    if (confirm("آیا از حذف این بنر اطمینان دارید؟")) {
      setBanners(banners.filter((b:any) => b.id !== id));
    }
  };

  const handleToggleStatus = (id:any) => {
    setBanners(
      banners.map((b:any) => (b.id === id ? { ...b, status: !b.status } : b))
    );
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    if (editingBanner) {
      setBanners(
        banners.map((b:any) =>
          b.id === editingBanner.id ? { ...b, ...formData } : b
        )
      );
    } else {
      const newBanner = {
        id: Math.max(...banners.map((b:any) => b.id), 0) + 1,
        ...formData,
        createdAt: new Date().toLocaleDateString("fa-IR"),
      };
      setBanners([...banners, newBanner]);
    }

    setView("list");
  };

  const handleCancel = () => {
    setView("list");
    setEditingBanner(null);
    setFormData({
      title: "",
      image: "",
      link: "",
      position: "اصلی",
      status: true,
    });
  };

  // List View
  if (view === "list") {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  مدیریت بنرها
                </h1>
                <p className="text-gray-600">مدیریت و ویرایش بنرهای سایت</p>
              </div>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-[#b7b89e]  text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
              >
                <Plus size={20} />
                افزودن بنر جدید
              </button>
            </div>
          </div>

          {/* Banners Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* {JSON.stringify(banners)} */}
            {data?.data?.map((banner:any) => (
              <div
                key={banner.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative">
                  <img
                    src={banner?.imageUrl}
                    alt={banner.title}
                    className="w-full h-48 object-cover"
                  />
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                      banner.isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {banner.isActive ? "فعال" : "غیرفعال"}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {banner.title}
                      </h3>
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        <span>
                          موقعیت: {/* {JSON.stringify(banner)} */}
                          <span className="font-medium">{banner.position}</span>
                        </span>
                        <span>
                          لینک:{" "}
                          <span className="font-medium">{banner.link}</span>
                        </span>
                        <span>
                          تاریخ:{" "}
                          <span className="font-medium">
                            {banner.createdAt}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={async () => {
                        // handleToggleStatus(banner.id);

                        submitData({
                          id: banner.id,
                          nameTable: "banner",
                          action: "update",
                          data: {
                            isActive: !banner.isActive,
                          },
                        });
                        // setBanners((data) => {
                        //   // var d = (data.find((a) => a.id === banner.id));
                        // //  console.log('d.status',d.status);

                        //   return data.map((b) =>
                        //     b.id === banner.id ? { ...b, status: !b.status } : b
                        //   );
                        // });

                        // var test = [
                        //   ...banners.map((b) =>
                        //     b.id === banner.id ? { ...b, status: !b.status } : b
                        //   ),
                        // ].find((d) => d.id === banner.id);
                        // console.log(test);

                        // await submitData({
                        //   id: banner.id,
                        //   nameTable: "banner",
                        //   action: "update",
                        //   data: {},
                        // });
                        // submitData(true,{
                        //   nameTable:'banner'
                        // })
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        banner.isActive
                          ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                    >
                      {banner.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
                      {banner.isActive ? "غیرفعال" : "فعال"}
                    </button>

                    <button
                      onClick={() => handleEdit(banner)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all"
                    >
                      <Edit2 size={18} />
                      ویرایش
                    </button>

                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-all"
                    >
                      <Trash2 size={18} />
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Add/Edit Form View
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <ArrowRight size={24} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                {view === "add" ? "افزودن بنر جدید" : "ویرایش بنر"}
              </h1>
              <p className="text-gray-600">
                {view === "add"
                  ? "اطلاعات بنر جدید را وارد کنید"
                  : "اطلاعات بنر را ویرایش کنید"}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                عنوان بنر
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="عنوان بنر را وارد کنید"
              />
            </div>

            <div>
              <ImageManagerPanel
                radio={true}
                onImageToggle={(e:any) => {
                  console.log("e", e);
                }}
                onClose={() => {
                  setdialog(false);
                }}
                mode="dialog"
                isOpen={dialog}
              />
              <label className="block text-sm font-bold text-gray-700 mb-3">
                آدرس تصویر
              </label>
              {/* {JSON.stringify(data.data)} */}
              <div
                onClick={() => {
                  setdialog(true);
                }}
              >
                نمایش فایل
              </div>
              <input
                type="url"
                required
                value={JSON.parse(localStorage?.image ?? '[]')?.[0]?.url}
                readOnly
                // value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 relative group">
                  <img
                    src={formData.image}
                    alt="پیش‌نمایش"
                    className="w-full h-64 object-cover"
                    onError={(e:any) => (e.target.style.display = "none")}
                  />
                  <button
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="absolute top-3 left-3 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all shadow-lg opacity-0 group-hover:opacity-100"
                  >
                    <X size={20} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all">
                    <p className="text-white text-sm font-medium">
                      کلیک کنید تا حذف شود
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                لینک
              </label>
              <input
                type="text"
                required
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="/page-url"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                موقعیت بنر
              </label>
              <select
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="اصلی">اصلی</option>
                <option value="ثانویه">ثانویه</option>
                <option value="سایدبار">سایدبار</option>
                <option value="فوتر">فوتر</option>
              </select>
            </div>

            <div className="flex items-center bg-gray-50 p-4 rounded-xl">
              <input
                type="checkbox"
                id="status"
                checked={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.checked })
                }
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="status"
                className="mr-3 text-gray-700 font-medium"
              >
                فعال سازی بنر
              </label>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold shadow-md text-lg"
              >
                {view === "add" ? "افزودن بنر" : "بروزرسانی بنر"}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-all font-bold text-lg"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
