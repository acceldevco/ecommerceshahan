import { Suspense } from "react";
import OrdersPanel from "./OrdersPanel";
// import Files from "./Files";
// import BannerManagement from "./BannerManagement";

function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <OrdersPanel />
        {/* <Files /> */}
        {/* <BannerManagement /> */}
      </Suspense>
    </>
  );
}

export default page;
