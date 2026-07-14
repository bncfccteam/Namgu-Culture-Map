type Props = {
  visitedCount: number;
  totalCount: number;
};

//0707~
export default function MapHeader({ visitedCount, totalCount }: Props) {
  return (
    <header
      className="
        absolute
        top-0
        left-0
        right-0
        z-110
        pt-8
        text-center
        pointer-events-none
      "
    >
      {/* 메인 타이틀 */}
      <div className="leading-none text-center">
        {/* 남구 문화탐험 상단 소제목 */}
        <div
          className="
            font-galmuri
            text-[13px]
            mb-1
          "
          style={{
            color: "#48008b",
            WebkitTextStroke: "0.3px #48008b",
          }}
        >
          부산 남구 문화체험
        </div>

        {/* 디지털 문화지도 메인 타이틀 */}
        <div
          className="
            mt-2
            font-galmuri
            text-[30px]
            sm:text-[36px]
            leading-none
          "
          style={{
            color: "#000000",
            WebkitTextStroke: "1.2px #000000",
          }}
        >
          디지털 문화지도
        </div>
      </div>

      {/* 설명 */}
      <p
        className="
          mt-2
          text-[11px]
          text-black
          leading-[1.4]
          font-sans
        "
      >
        {/* 남구의 문화시설 13곳을 방문해
        <br />
        잠겨진 시설을 해금해 보세요 */}
        남구 곳곳의 문화시설을 탐험하며
        <br />
        QR코드로 시설을 해금하고 지도를 완성해 보세요
      </p>
    </header>
  );
}
