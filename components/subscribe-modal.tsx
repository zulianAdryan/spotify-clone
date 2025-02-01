"use client";

import { Price, ProductWithPrice } from "@/types";
import Modal from "./modal";
import Button from "./button";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "@/lib/helpers";
import { getStripe } from "@/lib/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface Props {
  products: Array<ProductWithPrice>;
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};

const SubscribeModal: React.FC<Props> = ({ products }) => {
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string | undefined>(
    undefined
  );

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  };

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(undefined);
      toast.error("Must be logged in");
      return;
    }

    if (subscription && subscription.length) {
      setPriceIdLoading(undefined);
      return toast("Already subscribed");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = <div className="text-center">No products available.</div>;

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No product available.</div>;
          }
          return product.prices.map((price) => {
            return (
              <Button
                key={price.id}
                className="mb-4"
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.id === priceIdLoading}
                loading={isLoading}
              >
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </Button>
            );
          });
        })}
      </div>
    );
  }

  if (subscription && subscription.length) {
    content = <div className="text-center">Already subscribed</div>;
  }

  return (
    <Modal
      title="Only for premium users"
      description="Start premium plan"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
