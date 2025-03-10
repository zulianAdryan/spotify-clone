"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import Input from "./input";

const SearchInput = ({}) => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      className=""
      placeholder="search songs title"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
