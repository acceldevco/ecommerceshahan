"use client";
import ImageManagerPanel from "@/app/components/ImageManagerPanel";
import { useLoading } from "@/app/hook/loadingData";

function Files() {
  var files: any = useLoading({
    url: "/api/getdata",
    submitUrl: "/api/main",
    initialData: {
      pageSize:2,
      table: "file",
    },
  });
  return (
    <>
      <ImageManagerPanel
        files={files}
        onImageToggle={(img: any) => {
          console.log(img);
        }}
        onImageSelect={(img: any) => {
          // console.log(img);
        }}
      />
    </>
  );
}

export default Files;
