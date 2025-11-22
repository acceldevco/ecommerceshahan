"use client"
import { useState, useRef } from "react";
import { useLoading } from "../hook/loadingData";
import { Search } from "lucide-react";

const MinimalShopSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const inputRef = useRef(null);
  var configmain: any = {
    table: "product",

    pageSize: 1,
    filters: {
      include: { categories: true, files: true },
    },
  };
  const { data, fetchData, loading, hasMore, loadMore, submitData }:any =
  
  // {}

    useLoading({
      url: "/api/getdata",
      initialData: configmain,
    });
  // const products = [
  //   {
  //     id: 1,
  //     name: "گوشی سامسونگ گلکسی S24",
  //     category: "موبایل",
  //     price: "۳۵,۹۹۰,۰۰۰ تومان",
  //   },
  //   {
  //     id: 2,
  //     name: "لپ تاپ ایسوس ROG Strix",
  //     category: "لپ تاپ",
  //     price: "۴۸,۷۵۰,۰۰۰ تومان",
  //   },
  //   {
  //     id: 3,
  //     name: "هدفون سونی WH-1000XM5",
  //     category: "هدفون",
  //     price: "۱۲,۳۰۰,۰۰۰ تومان",
  //   },
  //   {
  //     id: 4,
  //     name: "اپل واچ سری 9",
  //     category: "ساعت",
  //     price: "۱۸,۹۰۰,۰۰۰ تومان",
  //   },
  // ];

  // const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );


  return (
  <div className="relative w-[5%] z-8000">
    {/* آیکون جستجو */}
    <div 
      className="cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-colors duration-150"
      onClick={() => setShowSearchPanel(true)}
    >
      <svg
        className="w-4 h-4 opacity-25"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    {/* پنل جستجوی تمام صفحه */}
    {showSearchPanel && (
      <div className="fixed inset-0 z-50">
        {/* backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setShowSearchPanel(false)}
        ></div>
        
        {/* پنل جستجو */}
        <div className="absolute top-0 left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ease-out">
          <div className="container mx-auto p-4">
            {/* هدر */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={async (e) => {
                    console.log("ad");
                    setSearchTerm(e.target.value);
                    await fetchData(
                      true,
                      {
                        table: "product",
                        pageSize: 10,
                        filters: {
                          where: {
                            AND: [
                              {
                                name: {
                                  contains: e.target.value ?? "",
                                  mode: "insensitive",
                                },
                              },
                            ],
                          },
                          include: {
                            categories: true,
                          },
                        },
                      }
                    );
                  }}
                  className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all duration-200 placeholder:text-gray-400 text-gray-700 text-lg"
                  placeholder="جستجو در محصولات..."
                  autoFocus
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              
              {/* دکمه بستن */}
              <button
                onClick={() => setShowSearchPanel(false)}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-150"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* نتایج جستجو */}
            <div className="max-h-96 overflow-y-auto">
              {searchTerm && data?.data?.length > 0 ? (
                <div className="space-y-2">
                  {data.data.map((product: any) => (
                    <div
                      key={product.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:shadow-sm"
                      onClick={() => {
                        setSearchTerm(product.name);
                        setShowSearchPanel(false);
                        // انجام عملیات پس از انتخاب محصول
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {product.categories?.name || 'دسته‌بندی نشده'}
                        </span>
                        <div className="text-right flex-1 mr-3">
                          <div className="text-base font-medium text-gray-800">
                            {product.name}
                          </div>
                          <div className="text-sm text-green-600 mt-1">
                            {product.price} تومان
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchTerm ? (
                <div className="text-center py-8 text-gray-500">
                  محصولی یافت نشد
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  عبارت مورد نظر برای جستجو را وارد کنید
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);








  // return (
  //   <div className="relative w-[5%] ">
  //     {/* نوار جستجوی مینیمال */}
  //     <div className="relative">
  //       {/* <input
  //         ref={inputRef}
  //         type="text"
  //         value={searchTerm}
  //         onChange={async (e) => {
  //           console.log("ad");
  //           setSearchTerm(e.target.value);
  //           await fetchData(
  //             true,
  //             {
  //               table: "product",

  //               pageSize: 1,
  //               // filters:
  //               //   ...configmain,
  //               // initialData: configmain,
  //               filters: {
  //                 where: {
  //                   AND: [
  //                     {
  //                       name: {
  //                         contains: e.target.value ?? "",
  //                         mode: "insensitive",
  //                       },
  //                     },
  //                   //   e.target.value
  //                   //     ? {
  //                   //         categories: {
  //                   //           name: { id: e.target.value },
  //                   //         },
  //                   //       }
  //                   //     : {},
  //                   ],
  //                 },
  //                 include: {
  //                   categories: true,
  //                 },
  //               },
  //             }
  //           );
  //         }}
  //         onFocus={() => setShowSuggestions(true)}
  //         onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
  //         className="w-full px-2 py-1  bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors duration-150 placeholder:text-gray-400 text-gray-700"
  //         placeholder="جستجو در محصولات..."
  //       /> */}
  // {/* <Search className=" opacity-25"/> */}
  //       <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
  //         <svg
  //           className="w-4 h-4"
  //           fill="none"
  //           stroke="currentColor"
  //           viewBox="0 0 24 24"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth={2}
  //             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  //           />
  //         </svg>
  //       </div>
  //     </div>

  //     {/* لیست پیشنهادات ساده */}
  //     {showSuggestions && searchTerm && filteredProducts.length > 0 && (
  //       <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10">
  //         {data.data.map((product: any) => (
  //           <div
  //             key={product.id}
  //             className="px-4 py-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors duration-100"
  //             onClick={() => {
  //               setSearchTerm(product.name);
  //               setShowSuggestions(false);
  //             }}
  //           >
  //             {/* {JSON.stringify(data.data)} */}
  //             <div className="flex justify-between items-center">
  //               <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
  //                 {product.category}
  //               </span>
  //               <div className="text-right">
  //                 <div className="text-sm font-medium text-gray-800">
  //                   {product.name}
  //                 </div>
  //                 <div className="text-xs text-green-600">{product.price}</div>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default MinimalShopSearch;