import { Suspense } from "react";
import UsersPage from "./UsersPage";
// import ProductsPage from "./ProductsPage";
// import OrdersPanel from "./OrdersPanel";
// import Files from "./Files";
// import BannerManagement from "./BannerManagement";

function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <UsersPage/>
        {/* <ProductsPage /> */}
        {/* <OrdersPanel /> */}
        {/* <Files /> */}
        {/* <BannerManagement /> */}
      </Suspense>
    </>
  );
}

export default page;
