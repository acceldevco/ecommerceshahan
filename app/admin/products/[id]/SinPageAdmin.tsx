"use client";
import { useContext, useEffect, useState } from "react";
import {
  Upload,
  Plus,
  Trash2,
  Check,
  Edit3,
  Image as ImageIcon,
  Tag,
  Layers,
  FileText,
  Save,
  X,
  Eye,
  ShoppingCart,
  BarChart3,
  Package,
  Search,
  List,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Star,
  Loader2,
} from "lucide-react";
import NestedCategoryCheckbox from "@/app/components/Category";
import { useLoading } from "@/app/hook/loadingData";
import { notFound, useParams } from "next/navigation";
import { ContextMain } from "@/app/context/context";
import ImageGallery from "@/app/components/ImageGallery";
import { useStorage } from "@/app/hook/localstorage";
import axios from "axios";

async function imageUrlToBase64(imageUrl: string): Promise<string> {
  // const response = await axios.get(imageUrl, {
  //   responseType: "arraybuffer", // دریافت داده به صورت باینری
  // });

  // const buffer = Buffer.from(response.data, "binary");
  // const base64 = buffer.toString("base64");
  // return base64;
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string); // داده به صورت DataURL (base64)
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function ProfessionalProductPage() {
  const [image, saveImages]: any = useStorage("image", []);
  var ui = useContext(ContextMain);
  var params: any = useParams().id;

    var files: any = useLoading({
      url: "/api/getdata",
      submitUrl: "/api/main",
      initialData: {
        table: "file",
      },
    });





  var configcomment: any = {
    url: "/api/getdata",
    submitUrl: "/api/main",

    initialData: {
      table: "review",
      filters: {
        include: {
          user: true,
          product: true,
        },
        where: {
          productId: parseInt(params),
        },
      },
    },
  };
  var configproduct: any = {
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
        },
      },
    },
    // pageSize: 5,
    // immediate: true,
    // lazy: false,
  };
  // params === "create" && ((configcomment = {}), (configproduct = {}));
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
  } = useLoading(configproduct);

  const { data: datacomment } = useLoading(configcomment);
  // console.log("data?.data?.length", data?.data?.length);

  if (data?.data === undefined && params !== "create") {
    // notFound();
  }

  const [activeTab, setActiveTab] = useState("general");
  const [isEditing, setIsEditing] = useState(false);
  const [category, setcategory] = useState<any>([]);
  const [editorData, setEditorData] = useState();
  const [textbottelegram, settextbottelegram] = useState("");
  const [showcommet, setcomment] = useState(true);
  const [load, setload] = useState(0);
  const [productData, setProductData]: any = useState(
    {}
    // data?.data?.[0] ?? {}
    //   {
    //   title: "گوشی هوشمند پیشرفته XYZ",
    //   description:
    //     "این یک محصول نمونه با کیفیت عالی و طراحی مدرن است که نیازهای کاربران پیشرفته را به خوبی پاسخ می‌دهد.",
    //   price: 25000000,
    //   discountedPrice: 20000000,
    //   stock: 50,
    //   sku: "PRD-2024-001",
    //   status: "published",
    // }
  );
  const cleanData = Object.fromEntries(
    Object.entries(productData).filter(([key, value]) => {
      return value !== null && !(Array.isArray(value) && value.length === 0);
    })
  );
  useEffect(() => {
    saveImages(undefined);
    if (data?.data?.[0]) {
      setProductData(data?.data?.[0]);
      saveImages(data?.data?.[0]?.files);
    }
  }, [data]);
  // useEffect(() => {
  //   console.log("te:", { ...productData, files: { connect: image } });
  // }, [image]);
  // پالت رنگی بر اساس #B7B89
  const colorPalette: any = {
    primary: "#B7B89",
    primaryLight: "#C8C9A0",
    primaryDark: "#9A9B72",
    secondary: "#8A4C9C",
    accent: "#4A90E2",
    background: "#F8F9FA",
    surface: "#FFFFFF",
    textPrimary: "#1A1A1A",
    textSecondary: "#666666",
    border: "#E1E3E5",
  };

  const features = [
    { id: 1, name: "طراحی مدرن و شیک", icon: "🎨", status: true },
    { id: 2, name: "قابلیت اتصال بی‌سیم", icon: "📶", status: true },
    { id: 3, name: "باتری با عمر طولانی", icon: "🔋", status: true },
    { id: 4, name: "گارانتی ۲۴ ماهه", icon: "🛡️", status: false },
    { id: 5, name: "پشتیبانی از آخرین تکنولوژی‌ها", icon: "⚡", status: true },
  ];

  const stats = [
    {
      label: "بازدید امروز",
      value: "۱,۲۴۵",
      change: "+12%",
      icon: <Eye size={20} />,
    },
    {
      label: "فروش ماه",
      value: "۸۹",
      change: "+23%",
      icon: <ShoppingCart size={20} />,
    },
    {
      label: "موجودی",
      value: productData.stock,
      change: null,
      icon: <Package size={20} />,
    },
    {
      label: "امتیاز",
      value: "۴.۸/۵",
      change: "+0.2",
      icon: <BarChart3 size={20} />,
    },
  ];

  async function sendImageToTelegram(
    base64Data: string,
    chatId: string,
    token: string,
    caption: any
  ) {
    // حذف پیشوند data:image/png;base64, اگر وجود دارد
    const cleanedBase64 = base64Data.replace(/^data:.+;base64,/, "");

    // تبدیل Base64 به Blob
    const byteCharacters = atob(cleanedBase64);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    // ساخت FormData
    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", blob, "image.png");
    formData.append("caption", caption);
    formData.append("parse_mode", "HTML");
    // ارسال
    const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  }

  const handleSave = async () => {
    setload(1);
    // console.log({ ...productData, files: { connect: image.map((d) => ({id:d.id})) } });
    delete productData?.categories;
    // console.log(productData);
    var photo = await imageUrlToBase64(
      "http://localhost:3000/uploads/banner1.png"
    );
    //     console.log(
    //       photo,
    //       textbottelegram
    //     );

//     await sendImageToTelegram(
//       photo,
//       "@shahangallery_ir",
//       "8566261884:AAGUgc_Cf_GUWuU-oRnnMXOIXXAtoaJBYyU",
//       `
// 🔥 <b>${productData?.name}</b> 🔥

// 💰 قیمت: <i>${productData?.price?.toLocaleString("fa")} تومان</i>
// ${
//   productData?.discountedPrice
//     ? `💸 قیمت قبل: <del>${productData?.discountedPrice?.toLocaleString(
//         "fa"
//       )} تومان</del>`
//     : ""
// }

// 📝 <strong>${productData?.description ?? ""}</strong>

// 🔗 <b><a href="https://chatgpt.com/c/691c8800-06b4-832d-8600-3c7273b1492f">مشاهده و خرید محصول</a></b>
// ✨ فرصت را از دست ندهید!
// `
//     );
    // await axios.post(
    //   `https://api.telegram.org/bot8566261884:AAGUgc_Cf_GUWuU-oRnnMXOIXXAtoaJBYyU/sendPhoto`,
    //   {
    //     chat_id: "@shahangallery_ir",
    //     text: textbottelegram,
    //     photo: photo,
    //   }
    // );
    // axios
    //   .post("/api/bottelegram", {
    //     // imageUrl: "http://localhost:3000/uploads/banner1.png",
    //     caption: textbottelegram,
    //     chatId: "@shahangallery_ir",
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    submitData({
      nameTable: "product",
      ...(params === "create"
        ? {
            action: "create",
            // id: params,
          }
        : {
            action: "update",
            id: params,
          }),
      data: {
        ...productData,
        files: { connect: image.map((d: any) => ({ id: d.id })) },
        categories: {
          ...(params === "create" ? {} : { set: [] }),
          connect: category,
        },
      }, //{ ...productData, files: image },
    }).then((d) => {
      setload(0);
    });

    // axios.post("http://localhost:3000/api/main", {
    //   data: {
    //     nameTable: "product",
    //     action: "update",
    //     data: { ...productData, files: image },
    //   },
    // });

    // setIsEditing(false);
    // Logic to save data would go here
  };

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " ریال";
  };

  const getDiscountPercentage = () => {
    return Math.round(
      (1 - productData.discountedPrice / productData.price) * 100
    );
  };

  var datacat = useLoading({
    url: "/api/getdata",
    submitUrl: "/api/main",

    initialData: {
      pageSize: 10000,
      table: "category",
      filters: {
        where: { parentId: null },
        include: {
          subcategories: {
            include: {
              subcategories: {
                include: {
                  subcategories: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // console.log(cleanData);
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colorPalette.background }}
    >
      {/* {JSON.stringify(cleanData)}
      {JSON.stringify(image.map((d) => d.url))} */}

      {/* Header */}
      <div
        className="bg-white shadow-sm border-b"
        style={{ borderColor: colorPalette.border }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: colorPalette.textPrimary }}
              >
                مدیریت محصول
              </h1>
              <p className="mt-1" style={{ color: colorPalette.textSecondary }}>
                ویرایش و مدیریت اطلاعات محصول
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 border rounded-lg transition-colors flex items-center gap-2"
                style={{
                  borderColor: colorPalette.border,
                  color: colorPalette.textSecondary,
                }}
              >
                <X size={18} />
                انصراف
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 text-white rounded-lg bg-[#777C6D] transition-all shadow-lg flex items-center gap-2 font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.primaryDark})`,
                }}
              >
                <Save size={18} />
                {load ? <Loader2 className="animate-spin opacity-30" /> : ""}
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className=" fixed left-[5%] top-50"
        onClick={() => {
          setcomment(!showcommet);
        }}
      >
        <div className="p-1 bg-red-500 rounded-4xl w-2 h-2 top-0.5 absolute z-30"></div>
        <MessageCircle className=" opacity-30" />
      </div>

      {showcommet ? (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Product Info */}
            <div className="xl:col-span-2 space-y-6">
              {/* Product Card */}
              <div
                className="bg-white rounded-2xl shadow-sm border overflow-hidden"
                style={{ borderColor: colorPalette.border }}
              >
                <div
                  className="p-6 border-b"
                  style={{ borderColor: colorPalette.border }}
                >
                  <div className="flex items-center justify-between">
                    <h2
                      className="text-xl font-semibold"
                      style={{ color: colorPalette.textPrimary }}
                    >
                      اطلاعات محصول
                    </h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
                      style={{ color: colorPalette.primary }}
                    >
                      <Edit3 size={16} />
                      {isEditing ? "لغو ویرایش" : "ویرایش"}
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Product Title */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colorPalette.textPrimary }}
                    >
                      عنوان محصول
                    </label>
                    <input
                      type="text"
                      value={productData.name ?? ""}
                      onChange={(e) =>
                        setProductData({ ...productData, name: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border rounded-xl transition-all disabled:opacity-60"
                      style={{
                        borderColor: colorPalette.border,
                        backgroundColor: isEditing
                          ? "white"
                          : colorPalette.background,
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colorPalette.textPrimary }}
                    >
                      توضیحات محصول
                    </label>
                    <textarea
                      rows={4}
                      value={productData.description}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          description: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border rounded-xl transition-all disabled:opacity-60 resize-none"
                      style={{
                        borderColor: colorPalette.border,
                        backgroundColor: isEditing
                          ? "white"
                          : colorPalette.background,
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{ color: colorPalette.textPrimary }}
                      className="block text-sm font-medium mb-2"
                    >
                      توضیحات ربات
                    </label>
                    <textarea
                      disabled={!isEditing}
                      rows={10}
                      name=""
                      id=""
                      onChange={(e) => {
                        settextbottelegram(e.target.value);
                      }}
                      value={textbottelegram}
                      style={{
                        borderColor: colorPalette.border,
                        backgroundColor: isEditing
                          ? "white"
                          : colorPalette.background,
                      }}
                      className="w-full px-4 py-3 border rounded-xl transition-all disabled:opacity-60 resize-none"
                    ></textarea>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className="rounded-xl p-4 text-center border transition-all hover:shadow-md"
                        style={{
                          backgroundColor: colorPalette.background,
                          borderColor: colorPalette.border,
                        }}
                      >
                        <div className="flex justify-center mb-2">
                          <div
                            className="p-2 rounded-lg"
                            style={{
                              backgroundColor: `${colorPalette.primary}20`,
                            }}
                          >
                            {stat.icon}
                          </div>
                        </div>
                        <div
                          className="text-2xl font-bold mb-1"
                          style={{ color: colorPalette.textPrimary }}
                        >
                          {stat.value}
                        </div>
                        <div
                          className="text-sm mb-1"
                          style={{ color: colorPalette.textSecondary }}
                        >
                          {stat.label}
                        </div>
                        {stat.change && (
                          <div
                            className={`text-xs font-medium ${
                              stat.change.startsWith("+")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {stat.change}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div
                className="bg-white rounded-2xl shadow-sm border"
                style={{ borderColor: colorPalette.border }}
              >
                <div
                  className="border-b"
                  style={{ borderColor: colorPalette.border }}
                >
                  <nav className="flex space-x-8 px-6">
                    {[
                      {
                        id: "general",
                        name: "عمومی",
                        icon: <FileText size={18} />,
                      },
                      {
                        id: "pricing",
                        name: "قیمت‌گذاری",
                        icon: <Tag size={18} />,
                      },
                      {
                        id: "inventory",
                        name: "موجودی",
                        icon: <Layers size={18} />,
                      },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? "text-[#B7B89] border-[#B7B89]"
                            : "text-gray-500 border-transparent hover:text-gray-700"
                        }`}
                      >
                        {tab.icon}
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === "general" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: colorPalette.textPrimary }}
                          >
                            SKU
                          </label>
                          <input
                            type="text"
                            value={productData.sku ?? 0}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border rounded-xl transition-all disabled:opacity-60"
                            style={{
                              borderColor: colorPalette.border,
                              backgroundColor: isEditing
                                ? "white"
                                : colorPalette.background,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: colorPalette.textPrimary }}
                          >
                            وضعیت
                          </label>
                          <select
                            value={productData.status}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border rounded-xl transition-all disabled:opacity-60"
                            style={{
                              borderColor: colorPalette.border,
                              backgroundColor: isEditing
                                ? "white"
                                : colorPalette.background,
                            }}
                          >
                            <option value="published">منتشر شده</option>
                            <option value="draft">پیش‌نویس</option>
                            <option value="archived">آرشیو شده</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "pricing" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: colorPalette.textPrimary }}
                          >
                            قیمت اصلی
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={productData.price}
                              onChange={(e) =>
                                setProductData({
                                  ...productData,
                                  price: parseInt(e.target.value) || 0,
                                })
                              }
                              disabled={!isEditing}
                              className="w-full px-4 py-3 pr-12 border rounded-xl transition-all disabled:opacity-60"
                              style={{
                                borderColor: colorPalette.border,
                                backgroundColor: isEditing
                                  ? "white"
                                  : colorPalette.background,
                              }}
                            />
                            <span
                              className="absolute left-3 top-1/2 transform -translate-y-1/2"
                              style={{ color: colorPalette.textSecondary }}
                            >
                              ریال
                            </span>
                          </div>
                        </div>
                        <div>
                          <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: colorPalette.textPrimary }}
                          >
                            قیمت با تخفیف
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={productData.discountedPrice}
                              onChange={(e) =>
                                setProductData({
                                  ...productData,
                                  discountedPrice:
                                    parseInt(e.target.value) || 0,
                                })
                              }
                              disabled={!isEditing}
                              className="w-full px-4 py-3 pr-12 border rounded-xl transition-all disabled:opacity-60"
                              style={{
                                borderColor: colorPalette.border,
                                backgroundColor: isEditing
                                  ? "white"
                                  : colorPalette.background,
                              }}
                            />
                            <span
                              className="absolute left-3 top-1/2 transform -translate-y-1/2"
                              style={{ color: colorPalette.textSecondary }}
                            >
                              ریال
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Discount Info */}
                      <div
                        className="rounded-xl p-4 border"
                        style={{
                          background: `linear-gradient(135deg, ${colorPalette.primary}15, ${colorPalette.accent}15)`,
                          borderColor: colorPalette.primary,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div
                              className="text-sm mb-1"
                              style={{ color: colorPalette.textSecondary }}
                            >
                              درصد تخفیف
                            </div>
                            <div
                              className="text-2xl font-bold"
                              style={{ color: colorPalette.primary }}
                            >
                              {getDiscountPercentage()}%
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className="text-sm mb-1"
                              style={{ color: colorPalette.textSecondary }}
                            >
                              صرفه‌جویی
                            </div>
                            <div
                              className="text-lg font-semibold"
                              style={{ color: colorPalette.textPrimary }}
                            >
                              {formatPrice(
                                productData.price - productData.discountedPrice
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "inventory" && (
                    <div className="space-y-6">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: colorPalette.textPrimary }}
                        >
                          تعداد موجودی
                        </label>
                        <input
                          type="number"
                          value={productData.stock}
                          onChange={(e) =>
                            setProductData({
                              ...productData,
                              stock: parseInt(e.target.value) || 0,
                            })
                          }
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border rounded-xl transition-all disabled:opacity-60"
                          style={{
                            borderColor: colorPalette.border,
                            backgroundColor: isEditing
                              ? "white"
                              : colorPalette.background,
                          }}
                        />
                      </div>

                      {/* Stock Status */}
                      <div
                        className="rounded-xl p-4"
                        style={{ backgroundColor: colorPalette.background }}
                      >
                        <div className="flex items-center justify-between">
                          <span style={{ color: colorPalette.textPrimary }}>
                            وضعیت موجودی
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              productData.stock > 10
                                ? "bg-green-100 text-green-800"
                                : productData.stock > 0
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {productData.stock > 10
                              ? "موجود"
                              : productData.stock > 0
                              ? "محدود"
                              : "ناموجود"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Media & Categories */}
            <div className="space-y-6">
              {/* Media Gallery */}
              {/* {JSON.stringify(data?.data?.[0]?.files)} */}
              {/* {data?.data?.[0]?.files} */}
              <ImageGallery productImages={[...image.map((d: any) => d.url)]} />
              {/* Categories */}
              <div
                className="bg-white rounded-2xl shadow-sm border overflow-hidden"
                style={{ borderColor: colorPalette.border }}
              >
                <div
                  className="p-6 border-b"
                  style={{ borderColor: colorPalette.border }}
                >
                  <h2
                    className="text-xl font-semibold flex items-center gap-2"
                    style={{ color: colorPalette.textPrimary }}
                  >
                    <Layers size={20} />
                    دسته‌بندی‌ها
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    {/* {JSON.stringify(data?.data?.[0]?.categories)} */}
                    <NestedCategoryCheckbox
                    files={files}
                      datacat={datacat}
                      selected={data?.data?.[0]?.categories ?? []}
                      onSelectionChange={(selected: any) => {
                        // console.log(data.data[0].categories);
                        setcategory(selected.map((d: any) => ({ id: d.id })));
                        // setProductData((data) => ({
                        //   ...data,
                        //   categories: {
                        //     connect: selected.map((d) => ({ id: d.id })),
                        //   },
                        // }));
                      }}
                    />
                  </div>

                  {/* <button
                  className="w-full py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium border"
                  style={{
                    backgroundColor: colorPalette.background,
                    borderColor: colorPalette.border,
                    color: colorPalette.textSecondary,
                  }}
                >
                  <Plus size={18} />
                  افزودن دسته‌بندی
                </button> */}
                </div>
              </div>

              {/* Features */}
              {/* <div
              className="bg-white rounded-2xl shadow-sm border overflow-hidden"
              style={{ borderColor: colorPalette.border }}
            >
              <div
                className="p-6 border-b"
                style={{ borderColor: colorPalette.border }}
              >
                <h2
                  className="text-xl font-semibold"
                  style={{ color: colorPalette.textPrimary }}
                >
                  ویژگی‌ها
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {features.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-sm"
                      style={{
                        backgroundColor: colorPalette.background,
                        borderColor: colorPalette.border,
                      }}
                    >
                      <span className="text-lg">{feature.icon}</span>
                      <span
                        className="flex-1"
                        style={{ color: colorPalette.textPrimary }}
                      >
                        {feature.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            feature.status ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        <button
                          className="transition-colors hover:text-red-500"
                          style={{ color: colorPalette.textSecondary }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full mt-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium border"
                  style={{
                    backgroundColor: colorPalette.background,
                    borderColor: colorPalette.border,
                    color: colorPalette.textSecondary,
                  }}
                >
                  <Plus size={18} />
                  افزودن ویژگی جدید
                </button>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-6 mx-auto w-[80%] ">
          {datacomment?.data?.map((review: any) => (
            <div
              key={review.id}
              className="border-b shadow-xl p-2 rounded-2xl pb-6 last:border-b-0 transition-all duration-300 hover:shadow-lg hover:rounded-lg hover:p-4"
              style={{ borderColor: colorPalette.background }}
            >
              {/* Header Section */}
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-transform duration-300 hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.secondary})`,
                  }}
                >
                  {review.user.name.charAt(0).toUpperCase()}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3
                      className="font-bold text-lg truncate"
                      style={{ color: colorPalette.text }}
                    >
                      {review.user.name}
                    </h3>
                    <span
                      className="text-sm opacity-75 whitespace-nowrap"
                      style={{ color: colorPalette.textLight }}
                    >
                      {new Date(review.createdAt).toLocaleDateString("fa")}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-5 h-5 transition-all duration-200 ${
                          i < review.rating
                            ? "transform hover:scale-125"
                            : "opacity-40"
                        }`}
                        style={{
                          color:
                            i < review.rating
                              ? colorPalette.primary
                              : "currentColor",
                        }}
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          className="w-full h-full"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    ))}
                    <span
                      className="text-sm font-medium ml-2"
                      style={{ color: colorPalette.primary }}
                    >
                      {review.rating}.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Comment Content */}
              <div
                className="bg-opacity-50 rounded-lg p-4 transition-all duration-300 hover:bg-opacity-70"
                style={{ backgroundColor: colorPalette.background }}
              >
                <p
                  className="leading-relaxed text-justify line-clamp-3 hover:line-clamp-none transition-all duration-300 cursor-pointer"
                  style={{ color: colorPalette.text }}
                >
                  {review.comment}
                </p>
              </div>

              {/* Verified Badge (if needed) */}
              {/* {review.verified && (
        <div className="flex justify-end mt-3">
          <span
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: colorPalette.primaryLight,
              color: colorPalette.primaryDark,
            }}
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            خرید verified
          </span>
        </div>
      )} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
