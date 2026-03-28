import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonLoader = () => {
  return (
    <div className="w-full min-h-screen bg-background p-4 space-y-8 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between pb-8">
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4 mx-auto rounded-xl" />
        <Skeleton className="h-6 w-1/2 mx-auto rounded-lg" />
        <div className="flex justify-center gap-4 pt-4">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>

      {/* Main Content Skeleton (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 p-4 border rounded-2xl">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>

      {/* Lower Section Skeleton */}
      <div className="bg-muted/30 p-8 rounded-3xl space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};
