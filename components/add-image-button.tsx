"use client";

const backgrounds = [
  "/cover/anime1.jpg",
  "/cover/anime2.jpg",
  "/cover/anime4.jpg",
  "/cover/anime5.jpg",
  "/cover/book1.jpg",
  "/cover/book2.jpg",
  "/cover/car1.jpg",
  "/cover/guitar1.jpg",
  "/cover/math1.jpg",
  "/cover/piano1.jpg",
  "/cover/piano2.jpg",
  "/cover/sing1.jpg",
  "/cover/space1.jpg",
  "/cover/space2.jpg",
];

import { cn } from "@/lib/utils";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useRouter } from "next/navigation";
import { UpdateImage } from "@/actions/updateImage";

export const AddImageButton = ({
  boardId,
  mini,
}: {
  boardId: string | undefined;
  mini?: boolean;
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [currentSelect, setCurrentSelect] = useState("");

  const divRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(divRef, () => setShow(false));

  const showMenu = () => {
    setShow(true);
  };

  const handleUploadImage = async () => {
    if (
      currentSelect === "" ||
      !backgrounds.includes(currentSelect) ||
      !boardId
    )
      return;

    setIsLoading(true);
    // console.log(currentSelect);
    // console.log(boardId, currentSelect);
    await UpdateImage(boardId, currentSelect);
    setIsLoading(false);
    router.refresh();
    setShow(false);
  };

  return (
    <>
      <div
        className={cn(
          "absolute -top-4 right-[50%] ml-24 hover:bg-muted-foreground/10 m-2 w-12 h-12 bg-transparent  rounded-md opacity-30  hover:opacity-100 transition-all duration-500 flex items-center justify-center cursor-pointer hover:scale-105 text-muted-foreground z-20",
          mini &&
            "opacity-0 hover:opacity-0 top-0 left-0 bottom-0 right-0"
        )}
        onClick={showMenu}
      >
        <ImagePlus className="h-8 w-8" />

        {/* IMAGE PICK MENU */}
      </div>
      {show && (
        <div
          className={cn(
            "fixed w-full h-full -top-8 left-0 right-0 bottom-0 bg-black/60 z-[9999] flex items-center justify-center",
            mini && "top-8"
          )}
        >
          <div
            className={cn(
              "bg-slate-50 shadow-md shadow-black w-[80%] min-h-[640px] px-8 py-6 text-center space-y-6",
              mini && "pb-20 h-[520px] text-primary/80"
            )}
            ref={divRef}
          >
            <h1 className="font-bold text-2xl text-start">
              Select your image
            </h1>
            <div
              className={cn(
                "h-[540px] overflow-y-auto px-5 py-3 border",
                mini && "h-[480px]"
              )}
            >
              <div className="columns-3 gap-4 space-y-5 [&>img:not(:first-child)]:mt-8 border break-inside-avoid">
                {backgrounds.map((bg, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (currentSelect !== "bg") {
                        setCurrentSelect(bg);
                      }
                    }}
                    className={cn(
                      "relative w-[100%] h-[250px] opacity-50 transition-all duration-300 hover:scale-105 hover:opacity-100 rounded-md",
                      currentSelect === bg &&
                        "opacity-100  hover:scale-100"
                    )}
                  >
                    <Image
                      fill
                      alt={bg}
                      src={bg}
                      className="object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
            <Button
              disabled={isLoading}
              className="w-[40%]"
              onClick={handleUploadImage}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
