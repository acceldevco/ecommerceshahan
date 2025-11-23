"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Check,
} from "lucide-react";
import { useLoading } from "@/app/hook/loadingData";
import { useParams } from "next/navigation";
import { useStorage } from "@/app/hook/localstorage";
import ReviewForm from "@/app/components/ReviewForm";

export default function SingleProductPage() {
  var params: any = useParams().id;
  var [cart, setcart]: any = useStorage("cart", "");
  const {
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
  }: any = useLoading({
    url: "/api/getdata",
    submitUrl: "/api/main",

    initialData: {
      table: "product",
      filters: {
        where: {
          id: parseInt(params),
        },
        include: {
          attributes: true,
          categories: true,
          files: true,
          reviews: {
            include: {
              user: {
                select: {
                  email: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    // pageSize: 5,
    // immediate: true,
    // lazy: false,
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("space-gray");
  const [selectedStorage, setSelectedStorage] = useState("256");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isAddingToCart, setIsAddingToCart] = useState(false);


  useLoading({
    
  })

  const product = {}
  // {
  //   id: 1,
  //   name: "گوشی موبایل اپل آیفون 15 پرو مکس",
  //   brand: "Apple",
  //   category: "موبایل و تبلت",
  //   price: 59_900_000,
  //   originalPrice: 69_900_000,
  //   discount: 14,
  //   rating: 4.8,
  //   reviewCount: 1247,
  //   inStock: true,
  //   stockCount: 15,
  //   sku: "APL-IP15PM-256-SG",
  //   tags: ["پرچمدار", "دوربین عالی", "پردازنده A17", "5G"],
  //   features: [
  //     "پردازنده A17 Pro",
  //     "دوربین 48 مگاپیکسل",
  //     "نمایشگر 6.7 اینچی",
  //     "مقاوم در برابر آب IP68",
  //     "باتری 4441 میلی‌آمپر",
  //   ],
  // };

  const images = data?.data?.[0]?.files?.map((d: any) => d.url) ?? [];
  // [
  //   ...data?.data?.[0]?.files?.map((d)=>d.url)
  //   // ...data?.data?.[0]?.files?.map((d)=>d.url)
  //   // "/products/iphone-15-pro-front.jpg",
  //   // "/products/iphone-15-pro-back.jpg",
  //   // "/products/iphone-15-pro-side.jpg",
  //   // "/products/iphone-15-pro-camera.jpg",
  //   // "/products/iphone-15-pro-display.jpg"
  // ];

  // const colors = [
  //   { id: "space-gray", name: "طوسی فضایی", value: "#424245", inStock: true },
  //   { id: "silver", name: "نقره‌ای", value: "#f2f2f2", inStock: true },
  //   { id: "gold", name: "طلایی", value: "#fae7cf", inStock: true },
  //   { id: "blue", name: "آبی تیتانیوم", value: "#4bb3fd", inStock: false },
  // ];

  // const storageOptions = [
  //   { id: "128", size: "128", price: 49_900_000, inStock: true },
  //   { id: "256", size: "256", price: 59_900_000, inStock: true },
  //   { id: "512", size: "512", price: 74_900_000, inStock: true },
  //   { id: "1tb", size: "1TB", price: 89_900_000, inStock: false },
  // ];

  const specifications = [
    { name: "ابعاد", value: "159.9 × 76.7 × 8.3 میلی‌متر" },
    { name: "وزن", value: "221 گرم" },
    { name: "نمایشگر", value: "6.7 اینچ، Super Retina XDR" },
    { name: "پردازنده", value: "Apple A17 Pro" },
    { name: "RAM", value: "8 گیگابایت" },
    { name: "دوربین اصلی", value: "48+12+12 مگاپیکسل" },
    { name: "دوربین سلفی", value: "12 مگاپیکسل" },
    { name: "باتری", value: "4441 میلی‌آمپر" },
    { name: "سیستم عامل", value: "iOS 17" },
  ];

  const reviews = [
    {
      id: 1,
      user: "علیرضا محمدی",
      rating: 5,
      date: "۱۴۰۲/۱۰/۱۵",
      comment:
        "کیفیت ساخت عالی و دوربین فوق‌العاده‌ای داره. باتری هم نسبت به نسل قبل خیلی بهتر شده.",
      verified: true,
    },
    {
      id: 2,
      user: "سارا احمدی",
      rating: 4,
      date: "۱۴۰۲/۱۰/۱۲",
      comment: "طراحی زیبا و عملکرد روان، اما قیمت نسبتاً بالایی داره.",
      verified: true,
    },
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "گوشی سامسونگ گلکسی S24 Ultra",
      price: 52_900_000,
      image: "/products/galaxy-s24-ultra.jpg",
      discount: 10,
    },
    {
      id: 3,
      name: "گوشی شیائومی 14 پرو",
      price: 38_900_000,
      image: "/products/xiaomi-14-pro.jpg",
      discount: 15,
    },
  ];

  // پالت رنگی بر اساس B7B89F
  const colorPalette = {
    primary: "#B7B89F",
    primaryDark: "#9A9B87",
    primaryLight: "#D4D5C3",
    secondary: "#8A8B7A",
    accent: "#A1A28E",
    background: "#F8F8F5",
    text: "#2A2A2A",
    textLight: "#666666",
  };

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // شبیه‌سازی عملیات افزودن به سبد خرید
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Added to cart:", {
      product: product.name,
      color: selectedColor,
      storage: selectedStorage,
      quantity: quantity,
    });
    setIsAddingToCart(false);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to checkout
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colorPalette.background }}
    >
      {/* Breadcrumb */}
      <nav
        style={{
          backgroundColor: colorPalette.primaryLight,
          borderColor: colorPalette.primaryDark,
        }}
      >
        {/* <div className="container mx-auto px-4 py-3">
          <div
            className="flex items-center space-x-2 text-sm"
            style={{ color: colorPalette.text }}
          >
            <span>فروشگاه</span>
            <span>/</span>
            <span>موبایل و تبلت</span>
            <span>/</span>
            <span>اپل</span>
            <span>/</span>
            <span className="font-medium">{product.name}</span>
          </div>
        </div> */}
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="rounded-2xl p-6 shadow-sm border"
              style={{
                backgroundColor: "white",
                borderColor: colorPalette.primaryLight,
              }}
            >
              <div
                className="aspect-square relative rounded-xl overflow-hidden"
                style={{ backgroundColor: colorPalette.background }}
              >
                <img
                  src={images?.[selectedImage] ??'/remove.png'}
                  // alt={product.name}
                  className="w-full h-full object-contain"
                />

                {/* Discount Badge */}
                {data?.data?.[0]?.discountedPrice ? (
                  <div
                    className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: colorPalette.primary }}
                  >
                    {parseInt(
                      (data?.data?.[0]?.discountedPrice /
                        data?.data?.[0]?.price) *
                        100 as any
                    )}
                    % تخفیف
                  </div>
                ) : (
                  ""
                )}

                {/* Navigation Arrows */}
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev > 0 ? prev - 1 : images.length - 1
                    )
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  style={{ borderColor: colorPalette.primary }}
                >
                  <ChevronRight
                    className="w-5 h-5"
                    style={{ color: colorPalette.text }}
                  />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev < images.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  style={{ borderColor: colorPalette.primary }}
                >
                  <ChevronLeft
                    className="w-5 h-5"
                    style={{ color: colorPalette.text }}
                  />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-3 space-x-reverse overflow-x-auto pb-2">
              {images.map((image: any, index: any) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                    selectedImage === index ? "ring-2" : "hover:border-gray-300"
                  }`}
                  style={{
                    backgroundColor: colorPalette.background,
                    borderColor:
                      selectedImage === index
                        ? colorPalette.primary
                        : colorPalette.primaryLight,
                    // ringColor: colorPalette.primaryLight,
                  }}
                >
                  {/* <img
                    src={image}
                    alt={`${product.name} - تصویر ${index + 1}`}
                    className="w-full h-full object-cover"
                  /> */}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {/* <span
                  className="text-sm px-2 py-1 rounded"
                  style={{
                    backgroundColor: colorPalette.primaryLight,
                    color: colorPalette.text,
                  }}
                >
                  {product.brand}
                </span> */}
                <span
                  className="text-sm px-2 py-1 rounded"
                  style={{
                    backgroundColor: colorPalette.primaryLight,
                    color: colorPalette.text,
                  }}
                >
                  {/* {JSON.stringify(product)} */}
                  {data?.data?.[0]?.stock ? "موجود در انبار" : "ناموجود"}
                </span>
              </div>

              <h1
                className="text-2xl lg:text-3xl font-bold mb-3 leading-tight"
                style={{ color: colorPalette.text }}
              >
                {data?.data?.[0]?.name}
              </h1>

              {/* Rating */}
              {/* <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-current"
                          : "text-gray-300"
                      }`}
                      style={{ color: i < Math.floor(product.rating) ? colorPalette.primary : undefined }}
                    />
                  ))}
                  <span className="text-lg font-medium mr-1" style={{ color: colorPalette.text }}>
                    {product.rating}
                  </span>
                </div>
                <span style={{ color: colorPalette.textLight }}>({product.reviewCount} نظر)</span>
              </div> */}
            </div>

            {/* Price */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                backgroundColor: colorPalette.primaryLight + "20",
                borderColor: colorPalette.primaryLight,
              }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div
                  className="text-3xl lg:text-4xl font-bold"
                  style={{ color: colorPalette.text }}
                >
                  {formatPrice(data.data?.[0]?.price)}
                </div>
                {data.data?.[0]?.discountedPrice > data.data?.[0]?.price && (
                  <div
                    className="text-xl line-through"
                    style={{ color: colorPalette.textLight }}
                  >
                    {formatPrice(data.data?.[0]?.discountedPrice)}
                  </div>
                )}
              </div>
              {/* <div
                className="font-medium"
                style={{ color: colorPalette.primaryDark }}
              >
                شما {formatPrice(product.originalPrice - product.price)}{" "}
                صرفه‌جویی می‌کنید
              </div> */}
            </div>

            {/* Color Selection */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: colorPalette.text }}>رنگ:</h3>
               <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => color.inStock && setSelectedColor(color.id)}
                    disabled={!color.inStock}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      selectedColor === color.id
                        ? "ring-2 bg-opacity-20"
                        : "hover:border-gray-300"
                    } ${!color.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                    style={{ 
                      backgroundColor: selectedColor === color.id ? colorPalette.primaryLight + '40' : 'transparent',
                      borderColor: selectedColor === color.id ? colorPalette.primary : colorPalette.primaryLight,
                      ringColor: colorPalette.primaryLight
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{ 
                        backgroundColor: color.value,
                        borderColor: colorPalette.primaryLight
                      }}
                    />
                    <span className="text-sm font-medium" style={{ color: colorPalette.text }}>
                      {color.name}
                    </span>
                    {!color.inStock && (
                      <span className="text-xs" style={{ color: colorPalette.primaryDark }}>ناموجود</span>
                    )}
                    {selectedColor === color.id && color.inStock && (
                      <Check className="w-4 h-4 absolute top-1 right-1" style={{ color: colorPalette.primary }} />
                    )}
                  </button>
                ))}
              </div> 
            </div> */}

            {/* Storage Selection */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: colorPalette.text }}>حافظه داخلی:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {storageOptions.map((storage) => (
                  <button
                    key={storage.id}
                    onClick={() => storage.inStock && setSelectedStorage(storage.id)}
                    disabled={!storage.inStock}
                    className={`p-4 rounded-xl border-2 text-center transition-all relative ${
                      selectedStorage === storage.id
                        ? "ring-2 bg-opacity-20"
                        : "hover:border-gray-300"
                    } ${!storage.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                    style={{ 
                      backgroundColor: selectedStorage === storage.id ? colorPalette.primaryLight + '40' : 'white',
                      borderColor: selectedStorage === storage.id ? colorPalette.primary : colorPalette.primaryLight,
                      ringColor: colorPalette.primaryLight
                    }}
                  >
                    <div className="font-semibold" style={{ color: colorPalette.text }}>{storage.size} GB</div>
                    <div className="text-sm mt-1" style={{ color: colorPalette.textLight }}>
                      {formatPrice(storage.price)}
                    </div>
                    {!storage.inStock && (
                      <div className="text-xs mt-1" style={{ color: colorPalette.primaryDark }}>ناموجود</div>
                    )}
                    {selectedStorage === storage.id && storage.inStock && (
                      <Check className="w-4 h-4 absolute top-2 right-2" style={{ color: colorPalette.primary }} />
                    )}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Quantity & Actions */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span
                  className="text-lg font-semibold"
                  style={{ color: colorPalette.text }}
                >
                  تعداد:
                </span>
                <div
                  className="flex items-center gap-3 bg-white border rounded-xl px-3 py-2"
                  style={{ borderColor: colorPalette.primaryLight }}
                >
                  <button
                    onClick={() => {
                      setcart({
                        ...cart,
                        [data?.data?.[0].id]: {
                          ...data?.data?.[0],
                          qty:
                            cart[data?.data?.[0].id]?.qty > 0
                              ? cart[data?.data?.[0].id]?.qty - 1
                              : 0,
                        },
                      });
                    }}
                    // onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: colorPalette.text }}
                  >
                    -
                  </button>
                  <span
                    className="w-8 text-center font-medium"
                    style={{ color: colorPalette.text }}
                  >
                    {cart?.[params]?.qty ?? 0}
                  </span>
                  <button
                    onClick={() => {
                      setcart({
                        ...cart,
                        [data?.data?.[0].id]: {
                          ...data?.data?.[0],
                          qty:
                            data?.data?.[0].stock >
                            cart[data?.data?.[0].id]?.qty
                              ? cart[data?.data?.[0].id]?.qty + 1
                              : data?.data?.[0].stock,
                        },
                      });
                    }}
                    // onClick={() =>
                    //   quantity < product.stockCount && setQuantity(quantity + 1)
                    // }
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: colorPalette.text }}
                  >
                    +
                  </button>
                </div>
                <span
                  className="text-sm"
                  style={{ color: colorPalette.textLight }}
                >
                  {data.data?.[0]?.stock} عدد در انبار
                </span>
              </div>

              {/* Action Buttons */}
              {/* <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 flex items-center justify-center gap-2 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: colorPalette.primary }}
                >
                  {isAddingToCart ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      در حال افزودن...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      افزودن به سبد خرید
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleBuyNow}
                  className="flex-1 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: colorPalette.secondary }}
                >
                  خرید الآن
                </button>
                
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-4 border rounded-xl transition-colors"
                  style={{ 
                    borderColor: colorPalette.primaryLight,
                    backgroundColor: isWishlisted ? colorPalette.primaryLight : 'transparent'
                  }}
                >
                  <Heart 
                    className={`w-6 h-6 ${
                      isWishlisted ? "fill-current" : ""
                    }`} 
                    style={{ color: isWishlisted ? colorPalette.primary : colorPalette.textLight }}
                  />
                </button>
                
                <button className="p-4 border rounded-xl transition-colors hover:bg-gray-50" style={{ borderColor: colorPalette.primaryLight }}>
                  <Share2 className="w-6 h-6" style={{ color: colorPalette.textLight }} />
                </button>
              </div> */}
            </div>

            {/* Features */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t"
              style={{ borderColor: colorPalette.primaryLight }}
            >
              <div
                className="flex items-center gap-3"
                style={{ color: colorPalette.text }}
              >
                <Truck
                  className="w-5 h-5"
                  style={{ color: colorPalette.primary }}
                />
                <span>ارسال رایگان برای خرید بالای ۱ میلیون</span>
              </div>
              <div
                className="flex items-center gap-3"
                style={{ color: colorPalette.text }}
              >
                <Shield
                  className="w-5 h-5"
                  style={{ color: colorPalette.primary }}
                />
                <span>۱۸ ماه گارانتی شرکتی</span>
              </div>
              <div
                className="flex items-center gap-3"
                style={{ color: colorPalette.text }}
              >
                <RotateCcw
                  className="w-5 h-5"
                  style={{ color: colorPalette.primary }}
                />
                <span>۷ روز بازگشت وجه</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div
          className="mt-16 rounded-2xl shadow-sm border overflow-hidden"
          style={{
            backgroundColor: "white",
            borderColor: colorPalette.primaryLight,
          }}
        >
          {/* Tab Headers */}
          <div
            className="border-b"
            style={{ borderColor: colorPalette.primaryLight }}
          >
            <div className="flex overflow-x-auto">
              {[
                { id: "description", label: "توضیحات محصول" },
                // { id: "specifications", label: "مشخصات فنی" },
                { id: "reviews", label: "نظرات کاربران" },
                // { id: "questions", label: "پرسش و پاسخ" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-40 px-6 py-4 font-medium text-lg transition-colors ${
                    activeTab === tab.id ? "border-b-2" : "hover:text-gray-700"
                  }`}
                  style={{
                    color:
                      activeTab === tab.id
                        ? colorPalette.primary
                        : colorPalette.textLight,
                    borderColor:
                      activeTab === tab.id
                        ? colorPalette.primary
                        : "transparent",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 lg:p-8">
            {activeTab === "description" && (
              <div className="prose prose-lg max-w-none">
                <h3 style={{ color: colorPalette.text }}>
                  {/* آیفون 15 پرو مکس - تجربه‌ای فراموش‌نشدنی */}
                </h3>
                <p style={{ color: colorPalette.text }}>
                  {/* {JSON.stringify(data?.data)} */}
                  {data?.data?.[0]?.description}
                  {/* آیفون 15 پرو مکس با طراحی پیشرفته و امکانات فوق‌العاده،
                  تجربه‌ای منحصر به فرد از یک گوشی هوشمند را ارائه می‌دهد. با
                  پردازنده A17 Pro و دوربین 48 مگاپیکسلی، این دستگاه برای عکاسان
                  حرفه‌ای و گیمرها مناسب است. */}
                </p>
                {/* <ul style={{ color: colorPalette.text }}>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul> */}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 border-b"
                    style={{ borderColor: colorPalette.background }}
                  >
                    <span
                      className="font-medium"
                      style={{ color: colorPalette.textLight }}
                    >
                      {spec.name}
                    </span>
                    <span style={{ color: colorPalette.text }}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <ReviewForm
                  colorPalette={colorPalette}
                  onSubmit={(e) => {
                    console.log(e);
                  }}
                />
                {data?.data?.[0]?.reviews?.map((review: any) => (
                  <div
                    key={review.id}
                    className="border-b pb-6"
                    style={{ borderColor: colorPalette.background }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{
                          background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.secondary})`,
                        }}
                      >
                        {review.user.name.split("")[0]}
                      </div>
                      <div>
                        <div
                          className="font-semibold"
                          style={{ color: colorPalette.text }}
                        >
                          {review.user.name}
                        </div>
                        <div
                          className="flex items-center gap-2 text-sm"
                          style={{ color: colorPalette.textLight }}
                        >
                          <span>
                            {new Date(review.createdAt).toLocaleDateString(
                              "fa"
                            )}
                          </span>
                          {/* {review.verified && (
                            <span
                              className="px-2 py-1 rounded text-xs"
                              style={{
                                backgroundColor: colorPalette.primaryLight,
                                color: colorPalette.primaryDark,
                              }}
                            >
                              خرید verified
                            </span>
                          )} */}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-current" : "text-gray-300"
                          }`}
                          style={{
                            color:
                              i < review.rating
                                ? colorPalette.primary
                                : undefined,
                          }}
                        />
                      ))}
                    </div>
                    <p
                      className="leading-relaxed"
                      style={{ color: colorPalette.text }}
                    >
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {/* <div className="mt-16">
          <h2
            className="text-2xl font-bold mb-8"
            style={{ color: colorPalette.text }}
          >
            محصولات مشابه
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow"
                style={{
                  backgroundColor: "white",
                  borderColor: colorPalette.primaryLight,
                }}
              >
                <div
                  className="aspect-square rounded-xl mb-4 overflow-hidden"
                  style={{ backgroundColor: colorPalette.background }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3
                  className="font-semibold mb-2 line-clamp-2"
                  style={{ color: colorPalette.text }}
                >
                  {product.name}
                </h3>
                <div className="flex items-center gap-3">
                  <div
                    className="text-xl font-bold"
                    style={{ color: colorPalette.text }}
                  >
                    {formatPrice(product.price)}
                  </div>
                  {product.discount > 0 && (
                    <div
                      className="text-sm px-2 py-1 rounded"
                      style={{
                        backgroundColor: colorPalette.primaryLight,
                        color: colorPalette.primaryDark,
                      }}
                    >
                      {product.discount}% تخفیف
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
