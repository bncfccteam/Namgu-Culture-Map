module.exports = [
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client'; //0519_2주차_브라우저에서 실행되는 기능(localStorage)을 사용한다는 것을 명시하는 지시문
;
;
let supabaseInstance = null;
/**
 * 런타임 및 ESM 탐색 경로 무오류형 Supabase 인스턴스 팩토리
 */ const getSupabaseInstance = async ()=>{
    if (supabaseInstance) return supabaseInstance;
    const staticUrl = ("TURBOPACK compile-time value", "https://bkqakvlpdbntnnemrsxl.supabase.co");
    const staticKey = ("TURBOPACK compile-time value", "sb_publishable_Va1ioF0kRDIGsivnjn6RKw_Kd96-5cc");
    const supabaseUrl = staticUrl || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "") || "";
    const supabaseAnonKey = staticKey || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "") || "";
    const createClientFn = await (async ()=>{
        try {
            const module = await Function('return import("@supabase/supabase-js")')();
            return module.createClient;
        } catch (e) {
            return new Promise((resolve)=>{
                if ("TURBOPACK compile-time truthy", 1) {
                    resolve(null);
                    return;
                }
                //TURBOPACK unreachable
                ;
                const script = undefined;
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
 */ const getOrCreateUserId = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const STORAGE_KEY = undefined;
    let userId;
};
function Home() {
    // ----------------------------------------------------
    // [Step 8.1 - 13개 확정 문화시설 데이터 구조 매핑]
    // - 남구청 및 재단으로부터 확정받은 13개 시설을 정식으로 장전합니다.
    // - top, left 비율은 맵 placeholder 규격에 맞춰 미세 정렬할 수 있습니다.
    // ----------------------------------------------------
    const places = [
        {
            id: "munhyeon-art",
            name: "문현아트센터",
            image: "/illustrations/munhyeon.png",
            top: "15%",
            left: "20%"
        },
        {
            id: "daedonggol-culture",
            name: "대동골문화센터",
            image: "/illustrations/daedonggol.png",
            top: "25%",
            left: "45%"
        },
        {
            id: "haeparangil-info",
            name: "해파랑길관광안내소",
            image: "/illustrations/haeparangil.png",
            top: "35%",
            left: "70%"
        },
        {
            id: "somak-village",
            name: "우암동 소막마을",
            image: "/illustrations/somak.png",
            top: "45%",
            left: "15%"
        },
        {
            id: "bunpo-sports",
            name: "분포문화체육센터",
            image: "/illustrations/bunpo.png",
            top: "52%",
            left: "55%"
        },
        {
            id: "namgu-library",
            name: "남구도서관",
            image: "/illustrations/namgu-library.png",
            top: "62%",
            left: "30%"
        },
        {
            id: "gogossing-job",
            name: "청년창조발전소고고씽Job",
            image: "/illustrations/gogossing.png",
            top: "72%",
            left: "80%"
        },
        {
            id: "miu-study",
            name: "미우서재",
            image: "/illustrations/miu.png",
            top: "82%",
            left: "45%"
        },
        {
            id: "chocolate-factory",
            name: "초콜릿팩토리",
            image: "/illustrations/chocolate.png",
            top: "10%",
            left: "60%"
        },
        {
            id: "garam-arthall",
            name: "가람아트홀",
            image: "/illustrations/garam.png",
            top: "85%",
            left: "15%"
        },
        {
            id: "gamman-culture",
            name: "감만창의문화촌",
            image: "/illustrations/gamman.png",
            top: "90%",
            left: "70%"
        },
        {
            id: "namgu-foundation",
            name: "부산남구문화재단",
            image: "/illustrations/bncf.png",
            top: "30%",
            left: "85%"
        },
        {
            id: "uam-artnarae",
            name: "우암아트나래",
            image: "/illustrations/uam.png",
            top: "68%",
            left: "10%"
        }
    ];
    // 💡 [6.3단계 핵심] totalPlaces 상수를 places 배열의 실제 원소 개수로 자동 동기화합니다.
    const totalPlaces = places.length;
    const [visitedPlaces, setVisitedPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // 방문한 장소들의 ID를 저장하는 상태 변수. 초기값은 빈 배열로 설정.
    // python: visited_places = []
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // ----------------------------------------------------
    // [6.2단계 - 하이브리드 데이터 동기화 useEffect]
    // - 로컬스토리지의 방문 기록과 Supabase 클라우드 서버의 방문 기록을 결합하여
    //   유실 없는 최종 방문 이력 목록(visitedPlaces)을 완성합니다.
    // ----------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const syncAndFetchVisits = async ()=>{
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
            // 1. 5단계에서 기기에 심어둔 사용자 고유 ID(UUID)를 가져옵니다.
            const savedUserId = undefined; // 💡 안정화된 공통 유틸 함수 연동
            // 2. 로컬 브라우저 저장소(localStorage)의 기존 방문 기록을 먼저 확보합니다.
            const localSaved = undefined;
            const localPlaces = undefined;
            let mergedPlaces;
        };
        syncAndFetchVisits();
    }, []);
    const visitedCount = visitedPlaces.length;
    // 13개 장소에 연동되어 게이지가 약 7.69%씩 동적으로 상승합니다.
    const progress = totalPlaces > 0 ? visitedCount / totalPlaces * 100 : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gray-100 p-6 relative text-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: `
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
      `
                }
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-gray-400 font-mono",
                                children: [
                                    "ID: ",
                                    userId ? `${userId.substring(0, 8)}...` : "발급 안 됨"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this),
                            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full animate-pulse font-medium",
                                children: "동기화 중"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium",
                                children: "서버 연결됨"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-center mb-4 leading-tight font-pixel-title",
                        children: "나만의 남구 문화지도 완성하기"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 text-center mb-6 leading-relaxed font-pixel-title text-sm",
                        children: [
                            "잠겨져 있는 장소에 방문해",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this),
                            "맵을 활성화 해보자!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/img/map-placeholder.png",
                                alt: "문화지도",
                                className: "w-full h-full object-cover opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this),
                            places.map((place)=>{
                                if (!visitedPlaces.includes(place.id)) return null;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute flex flex-col items-center justify-center animate-floating",
                                    style: {
                                        top: place.top,
                                        left: place.left,
                                        transform: "translate(-50%, -50%)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: place.image,
                                            alt: place.name,
                                            className: "w-12 h-12 object-contain",
                                            onError: (e)=>{
                                                e.target.src = "/illustrations/gallery.png";
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 248,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] bg-black/70 text-white px-1 rounded-sm mt-0.5 font-bold font-pixel-title block whitespace-nowrap",
                                            children: place.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 256,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, place.id, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 239,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex justify-between text-sm font-medium",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "진행률"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    Math.round(progress),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-green-500 transition-all duration-500",
                            style: {
                                width: `${progress}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 272,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-gray-600 font-pixel-title text-sm",
                        children: [
                            visitedCount,
                            " / ",
                            totalPlaces,
                            "개 방문"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 169,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_0ortfo6._.js.map