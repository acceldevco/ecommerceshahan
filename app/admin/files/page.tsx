import { Suspense } from "react";
import Files from "./Files";
// import BannerManagement from "./BannerManagement";

function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Files />
        {/* <BannerManagement /> */}
      </Suspense>
    </>
  );
}

export default page;
