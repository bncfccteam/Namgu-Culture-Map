// ----------------------------------------------------
// [Step 7.2 - Supabase 전역 헬퍼 및 통계 API 구현]
// - 위치: 프로젝트 루트 /utils/supabase.js (app 폴더 외부)
// - getSupabaseInstance 함수를 통합하고 실시간 통계 조회 API를 일원화합니다.
// ----------------------------------------------------

let supabaseInstance = null;

/**
 * 브라우저 및 빌드 타임 환경변수 에러를 안전하게 통제하며
 * Supabase 클라이언트 인스턴스를 동적으로 반환합니다.
 */
export const getSupabaseInstance = async () => {
  if (supabaseInstance) return supabaseInstance;

  // 브라우저 런타임 환경에서 Next.js 환경 변수를 안전하게 캐치합니다.
  const supabaseUrl = typeof process !== 'undefined' && process.env ? process.env.NEXT_PUBLIC_SUPABASE_URL : (window).__NEXT_DATA__?.env?.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = typeof process !== 'undefined' && process.env ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : (window).__NEXT_DATA__?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

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
        if (window.supabase) {
          resolve(window.supabase.createClient);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"; // 💡 [주요 정정] CDN 주소 내의 불필요한 마크다운 가상 링크 포맷 제거 완료
        script.onload = () => {
          resolve(window.supabase?.createClient || null);
        };
        script.onerror = () => resolve(null);
        document.head.appendChild(script);
      });
    }
  })();

  const finalUrl = supabaseUrl || (typeof window !== 'undefined' ? window.NEXT_PUBLIC_SUPABASE_URL : "");
  const finalKey = supabaseAnonKey || (typeof window !== 'undefined' ? window.NEXT_PUBLIC_SUPABASE_ANON_KEY : "");

  if (createClientFn && finalUrl && finalKey) {
    supabaseInstance = createClientFn(finalUrl, finalKey);
  }
  return supabaseInstance;
};

/**
 * 7.1단계 요약 통계 뷰 데이터 조회 (유저 수, 활성 유저, 평균 완성도)
 */
export async function getGlobalSummary() {
  try {
    const supabase = await getSupabaseInstance();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('view_global_summary')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('❌ 전체 요약 통계 조회 실패:', error.message);
    return null;
  }
}

/**
 * 7.1단계 문화시설별 실시간 인기 순위 및 방문수 조회
 */
export async function getFacilityRankings() {
  try {
    const supabase = await getSupabaseInstance();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('view_facility_rankings')
      .select('*')
      .order('visit_rank', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('❌ 시설별 순위 통계 조회 실패:', error.message);
    return [];
  }
}