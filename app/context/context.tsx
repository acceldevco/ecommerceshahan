"use client";
import { useDialogManager } from "@/app/hook/dialog";
import React, { createContext, useEffect, useState } from "react";

export const ContextMain = createContext<any>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dialog = useDialogManager();
  const [user, setUser] = useState<any>(null);
  // const [crypto, setcrypto] = useState<any>([]);
  const [data, setdata] = useState<any>({});

  useEffect(() => {
    // const fetchVerify = async () => {};
    // getData();
    // fetchVerify();
  }, []);

  return (
    <ContextMain.Provider value={{ ...dialog, user, data, setdata }}>
      {children}
    </ContextMain.Provider>
  );
};
