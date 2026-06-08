'use client'; //0519_2주차_브라우저에서 실행되는 기능(localStorage)을 사용한다는 것을 명시하는 지시문

import Image from "next/image"; //Next.js의 이미지 컴포턴트 기능 가져오기(모듈)
import { useEffect, useState } from "react";

// ----------------------------------------------------
// [6.2단계 - Supabase 안전 로드 시스템]
// - 브라우저 런타임 환경에서 'process is not defined' 에러가 발생하는 것을 
//   원천적으로 방지하기 위해 window 객체 및 조건부 검사 필터를 내장한 로더입니다.
// ----------------------------------------------------
let supabaseInstance: any = null;

const getSupabaseInstance = async () => {
  if (supabaseInstance) return supabaseInstance;
  
  // 브라우저 환경(typeof window !== 'undefined')에서 Next.js 환경 변수를 안전하게 가로챕니다.
  const supabaseUrl = typeof process !== 'undefined' && process.env ? process.env.NEXT_PUBLIC_SUPABASE_URL : (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = typeof process !== 'undefined' && process.env ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const createClientFn = await (async () => {
    try {
      const module = await Function('return import("@supabase/supabase-js")')();
      return module.createClient;
    } catch (e) {
      return new Promise((resolve) => {
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

  // 런타임 변수 획득 실패 시, window 혹은 로컬 보완책을 통해 주소를 한 번 더 검증합니다.
  const finalUrl = supabaseUrl || (typeof window !== 'undefined' ? (window as any).NEXT_PUBLIC_SUPABASE_URL : "");
  const finalKey = supabaseAnonKey || (typeof window !== 'undefined' ? (window as any).NEXT_PUBLIC_SUPABASE_ANON_KEY : "");

  if (createClientFn && finalUrl && finalKey) {
    supabaseInstance = createClientFn(finalUrl, finalKey);
  }
  return supabaseInstance;
};

export default function Home() {
  const totalPlaces = 20;

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
  //useEffect : 페이지가 처음 열렸을 때 한 번 실행되는 코드 블록
  useEffect(() => {
    const syncAndFetchVisits = async () => {
      if (typeof window === 'undefined') return;

      // 1. 5단계에서 기기에 심어둔 사용자 고유 ID(UUID)를 가져옵니다.
      const savedUserId = localStorage.getItem("namgu_user_id");
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
  const progress = (visitedCount / totalPlaces) * 100;

  {/* 시설 데이터 구조 */}  //시설 데이터 구조를 정의하는 배열. 
  //각 객체는 시설의 ID, 이미지 경로, 지도에서의 위치(상단과 좌측 비율)를 포함.
  const places = [
    {
      id: "library",
      image: "/illustrations/library.png",
      top: "20%",
      left: "30%",
    },

    {
      id: "museum",
      image: "/illustrations/museum.png",
      top: "45%",
      left: "55%",
    },

    {
      id: "gallery",
      image: "/illustrations/gallery.png",
      top: "65%",
      left: "40%",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-6 relative text-black">
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
        <h1 className="text-3xl font-bold text-center mb-4 leading-tight">
          나만의 남구 문화지도 완성하기
        </h1>

        {/* 설명 */}
        <p className="text-gray-600 text-center mb-6 leading-relaxed">
          문화시설 방문을 통해
          <br />
          나만의 디지털 지도를 활성화해보세요.
        </p>

        {/* 지도 이미지 */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-200">

          {/* 전체 지도 */}
          {/* 원래 코드 양식 그대로 Next.js의 Image 컴포넌트로 완벽하게 복구했습니다! */}
          <Image
            src="/img/map-placeholder.png"
            alt="문화지도"
            width={800}
            height={800}
            className="w-full h-full object-cover opacity-50"
          />

          {places.map((place) => {
            if (!visitedPlaces.includes(place.id)) return null;

            return (
              <img
                key={place.id}
                src={place.image}
                alt={place.id}
                className="absolute w-16 h-16 object-contain animate-floating"
                style={{
                  top: place.top,
                  left: place.left,
                }}
              />
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
        <p className="text-center text-gray-600">
          {visitedCount} / {totalPlaces}개 방문
        </p>
      </div>
    </main>
  );
}
