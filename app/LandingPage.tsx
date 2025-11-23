"use client";
import Image from "next/image";
import SocialMediaSidebar from "./components/SocialMediaSidebar";
import ImageSlider from "./components/ImageSlider";
import ListPosts from "./components/ListPosts";
import CategoryGrid from "./components/CategoryGrid";
import MiniProduct from "./components/MiniProduct";
import ProductShowcase from "./components/ProductShowcase";
import Card from "./components/Card";
// import ListPosts from "./components/ProductList";
import ProductList from "./components/ProductList";
import { useLoading } from "./hook/loadingData";

export default function LandingPage({ children }: any) {
  const { data, fetchData, loading, hasMore } = useLoading({
    url: "/api/getdata",
    initialData: {
      table: "product",
      page: 1,
      pageSize: 10,
      filters: { include: { categories: true, files: true } },
    },
  });
  const { data: category } = useLoading({
    url: "/api/getdata",
    initialData: {
      table: "category",
      pageSize: 100,
      filters: {
        where: {
          parentId: null
        }
      }

      // page: 1,
      // filters: { include: { categories: true, files: true } },
    },
  });





  const { data: banner } = useLoading({
    url: "/api/getdata",
    initialData: {
      table: "banner",
      pageSize: 10
      // page: 1,
      // filters: { include: { categories: true, files: true } },
    },
  });
  const sampleSlides = [
    {
      id: 1,
      image: "http://localhost:3000/uploads/banner1.png",
      alt: "Landscape photography",
    },
    {
      id: 2,
      image: "http://localhost:3000/uploads/Frame.png",
    },
    {
      id: 3,
      image: "http://localhost:3000/uploads/banner1.png",
      alt: "Mountain adventure",
    },
    {
      id: 4,
      image: "http://localhost:3000/uploads/banner1.png",
      alt: "Beach sunset",
    },
  ];
  // const sampleProducts = [
  //   {
  //     id: 1,
  //     name: "محصول اول",
  //     currentPrice: 20000,
  //     originalPrice: 25000,
  //     discount: 20,
  //     image: "/image-55.png",
  //     alt: "تصویر محصول اول",
  //   },
  //   {
  //     id: 2,
  //     name: "محصول دوم",
  //     currentPrice: 35000,
  //     originalPrice: 40000,
  //     discount: 12,
  //     image: "/image-55.png",
  //     alt: "تصویر محصول دوم",
  //   },
  //   {
  //     id: 3,
  //     name: "محصول سوم",
  //     currentPrice: 15000,
  //     originalPrice: 15000,
  //     discount: 0,
  //     image: "/image-55.png",
  //     alt: "تصویر محصول سوم",
  //   },
  //   {
  //     id: 4,
  //     name: "محصول چهارم",
  //     currentPrice: 45000,
  //     originalPrice: 60000,
  //     discount: 25,
  //     image: "/image-55.png",
  //     alt: "تصویر محصول چهارم",
  //   },
  //   {
  //     id: 5,
  //     name: "محصول پنجم",
  //     currentPrice: 28000,
  //     originalPrice: 35000,
  //     discount: 20,
  //     image: "/image-55.png",
  //     alt: "تصویر محصول پنجم",
  //   },
  // ];
  // const sampleCategories = [
  //   {
  //     id: 1,
  //     name: "الکترونیک",
  //     image: "/image-53.png",
  //     productCount: 124,
  //     color: "from-blue-400 to-purple-500",
  //   },
  //   {
  //     id: 2,
  //     name: "مد و پوشاک",
  //     image: "/image-53.png",
  //     productCount: 89,
  //     color: "from-pink-400 to-rose-500",
  //   },
  //   {
  //     id: 3,
  //     name: "خانه و آشپزخانه",
  //     image: "/image-53.png",
  //     productCount: 156,
  //     color: "from-emerald-400 to-teal-500",
  //   },
  //   {
  //     id: 4,
  //     name: "ورزش و سفر",
  //     image: "/image-53.png",
  //     productCount: 67,
  //     color: "from-orange-400 to-red-500",
  //   },
  //   {
  //     id: 5,
  //     name: "کتاب و آموزشی",
  //     image: "/image-53.png",
  //     productCount: 203,
  //     color: "from-indigo-400 to-purple-500",
  //   },
  //   {
  //     id: 6,
  //     name: "زیبایی و سلامت",
  //     image: "/image-53.png",
  //     productCount: 98,
  //     color: "from-rose-400 to-pink-500",
  //   },
  // ];

  return (
    <div
    //  className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    >
      <main
        className="p-2"
      // className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"
      >
        {/* {JSON.stringify(banner?.data?.filter((d)=>d.position === 'TOP'))} */}
        <div className="mb-5">
          <ImageSlider
            slides={banner?.data?.filter((d: any) => d.position === 'TOP') ?? []}
            autoPlay={true}
            autoPlayInterval={4000}
            showThumbnails={true}
            showArrows={true}
            showDots={true}
          />
        </div>

        {/* <ProductList/> */}

        <ProductList
          title="لیست محصولات ویژه"
          products={data?.data ?? []}
          backgroundImage="/frame-64.jpeg"
        />
        <CategoryGrid
          title="دسته‌بندی محصولات"
          categories={category?.data ?? []}
          variant="gradient"
        />


        <ProductList
          title="لیست جدید ترین محصولات "
          products={data?.data ?? []}
          backgroundImage="/frame-64.jpeg"
        />
        {/* <ListPosts /> */}
        {/* <Card /> */}
      </main>
    </div>
  );
}
