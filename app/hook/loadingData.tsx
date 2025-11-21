// import { useState, useEffect, useMemo, useCallback } from "react";
// import axios from "axios";
// import { useParams, useRouter, useSearchParams } from "next/navigation";

// interface UseLoadingOptions {
//   initialData?: any; // داده اولیه مستقیم
//   url?: string;
//   urls?: Record<string, string>;
//   submitUrl?: string;
//   lazy?: boolean;
//   pageSize?: number;
//   immediate?: boolean;
//   status?: boolean;
// }

// export function useLoading({
//   initialData = null,
//   url = null,
//   urls = null,
//   submitUrl = null,
//   lazy = false,
//   pageSize = undefined,
//   immediate = true,
//   status = true,
// }: any) {
//   const isMultiple = !!urls;
//   // console.log(initialData);

//   const search = useSearchParams();
//   const params: any = Object.fromEntries(Array.from(search.entries()));
//   var router = useRouter();
//   // console.log('status00',pageSize,initialData.table);

//   // if (initialData.pageSize) {
//   initialData.pageSize = params.page!==undefined ? Number(params.page) : initialData.pageSize;
//   // }

//   console.log("test785", initialData.pageSize);
//   var [data, setData]: any = useState<any>(
//     initialData ?? []
//     // initialData ?? (isMultiple ? {} : []

//     // )
//   );
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<any>(null);
//   var [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   const realStatus = useMemo(
//     () => (typeof status === "boolean" ? status : true),
//     [status]
//   );
//   const hasMore = useMemo(
//     () =>
//       // !isMultiple &&
//       Array.isArray(data.data) && data?.data.length < total,
//     [
//       data,
//       total,
//       // ,
//       //  isMultiple
//     ]
//   );

//   // console.log('us', data.data.length < total);

//   // const fetchSingle = useCallback(
//   //   async (append = false, fetchData?: any) => {
//   //     if (!fetchData && !url) return;
//   //     const payload = fetchData ?? data;

//   //     const res = await axios({
//   //       method: "post",
//   //       url: url!,
//   //       data: payload, // مستقیماً اینجا قرار می‌گیرد
//   //     });
//   //     const items = res.data.items || res.data;
//   //     // console.log('payload',items.data);
//   //     if (append) console.log("data", items.data), setData(items);
//   //     else setData(items);
//   //     setTotal(res.data.total || 0);
//   //   },
//   //   [url]
//   // );

//   const fetchSingle = useCallback(
//     async (append = false, fetchData?: any) => {
//       if (!url) return;
//       // const payload = {

//       //   ...data, ...fetchData
//       // };
//       // console.log('fetchData',fetchData);

//       // fetchData.pageSize = page
//       const payload = fetchData ?? data;
//       const res = await axios.post(url, payload);
//       const items = res.data.items || res.data;
//       const newData = Array.isArray(items.data) ? items.data : items;
//       if (append && Array.isArray(data?.data)) {
//         // console.log("newData", items);

//         setData({
//           ...items,
//           // data: [...newData],
//         });
//       } else {
//         setData(items);
//       }
//       setTotal(res.data.total || 0);
//     },
//     [url, data]
//   );

//   // const fetchSingle = useCallback(
//   //   async (append = false, fetchData?: any) => {
//   //     if (!url) return;

//   //     const payload = {
//   //       ...(initialData || {}),
//   //       ...(fetchData || {}),
//   //     };

//   //     const res = await axios.post(url, payload);
//   //     const items = res.data.items || res.data;
//   //     const newData = Array.isArray(items.data) ? items.data : items;

//   //     if (append && Array.isArray(data?.data)) {
//   //       // ✅ اضافه کردن به داده‌های قبلی
//   //       setData({
//   //         ...items,
//   //         data: [...data.data, ...newData],
//   //       });
//   //     } else {
//   //       setData(items);
//   //     }

//   //     setTotal(res.data.total || 0);
//   //   },
//   //   [url, data, initialData]
//   // );

//   // const fetchMultiple = useCallback(
//   //   async (fetchData?: Record<string, any>) => {
//   //     if (!urls) return;
//   //     const results: Record<string, any> = {};
//   //     await Promise.all(
//   //       Object.entries(urls).map(async ([key, endpoint]) => {
//   //         const payload = fetchData?.[key] ?? {};
//   //         if (!realStatus) return (results[key] = []);
//   //         const res = await axios.post(endpoint, { params: payload });
//   //         results[key] = res.data.items || res.data;
//   //       })
//   //     );
//   //     setData(results);
//   //   },
//   //   [urls, realStatus]
//   // );

//   const fetchDataFn = useCallback(
//     async (append = false, fetchData?: any) => {
//       console.log('fetchData',fetchData
// );

//       if (!realStatus) return;
//       try {
//         setLoading(true);
//         setError(null);
//         // if (isMultiple) await fetchMultiple(fetchData);
//         // else
//         var payload: any = {};
//         // data.pageSize
//         if (params.page) {
//           // data.pageSize = params.page
//           payload = {
//             ...(data ?? fetchData),
//             pageSize: parseInt(params.page ?? 1),
//           };
//         }
//         await fetchSingle(
//           append,
//           fetchData
//           //  params.page ? fetchData : payload
//         );
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [fetchSingle, isMultiple, realStatus]
//   );

//   const refetch = useCallback(
//     (fetchData?: any) => {
//       setPage(1);
//       fetchDataFn(false, initialData);
//     },
//     [fetchDataFn]
//   );

//   // const refetch = useCallback(
//   //   (newPayload?: any) => {

//   //     const payload = newPayload ?? data; // 🔥 داده آخر استفاده شود
//   //     fetchDataFn(false, payload);
//   //   },
//   //   [fetchDataFn, data]
//   // );

//   const loadMore = useCallback(
//     async (fetchData?: any) => {
//       console.log('test012',params.page);

//       // if (isMultiple || !hasMore) return;
//       // params.page;
//       initialData.pageSize = parseInt(params.page ?? 1) + 1;
//       console.log('initialData.pageSize',page);

//       console.log('initialData',initialData);

//       // setPage((prev) => prev + 1);
//       fetchDataFn(true, initialData);
//       router.push(`?page=${initialData.pageSize}`);
//     },
//     [isMultiple, hasMore, fetchDataFn]
//   );

//   //   const submitData = useCallback(
//   //     async (
//   //       payload: any,
//   //       options: { url?: string; method?: "POST" | "PUT" | "DELETE" } = {}
//   //     ) => {
//   //       const submitEndpoint = options.url || submitUrl;
//   //       const method = options.method || "POST";
//   //       if (!submitEndpoint) throw new Error("submitUrl یا url ارائه نشده است");

//   //       try {
//   //         setLoading(true);
//   //         setError(null);
//   //         const res = await axios({ url: submitEndpoint, method, data: payload });
//   //         return res.data;
//   //       } catch (err) {
//   //         setError(err);
//   //         throw err;
//   //       } finally {
//   //         setLoading(false);
//   //       }
//   //     },
//   //     [submitUrl]
//   //   );

//   // effect برای initial fetch
//   // const submitData = useCallback(
//   //   async (
//   //     payload: any,
//   //     options: {
//   //       url?: string;
//   //       method?: "POST" | "PUT" | "DELETE";
//   //       refetch?: boolean;
//   //     } = {}
//   //   ) => {
//   //     const submitEndpoint = options.url || submitUrl;
//   //     const method = options.method || "POST";
//   //     if (!submitEndpoint) throw new Error("submitUrl یا url ارائه نشده است");

//   //     try {
//   //       setLoading(true);
//   //       setError(null);
//   //       console.log('data',data);

//   //     //  const res = await axios({ url: submitEndpoint, method, data: payload });
//   //       await refetch();
//   //       // ✅ بعد از ارسال موفق، داده‌ها را دوباره بگیر
//   //       // if (options.refetch !== false) {
//   //       //   await refetch(); // تابع refetch خودت که در useLoading تعریف شده
//   //       // }

//   //       return res.data;
//   //     } catch (err) {
//   //       setError(err);
//   //       throw err;
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   },
//   //   [submitUrl, refetch]
//   // );

//   const submitData = useCallback(
//     async (
//       payload:any,
//       options: {
//         url?: string;
//         method?: "POST" | "PUT" | "DELETE";
//         refetch?: boolean;
//       } = {}

//     ) => {
//       const submitEndpoint = options.url || submitUrl;
//       const method = options.method || "POST";
//       if (!submitEndpoint) throw new Error("submitUrl یا url ارائه نشده است");

//       try {
//         setLoading(true);
//         setError(null);

//         // 🔥 درخواست واقعی به API
//         const res = await axios({
//           url: submitEndpoint,
//           method,
//           data: payload,
//         });

//         // 🔄 بعد از موفقیت، داده‌ها را رفرش کن
//         if (options.refetch !== false) {
//           await refetch();
//         }

//         return res.data;
//       } catch (err) {
//         setError(err);
//         throw err;
//       } finally {
//         setLoading(false);
//       }
//     },
//     [submitUrl, refetch]
//   );

//   useEffect(() => {
//     if (immediate && !lazy && realStatus) fetchDataFn();
//   }, [fetchDataFn, immediate, lazy, realStatus]);

//   return {
//     data,
//     setData, // حالا می‌توانید داده‌ها را مستقیماً هم آپدیت کنید
//     loading,
//     error,
//     page,
//     total,
//     hasMore,
//     fetchData: fetchDataFn,
//     refetch,
//     loadMore,
//     submitData,
//   };
// }
/////////////////////////////////////////////////
"use client"
import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export function useLoading({
  initialData = {},
  url = null,
  submitUrl = null,
  lazy = false,
  immediate = true,
  status = true,
}: any) {
  const search = useSearchParams();
  const router = useRouter();

  const currentPage = Number(search.get("page") ?? initialData?.pageSize ?? 1);
  // console.log('currentPage',currentPage);
  initialData.pageSize = currentPage;
  const [data, setData] = useState<any>(initialData ?? {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [page, setPage] = useState(currentPage);
  const [total, setTotal] = useState(0);

  const realStatus = typeof status === "boolean" ? status : true;

  const hasMore = useMemo(
    () => Array.isArray(data?.data) && data.data.length < total,
    [data, total]
  );

  // --------------------- API Fetcher ---------------------
  const fetchSingle = useCallback(
    async (append = false, payload?: any) => {
      if (!url) return;

      const res = await axios.post(url, payload);
      const items = res.data.items || res.data;

      if (append && Array.isArray(data?.data)) {
        setData({
          ...items,
          data: [
            // ...data.data

            ...items.data,
          ],
        });
      } else {
        setData(items);
      }

      setTotal(res.data.total || 0);
    },
    [url, data]
  );

  // --------------------- Fetch Controller ---------------------
  const fetchDataFn = useCallback(
    async (append = false, payload?: any) => {
      if (!realStatus) return;

      setLoading(true);
      setError(null);

      try {
        await fetchSingle(append, payload);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [fetchSingle, realStatus]
  );

  // --------------------- Initial Load (only once) ---------------------
  useEffect(() => {
    if (!immediate || lazy || !realStatus) return;

    fetchDataFn(false, { ...initialData, page: currentPage });

    // ❗ فقط یک بار اجرا شود
  }, []);

  // --------------------- Refetch ---------------------
  const refetch = useCallback(() => {
    router.replace("?page=1", { scroll: false });
    setPage(1);

    fetchDataFn(false, { ...initialData, page: 1 });
  }, [fetchDataFn]);

  // --------------------- Load More (append) ---------------------
  const loadMore = useCallback(() => {
    if (!hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);

    router.replace(`?page=${nextPage}`, { scroll: false });

    fetchDataFn(true, {
      ...initialData,

      // page: nextPage,
      pageSize: nextPage,
    });
  }, [page, hasMore, fetchDataFn]);

  // --------------------- Submit ---------------------
  const submitData = useCallback(
    async (
      payload: any,
      options: {
        url?: string;
        method?: "POST" | "PUT" | "DELETE";
        refetch?: boolean;
      } = {}
    ) => {
      const submitEndpoint = options.url || submitUrl;
      if (!submitEndpoint) throw new Error("submitUrl ارائه نشده است");

      try {
        setLoading(true);
        setError(null);

        const res = await axios({
          url: submitEndpoint,
          method: options.method || "POST",
          data: payload,
        });

        if (options.refetch !== false) {
          await refetch();
        }

        return res.data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [submitUrl, refetch]
  );

  return {
    data,
    setData,
    loading,
    error,
    page,
    total,
    hasMore,
    fetchData: fetchDataFn,
    refetch,
    loadMore,
    submitData,
  };
}
