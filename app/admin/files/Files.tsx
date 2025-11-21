
"use client";
import ImageManagerPanel from "@/app/components/ImageManagerPanel";

function Files() {
  return (
    <>
      <ImageManagerPanel
        onImageToggle={(img:any) => {
          console.log(img);
        }}
        onImageSelect={(img:any) => {
          // console.log(img);
        }}
      />
    </>
  );
}

export default Files;
