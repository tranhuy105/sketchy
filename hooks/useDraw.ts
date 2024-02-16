import { useEffect, useRef, useState } from "react";

export type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const [mouseDown, setMouseDown] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const onMouseDown = () => setMouseDown(true);

  useEffect(() => {
    const canvas = canvasRef.current;

    const mouseUpHandler = () => {
      setMouseDown(false);
      prevPoint.current = null;
    };

    const computePosInCanvas = (e: MouseEvent) => {
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;
      const currentPoint = computePosInCanvas(e);

      const ctx = canvas?.getContext("2d");

      if (!ctx || !currentPoint) return;

      onDraw({
        ctx,
        currentPoint,
        prevPoint: prevPoint.current,
      });
      prevPoint.current = currentPoint;
    };

    canvas?.addEventListener("mousemove", handler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      canvas?.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [onDraw, mouseDown]);

  return {
    canvasRef,
    onMouseDown,
    clear,
  };
};
