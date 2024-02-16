"use client";

import { Draw, useDraw } from "@/hooks/useDraw";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Eraser, Pen, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CanvasProps {
  content: string | null;
  onChange: (text: string) => void;
}

export const CanvasBoard = ({
  content,
  onChange,
}: CanvasProps) => {
  const { canvasRef, onMouseDown, clear } =
    useDraw(drawLine);

  const [mode, setMode] = useState<"drawing" | "eraser">(
    "drawing"
  );

  const saveCanvasData = () => {
    const dataURL = canvasRef.current?.toDataURL();
    if (dataURL) {
      onChange(dataURL);
    }
  };

  useEffect(() => {
    function loadCanvasData() {
      // todo: get from database
      const dataURLFromStorage = content;
      if (dataURLFromStorage) {
        onChange(dataURLFromStorage);
        const canvas = canvasRef.current;

        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;
        const img = new Image();
        img.src = dataURLFromStorage;
        img.onload = function () {
          context.drawImage(img, 0, 0);
        };
      }
    }

    // Load previous canvas state when component mounts
    loadCanvasData();
  }, [canvasRef, onChange, content]);

  function drawLine({
    prevPoint,
    currentPoint,
    ctx,
  }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const color = mode === "drawing" ? "#000" : "#f2f0f0";
    const lineWidth = mode === "drawing" ? 5 : 50;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    saveCanvasData();
  }

  return (
    <div className="space-y-2 w-full flex flex-col items-center justify-center relative border-b py-3">
      <canvas
        ref={canvasRef}
        width={1200}
        height={540}
        className={cn(
          "bg-[#f2f0f0]",
          mode === "eraser" && "cursor-grab"
        )}
        onMouseDown={onMouseDown}
      />
      <div className="absolute z-20 top-2 -right-2 h-[120px] flex flex-col gap-y-3 divide-y-2 divide-y-primary">
        <div
          className={cn(
            " bg-yellow-500 text-secondary p-2 rounded-full opacity-30 hover:opacity-100 transition cursor-pointer",
            mode === "drawing" && "opacity-100"
          )}
          onClick={() => setMode("drawing")}
        >
          <Pen className="h-8 w-8" />
        </div>
        <div
          className={cn(
            "opacity-30 bg-cyan-500 text-secondary p-2 rounded-full hover:opacity-100 transition cursor-pointer ",
            mode === "eraser" && "opacity-100"
          )}
          onClick={() => setMode("eraser")}
        >
          <Eraser className="h-8 w-8" />
        </div>
        <div
          className="bg-red-500 text-secondary p-2 rounded-full  opacity-30 hover:opacity-100 transition cursor-pointer"
          onClick={() => {
            clear();
            saveCanvasData();
          }}
        >
          <X className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};
