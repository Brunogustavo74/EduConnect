interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  lines?: number;
}

function SkeletonLine({ className = "", width, height }: { className?: string; width?: string | number; height?: string | number }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-md ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width || "100%",
        height: typeof height === "number" ? `${height}px` : height || "16px",
      }}
    />
  );
}

export default function Skeleton({ className = "", variant = "text", width, height, lines = 1 }: SkeletonProps) {
  if (variant === "circular") {
    return (
      <div
        className={`animate-pulse bg-gray-200 rounded-full ${className}`}
        style={{
          width: typeof width === "number" ? `${width}px` : width || "40px",
          height: typeof height === "number" ? `${height}px` : height || "40px",
        }}
      />
    );
  }

  if (variant === "rectangular") {
    return (
      <div
        className={`animate-pulse bg-gray-200 rounded-xl ${className}`}
        style={{
          width: typeof width === "number" ? `${width}px` : width || "100%",
          height: typeof height === "number" ? `${height}px` : height || "120px",
        }}
      />
    );
  }

  // Text variant with multiple lines
  if (lines > 1) {
    return (
      <div className={`space-y-2.5 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonLine
            key={i}
            width={i === lines - 1 ? "75%" : "100%"}
            height={height}
          />
        ))}
      </div>
    );
  }

  return <SkeletonLine className={className} width={width} height={height} />;
}

// Pre-built skeleton patterns for common layouts
export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="circular" width={36} height={36} />
      </div>
      <Skeleton variant="text" lines={2} />
      <Skeleton variant="rectangular" height={8} className="!rounded-full" />
    </div>
  );
}

export function SkeletonListItem() {
  return (
    <div className="flex items-center gap-3 p-3">
      <Skeleton variant="circular" width={36} height={36} />
      <div className="flex-1 space-y-1.5">
        <Skeleton variant="text" width="70%" height={14} />
        <Skeleton variant="text" width="40%" height={12} />
      </div>
      <Skeleton variant="text" width={60} height={24} />
    </div>
  );
}

export function SkeletonStatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="card p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Skeleton variant="text" width={100} height={14} />
              <Skeleton variant="text" width={60} height={32} />
              <Skeleton variant="text" width={80} height={12} />
            </div>
            <Skeleton variant="rectangular" width={40} height={40} className="!rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
