"use client";

import { Button } from "./ui/button";

export const SaveButton = ({
  isLoading,
}: {
  isLoading: boolean;
}) => {
  return (
    <Button
      type="submit"
      variant={"ghost"}
      className="w-full disabled:cursor-progress"
      size={"lg"}
      disabled={isLoading}
    >
      Save
    </Button>
  );
};
