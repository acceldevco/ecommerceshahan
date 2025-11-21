import { Suspense } from "react";
import ProductsPage from "./ProductsPage";
// import OrdersPanel from "./OrdersPanel";
// import Files from "./Files";
// import BannerManagement from "./BannerManagement";

function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsPage />
        {/* <OrdersPanel /> */}
        {/* <Files /> */}
        {/* <BannerManagement /> */}
      </Suspense>
    </>
  );
}

export default page;
