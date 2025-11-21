
"use client";

import { useEffect, useState } from "react";
import NestedCategoryCheckbox from "../components/Category";
import ProductCard from "../components/ProductCard";
import { useLoading } from "../hook/loadingData";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const router = useRouter();
  const search = useSearchParams();
  const params = Object.fromEntries(Array.from(search.entries()));
  const categoryIds = params.category?.split(",") || [];
  const paramsArray = Array.from(search.entries());

  // //   // تبدیل به آبجکت
  const paramsObject = Object.fromEntries(paramsArray);

  var configmain:any = {
    table: "product",

    pageSize: 2,
    filters: { include: { categories: true, files: true } },
  };
  const { data, fetchData, loading, hasMore, loadMore }:any =
  useLoading({
    url: "/api/getdata",
    initialData: configmain,
  });


    var datacategory = useLoading({
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








  useEffect(() => {
    if (data?.data) {
      setProducts((prev) => (page === 1 ? data.data : [...data.data]));
    }
  }, [data, page]);

  const filteredProducts = products.filter(
    (p:any) =>
      !categoryIds.length ||
      p.categories?.some((c:any) => categoryIds.includes(String(c.id)))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-gray-600 shadow">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center lg:text-right">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-600 mb-3">
              فروشگاه اینترنتی
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto lg:mx-0">
              کشف بهترین محصولات با مناسب‌ترین قیمت‌ها در دسته‌بندی‌های متنوع
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}


     
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Section */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    محصولات منتخب
                  </h2>
                  <p className="text-gray-500 mt-1">
                    نمایش {filteredProducts.length} محصول
                    {categoryIds.length > 0 && " در دسته‌بندی انتخابی"}
                  </p>
                </div>

                {/* Mobile Filter Toggle */}
                <button className="lg:hidden px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                  نمایش فیلترها
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredProducts.map((product:any) => (
                <div
                  key={product.id}
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Loading States */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600">در حال بارگذاری محصولات...</p>
                </div>
              </div>
            )}

            {/* Load More Button */}
            {/* {JSON.stringify(hasMore)} */}
            {hasMore &&
              !loading &&
              data.total !== parseInt(paramsObject.page) && (
                <div className="flex justify-center mb-8">
                  <button
                    onClick={() => {
                      loadMore();
                    }}
                    disabled={isLoadingMore}
                    className="px-6 py-2 text-white rounded-lg bg-[#777C6D] transition-all shadow-lg flex items-center gap-2 font-semibold"
                  >
                    {isLoadingMore ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        در حال بارگذاری...
                      </>
                    ) : (
                      "نمایش محصولات بیشتر"
                    )}
                  </button>
                </div>
              )}

            {/* No Products State */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  محصولی یافت نشد
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  متأسفانه هیچ محصولی مطابق با فیلترهای انتخابی شما وجود ندارد.
                  لطفاً فیلترهای دیگر را امتحان کنید.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar Filters */}
          <div className="lg:w-80 xl:w-96">
            <div className="bg-white rounded-2xl shadow-sm sticky top-8 p-6">
              {/* Filters Header */}
              <div className="border-b border-gray-100 pb-4 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    فیلترها
                  </h3>
                  <button
                    onClick={() => router.push("?")}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    حذف فیلترها
                  </button>
                </div>
              </div>

              {/* Categories Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  دسته‌بندی‌ها
                </h4>
                <div className="max-h-96 overflow-y-auto">
                  <NestedCategoryCheckbox
                  datacat={datacategory}
                    showcnt={false}
                    onSelectionChange={(selected:any) => {
                      const ids = selected.map((d:any) => d.id);
                      // router.push(`?page=${page}`);

                      // console.log(page);

                      fetchData(
                        true,
                        ids.length > 0
                          ? {
                              table: "product",
                              filters: {
                                where: {
                                  categories: {
                                    some: {
                                      id: {
                                        in: ids,
                                      },
                                    },
                                  },
                                },
                                include: { categories: true, files: true },
                              },
                            }
                          : configmain
                      );
                      // paramsObject.category ? router.push(`?`) : "0";
                      console.log(configmain);

                      // setPage(1);
                    }}
                  />
                </div>
              </div>

              {/* Promotional Banner */}
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-5 text-white">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">تخفیف ویژه</h4>
                    <p className="text-white/90 text-sm leading-relaxed">
                      تا ۵۰٪ تخفیف برای خریدهای بالای ۵ میلیون تومان
                    </p>
                  </div>
                </div>
                <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                  مشاهده شرایط
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
