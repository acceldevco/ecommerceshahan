"use client"
import { useContext, useEffect, useState } from "react";
import { ImageIcon, Upload, ZoomIn } from "lucide-react";
import { ContextMain } from "../context/context";

interface ImageGalleryProps {
  productImages?: string[];
  colorPalette?: {
    border: string;
    textPrimary: string;
    textSecondary: string;
    background: string;
    primary: string;
  };
}

// مقادیر پیش‌فرض
const defaultImages:any = [
//   "/images/product-1.jpg",
//   "/images/product-2.jpg",
//   "/images/product-3.jpg",
//   "/images/product-4.jpg",
//   "/images/product-5.jpg",
//   "/images/product-6.jpg",
//   "/images/product-7.jpg",
//   "/images/product-8.jpg",
];

const defaultColorPalette = {
  border: "#e5e7eb",
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
  background: "#f9fafb",
  primary: "#3b82f6",
};

const ImageGallery = ({
  productImages = defaultImages,
  colorPalette = defaultColorPalette,
  listImages = ()=>{}
}: any) => {

  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  var ui = useContext(ContextMain);
  useEffect(()=>{
    listImages
  },[])
  return (
    <div className="group">
        
      {/* Image Gallery Card */}
      <div
        className="bg-white rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:shadow-xl"
        style={{
          borderColor: colorPalette.border,
          boxShadow:
            "0 4px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
        }}
      >
        {/* Header */}
        <div
          className="p-6 border-b bg-gradient-to-r from-white to-gray-50/50"
          style={{ borderColor: colorPalette.border }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-xl shadow-sm"
                style={{
                  backgroundColor: `${colorPalette.primary}08`,
                  border: `1px solid ${colorPalette.border}`,
                }}
              >
                <ImageIcon size={22} style={{ color: colorPalette.primary }} />
              </div>
              <div>
                <h2
                  className="text-xl font-bold tracking-tight"
                  style={{ color: colorPalette.textPrimary }}
                >
                  گالری تصاویر
                </h2>
                <p
                  className="text-sm mt-1"
                  style={{ color: colorPalette.textSecondary }}
                >
                  {productImages.length} تصویر
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
              style={{
                backgroundColor: `${colorPalette.primary}08`,
                border: `1px solid ${colorPalette.border}`,
                color: colorPalette.primary,
              }}
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Main Image Container */}
          <div className="mb-6">
            <div
              className={`
                aspect-square rounded-2xl overflow-hidden relative transition-all duration-500
                ${
                  isZoomed
                    ? "cursor-zoom-out"
                    : "cursor-zoom-in hover:shadow-lg"
                }
              `}
              style={{
                border: `1.5px solid ${colorPalette.border}`,
                backgroundColor: colorPalette.background,
              }}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={productImages[selectedImage] ?? '/remove.png'}
                alt="تصویر اصلی محصول"
                className={`
                  w-full h-full object-cover transition-transform duration-700
                  ${isZoomed ? "scale-110" : "scale-100 hover:scale-105"}
                `}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/5" />
            </div>
          </div>

          {/* Thumbnails Grid */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {productImages.map((img:any, index:any) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(index);
                  setIsZoomed(false);
                }}
                className={`
                  aspect-square rounded-xl overflow-hidden transition-all duration-300 relative
                  transform hover:scale-105 hover:-translate-y-1
                  ${
                    selectedImage === index
                      ? "ring-3 ring-offset-2 shadow-lg scale-105 -translate-y-1"
                      : "hover:shadow-md"
                  }
                `}
                style={{
                  backgroundColor: colorPalette.background,
                  border: `1px solid ${colorPalette.border}`,
                  // ringColor: colorPalette.primary,
                }}
              >
                <img
                  src={img ?? '/remove.png'}
                  alt={`تصویر ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Selected indicator */}
                {selectedImage === index && (
                  <div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full shadow-sm"
                    style={{ backgroundColor: colorPalette.primary }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Upload Button */}
          <button
            onClick={() => {
              ui.open("showimage");
            }}
            className="w-full py-4 border-2 border-dashed rounded-xl transition-all duration-300 
                       hover:shadow-md hover:scale-[1.02] active:scale-100 
                       flex items-center justify-center gap-3 font-semibold group/upload"
            style={{
              borderColor: colorPalette.border,
              color: colorPalette.textSecondary,
              backgroundColor: `${colorPalette.background}80`,
            }}
          >
            <div
              className="p-2 rounded-lg transition-all duration-300 group-hover/upload:scale-110"
              style={{
                backgroundColor: `${colorPalette.primary}08`,
                color: colorPalette.primary,
              }}
            >
              <Upload size={18} />
            </div>
            <span className="transition-all duration-300 group-hover/upload:tracking-wide">
              آپلود تصویر جدید
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
