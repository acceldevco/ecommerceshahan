import { Suspense } from "react";
import SingleProductPage from "./SinPage";

function page() {
  return ( <>
  <Suspense fallback={<div>Loading...</div>}>
    <SingleProductPage/>
  </Suspense>

  </> );
}

export default page;