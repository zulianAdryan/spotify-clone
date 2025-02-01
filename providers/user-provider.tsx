"use client";

import { MyUserContextProvider } from "@/hooks/useUser";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UserProvider: React.FC<Props> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
