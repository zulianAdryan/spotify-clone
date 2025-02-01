"use client";

import Button from "@/components/button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AccountContent = ({}) => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, router, user]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url } = await postData({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error)?.message);
      }
    }
  };

  return (
    <div className="mb-7 px-6">
      {(!subscription || !subscription.length) && (
        <div className="flex flex-col gap-y-4">
          <p className="">No active plan.</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}
      {subscription && subscription.length && (
        <div className="flex flex-col gap-y-4">
          <p className="text-wrap">
            You are currently on the{" "}
            {subscription
              .map((item) => item?.prices?.products?.name)
              .map((planName, i) => (
                <b key={`subscription-${i}`}>{planName}</b>
              ))}{" "}
            plan.
          </p>
          <Button
            disabled={isLoading || loading}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
