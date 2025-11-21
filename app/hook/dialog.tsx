"use client";
// import { useParams } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";

export const useDialogManager = () => {
  //   const params = useParams();
  //   const id = (params as any)?.id;

  // به‌جای redux
  const [taskData, setTaskData] = useState<any>(null);
  const id = "";
  // مدیریت دیالوگ‌ها
  const [items, setItems] = useState<Record<string, boolean>>({});
  const [payloads, setPayloads] = useState<Record<string, any>>({});
  const [toasts, setToasts] = useState<any[]>([]);

  // --- کنترل باز و بسته شدن ---
  const set = (id: string, v: boolean, payload?: any) => {
    setItems((x) => ({ ...x, [id]: v }));
    if (payload !== undefined) setPayloads((p) => ({ ...p, [id]: payload }));
  };

  const open = (id: string, payload?: any) => set(id, true, payload);
  const close = (id: string) => set(id, false);
  const toggle = (id: string, payload?: any) => set(id, !items[id], payload);
  const isOpen = (id: string) => items[id] === true;
  const getPayload = (id: string) => payloads[id];

  // --- Dialog Component ---
  const DialogComponent = ({ id, title, children }: any) => {
    if (typeof document === "undefined" || !isOpen(id)) return null;

    const data = getPayload(id);

    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative animate-fadeIn">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          {/* داده را به children پاس می‌دهیم */}
          {typeof children === "function" ? children(data) : children}
          <button
            onClick={() => close(id)}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>
      </div>,
      document.body
    );
  };

  // --- Drawer Component ---
  const DrawerComponent = ({
    id,
    title,
    children,
    position = "right",
  }: any) => {
    if (typeof document === "undefined" || !isOpen(id)) return null;

    const data = getPayload(id);
    return (
      <div
        onClick={() => {
          // console.log(id);
          close(id);
        }}
      >
        {typeof children === "function" ? (
          <div>{children(data, taskData)}</div>
        ) : (
          <>{children}</>
        )}
      </div>
    );
  };

  // --- Toast Manager ---
  const showToast = (
    msg: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const ToastContainer = () =>
    typeof document !== "undefined"
      ? createPortal(
          <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map((t) => (
              <div
                key={t.id}
                className={`px-4 py-2 rounded-lg shadow text-white animate-fadeIn
                  ${
                    t.type === "success"
                      ? "bg-green-500"
                      : t.type === "error"
                      ? "bg-red-500"
                      : "bg-gray-700"
                  }`}
              >
                {t.msg}
              </div>
            ))}
          </div>,
          document.body
        )
      : null;

  return {
    open,
    close,
    toggle,
    isOpen,
    getPayload,
    DialogComponent,
    DrawerComponent,
    showToast,
    ToastContainer,
    taskData,
    setTaskData, // برای ست‌کردن داده‌ها دستی
  };
};
