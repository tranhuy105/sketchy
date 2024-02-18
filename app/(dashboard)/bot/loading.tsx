import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full h-[calc(100vh-64px)] px-48 py-8 relative">
      <div className="w-full h-full rounded-lg flex items-center justify-center bg-transparent">
        <Image
          src={"/loading.png"}
          alt="loading"
          width={120}
          height={60}
          className="animate-pulse object-fit"
        />
        <div className="flex gap-3 -mt-20">
          <Skeleton className="rounded-full border-4 border-gradient-fro w-3 h-3 bg-transparent" />
          <Skeleton className="rounded-full border-4 border-gradient-fro w-3 h-3 bg-transparent" />
          <Skeleton className="rounded-full border-4 border-gradient-fro w-3 h-3 bg-transparent" />
        </div>
      </div>
    </div>
  );
}
