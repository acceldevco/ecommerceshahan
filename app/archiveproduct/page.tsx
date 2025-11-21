import { Suspense } from "react";
import ProductsPage from "./ProductsPage";

function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      {/* <></> */}
        <ProductsPage />
      </Suspense>
    </>
  );
}

export default page;
