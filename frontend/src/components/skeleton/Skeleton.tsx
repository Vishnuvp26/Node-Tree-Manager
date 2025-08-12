import { Skeleton } from "@/components/ui/skeleton";
import type { SkeletonLoaderProps } from "@/types/types";

const SkeletonLoader = ({ rows = 8 }: SkeletonLoaderProps) => {
    return (
        <div className="w-full max-w-2xl mt-8 bg-zinc-900 rounded-lg p-4">
            {[...Array(rows)].map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-7 w-full mb-2 bg-gray-700"
                />
            ))}
        </div>
    );
};

export default SkeletonLoader;