type Props = {
  visitedCount: number;
  totalCount: number;
};

//0707~
export default function MapHeader({
  visitedCount,
  totalCount,
}: Props) {
  return (
    <header
      className="
        absolute
        top-0
        left-0
        right-0
        z-50
        pt-8
        text-center
        pointer-events-none
      "
    >

      {/* 메인 타이틀 */}
      <div className="leading-none">
        <div
          className="font-pixel-title text-[20px]"
          style={{
            color: "#ffcc33",
            textShadow: `
              3px 3px 0 #000,
              -3px 3px 0 #000,
              3px -3px 0 #000,
              -3px -3px 0 #000
            `,
          }}
        >
          남구
        </div>

        <div
          className="font-pixel-title text-[36px] -mt-1"
          style={{
            color: "#38b000",
            textShadow: `
              3px 3px 0 #000,
              -3px 3px 0 #000,
              3px -3px 0 #000,
              -3px -3px 0 #000
            `,
          }}
        >
          디지털 문화지도
        </div>
      </div>

      {/* 설명 */}
      <p
        className="
          mt-3
          text-[12px]
          text-black
          leading-relaxed
        "
        
      >
        남구의 문화시설 13곳을 방문해
        <br />
        잠겨진 맵을 활성화합니다
      </p>

    
    </header>
  );
}






// ~0706
// export default function MapHeader({
//   visitedCount,
//   totalCount,
// }: Props) {
//   return (
//     <header className="absolute top-0 left-0 right-0 z-50 px-6 pt-6 text-center pointer-events-none">
//       <div className="max-w-md mx-auto px-5 py-4">
//         <h1 className="font-pixel-title text-xl text-black">
//           남구 디지털 문화지도
//         </h1>

//         <p className="text-xs text-gray-600 mt-1">
//           남구의 문화시설 13곳을 방문해 잠겨진 맵을 활성화합니다
//         </p>

//       </div>
//     </header>
//   );
// }