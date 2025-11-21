import { Suspense } from "react";
import OrdersPage from "./OrdersPage";
// import BannerManagement from "./BannerManagement";

function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <OrdersPage/>
        {/* <BannerManagement /> */}
      </Suspense>
    </>
  );
}

export default page;
