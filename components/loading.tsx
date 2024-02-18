import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-64px)]">
      <div className="flex px-6 py-24 justify-center gap-6 w-full h-full">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[340px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[280px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[340px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[280px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[340px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[280px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[340px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[280px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
