"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Upload,
  X,
  Search,
  Grid,
  List,
  Star,
  Download,
  Trash2,
  Eye,
  Plus,
  Filter,
  Calendar,
  ImageIcon,
} from "lucide-react";
import { useLoading } from "../hook/loadingData";
import { ContextMain } from "../context/context";
import { useStorage } from "../hook/localstorage";

const ImageManagerPanel: any = ({
  isOpen = false,
  radio = false,
  onClose = () => {},
  onImageSelect = () => {},
  onImageToggle = () => {}, // 👈 جدید
  mode = "standalone",
}:any) => {
  const { data, loading, error }:any = {}
  //  useLoading({
  //   url: "/api/getdata",
  //   submitUrl: "/api/main",
  //   initialData: {
  //     table: "file",
  //   },
  // });

  const [images, setImages]: any = useState([]);
  useEffect(() => {
    if (data?.data) {
      setImages(data?.data);
    }
  }, [data]);
  var context = useContext(ContextMain);

  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  // console.log('JSON:',JSON.parse(localStorage.image ?? `[]`));

  const [selectedImages, setSelectedImages]:any = useState([]);
  const [filterFavorite, setFilterFavorite]:any = useState(false);
  const [selectedImage, setSelectedImage]:any = useState(null);
  const [isUploading, setIsUploading]:any = useState(false);
  const fileInputRef:any = useRef(null);
  const dialogRef:any = useRef(null);
  const [image, saveImages] = useStorage("image", []);
  useEffect(() => {
    // console.log('image',localStorage.getItem("image"));

    try {
      const data = image; //JSON.parse(localStorage.getItem("image") || "[]");
      const ids:any = data.map((item:any) => item.id);
      if (ids) setSelectedImages(ids);
    } catch {
      setSelectedImages([]);
    }
  }, []);

  // مدیریت کلیک خارج از دیالوگ
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (
        mode === "dialog" &&
        dialogRef.current &&
        !dialogRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (mode === "dialog" && isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // جلوگیری از اسکرول بدنه اصلی
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [mode, isOpen, onClose]);

  // مدیریت کلید Escape
  useEffect(() => {
    const handleEscape = (event:any) => {
      if (event.key === "Escape") {
        if (selectedImage) {
          setSelectedImage(null);
        } else if (mode === "dialog") {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedImage, mode, onClose]);

  const toggleFavorite = (id:any) => {
    setImages(
      images.map((img:any) =>
        img.id === id ? { ...img, favorite: !img.favorite } : img
      )
    );
  };

  const deleteImage = (id:any) => {
    setImages(images.filter((img:any) => img.id !== id));
    setSelectedImages(selectedImages.filter((imgId:any) => imgId !== id));
  };

  //   const toggleSelectImage = (id) => {
  //     setSelectedImages(prev =>
  //       prev.includes(id) ? prev.filter(imgId => imgId !== id) : [...prev, id]
  //     );
  //     console.log(selectedImages);

  //   };

  // const toggleSelectImage = (id: number) => {
  //   setSelectedImages((prev) => {
  //     const alreadySelected = prev.includes(id);
  //     const newSelected = alreadySelected
  //       ? prev.filter((i) => i !== id)
  //       : [...prev, id];

  //     // پیدا کردن داده‌ی تصویر
  //     const img = images.find((i) => i.id === id);
  //     if (img) {
  //       onImageToggle(img, !alreadySelected); // 👈 صدا زدن prop جدید
  //     }

  //     return newSelected;
  //   });
  // };

  // const toggleSelectImage = (id: number) => {
  //   setSelectedImages((prev) => {
  //     console.log('prev:',prev);

  //     const alreadySelected = prev.includes(id);
  //     const newSelected = alreadySelected
  //       ? prev.filter((i) => i !== id)
  //       : [...prev, id];

  //     // ✅ پیدا کردن کل داده‌های تصاویر انتخاب‌شده
  //     const selectedData:any = images.filter((img) => newSelected.includes(img.id));

  //     // 👇 ارسال کل آرایه به بیرون
  //     console.log('selectedData:',selectedData);

  //     onImageToggle(selectedData);

  //     return newSelected;
  //   });
  // };

  const toggleSelectImage = (id: number) => {
    setSelectedImages((prev:any) => {
      console.log('prev',prev);
      
      const alreadySelected = prev.includes(id);
      const newSelected = alreadySelected
        ? prev.filter((i:any) => i !== id)
        : radio?[id]: [...prev, id];
      console.log(context);

      // ✅ داده‌ها حالا از context گرفته می‌شوند
      // console.log(context.data?.imageadmin);
      const allImages: any = images;
      // const allImages = context.data?.imageadmin || images; // فُال‌بک اگر context خالی بود
      // console.log(allImages);

      const selectedData: any = allImages.filter((img:any) =>
        newSelected.includes(img.id)
      );

      // console.log('selectedData',selectedData);
      
      // 👇 ارسال داده‌ها به بیرون (prop)
      saveImages(selectedData);
      // localStorage.image = JSON.stringify(selectedData);
      onImageToggle(selectedData);
      //     context.setdata(() => ({
      //   imageadmin: newSelected,
      // }));
      // context.setSelectedImages?.(newSelected);
      // context.setSelectedData?.(selectedData);

      return newSelected;
    });
  };

  const handleFileUpload = async (e:any) => {
    const files:any = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);

    const newImages: any = [];

    for (const file of files) {
      // تبدیل فایل به base64 برای ارسال به API
      const reader = new FileReader();
      const base64 = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      // ارسال به API برای ذخیره در سرور و دیتابیس
      const res = await fetch("/api/saveimage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64,
          title: file.name.replace(/\.[^/.]+$/, ""),
          // categoryId: 1,
          // subcategoryId: 2,
          // productId: 3,
        }),
      });

      const data = await res.json();

      // اضافه کردن به state برای نمایش
      newImages.push({
        id: data.file?.id || Date.now(),
        url: data.file?.url || URL.createObjectURL(file),
        title: file.name.replace(/\.[^/.]+$/, ""),
        date: new Date().toLocaleDateString("fa-IR"),
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        favorite: false,
        tags: ["جدید"],
      });
    }

    setImages([...newImages, ...images]);
    setIsUploading(false);

    // ریست input فایل
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageSelect = (img:any) => {
    if (mode === "dialog") {
      onImageSelect(img);
      onClose();
    } else {
      setSelectedImage(img);
    }

    onImageSelect(img);
  };

  const filteredImages = images.filter((img:any) => {
    const matchesSearch =
      img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.tags.some((tag:any) => tag.includes(searchTerm));
    const matchesFavorite = !filterFavorite || img.favorite;
    return matchesSearch && matchesFavorite;
  });

  // محتوای اصلی پنل
  const panelContent = (
    <div
      ref={dialogRef}
      className={`bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden ${
        mode === "dialog" ? "w-full max-w-6xl mx-4" : "min-h-screen"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-[#777C6D] bg-clip-text text-transparent">
                مدیریت تصاویر
              </h1>
              <p className="text-sm text-slate-600">
                مدیریت و سازماندهی تصاویر شما
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {mode === "dialog" && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#b7b89e] text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Plus className="w-5 h-5" />
              )}
              <span className="font-semibold">
                {isUploading ? "در حال آپلود..." : "آپلود تصویر"}
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* <div className="flex-1 min-w-0 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجو در تصاویر..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div> */}

          <div className="flex items-center gap-2">
            {/* <button
              onClick={() => setFilterFavorite(!filterFavorite)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                filterFavorite
                  ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                  : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-50"
              }`}
            >
              <Star
                className={`w-4 h-4 ${filterFavorite ? "fill-yellow-500" : ""}`}
              />
              <span className="text-sm font-medium">علاقه‌مندی‌ها</span>
            </button> */}

            {/* <div className="flex bg-white rounded-lg p-1 border border-slate-300">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-all ${
                  viewMode === "grid"
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-all ${
                  viewMode === "list"
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div> */}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
          <span className="text-slate-600">
            <span className="font-semibold text-blue-600">
              {filteredImages.length}
            </span>{" "}
            تصویر
          </span>
          {selectedImages.length > 0 && (
            <>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">
                <span className="font-semibold text-purple-600">
                  {selectedImages.length}
                </span>{" "}
                انتخاب شده
              </span>
              <button
                onClick={() => {
                  selectedImages.forEach((id:any) => deleteImage(id));
                  setSelectedImages([]);
                }}
                className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                حذف انتخاب شده‌ها
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-slate-50">
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              تصویری یافت نشد
            </h3>
            <p className="text-slate-500">تصویری برای نمایش وجود ندارد</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredImages.map((img:any) => (
              <div
                key={img.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200"
              >
              
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <button
                        onClick={() => toggleSelectImage(img.id)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all shadow ${
                          selectedImages.includes(img.id)
                            ? "bg-blue-500 text-white"
                            : "bg-white/95 text-slate-700 hover:bg-white"
                        }`}
                      >
                        
                        {/* {JSON.stringify(img.id)} */}
                        <span className="text-xs font-bold">
                          {selectedImages.includes(img.id) ? "✓" : "+"}
                        </span>
                      </button>
                      <button
                        onClick={() => toggleFavorite(img.id)}
                        className="w-7 h-7 bg-white/95 hover:bg-white rounded-lg flex items-center justify-center transition-all shadow"
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            img.favorite
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-600"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-2 flex gap-1.5">
                      <button
                        onClick={() => handleImageSelect(img)}
                        className="flex-1 bg-white/95 hover:bg-white text-slate-700 px-2 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 text-xs font-semibold shadow"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {mode === "dialog" ? "انتخاب" : "مشاهده"}
                      </button>
                      <button
                        onClick={() => deleteImage(img.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-all shadow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-slate-800 text-sm mb-1.5 truncate">
                    {img.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-0.5">
                      <Calendar className="w-3 h-3" />
                      {img.date}
                    </span>
                    <span className="font-medium">{img.size}</span>
                  </div>
                  {/* <div className="flex flex-wrap gap-1">
                    {img.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            
            {filteredImages.map((img:any, index:any) => (
              <div
                key={img.id}
                className={`flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors ${
                  index !== filteredImages.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                
                <input
                  // type="checkbox"
                  // type="radio"
                  {...(radio ? { type: "radio" } : { type: "checkbox" })}
                  checked={selectedImages.includes(img.id)}
                  onChange={() => toggleSelectImage(img.id)}
                  className="w-5 h-5 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                />
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 truncate">
                    {img.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {img.date}
                    </span>
                    <span>{img.size}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {img.tags.map((tag:any, i:any) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleFavorite(img.id)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        img.favorite
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-400"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => handleImageSelect(img)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5 text-slate-600" />
                  </button>
                  <button
                    onClick={() => deleteImage(img.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // حالت دیالوگ
  if (mode === "dialog") {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            {panelContent}
          </div>
        )}

        {/* Preview Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            
            <div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-800">
                    {selectedImage.title}
                
                  </h2>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.title}
                      className="w-full rounded-xl"
                    />
                  </div>
                  <div className="lg:w-64 flex-shrink-0 space-y-4">
                    <div>
                      <h3 className="font-semibold text-slate-700 mb-2">
                        اطلاعات تصویر
                      </h3>
                     
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500">تاریخ:</span>
                          <span className="font-medium">
                            {selectedImage.date}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">حجم:</span>
                          <span className="font-medium">
                            {selectedImage.size}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">علاقه‌مندی:</span>
                          <button
                            onClick={() => toggleFavorite(selectedImage.id)}
                            className="p-1"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                selectedImage.favorite
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-slate-400"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700 mb-2">
                        برچسب‌ها
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {/* {selectedImage.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-lg"
                          >
                            {tag}
                          </span>
                        ))} */}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <button
                        onClick={() => {
                          onImageSelect(selectedImage);
                          onClose();
                        }}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors font-medium"
                      >
                        انتخاب تصویر
                      </button>
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                      >
                        بستن
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // حالت مستقل
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"
      dir="rtl"
    >
      {panelContent}

      {/* Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedImage.title}
                </h2>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full rounded-xl mb-4"
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-600 gap-4">
                <div className="flex items-center gap-4">
                  <span>{selectedImage.date}</span>
                  <span>{selectedImage.size}</span>
                </div>
                <div className="flex gap-2">
                  {/* {selectedImage.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-lg"
                    >
                      {tag}
                    </span>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ImageManagerPanel;
