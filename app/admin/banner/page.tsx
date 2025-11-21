import { Suspense } from "react";
import BannerManagement from "./BannerManagement";

function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BannerManagement />
      </Suspense>
    </>
  );
}

export default page;
