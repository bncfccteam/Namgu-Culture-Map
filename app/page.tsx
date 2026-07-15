'use client'; //0519_2주차_브라우저에서 실행되는 기능(localStorage)을 사용한다는 것을 명시하는 지시문

import { useEffect, useState } from "react";
import { places } from "@/data/places";

import MapHeader from "@/components/MapHeader";
import MapCanvas from "@/components/MapCanvas";
import ProgressHUD from "@/components/ProgressHUD";

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

// #ffffff

  return (
    <main className="min-h-[100dvh] bg-[#0077b6] flex justify-center">
      <div
        className="
        relative
        w-full
        max-w-[480px]
        h-screen
        overflow-hidden
        bg-[#0077b6]
      "
      >
        {/* 헤더 */}
        <MapHeader visitedCount={visitedCount} totalCount={totalPlaces} />

        {/* 고정 안개 */}
        <img
          src="/img/top-fog.png"
          alt=""
          className="
            absolute
            top-0
            left-0
            w-full
            z-100
            pointer-events-none
          "
        />

        {/* 스크롤 영역 */}
        <div
          className="
            h-full
            overflow-y-auto
          "
        >
          <MapCanvas visitedPlaces={visitedPlaces} />
        </div>

        {/* 진행률 바 */}
        <ProgressHUD visitedCount={visitedCount} totalCount={totalPlaces} />
      </div>
    </main>
  );



}