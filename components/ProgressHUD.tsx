type Props = {
  visitedCount: number;
  totalCount: number;
};

export default function ProgressHUD({ visitedCount, totalCount }: Props) {
  const progress =
    totalCount > 0 ? Math.round((visitedCount / totalCount) * 100) : 0;

    return (
    <div className="absolute bottom-6 left-8 right-8 z-50">
      <div className="relative">
        {/* 라벨 */}
        <div
          className="
            absolute
            -top-3
            left-4
            px-3
            py-1
            bg-[#ece7dd]
            border-2
            border-[#3a2a1c]
            text-[11px]
            font-galmuri
            text-[#3a2a1c]
            z-10
            shadow-[1px_1px_0_#3a2a1c]
          "
        >
          탐험 진행도
        </div>

        {/* 시스템창 */}
        <div
          className="
            bg-[#e7d1a7]
            border-[3px]
            border-[#3a2a1c]
            px-4
            pt-5
            pb-3
            shadow-[3px_3px_0_#3a2a1c]
          "
        >
          {/* 진행바 */}
          <div className="flex gap-1.5 justify-center">
            {Array.from({ length: totalCount }).map((_, i) => (
              <div
                key={i}
                className={`
                  h-4
                  w-3
                  border
                  border-[#3a2a1c]
                  ${i < visitedCount ? "bg-[#6fba4d]" : "bg-[#f3ead7]"}
                `}
              />
            ))}
          </div>

          {/* 방문 수 */}
          <p
            className="
              mt-2
              text-center
              font-galmuri
              text-[#3a2a1c]
              text-[11px]
            "
          >
            {visitedCount} / {totalCount}곳 방문 완료
          </p>
        </div>
      </div>
    </div>
  );
}
