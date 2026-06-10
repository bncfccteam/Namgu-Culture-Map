'use client'; //0519_2주차_브라우저에서 실행되는 기능(localStorage)을 사용한다는 것을 명시하는 지시문

import { useEffect, useState } from "react";

let supabaseInstance: any = null;

/**
 * 런타임 및 ESM 탐색 경로 무오류형 Supabase 인스턴스 팩토리
 */
const getSupabaseInstance = async () => {
  if (supabaseInstance) return supabaseInstance;

  const staticUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const staticKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabaseUrl = staticUrl || (typeof window !== 'undefined' ? ((window as any).NEXT_PUBLIC_SUPABASE_URL || (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_SUPABASE_URL) : "") || "";
  const supabaseAnonKey = staticKey || (typeof window !== 'undefined' ? ((window as any).NEXT_PUBLIC_SUPABASE_ANON_KEY || (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) : "") || "";

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

  if (createClientFn && supabaseUrl && supabaseAnonKey) {
    supabaseInstance = createClientFn(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};

/**
 * 사용자 고유 ID 발급 및 로컬 보존 로직
 */
const getOrCreateUserId = () => {
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
    localStorage.setItem(STORAGE_KEY, userId);
  }

  return userId;
};


export default function Home() {
  // ----------------------------------------------------
  // [Step 8.1 - 13개 확정 문화시설 데이터 구조 매핑]
  // - 남구청 및 재단으로부터 확정받은 13개 시설을 정식으로 장전합니다.
  // - top, left 비율은 맵 placeholder 규격에 맞춰 미세 정렬할 수 있습니다.
  // ----------------------------------------------------
  const places = [
    { id: "munhyeon-art", name: "문현아트센터", image: "/illustrations/munhyeon.png", top: "15%", left: "20%" },
    { id: "daedonggol-culture", name: "대동골문화센터", image: "/illustrations/daedonggol.png", top: "25%", left: "45%" },
    { id: "haeparangil-info", name: "해파랑길관광안내소", image: "/illustrations/haeparangil.png", top: "35%", left: "70%" }, // 💡 ID를 haeparangil-info로 통일
    { id: "somak-village", name: "우암동 소막마을", image: "/illustrations/somak.png", top: "45%", left: "15%" },
    { id: "bunpo-sports", name: "분포문화체육센터", image: "/illustrations/bunpo.png", top: "52%", left: "55%" },
    { id: "namgu-library", name: "남구도서관", image: "/illustrations/namgu-library.png", top: "62%", left: "30%" },
    { id: "gogossing-job", name: "청년창조발전소고고씽Job", image: "/illustrations/gogossing.png", top: "72%", left: "80%" },
    { id: "miu-study", name: "미우서재", image: "/illustrations/miu.png", top: "82%", left: "45%" }, // 💡 ID를 miu-study로 통일
    { id: "chocolate-factory", name: "초콜릿팩토리", image: "/illustrations/chocolate.png", top: "10%", left: "60%" },
    { id: "garam-arthall", name: "가람아트홀", image: "/illustrations/garam.png", top: "85%", left: "15%" },
    { id: "gamman-culture", name: "감만창의문화촌", image: "/illustrations/gamman.png", top: "90%", left: "70%" }, // 💡 ID를 gamman-culture로 통일
    { id: "namgu-foundation", name: "부산남구문화재단", image: "/illustrations/bncf.png", top: "30%", left: "85%" }, // 💡 ID를 namgu-foundation으로 통일
    { id: "uam-artnarae", name: "우암아트나래", image: "/illustrations/uam.png", top: "68%", left: "10%" },
  ];

  // 💡 [6.3단계 핵심] totalPlaces 상수를 places 배열의 실제 원소 개수로 자동 동기화합니다.
  const totalPlaces = places.length;

  const [visitedPlaces, setVisitedPlaces] = useState<string[]>([]); 
  // 방문한 장소들의 ID를 저장하는 상태 변수. 초기값은 빈 배열로 설정.
  // python: visited_places = []

  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ----------------------------------------------------
  // [6.2단계 - 하이브리드 데이터 동기화 useEffect]
  // - 로컬스토리지의 방문 기록과 Supabase 클라우드 서버의 방문 기록을 결합하여
  //   유실 없는 최종 방문 이력 목록(visitedPlaces)을 완성합니다.
  // ----------------------------------------------------
  useEffect(() => {
    const syncAndFetchVisits = async () => {
      if (typeof window === 'undefined') return;

      // 1. 5단계에서 기기에 심어둔 사용자 고유 ID(UUID)를 가져옵니다.
      const savedUserId = getOrCreateUserId(); // 💡 안정화된 공통 유틸 함수 연동
      setUserId(savedUserId);

      // 2. 로컬 브라우저 저장소(localStorage)의 기존 방문 기록을 먼저 확보합니다.
      const localSaved = localStorage.getItem("visitedPlaces");
      const localPlaces: string[] = localSaved ? JSON.parse(localSaved) : [];

      let mergedPlaces = [...localPlaces];

      try {
        // 3. Supabase 인스턴스를 확보하여 서버에 기록된 방문지 목록을 가져옵니다.
        const supabase = await getSupabaseInstance();
        
        if (supabase && savedUserId) {
          const { data, error } = await supabase
            .from("visits")
            .select("place_id")
            .eq("user_id", savedUserId);

          if (error) throw error;

          if (data) {
            // 서버에서 수신한 객체 배열 [{place_id: 'library'}, ...]을 평탄화 문자열 배열로 변환
            const serverPlaces = data.map((item: any) => item.place_id);
            
            // 💡 [6.2단계 핵심 알고리즘] 하이브리드 병합: 로컬 기록과 서버 기록을 합치고 중복을 제거합니다.
            mergedPlaces = Array.from(new Set([...localPlaces, ...serverPlaces]));
            
            console.log("📊 [6.2단계 - Supabase] 서버 방문지 데이터 동기화 완료:", serverPlaces);
          }
        } else {
          console.warn("⚠️ Supabase 데이터베이스 연결 불가 또는 신규 유저입니다. 로컬 데이터로 대체 가동합니다.");
        }
      } catch (error: any) {
        console.error("🚨 [6.2단계] 서버 데이터 로드 실패 (온디바이스 모드 가동):", error.message);
      } finally {
        // 4. 최종적으로 병합 완료된 배열을 상태값에 업데이트하고 저장소를 최신화합니다.
        setVisitedPlaces(mergedPlaces);
        localStorage.setItem("visitedPlaces", JSON.stringify(mergedPlaces));
        setIsLoading(false);
      }
    };

    syncAndFetchVisits();
  }, []); 

  const visitedCount = visitedPlaces.length;
  // 13개 장소에 연동되어 게이지가 약 7.69%씩 동적으로 상승합니다.
  const progress = totalPlaces > 0 ? (visitedCount / totalPlaces) * 100 : 0;

  return (
    <main className="min-h-screen bg-gray-100 p-6 relative text-black">
      {/* 네오둥근모 웹폰트 및 도트용 애니메이션 전용 스타일 인젝트 */}
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
        @keyframes customFloating {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-6px); }
        }
        .animate-floating {
          animation: customFloating 2.5s ease-in-out infinite;
        }
      `}} />

      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6">
        
        {/* 6.2단계 - 연동 디버깅 전용 상단 미니 뱃지 */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] text-gray-400 font-mono">
            ID: {userId ? `${userId.substring(0, 8)}...` : "발급 안 됨"}
          </span>
          {isLoading ? (
            <span className="text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full animate-pulse font-medium">
              동기화 중
            </span>
          ) : (
            <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
              서버 연결됨
            </span>
          )}
        </div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold text-center mb-4 leading-tight font-pixel-title">
          나만의 남구 문화지도 완성하기
        </h1>

        {/* 설명 */}
        <p className="text-gray-600 text-center mb-6 leading-relaxed font-pixel-title text-sm">
          잠겨져 있는 장소에 방문해
          <br />
          맵을 활성화 해보자!
          
        </p>

        {/* 지도 이미지 */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-200">

          {/* 전체 지도 */}
          {/* 💡 [빌드 최적화] 컴파일러 및 샌드박스 빌드 의존성 에러(next/image 미해결)를 원천 차단하기 위해 
              표준 <img> 태그 형식을 사용합니다. 로컬 환경에서 Next.js <Image> 컴포넌트로 다시 사용하시려면 
              상단에 'import Image from "next/image"'를 복구하시고 아래 코드를 그대로 바꾸시면 됩니다. */}
          <img
            src="/img/map-placeholder.png"
            alt="문화지도"
            className="w-full h-full object-cover opacity-50"
          />

          {places.map((place) => {
            if (!visitedPlaces.includes(place.id)) return null;

            return (
              <div 
                key={place.id}
                className="absolute flex flex-col items-center justify-center animate-floating"
                style={{
                  top: place.top,
                  left: place.left,
                  transform: "translate(-50%, -50%)", // 핀 정확도 정렬 보정
                }}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/illustrations/gallery.png";
                  }}
                />
                <span className="text-[9px] bg-black/70 text-white px-1 rounded-sm mt-0.5 font-bold font-pixel-title block whitespace-nowrap">
                  {place.name}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* 진행률 텍스트 */}
        <div className="mb-2 flex justify-between text-sm font-medium">
          <span>진행률</span>
          <span>{Math.round(progress)}%</span>
        </div>

        {/* 진행률 바 */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 방문 개수 */}
        <p className="text-center text-gray-600 font-pixel-title text-sm">
          {visitedCount} / {totalPlaces}개 방문
        </p>
      </div>
    </main>
  );
}