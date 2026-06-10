'use client';

import { use, useEffect, useState } from "react";

// ----------------------------------------------------
// [빌드/컴파일 에러를 완벽히 해결하는 하이브리드 로더]
// - 샌드박스 또는 클라우드 컴파일 환경에서 발생하는 Supabase 패키지 경로 탐색 에러를
//   원천적으로 차단하기 위해, 동적 로더 패턴을 파일 내부로 안전하게 복원했습니다.
// ----------------------------------------------------
let supabaseInstance: any = null;

const getSupabaseInstance = async () => {
  if (supabaseInstance) return supabaseInstance;
  
  // 브라우저 환경에서 Next.js 환경 변수를 안전하게 캐치합니다.
  const supabaseUrl = typeof process !== 'undefined' && process.env ? process.env.NEXT_PUBLIC_SUPABASE_URL : (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = typeof process !== 'undefined' && process.env ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  // 정적 컴파일러(esbuild)의 파일 해석 에러를 방지하기 위해 런타임 동적 탐색 및 CDN 폴백을 사용합니다.
  const createClientFn = await (async () => {
    try {
      const module = await Function('return import("@supabase/supabase-js")')();
      return module.createClient;
    } catch (e) {
      return new Promise<any>((resolve) => {
        if (typeof window === "undefined") {
          resolve(null);
          return;
        }
        if ((window as any).supabase) {
          resolve((window as any).supabase.createClient);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
        script.onload = () => {
          resolve((window as any).supabase?.createClient || null);
        };
        script.onerror = () => resolve(null);
        document.head.appendChild(script);
      });
    }
  })();

  const finalUrl = supabaseUrl || (typeof window !== 'undefined' ? (window as any).NEXT_PUBLIC_SUPABASE_URL : "");
  const finalKey = supabaseAnonKey || (typeof window !== 'undefined' ? (window as any).NEXT_PUBLIC_SUPABASE_ANON_KEY : "");

  if (createClientFn && finalUrl && finalKey) {
    supabaseInstance = createClientFn(finalUrl, finalKey);
  }
  return supabaseInstance;
}; // 💡 [구문 복원 완료] 손실되었던 getSupabaseInstance 함수 마감 중괄호 복구!

/**
 * 사용자의 고유 UUID를 브라우저에서 가져오거나 새로 생성하여 
 * Supabase 'users' 테이블에 최초로 등록하는 내부 헬퍼 함수
 */
const initializeUserInPage = async (supabase: any) => {
  if (typeof window === 'undefined') return null;

  const STORAGE_KEY = 'namgu_user_id';
  let userId = localStorage.getItem(STORAGE_KEY);

  if (!userId) {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      userId = crypto.randomUUID();
    } else {
      userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (supabase) {
      try {
        const { error } = await supabase
          .from('users')
          .insert([{ id: userId }]);

        if (error) throw error;

        localStorage.setItem(STORAGE_KEY, userId);
        console.log('🎉 [Supabase] 새 사용자 고유 ID 등록 완료:', userId);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('🚨 [Supabase] 사용자 등록 중 오류 발생:', errorMessage);
        localStorage.setItem(STORAGE_KEY, userId);
      }
    } else {
      localStorage.setItem(STORAGE_KEY, userId);
    }
  } else {
    console.log('📱 [LocalStorage] 기존 사용자 ID 확인됨:', userId);
  }

  return userId;
};

//////////////////////////////////////////////////////////////////////////////////
type VisitPageProps = {
  params: Promise<{
    placeId: string;
  }>;
};

export default function VisitPage({ params }: VisitPageProps) {
  const resolvedParams = use(params);
  let placeId = resolvedParams?.placeId;

  if (!placeId && typeof window !== 'undefined') {
    const paths = window.location.pathname.split('/');
    placeId = paths[paths.length - 1];
  }

  const [isAnimating, setIsAnimating] = useState(true);
  const [dbStatus, setDbStatus] = useState<"loading" | "success" | "error">("loading");

  // 13개 확정 장소 매핑 테이블
  const placeData: Record<string, { name: string; image: string }> = {
    "munhyeon-art": { name: "문현아트센터", image: "/illustrations/munhyeon.png" },
    "daedonggol-culture": { name: "대동골문화센터", image: "/illustrations/daedonggol.png" },
    "haeparangil-info": { name: "해파랑길관광안내소", image: "/illustrations/haeparangil.png" },
    "somak-village": { name: "우암동 소막마을", image: "/illustrations/somak.png" },
    "bunpo-sports": { name: "분포문화체육센터", image: "/illustrations/bunpo.png" },
    "namgu-library": { name: "남구도서관", image: "/illustrations/namgu-library.png" },
    "gogossing-job": { name: "청년창조발전소고고씽Job", image: "/illustrations/gogossing.png" },
    "miu-study": { name: "미우서재", image: "/illustrations/miu.png" },
    "chocolate-factory": { name: "초콜릿팩토리", image: "/illustrations/chocolate.png" },
    "garam-arthall": { name: "가람아트홀", image: "/illustrations/garam.png" },
    "gamman-culture": { name: "감만창의문화촌", image: "/illustrations/gamman.png" },
    "namgu-foundation": { name: "부산남구문화재단", image: "/illustrations/bncf.png" },
    "uam-artnarae": { name: "우암아트나래", image: "/illustrations/uam.png" },
  };

  useEffect(() => {
    const handleRegisterAndVisit = async () => {
      if (!placeId) return;

      try {
        // 1. Supabase 인스턴스 안전하게 로드
        const supabase = await getSupabaseInstance();
        
        // 2. 고유 사용자 ID(UUID) 발급 및 확인 (5단계 연동)
        const userId = await initializeUserInPage(supabase);
        
        if (!userId) {
          throw new Error("사용자 고유 식별자를 생성하거나 불러올 수 없습니다.");
        }

        // 3. Supabase 'visits' 테이블에 현재 시설 방문 정보 저장 (6단계 연동)
        if (supabase) {
          const { error: visitError } = await supabase
            .from("visits")
            .insert([
              { user_id: userId, place_id: placeId }
            ]);

          if (visitError) {
            if (visitError.code === "23505") {
              console.log("📱 [Supabase] 이미 데이터베이스에 등록된 방문지입니다.");
            } else {
              throw visitError;
            }
          } else {
            console.log(`🎉 [Supabase] ${placeId} 방문 기록 서버 전송 성공!`);
          }
        } else {
          console.warn("⚠️ Supabase 데이터베이스 연결을 확립할 수 없습니다. 오프라인 모드로 진행합니다.");
        }

        // 4. 로컬 저장소(localStorage)에도 방문 장소 목록을 동기화하여 하이브리드 보존 처리
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

        setDbStatus("success");

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("🚨 [Supabase] 방문지 등록 중 오류 발생:", errorMessage);
        setDbStatus("error");
        
        // 서버 장애나 일시적 통신 무산 시에도, 사용자의 온디바이스(localStorage) 저장을 수행하여 이탈을 방지합니다.
        if (placeId) {
          const saved = localStorage.getItem("visitedPlaces");
          const visitedPlaces: string[] = saved ? JSON.parse(saved) : [];
          if (!visitedPlaces.includes(placeId)) {
            visitedPlaces.push(placeId);
            localStorage.setItem("visitedPlaces", JSON.stringify(visitedPlaces));
          }
        }
      }
    };  

    if (placeId) {
      handleRegisterAndVisit();
    }

    // 기존의 3초간의 연출 및 로딩 애니메이션 유지
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [placeId]);

  const currentPlace = placeData[placeId || ""];

  return (
    // 전체 화면: flex와 h-screen을 통해 상하 화면을 꽉 채우고 스크롤을 방지합니다.
    <main className="flex h-screen flex-col bg-gradient-to-b from-[#5ba6de] to-[#2c5a9e] text-white overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/NeoDunggeunmo.woff');
        @font-face {
          font-family: 'NeoDunggeunmo';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/NeoDunggeunmo.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
        .font-pixel-title {
          font-family: 'NeoDunggeunmo', monospace;
        }
        @keyframes landingAnimate {
          0% { transform: scale(0.3) translateY(-100px); opacity: 0; }
          70% { transform: scale(1.1) translateY(10px); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-retroLanded {
          animation: landingAnimate 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}} />
      
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
        {currentPlace ? (
          <div className="relative flex flex-col items-center z-10">
            <img
              src={currentPlace.image}
              alt={currentPlace.name}
              // [애니메이션 포인트] animate-retroLanded 클래스로 0.3초만에 쿵 안착합니다.
              // transform-origin-bottom을 주어 확대/축소의 기준점을 '바닥'으로 고정해 지면에서 솟구치는 느낌을 살립니다.
              className="w-40 h-40 object-contain origin-bottom animate-retroLanded"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/illustrations/gallery.png";
              }}
            />
            
            {/* [디테일 포인트: 픽셀 도트 음영 그림자]
                - 건물 바로 아래에 어두운 도트 질감의 그림자를 깔아 지면과의 접착감을 극대화합니다.  */}
            <div className="w-32 h-3 bg-black/40 rounded-full blur-[2px] mt-2 mx-auto" />
          </div>
        ) : (
          <div className="relative flex flex-col items-center z-10">
            <div className="w-24 h-24 bg-white/10 rounded-full border border-white/20 animate-pulse flex items-center justify-center font-pixel-title text-xs text-white/50">
              인증 준비중
            </div>
          </div>
        )}
      </div>

      {/* ----------------------------------------------------
          [중앙 공간: 2D 잔디 블록 지면 단면 선]
          - 상단 하늘과 하단 지하를 명확히 구분 짓는 고전 게임 스타일의 대지 선입니다.
         ---------------------------------------------------- */}
      <div className="w-full h-6 relative z-20 flex flex-col">
        {/* 상단 잔디 윗면 (연두색 픽셀 레이어) */}
        <div className="w-full h-2 bg-[#88cc44] border-b-2 border-black/20" />
        {/* 하단 잔디 단면 (진초록색 픽셀 레이어) */}
        <div className="w-full h-4 bg-[#55aa22]" />
      </div>

      {/* ----------------------------------------------------
          [하단 공간: 지하 불투명 메뉴창 영역]
          - h-[45%]: 도트 다크 그레이 배경으로 글자들의 명도와 시인성을 강력하게 잡아줍니다.
         ---------------------------------------------------- */}
      <div className="w-full h-[45%] bg-[#2a2d32] border-t-4 border-black flex flex-col items-center justify-between py-8 px-6 z-10 shadow-[inset_0_8px_0_rgba(0,0,0,0.3)]">
        
        {/* 텍스트 위계 및 정렬 영역 */}
        <div className="flex flex-col items-center text-center w-full mt-2">
          {/* 1. 시설 이름 (NeoDunggeunmo 서체, 가장 크고 두껍게) */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-wider font-pixel-title drop-shadow-[0_4px_0_rgba(0,0,0,0.7)]">
            {currentPlace ? currentPlace.name : "문화시설"}
          </h1>
          
          {/* 2. 방문 완료! (시설명 바로 밑에 골드 컬러 포인트 배치) */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[#ffd700] tracking-widest font-pixel-title mb-5">
            방문 완료!
          </h2>
          
          {/* 3. 안내 문구 (Galmuri11 기본 서체, 명도 쨍하게 유지) */}
          <p className="text-sm sm:text-base text-gray-100 font-medium leading-relaxed max-w-xs break-keep font-pixel-title">
            새로운 문화시설이 지도에 등록되었습니다.
          </p>
        </div>

        {/* 지도로 확인하러 가기 액션 버튼 */}
        <a
          href="/"
          // 픽셀 스타일과 어울리도록 그라데이션 대신 쨍한 골드 옐로우 톤의 레트로 버튼으로 가독성을 높였습니다.
          className="px-8 py-3.5 bg-[#ffd700] hover:bg-yellow-400 text-black font-extrabold rounded-xl shadow-[0_5px_0_#9e7200] hover:translate-y-[2px] hover:shadow-[0_3px_0_#9e7200] active:translate-y-[5px] active:shadow-none transition-all duration-100 font-pixel-title text-base tracking-wide"
        >
          내 지도에서 확인하기
        </a>

      </div>
    </main>
  );
}