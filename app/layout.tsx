// import { useSelectedLayoutSegments } from "next/navigation";
import Footer from "./components/footer";
import { ContextMain, ContextProvider } from "./context/context";
import "./globals.css";

import { FC, ReactNode, Suspense } from "react";
import HeaderWithMegaMenu from "./components/Header";
import { useLoading } from "./hook/loadingData";
import LandingPage from "./LandingPage";
import LayoutMain from "./LayoutMain";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  // var url = useSelectedLayoutSegments();
  // const menuItems = [
  //   { id: 1, label: "خانه", href: "/" },
  //   { id: 2, label: "محصولات", href: "/products" },
  //   { id: 3, label: "دسته‌بندی‌ها", href: "/categories" },
  // ];

  // const data =   useLoading({
  //   url: "/api/getdata",
  //   submitUrl: "/api/main",

  //   initialData: {
  //     pageSize: 10000,
  //     table: "category",
  //     filters: {
  //       where: { parentId: null },
  //       include: {
  //         subcategories: {
  //           include: {
  //             subcategories: {
  //               include: {
  //                 subcategories: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>فروشگاه آنلاین</title>
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <LayoutMain>{children}</LayoutMain>
        </Suspense>

        {/* <div className="min-h-screen flex flex-col ">
          
          {!url.includes("admin") && !url.includes("auth") && (
            <HeaderWithMegaMenu/>
          )}

         
          <main
            className={`${
              !url.includes("admin") && "bg-[url(/uploads/bg.png)] bg-[#B7B89F]/30"
            }`}
          >
            <ContextProvider>{children}</ContextProvider>
          </main>

        
          {!url.includes("admin") && !url.includes("auth") && <Footer />}

        </div> */}
      </body>
    </html>
  );
};

// const CartIcon: FC = () => (
//   <svg
//     width="36"
//     height="34"
//     viewBox="0 0 50 48"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className="w-6 h-6 text-[#5a5b4a] group-hover:text-[#8a8b7a] transition-colors duration-200"
//     preserveAspectRatio="xMidYMid meet"
//   >
//     <path
//       d="M17.4915 47.5424C18.8298 47.5424 19.9147 46.4573 19.9147 45.1188C19.9147 43.7804 18.8298 42.6953 17.4915 42.6953C16.1533 42.6953 15.0684 43.7804 15.0684 45.1188C15.0684 46.4573 16.1533 47.5424 17.4915 47.5424Z"
//       fill="currentColor"
//     />
//     <path
//       d="M35.8997 47.5424C37.238 47.5424 38.3229 46.4573 38.3229 45.1188C38.3229 43.7804 37.238 42.6953 35.8997 42.6953C34.5615 42.6953 33.4766 43.7804 33.4766 45.1188C33.4766 46.4573 34.5615 47.5424 35.8997 47.5424Z"
//       fill="currentColor"
//     />
//     <path
//       d="M14.6414 30.5823H32.5471C36.0429 30.5823 37.7908 30.5823 39.1958 29.7143C40.6007 28.8464 41.3869 27.2756 42.9591 24.1342C46.7563 16.5477 48.6551 12.7545 46.9506 9.99469C45.2461 7.23498 41.0266 7.23498 32.5878 7.23498H9.26028M14.6414 30.5823L9.381 7.71173L8.91924 5.88832C8.38537 3.78034 8.11848 2.72635 7.3307 2.1132C6.54298 1.5 5.45584 1.5 3.28162 1.5H1.5M14.6414 30.5823H13.0162C10.9419 30.5823 9.26028 32.2641 9.26028 34.3387C9.26028 36.4134 10.9419 38.0952 13.0162 38.0952H39.7319"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const UserProfile: FC = () => (
//   <div className="flex items-center gap-3">

//     <div className="flex flex-col items-end">
//       <span className="text-sm text-[#5a5b4a] font-medium">مدیر سیستم</span>
//       <span className="text-[10px] text-[#5a5b4a]/70 mt-0.5">سطح: ادمین</span>
//     </div>

//     <div className="w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-[#B7B89F] to-[#8a8b7a] border border-[#B7B89F]/50 shadow cursor-pointer hover:shadow-md transition-all duration-200" />
//   </div>
// );

export default Layout;
