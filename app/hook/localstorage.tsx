// import { useState } from "react";

// export function useStorage(key: string, initialData: any) {
//   const [state, setState] = useState(() => {
//     const stored = localStorage.getItem(key);
//     return stored ? JSON.parse(stored) : initialData;
//   });

//   const save = (data: any) => {
//     localStorage.setItem(key, JSON.stringify(data));
//     setState(data); // trigger re-render
//   };

//   return [state, save] as const;
// }






import { useState, useEffect, useCallback } from "react";

/**
 * useSyncedLocalStorage
 * هوکی برای localStorage با رندر همزمان کامپوننت‌ها و همگام‌سازی بین تب‌ها
 *
 * @param key کلید ذخیره‌سازی
 * @param initialValue مقدار پیش‌فرض
 *
 * Example:
 * const [user, setUser] = useSyncedLocalStorage("user", { name: "Ali" });
 */
export  function useStorage<T>(key: string, initialValue: T) {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // تغییر localStorage و state همزمان
  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);

      // dispatch event سفارشی برای همگام‌سازی در همان تب
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // همگام‌سازی بین تب‌ها و همون تب
  useEffect(() => {
    const handleStorageChange = () => setStoredValue(readValue());
    window.addEventListener("storage", handleStorageChange); // تب‌های دیگر
    window.addEventListener("local-storage", handleStorageChange); // تب فعلی

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleStorageChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue] as const;
}
// //////////////////////////////////////////////////////////////////
// "use client"; // مهم: هوک فقط در کلاینت استفاده شود
// import { useState, useEffect, useCallback } from "react";

// export function useStorage<T>(key: string, initialValue: T) {
//   const readValue = useCallback((): T => {
//     if (typeof window === "undefined") return initialValue;
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? (JSON.parse(item) as T) : initialValue;
//     } catch (error) {
//       console.warn(`Error reading localStorage key "${key}":`, error);
//       return initialValue;
//     }
//   }, [initialValue, key]);

//   const [storedValue, setStoredValue] = useState<T>(initialValue);

//   // فقط بعد از mount روی کلاینت مقدار را بارگذاری کن
//   useEffect(() => {
//     setStoredValue(readValue());
//   }, [readValue]);

//   const setValue = (value: T | ((prev: T) => T)) => {
//     try {
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;

//       if (typeof window !== undefined) {
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//         window.dispatchEvent(new Event("local-storage"));
//       }

//       setStoredValue(valueToStore);
//     } catch (error) {
//       console.warn(`Error setting localStorage key "${key}":`, error);
//     }
//   };

//   // همگام‌سازی بین تب‌ها
//   useEffect(() => {
//     if (typeof window === undefined) return;

//     const handleStorageChange = () => setStoredValue(readValue());
//     window.addEventListener("storage", handleStorageChange);
//     window.addEventListener("local-storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//       window.removeEventListener("local-storage", handleStorageChange);
//     };
//   }, [key, readValue]);

//   return [storedValue, setValue] as const;
// }
// //////////////////////////////////////////
// "use client";
// import { useState, useEffect, useCallback } from "react";

// export function useStorage<T>(key: string, initialValue: T) {
//   // const readValue = useCallback((): T => {
//   //   if (typeof window === "undefined") return initialValue;
//   //   try {
//   //     const item =localStorage.getItem(key);
//   //     return item ? (JSON.parse(item) as T) : initialValue;
//   //   } catch (error) {
//   //     console.warn(`Error reading localStorage key "${key}":`, error);
//   //     return initialValue;
//   //   }
//   // }, [initialValue, key]);

//   const [storedValue, setStoredValue] = useState<T>(initialValue);
// function setValue(value: T | ((prev: T) => T)){}
//   // // فقط بعد از mount روی کلاینت مقدار را بارگذاری کن
//   // useEffect(() => {
//   //   if (typeof window !== "undefined") {
//   //     setStoredValue(readValue());
//   //   }
//   // }, [readValue]);

//   // const setValue = (value: T | ((prev: T) => T)) => {
//   //   try {
//   //     const valueToStore =
//   //       value instanceof Function ? value(storedValue) : value;

//   //     if (typeof window !== "undefined") {
//   //       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//   //       window.dispatchEvent(new Event("local-storage"));
//   //     }

//   //     setStoredValue(valueToStore);
//   //   } catch (error) {
//   //     console.warn(`Error setting localStorage key "${key}":`, error);
//   //   }
//   // };

//   // // همگام‌سازی بین تب‌ها
//   // useEffect(() => {
//   //   if (typeof window === "undefined") return;

//   //   const handleStorageChange = () => setStoredValue(readValue());
//   //   window.addEventListener("storage", handleStorageChange);
//   //   window.addEventListener("local-storage", handleStorageChange);

//   //   return () => {
//   //     window.removeEventListener("storage", handleStorageChange);
//   //     window.removeEventListener("local-storage", handleStorageChange);
//   //   };
//   // }, [key, readValue]);

//   return [storedValue, setValue] as const;
// }
