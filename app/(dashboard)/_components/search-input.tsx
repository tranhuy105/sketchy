"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";

import { ChangeEvent, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "usehooks-ts";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    if (debouncedValue.length < 3) return;

    if (url !== "/") {
      router.push(url);
    }
  }, [router, debouncedValue]);

  return (
    <div className="max-w-[600px] w-full relative">
      <Search className="absolute top-1/2 left-3 transfrom -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full pl-9"
        placeholder="Search"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
