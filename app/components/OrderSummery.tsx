// import { Check, Minus, Package, Plus, Trash2 } from "lucide-react";
// import { useStorage } from "../hook/localstorage";
// import { usecartstorage } from "../hook/usecartstorage";
// import { useLoading } from "../hook/loadingData";

// function OrderSummery() {
//   usecartstorage("");
//   const [cart, setcart]: any = useStorage("cart", "");

//   const {
//     data,
//     loading,
//     error,
//     page,
//     total,
//     // search,
//     // setSearch,
//     loadMore,
//     refetch,
//     submitData,
//   } = useLoading({
//     url: "/api/getdata",
//     submitUrl: "/api/main",

//     initialData: {
//       table: "product",
//       filters: {
//         where: {
//           //   id: parseInt(params),
//           id: { in: Object.keys(cart).map((d)=>(parseInt(d))) },
//         },
//         include: {
//           attributes: true,
//           categories: true,
//           files: true,
//         },
//       },
//     },
//     // pageSize: 5,
//     // immediate: true,
//     // lazy: false,
//   });

// //   return <>{JSON.stringify(data)}</>;

//   const calculateTotal = () => {
//     if (!cart) return 0;
//     return Object.values(data).reduce((total: number, item: any) => {
//       return total + (item.price * item.qty || 0);
//     }, 0);
//   };

//   const totalPrice: any = calculateTotal();
//   const shippingCost: any = 0; // رایگان
//   const tax: any = Math.floor(totalPrice * 0.08); // 8% مالیات
//   const discount: any = totalPrice > 500000 ? 50000 : 0; // تخفیف شرطی
//   const finalPrice: any = totalPrice + shippingCost + tax - discount;

//   return (
//     <div className="lg:col-span-1">
//       <div className="bg-white rounded-3xl shadow-xl border border-[#B7B89F]/20 overflow-hidden sticky top-8">
//         <div className="bg-gradient-to-r from-[#B7B89F] to-[#9a9b7f] px-6 py-4">
//           <h3 className="text-xl font-bold text-white">خلاصه سفارش</h3>
//         </div>

//         <div className="p-6 space-y-5">
//           <div className="space-y-3">
//             {cart &&
//               Object.values(cart).map((item: any, index: number) => (
//                 <div
//                   key={item.id}
//                   className="relative flex items-center gap-3 p-3 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden"
//                 >
//                   <div className="relative w-16 h-16 bg-gradient-to-br from-[#B7B89F]/10 to-[#B7B89F]/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#B7B89F]/15 group-hover:scale-105 transition-transform duration-300">
//                     <Package className="w-8 h-8 text-[#B7B89F]" />
//                     <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#B7B89F] text-white text-xs flex items-center justify-center rounded-full font-bold">
//                       {item.qty}
//                     </div>
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-bold text-gray-900 truncate text-base">
//                           {item.name}
//                         </h3>
//                         <div className="flex items-center gap-2 mt-1">
//                           <span className="text-xs text-gray-500">تعداد:</span>
//                           <span className="text-xs font-medium text-gray-700">
//                             {item.qty} عدد
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-end gap-1.5">
//                         <div className="text-base font-bold text-[#B7B89F] bg-[#B7B89F]/10 px-2 py-1 rounded-md">
//                           {item.price.toLocaleString()} تومان
//                         </div>

//                         <div className="flex items-center gap-1.5 bg-gray-100 rounded-md p-1">
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setcart({
//                                 ...cart,
//                                 [item.id]: {
//                                   // ...item,
//                                   productId: item.id,
//                                   quantity:
//                                     // qty:
//                                     cart[item.id]?.qty > 0
//                                       ? cart[item.id]?.qty - 1
//                                       : 0,
//                                 },
//                               });
//                             }}
//                             className="w-6 h-6 flex items-center justify-center bg-white text-gray-700 rounded shadow-sm hover:bg-gray-50 transition-colors text-xs"
//                           >
//                             <Minus className="w-3 h-3" />
//                           </button>
//                           <span className="text-xs font-medium w-5 text-center">
//                             {item.qty}
//                           </span>
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setcart({
//                                 ...cart,
//                                 [item.id]: {
//                                   // ...item,
//                                   productId: item.id,
//                                   quantity:
//                                     // qty:
//                                     item.stock > cart[item.id]?.qty
//                                       ? cart[item.id]?.qty + 1
//                                       : item.stock,
//                                 },
//                                 // {
//                                 //   ...item,
//                                 //   qty:
//                                 //     item.stock > cart[item.id]?.qty
//                                 //       ? cart[item.id]?.qty + 1
//                                 //       : item.stock,
//                                 // },
//                               });
//                             }}
//                             className="w-6 h-6 flex items-center justify-center bg-white text-gray-700 rounded shadow-sm hover:bg-gray-50 transition-colors text-xs"
//                           >
//                             <Plus className="w-3 h-3" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       const newCart = { ...cart };
//                       delete newCart[item.id];
//                       setcart(newCart);
//                     }}
//                     className="absolute top-2 left-2 w-7 h-7 flex items-center justify-center bg-white/80 text-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50 hover:text-red-500 text-xs"
//                   >
//                     <Trash2 className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               ))}
//           </div>

//           {/* Price Details */}
//           <div className="border-t-2 border-gray-100 pt-4 space-y-3">
//             <div className="flex items-center justify-between text-sm">
//               <span className="text-gray-600">جمع کل:</span>
//               <span className="font-bold text-gray-900">
//                 {totalPrice.toLocaleString()} تومان
//               </span>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <span className="text-gray-600">هزینه ارسال:</span>
//               <span className="font-bold text-green-600">
//                 {shippingCost === 0
//                   ? "رایگان"
//                   : `${shippingCost.toLocaleString()} تومان`}
//               </span>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <span className="text-gray-600">تخفیف:</span>
//               <span className="font-bold text-red-500">
//                 -{discount.toLocaleString()} تومان
//               </span>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <span className="text-gray-600">مالیات:</span>
//               <span className="font-bold text-gray-900">
//                 {tax.toLocaleString()} تومان
//               </span>
//             </div>
//           </div>

//           {/* Total Price */}
//           <div className="border-t-2 border-[#B7B89F]/30 pt-4 bg-gradient-to-br from-[#B7B89F]/5 to-transparent rounded-xl p-4 -mx-2">
//             <div className="flex items-center justify-between">
//               <span className="text-lg font-bold text-gray-900">
//                 مبلغ قابل پرداخت:
//               </span>
//               <span className="text-3xl font-black text-[#B7B89F]">
//                 {finalPrice.toLocaleString()}
//               </span>
//             </div>
//             <div className="text-left text-xs text-gray-500 mt-1">تومان</div>
//           </div>

//           {/* Features */}
//           <div className="space-y-2 pt-2">
//             {[
//               "ضمانت اصالت کالا",
//               "پشتیبانی 24 ساعته",
//               "7 روز ضمانت بازگشت",
//             ].map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="flex items-center gap-2 text-sm text-gray-700"
//               >
//                 <Check className="w-4 h-4 text-[#B7B89F] flex-shrink-0" />
//                 <span>{feature}</span>
//               </div>
//             ))}
//           </div>

//           {/* Security Badge */}
//           <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
//             <div className="flex items-center justify-center gap-2 mb-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               <span className="text-sm font-bold text-green-800">
//                 پرداخت امن
//               </span>
//             </div>
//             <p className="text-xs text-green-700">
//               اطلاعات شما کاملاً محفوظ است
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderSummery;
///////////////////////////////////////////////////////////
import { Check, Minus, Package, Plus, Trash2 } from "lucide-react";
import { useStorage } from "../hook/localstorage";
import { usecartstorage } from "../hook/usecartstorage";
import { useLoading } from "../hook/loadingData";
import { useEffect } from "react";

function OrderSummery() {
  // مدیریت cart
//   usecartstorage("");
  const [cart, setCart]: any = useStorage("cart", {});

  // fetch داده‌ها از API با useLoading
  const {
    data,
    loading,
    error,
    refetch,
    submitData,
  }:any =useLoading({
    url: "/api/getdata",
    submitUrl: "/api/main",
    initialData: {
      table: "product",
      pageSize:1000,
      filters: {
        where: {
          id: { in: Object.keys(cart).map((d) => parseInt(d)) },
        },
        include: {
          attributes: true,
          categories: true,
          files: true,
        },
      },
    },
  });

  // وقتی cart تغییر کرد، داده‌ها را دوباره fetch کن
  // useEffect(() => {
  //   if (Object.keys(cart).length > 0) {
  //     refetch();
  //   }
  // }, [cart, refetch]);

  // محاسبه totalPrice
  const totalPrice = Object.entries(cart).reduce((total: number, [id, cartItem]: any) => {
    const product = data?.data?.find((p: any) => p.id === parseInt(id));
    if (!product) return total;
    return total + product.price * cartItem.qty;
  }, 0);

  const shippingCost = 0; // رایگان
  const tax = Math.floor(totalPrice * 0.08); // 8% مالیات
  const discount = totalPrice > 500000 ? 50000 : 0; // تخفیف شرطی
  const finalPrice = totalPrice + shippingCost + tax - discount;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-3xl shadow-xl border border-[#B7B89F]/20 overflow-hidden sticky top-8">
        <div className="bg-gradient-to-r from-[#B7B89F] to-[#9a9b7f] px-6 py-4">
          <h3 className="text-xl font-bold text-white">خلاصه سفارش</h3>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-3 overflow-y-scroll h-50">
            {cart &&
              Object.entries(cart).map(([id, cartItem]: any) => {
                const product = data?.data?.find((p: any) => p.id === parseInt(id));
                if (!product) return null;

                return (
                  <div
                    key={id}
                    className="relative flex items-center gap-3 p-3 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden"
                  >
                    {/* تصویر و qty */}
                    <div className="relative w-16 h-16 bg-gradient-to-br from-[#B7B89F]/10 to-[#B7B89F]/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#B7B89F]/15 group-hover:scale-105 transition-transform duration-300">
                      <Package className="w-8 h-8 text-[#B7B89F]" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#B7B89F] text-white text-xs flex items-center justify-center rounded-full font-bold">
                        {cartItem.qty}
                      </div>
                    </div>

                    {/* نام محصول و تعداد */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate text-base">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">تعداد:</span>
                            <span className="text-xs font-medium text-gray-700">
                              {cartItem.qty} عدد
                            </span>
                          </div>
                        </div>

                        {/* قیمت و دکمه‌های افزایش/کاهش */}
                        {/* <div className="flex flex-col items-end gap-1.5">
                          <div className="text-base font-bold text-[#B7B89F] bg-[#B7B89F]/10 px-2 py-1 rounded-md">
                            {(product.price * cartItem.qty).toLocaleString()} تومان
                          </div>

                          <div className="flex items-center gap-1.5 bg-gray-100 rounded-md p-1">
                            <button
                              type="button"
                              disabled={cartItem.qty <= 0}
                              onClick={() => {
                                const newQty = cartItem.qty - 1;
                                if (newQty <= 0) {
                                  const newCart = { ...cart };
                                  delete newCart[id];
                                  setCart(newCart);
                                } else {
                                  setCart({
                                    ...cart,
                                    [id]: { ...cartItem, qty: newQty },
                                  });
                                }
                              }}
                              className="w-6 h-6 flex items-center justify-center bg-white text-gray-700 rounded shadow-sm hover:bg-gray-50 transition-colors text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>

                            <span className="text-xs font-medium w-5 text-center">{cartItem.qty}</span>

                            <button
                              type="button"
                              disabled={cartItem.qty >= product.stock}
                              onClick={() => {
                                const newQty = Math.min(cartItem.qty + 1, product.stock);
                                setCart({ ...cart, [id]: { ...cartItem, qty: newQty } });
                              }}
                              className="w-6 h-6 flex items-center justify-center bg-white text-gray-700 rounded shadow-sm hover:bg-gray-50 transition-colors text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div> */}
                        <div className="flex flex-col items-end gap-1.5">
  <div className="text-base font-bold text-[#B7B89F] bg-[#B7B89F]/10 px-2 py-1 rounded-md">
    {(product.price * cartItem.qty).toLocaleString()} تومان
  </div>

  <div className="flex items-center gap-1.5 bg-gray-100 rounded-md p-1">
    <button
      type="button"
      disabled={cartItem.qty <= 1}
      onClick={() => {
        const newQty = cartItem.qty - 1;
        if (newQty <= 0) {
          const newCart = { ...cart };
          delete newCart[id];
          setCart(newCart);
        } else {
          setCart({
            ...cart,
            [id]: { ...cartItem, qty: newQty },
          });
        }
      }}
      className="w-6 h-6 flex items-center justify-center bg-white text-gray-700 rounded shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <Minus className="w-3 h-3" />
    </button>

    <input
      type="number"
      value={cartItem.qty}
      min="1"
      max={product.stock}
      onChange={(e:any) => {
        const newQty = parseInt(e.target.value) || 1;
        if (newQty <= 0) {
          const newCart:any = { ...cart };
          delete newCart[id];
          setCart(newCart);
        } else if (newQty > product.stock) {
          setCart({
            ...cart,
            [id]: { ...cartItem, qty: product.stock },
          });
        } else {
          setCart({
            ...cart,
            [id]: { ...cartItem, qty: newQty },
          });
        }
      }}
      onBlur={(e:any) => {
        if (e.target.value === "" || parseInt(e.target.value) < 1) {
          const newCart:any = { ...cart };
          delete newCart[id];
          setCart(newCart);
        }
      }}
      className="w-12 h-6 text-center text-xs font-medium bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B7B89F] focus:border-transparent"
    />

    <button
      type="button"
      disabled={cartItem.qty >= product.stock}
      onClick={() => {
        const newQty = Math.min(cartItem.qty + 1, product.stock);
        setCart({ ...cart, [id]: { ...cartItem, qty: newQty } });
      }}
      className="w-6 h-6 flex items-center justify-center bg-white text-gray-700 rounded shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <Plus className="w-3 h-3" />
    </button>
  </div>
</div>
                      </div>
                    </div>

                    {/* دکمه حذف */}
                    <button
                      type="button"
                      onClick={() => {
                        const newCart = { ...cart };
                        delete newCart[id];
                        setCart(newCart);
                      }}
                      className="absolute top-2 left-2 w-7 h-7 flex items-center justify-center bg-white/80 text-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50 hover:text-red-500 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
          </div>

          {/* Price Details */}
          <div className="border-t-2 border-gray-100 pt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">جمع کل:</span>
              <span className="font-bold text-gray-900">{totalPrice.toLocaleString()} تومان</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">هزینه ارسال:</span>
              <span className="font-bold text-green-600">
                {shippingCost === 0 ? "رایگان" : `${shippingCost} تومان`}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">تخفیف:</span>
              <span className="font-bold text-red-500">-{discount.toLocaleString()} تومان</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">مالیات:</span>
              <span className="font-bold text-gray-900">{tax.toLocaleString()} تومان</span>
            </div>
          </div>

          {/* Total Price */}
          <div className="border-t-2 border-[#B7B89F]/30 pt-4 bg-gradient-to-br from-[#B7B89F]/5 to-transparent rounded-xl p-4 -mx-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">مبلغ قابل پرداخت:</span>
              <span className="text-3xl font-black text-[#B7B89F]">{finalPrice.toLocaleString()}</span>
            </div>
            <div className="text-left text-xs text-gray-500 mt-1">تومان</div>
          </div>

          {/* Features */}
          <div className="space-y-2 pt-2">
            {["ضمانت اصالت کالا", "پشتیبانی 24 ساعته", "7 روز ضمانت بازگشت"].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-[#B7B89F] flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Security Badge */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-green-800">پرداخت امن</span>
            </div>
            <p className="text-xs text-green-700">اطلاعات شما کاملاً محفوظ است</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummery;
