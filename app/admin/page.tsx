
import { Suspense } from "react";
import EcommerceAdmin from "./EcommerceAdmin";



function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <EcommerceAdmin />
      </Suspense>
    </>
  );
}

export default page;
