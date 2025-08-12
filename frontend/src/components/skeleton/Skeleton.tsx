import { Skeleton } from "@/components/ui/skeleton";
import type { SkeletonLoaderProps } from "@/types/types";

const SkeletonLoader = ({ rows = 8 }: SkeletonLoaderProps) => {
    return (
        <div className="w-full max-w-2xl mt-8 bg-zinc-900/50 backdrop-blur-md border border-white/10 shadow-lg rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-4">Loading your node trees...</p>
            {[...Array(rows)].map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-7 w-full mb-2 bg-gray-700/70"
                />
            ))}
        </div>
    );
};

export default SkeletonLoader;
