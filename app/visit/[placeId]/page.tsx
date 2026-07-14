"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { places } from "@/data/places";
import { initializeUserInPage } from "@/utils/user";
import { SupabaseClient } from "@supabase/supabase-js";
import VisitLoading from "@/components/visit/VisitLoading";
import VisitError from "@/components/visit/VisitError";
import VisitSuccess from "@/components/visit/VisitSuccess";

// ----------------------------------------------------
// [빌드/컴파일 에러를 완벽히 해결하는 하이브리드 로더]
// - 샌드박스 또는 클라우드 컴파일 환경에서 발생하는 Supabase 패키지 경로 탐색 에러를
//   원천적으로 차단하기 위해, 동적 로더 패턴을 파일 내부로 안전하게 복원했습니다.
// ----------------------------------------------------
let supabaseInstance: any = null;

const getSupabaseInstance = async () => {
  if (supabaseInstance) return supabaseInstance;

  // 브라우저 환경에서 Next.js 환경 변수를 안전하게 캐치합니다.
  const supabaseUrl =
    typeof process !== "undefined" && process.env
      ? process.env.NEXT_PUBLIC_SUPABASE_URL
      : (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey =
    typeof process !== "undefined" && process.env
      ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      : (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  // 정적 컴파일러(esbuild)의 파일 해석 에러를 방지하기 위해 런타임 동적 탐색 및 CDN 폴백을 사용합니다.
  const createClientFn = await (async () => {
    try {
      const supabaseModule = await Function(
        'return import("@supabase/supabase-js")',
      )();
      return supabaseModule.createClient;
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

  const finalUrl =
    supabaseUrl ||
    (typeof window !== "undefined"
      ? (window as any).NEXT_PUBLIC_SUPABASE_URL
      : "");
  const finalKey =
    supabaseAnonKey ||
    (typeof window !== "undefined"
      ? (window as any).NEXT_PUBLIC_SUPABASE_ANON_KEY
      : "");

  if (createClientFn && finalUrl && finalKey) {
    supabaseInstance = createClientFn(finalUrl, finalKey);
  }
  return supabaseInstance;
};

export default function VisitPage() {
  const params = useParams();

  const placeId = typeof params.placeId === "string" ? params.placeId : "";

  const [isAnimating, setIsAnimating] = useState(true);

  /////0711토_visit/page 기능 분리용/////////
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  /////////////////////////////////////////
  useEffect(() => {
    const handleRegisterAndVisit = async () => {
      if (!placeId) return;

      try {
        // 1. Supabase 인스턴스 안전하게 로드
        const supabase = await getSupabaseInstance();

        // 2. 고유 사용자 ID(UUID) 발급 및 확인 (5단계 연동)
        const userId = await initializeUserInPage(supabase);

        if (!userId) {
          throw new Error(
            "사용자 고유 식별자를 생성하거나 불러올 수 없습니다.",
          );
        }

        // 3. Supabase 'visits' 테이블에 현재 시설 방문 정보 저장 (6단계 연동)
        if (supabase) {
          const { error: visitError } = await supabase
            .from("visits")
            .insert([{ user_id: userId, place_id: placeId }]);

          if (visitError) {
            if (visitError.code === "23505") {
              console.log(
                "📱 [Supabase] 이미 데이터베이스에 등록된 방문지입니다.",
              );
            } else {
              throw visitError;
            }
          } else {
            console.log(`🎉 [Supabase] ${placeId} 방문 기록 서버 전송 성공!`);
          }
        } else {
          console.warn(
            "⚠️ Supabase 데이터베이스 연결을 확립할 수 없습니다. 오프라인 모드로 진행합니다.",
          );
        }

        // 4. 로컬 저장소(localStorage)에도 방문 장소 목록을 동기화하여 하이브리드 보존 처리
        const saved = localStorage.getItem("visitedPlaces");
        const visitedPlaces: string[] = saved ? JSON.parse(saved) : [];

        // 이미 방문한 장소가 아니라면 추가
        if (!visitedPlaces.includes(placeId)) {
          visitedPlaces.push(placeId);
          localStorage.setItem("visitedPlaces", JSON.stringify(visitedPlaces));
        }
      } catch (error) {
        setStatus("error");
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        console.error("🚨 [Supabase] 방문지 등록 중 오류 발생:", errorMessage);

        // 서버 장애나 일시적 통신 무산 시에도, 사용자의 온디바이스(localStorage) 저장을 수행하여 이탈을 방지합니다.
        if (placeId) {
          const saved = localStorage.getItem("visitedPlaces");
          const visitedPlaces: string[] = saved ? JSON.parse(saved) : [];
          if (!visitedPlaces.includes(placeId)) {
            visitedPlaces.push(placeId);
            localStorage.setItem(
              "visitedPlaces",
              JSON.stringify(visitedPlaces),
            );
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
      setStatus("success");
    }, 3000);

    return () => clearTimeout(timer);
  }, [placeId]);

  const currentPlace = places.find((place) => place.id === placeId);

  return (
    <main className="min-h-screen bg-[#0077b6] flex justify-center">
      <div
        className="
          relative
          w-full
          max-w-[480px]
          h-screen
          overflow-hidden
        "
      >
        {status === "loading" && <VisitLoading />}

        {status === "error" && <VisitError />}

        {status === "success" && <VisitSuccess place={currentPlace} />}
      </div>
    </main>
  );
}
