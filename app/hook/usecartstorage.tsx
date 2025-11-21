import { useEffect, useState } from "react";
import { useLoading } from "./loadingData";
import { useStorage } from "./localstorage";

export function usecartstorage(params: any) {
  var [state, setstate] = useState<any>();
  var [cart, setcart]: any = useStorage("cart", "");
  const { data, fetchData, loading, hasMore } = useLoading({
    url: "/api/getdata",
    initialData: {
      table: "product",
      page: 1,
      filters: {
        where: {
          id: { in: Object.keys(cart).map((d) => parseInt(d)) },
        },
        include: { categories: true, files: true },
      },
    },
  });
  console.log("data:", data);

  useEffect(() => {
    if (data.data) {
      data?.data?.map((d:any) => {
        setcart({
          ...cart,
          [d.id]: {
            ...d,
            //   qty: cart[item.id]?.qty > 0 ? cart[item.id]?.qty - 1 : 0,
          },
        });
      });
    }
  }, [data.data]);

  function setcarts(params: any) {}
  return [state, setcarts];
}
