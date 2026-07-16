import Link from "next/link";

interface VisitSuccessProps {
  place: any;
}
// "#4d98d1"
export default function VisitSuccess({ place }: VisitSuccessProps) {
  const particles = [
    { id: 1, x: "50%", y: "25%" },
    { id: 2, x: "40%", y: "30%" },
    { id: 3, x: "60%", y: "30%" },
    { id: 4, x: "35%", y: "40%" },
    { id: 5, x: "65%", y: "40%" },
    { id: 6, x: "50%", y: "15%" },
  ];
  // #14c3db
  return (
    // 전체 화면: flex와 h-screen을 통해 상하 화면을 꽉 채우고 스크롤을 방지합니다.
    <main className="flex h-[100dvh] flex-col pb-[env(safe-area-inset-bottom)] bg-[#2bc4a9]  text-white overflow-hidden relative ">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes unlockBuilding {
          0% {
            transform: translateY(120px) scale(0.3);
            opacity: 0;
            filter: brightness(0);
          }

          40% {
            transform: translateY(20px) scale(1.15);
            filter: brightness(4);
            opacity: 1;
          }

          70% {
            transform: scale(0.95);
          }

          100% {
            transform: scale(1);
            filter: brightness(1);
          }
        }

        .animate-unlockBuilding {
          animation: unlockBuilding 0.3s steps(5) forwards;
        }

        @keyframes sparkle {
          0% {
            transform: scale(0);
            opacity: 1;
          }

          100% {
            transform: translateY(-40px) scale(1.5);
            opacity: 0;
          }
        }

        .particle {
          animation: sparkle 0.8s ease-out forwards;
          font-size: 18px;
        }

        @keyframes cloudMove {
          0% {
            transform: translateX(-20px);
          }

          100% {
            transform: translateX(20px);
          }
        }

        .cloud1 {
          width: 80px;
          height: 20px;
          background: white;

          box-shadow:
            40px 0 white,
            0 -10px white,
            20px -20px white,
            20px 0px white;

          animation: cloudMove 6s steps(24) infinite;
        }

        .cloud2 {
          width: 70px;
          height: 20px;
          background: white;

          box-shadow:
            10px -10px white,
            -10px -7px white,
            20px -10px white,
            10px -20px white;
          animation: cloudMove 10s steps(24) infinite;
        }

        .cloud3 {
          width: 60px;
          height: 20px;
          background: white;

          box-shadow:
            10px -10px white,
            40px -10px white,
            50px 0 white,
            25px -20px white;
          animation: cloudMove 8s steps(24) infinite;
        }

        .grass-field {
          position: relative;
          width: 100%;
          height: 100%;

          background-image: url("/img/grass-tile.png");
          background-repeat: repeat;
          background-size: 96px 96px;
        }

        .grass-edge {
          position: absolute;

          top: -14px;

          width: 100%;
          height: 14px;

          background:
            repeating-linear-gradient(
              to right,
              #85a643 0px,
              #85a643 14px,
              transparent 14px,
              transparent 28px
            );
          }
        `,
        }}
      />
      {/* 하늘, 잔디, 시설 */}
      <div className="relative w-full flex-1 overflow-hidden">
        {/* 하늘 & 구름*/}
        <div className="absolute inset-0 bg-[#14c3db]">
          {/* 구름 */}
          <div className="absolute top-10 left-10 cloud1 scale-90" />
          <div className="absolute top-[60px] right-12  cloud2 scale-90" />
          <div className="absolute top-32 left-1/3  cloud3 scale-125" />
        </div>
        {/* 잔디 영역 (잔디 타일,잔디 윗면 픽셀,시설) */}
        <div
          className="
            absolute
            left-0
            right-0
            bottom-0
            h-[70%]
          "
        >
          {/* 잔디 윗면 픽셀 */}
          <div className="grass-edge" />
          {/* 잔디 타일 */}
          <div className="grass-field">
            {/* 잔디 상단 영역 */}
            <div
              className="
                absolute
                top-0
                left-0
                right-0

                h-[45%]

                flex
                items-start pt-[12%]
                justify-center
              "
            >
              {/* 시설 */}
              <div className="relative">
                {/* 그림자 */}
                <div  
                  className="    
                    absolute    
                    left-1/2    
                    -translate-x-1/2
                    w-[90%]    
                    h-10
                    bg-black/30
                    rounded-full
                    blur-[1px]  
                  "
                  style={{
                    bottom: `${place.shadow ?? 0}px`,
                  }}
                />
                <img
                  src={place.detailImage}
                  alt={place.name}
                  className="
                    w-[clamp(150px,30vw,220px)]
                    h-[clamp(150px,30vw,220px)]
                    object-contain
                    animate-unlockBuilding
                  "
                />

                {/* 반짝이 파티클 */}
                <div className="absolute inset-0 pointer-events-none">
                  {particles.map((p, index) => (
                    <span
                      key={p.id}
                      className="absolute text-yellow-200 particle"
                      style={{
                        left: p.x,
                        top: p.y,
                        animationDelay: `${0.45 + index * 0.05}s`,
                      }}
                    >
                      ✦
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 잔디 하단 영역 */}
            <div
              className="
                absolute
                bottom-0
                left-0
                right-0

                h-[55%]

                flex
                items-start pt-[2%]
                justify-center
                "
            >
              {/* 시스템창 */}
              <div
                className="
                  relative 
                  w-[85vw]

                  h-[90%]

                  bg-[#e7d1a7]

                  border-[3px]
                  border-[#3a2a1c]

                  shadow-[3px_3px_0_#3a2a1c]
                "
              >
                <h2
                  className="
                    absolute
                    top-[14%]
                    left-1/2
                    -translate-x-1/2

                    text-[#000]
                    text-2xl
                    font-bold
                    whitespace-nowrap
                  "
                >
                  {place.name}
                </h2>

                <h2
                  className="
                    absolute
                    top-[34%]
                    left-1/2
                    -translate-x-1/2

                    text-[#3a2a1c]
                    text-xl
                    font-bold
                    whitespace-nowrap
                  "
                >
                  탐험 완료!
                </h2>

                <p
                  className="
                    absolute
                    top-[52%]
                    left-1/2
                    -translate-x-1/2

                    text-[#3a2a1c]
                    text-sm
                    whitespace-nowrap
                  "
                >
                  지도에 새로운 장소가 등록되었습니다.
                </p>

                <a
                  href="/"
                  className="
                    absolute

                    left-1/2
                    bottom-[12%]

                    -translate-x-1/2

                    px-5
                    py-2

                    bg-[#ece7dd]

                    border-[2px]
                    border-[#3a2a1c]

                    shadow-[1px_1px_0_#3a2a1c]

                    text-[#000]
                    font-medium
                  "
                >
                  내 지도 열기
                </a>
              </div>
              {/* 시스템창 영역 */}
            </div>
            {/* 잔디 하단(시스템창) 영역 */}
          </div>
          {/* grass-tile 영역 */}
        </div>
        {/* 잔디 전체 영역 */}
      </div>
      {/* 상단 영역 */}
    </main>
  );
}


