import { Suspense } from "react";
import ProfessionalProductPage from "./SinPageAdmin";

function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfessionalProductPage />
      </Suspense>
    </>
  );
}

export default page;
