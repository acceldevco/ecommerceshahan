import { Suspense } from "react";
import LandingPage from "./LandingPage";
function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <LandingPage />
      </Suspense>
    </>
  );
}

export default page;
