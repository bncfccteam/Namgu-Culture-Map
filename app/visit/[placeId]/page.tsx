'use client';

import { use, useEffect, useState } from "react";

type VisitPageProps = {
  params: Promise<{
    placeId: string;
  }>;
};

export default function VisitPage({ params }: VisitPageProps) {
  const { placeId } = use(params);
  const [isAnimating, setIsAnimating] = useState(true);
  useEffect(() => {

    const saved = localStorage.getItem("visitedPlaces");
    const visitedPlaces: string[] = saved ? JSON.parse(saved) : [];

    // 이미 방문한 장소가 아니라면 추가
    if (!visitedPlaces.includes(placeId)) {
      visitedPlaces.push(placeId);
      localStorage.setItem(
        "visitedPlaces",
        JSON.stringify(visitedPlaces)
      );
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
  }, [placeId]);

  const placeData: Record<string, { name: string; image: string }> = {
    library: {
      name: "도서관",
      image: "/illustrations/library.png",
    },

    museum: {
      name: "박물관",
      image: "/illustrations/museum.png",
    },

    gallery: {
      name: "전시관",
      image: "/illustrations/gallery.png",
    },
  };

  const currentPlace = placeData[placeId];

return (
    // 전체 화면: flex와 h-screen을 통해 상하 화면을 꽉 채우고 스크롤을 방지합니다.
    <main className="flex h-screen flex-col bg-gradient-to-b from-pixel-blue-light to-pixel-blue-dark text-white overflow-hidden relative">
      
      {/* ----------------------------------------------------
          [상단 공간: 하늘 및 바다 필드 영역]
          - h-[55%]: 화면의 상단 절반 이상을 차지하며, 파도 GIF와 건물 일러스트가 돋보이게 만듭니다.
         ---------------------------------------------------- */}
      <div className="w-full h-[55%] relative flex flex-col items-center justify-end overflow-hidden pb-0">
        
        {/* 바다 배경 파도 GIF (무한 루프) */}
        <img
          src="/img/pixel-ocean.gif"
          alt="남구 픽셀 바다"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />

        {/* 주인공: 문화시설 픽셀 이미지 렌더링 구역 */}
        {currentPlace && (
          <div className="relative flex flex-col items-center z-10">
            <img
              src={currentPlace.image}
              alt={currentPlace.name}
              // [애니메이션 포인트] animate-retroLanded 클래스로 0.3초만에 쿵 안착합니다.
              // transform-origin-bottom을 주어 확대/축소의 기준점을 '바닥'으로 고정해 지면에서 솟구치는 느낌을 살립니다.
              className="w-40 h-40 object-contain origin-bottom animate-retroLanded"
            />
            
            {/* [디테일 포인트: 픽셀 도트 음영 그림자]
                - 건물 바로 아래에 어두운 도트 질감의 그림자를 깔아 지면과의 접착감을 극대화합니다.  */}
            <div className="w-32 h-3 bg-black/40 rounded-full blur-[2px] mt-[-px] mx-auto " />
          </div>
        )}
      </div>

      {/* ----------------------------------------------------
          [중앙 공간: 2D 잔디 블록 지면 단면 선]
          - 상단 하늘과 하단 지하를 명확히 구분 짓는 고전 게임 스타일의 대지 선입니다.
         ---------------------------------------------------- */}
      <div className="w-full h-6 relative z-20 flex flex-col">
        {/* 상단 잔디 윗면 (연두색 픽셀 레이어) */}
        <div className="w-full h-2 bg-field-grass border-b-2 border-black/20" />
        {/* 하단 잔디 단면 (진초록색 픽셀 레이어) */}
        <div className="w-full h-4 bg-field-green" />
      </div>

      {/* ----------------------------------------------------
          [하단 공간: 지하 불투명 메뉴창 영역]
          - h-[45%]: 도트 다크 그레이 배경으로 글자들의 명도와 시인성을 강력하게 잡아줍니다.
         ---------------------------------------------------- */}
      <div className="w-full h-[45%] bg-dot-dark border-t-4 border-black flex flex-col items-center justify-between py-8 px-6 z-10 shadow-[inset_0_8px_0_rgba(0,0,0,0.3)]">
        
        {/* 텍스트 위계 및 정렬 영역 */}
        <div className="flex flex-col items-center text-center w-full mt-2">
          {/* 1. 시설 이름 (NeoDunggeunmo 서체, 가장 크고 두껍게) */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-wider font-pixel-title drop-shadow-[0_4px_0_rgba(0,0,0,0.7)]">
            {currentPlace ? currentPlace.name : "문화시설"}
          </h1>
          
          {/* 2. 방문 완료! (시설명 바로 밑에 골드 컬러 포인트 배치) */}
          <h2 className="text-2xl sm:text-3xl font-bold text-item-gold tracking-widest font-pixel-title mb-5">
            방문 완료!
          </h2>
          
          {/* 3. 안내 문구 (Galmuri11 기본 서체, 명도 쨍하게 유지) */}
          <p className="text-sm sm:text-base text-gray-100 font-medium leading-relaxed max-w-xs break-keep">
            새로운 문화시설이 지도에 등록되었습니다.
          </p>
        </div>

        {/* 지도로 확인하러 가기 액션 버튼 */}
        <a
          href="/"
          // 픽셀 스타일과 어울리도록 그라데이션 대신 쨍한 골드 옐로우 톤의 레트로 버튼으로 가독성을 높였습니다.
          className="px-8 py-3.5 bg-item-gold text-black font-extrabold rounded-xl shadow-[0_5px_0_#9e7200] hover:translate-y-[2px] hover:shadow-[0_3px_0_#9e7200] active:translate-y-[5px] active:shadow-none transition-all duration-100 font-pixel-title text-base tracking-wide"
        >
          내 지도에서 확인하기
        </a>

      </div>
    </main>
  );
}

