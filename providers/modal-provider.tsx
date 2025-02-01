"use client";

import AuthModal from "@/components/auth-modal";
import SubscribeModal from "@/components/subscribe-modal";
import UploadModal from "@/components/upload-modal";
import { ProductWithPrice } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  products: Array<ProductWithPrice>;
}

const ModalProvider: React.FC<Props> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
