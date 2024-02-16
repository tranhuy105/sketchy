"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { DeleteBoard } from "@/actions/deleteBoard";

interface DeleteButtonProps {
  title: string;
  id?: string;
}

export const DeleteButton = ({
  title,
  id,
}: DeleteButtonProps) => {
  const router = useRouter();

  const [v, setV] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!id) return null;

  const handleValidate = async () => {
    if (!v) return;

    if (v !== title) {
      setIsWrong(true);
      return;
    }

    setIsWrong(false);
    setIsLoading(true);
    await DeleteBoard(id);
    setIsLoading(false);
    router.push("/");
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full opacity-50 hover:opacity-100 hover:cursor-not-allowed transition-opacity duration-500"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Are you sure
          </DialogTitle>
          <DialogDescription className="text-muted-foreground/70">
            This action can not be undoned. Please typing
            again the title of this board{' "'}
            <span className="italic font-semibold text-muted-foreground">{`${title}`}</span>
            {'" '}
            and click on{" "}
            <span className="font-semibold text-red-600">
              {`"Delete"`}
            </span>{" "}
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <Input
            id="name"
            value={v}
            onChange={(e) => setV(e.target.value)}
            className={cn(
              isWrong &&
                "border-red-500 placeholder:text-red-500 text-red-500 focus:text-primary focus:ring-red-500"
            )}
            autoComplete={"off"}
          />
          {isWrong && (
            <p className="mt-3 text-sm font-semibold text-red-500">
              Validation failed, please try again
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant={"destructive"}
            onClick={handleValidate}
            disabled={isLoading}
            className={cn(
              "disabled:hover:cursor-progress",
              isLoading && "cursor-progress"
            )}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
