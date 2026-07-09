type Props = {
  visitedCount: number;
  totalCount: number;
};

export default function ProgressHUD({
  visitedCount,
  totalCount,
}: Props) {
  const progress =
    totalCount > 0
      ? Math.round((visitedCount / totalCount) * 100)
      : 0;

  return (
    <div className="absolute bottom-4 left-4 right-4 z-50">
      <div
        className="
          rounded-2xl
          border
          border-white/30
          bg-white/20
          backdrop-blur-md
          p-4
        "
      >
        <div className="mb-2 text-center text-white font-pixel-title">
          {visitedCount} / {totalCount}
        </div>

        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-2 text-center text-white text-sm">
          {progress}%
        </div>
      </div>
    </div>
  );
}