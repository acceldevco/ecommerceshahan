"use client";

import Image from "next/image";
import { useStorage } from "../hook/localstorage";
// import PropTypes from "prop-types";

const formatPrice = (price: any) =>
  price?.toLocaleString("fa-IR", { maximumFractionDigits: 0 });

export default function ProductCard({ product }: any) {
  var [cart, setcart]: any = useStorage("cart", "");
  return (
    <div
      key={product.id}
      className="product-card flex-shrink-0 w-56 h-80 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-500 hover:scale-105 snap-start group border border-gray-100 overflow-hidden"
    >
      {/* {JSON.stringify(product)} */}
      {/* Product Image */}
      <div className="relative w-full h-40 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <Image
          src={product?.files?.[0]?.url ?? "/remove.png"}
          alt={product?.alt || product?.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 224px, 224px"
          priority={product.id === 1}
        />

        {/* Discount Badge */}
        {product.discountedPrice > 0 && (
          <div className="absolute top-2 left-2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-md">
            <span className="text-xs font-bold text-white">
              {(product.price / product.discountedPrice) * 100}%
            </span>
          </div>
        )}

        {/* Quick Action Overlay */}
        <a href={`archiveproduct/${product.id}`} className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
          <button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
            مشاهده سریع
          </button>
        </a>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col h-40">
        <h3 className="text-base font-semibold text-gray-800 text-right mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Prices */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col items-end">
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
              <span className="text-xs font-normal text-gray-600 mr-1">
                تومان
              </span>
            </p>

            {product.discountedPrice > 0 && (
              <p className="text-sm font-light text-gray-500 line-through mt-0.5">
                {formatPrice(product.discountedPrice)}
              </p>
            )}
          </div>

          {product.discountedPrice > 0 && (
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-[#B7B89F] bg-[#f8f8f5] px-2 py-1 rounded-md">
                ذخیره {formatPrice(product.price - product.discountedPrice)}
              </span>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => {
            // console.log('product.id', {
            //   [product.id]: {
            //     ...product,
            //     // qty: ,
            //   },
            // });

            setcart({
              ...cart,
              [product.id]: {
                ...product,
                qty: (cart[product.id]?.qty ?? 0) + 1 
              },
            })
          }
          }
          className="mt-auto w-full py-2 bg-[#B7B89F] hover:bg-[#a5a68f] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 group/btn text-sm"
        >
          {/* {JSON.stringify(cart)} */}
          <span>افزودن به سبد</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="transform group-hover/btn:translate-x-1 transition-transform duration-300"
          >
            <path
              d="M2 2H4L4.4 4M7 13L4.4 4M4.4 4H21L17 13H7ZM7 13L5.5 15.5M17 13V20C17 20.5523 17.4477 21 18 21H19M17 13H7M11 19C11 19.5523 10.5523 20 10 20C9.44772 20 9 19.5523 9 19C9 18.4477 9.44772 18 10 18C10.5523 18 11 18.4477 11 19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
