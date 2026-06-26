module.exports = [
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)"); //Next.js의 이미지 컴포턴트 기능 가져오기(모듈)
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client'; //0519_2주차_브라우저에서 실행되는 기능(localStorage)을 사용한다는 것을 명시하는 지시문
;
;
;
// ----------------------------------------------------
// [6.2단계 - Supabase 안전 로드 시스템]
// - 브라우저 런타임 환경에서 'process is not defined' 에러가 발생하는 것을 
//   원천적으로 방지하기 위해 window 객체 및 조건부 검사 필터를 내장한 로더입니다.
// ----------------------------------------------------
let supabaseInstance = null;
const getSupabaseInstance = async ()=>{
    if (supabaseInstance) return supabaseInstance;
    // 브라우저 환경(typeof window !== 'undefined')에서 Next.js 환경 변수를 안전하게 가로챕니다.
    const supabaseUrl = typeof process !== 'undefined' && process.env ? ("TURBOPACK compile-time value", "https://bkqakvlpdbntnnemrsxl.supabase.co") : window.__NEXT_DATA__?.env?.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = typeof process !== 'undefined' && process.env ? ("TURBOPACK compile-time value", "sb_publishable_Va1ioF0kRDIGsivnjn6RKw_Kd96-5cc") : window.__NEXT_DATA__?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
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
    // 런타임 변수 획득 실패 시, window 혹은 로컬 보완책을 통해 주소를 한 번 더 검증합니다.
    const finalUrl = supabaseUrl || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "");
    const finalKey = supabaseAnonKey || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "");
    if (createClientFn && finalUrl && finalKey) {
        supabaseInstance = createClientFn(finalUrl, finalKey);
    }
    return supabaseInstance;
};
function Home() {
    const totalPlaces = 20;
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
    //useEffect : 페이지가 처음 열렸을 때 한 번 실행되는 코드 블록
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const syncAndFetchVisits = async ()=>{
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
            // 1. 5단계에서 기기에 심어둔 사용자 고유 ID(UUID)를 가져옵니다.
            const savedUserId = undefined;
            // 2. 로컬 브라우저 저장소(localStorage)의 기존 방문 기록을 먼저 확보합니다.
            const localSaved = undefined;
            const localPlaces = undefined;
            let mergedPlaces;
        };
        syncAndFetchVisits();
    }, []);
    const visitedCount = visitedPlaces.length;
    const progress = visitedCount / totalPlaces * 100;
    {}
    //각 객체는 시설의 ID, 이미지 경로, 지도에서의 위치(상단과 좌측 비율)를 포함.
    const places = [
        {
            id: "library",
            image: "/illustrations/library.png",
            top: "20%",
            left: "30%"
        },
        {
            id: "museum",
            image: "/illustrations/museum.png",
            top: "45%",
            left: "55%"
        },
        {
            id: "gallery",
            image: "/illustrations/gallery.png",
            top: "65%",
            left: "40%"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gray-100 p-6 relative text-black",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            lineNumber: 156,
                            columnNumber: 11
                        }, this),
                        isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full animate-pulse font-medium",
                            children: "동기화 중"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium",
                            children: "서버 연결됨"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 164,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-center mb-4 leading-tight",
                    children: "나만의 남구 문화지도 완성하기"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 text-center mb-6 leading-relaxed",
                    children: [
                        "문화시설 방문을 통해",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this),
                        "나만의 디지털 지도를 활성화해보세요."
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "/img/map-placeholder.png",
                            alt: "문화지도",
                            width: 800,
                            height: 800,
                            className: "w-full h-full object-cover opacity-50"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, this),
                        places.map((place)=>{
                            if (!visitedPlaces.includes(place.id)) return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: place.image,
                                alt: place.id,
                                className: "absolute w-16 h-16 object-contain animate-floating",
                                style: {
                                    top: place.top,
                                    left: place.left
                                }
                            }, place.id, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 199,
                                columnNumber: 15
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-2 flex justify-between text-sm font-medium",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "진행률"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                Math.round(progress),
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 215,
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
                        lineNumber: 222,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-600",
                    children: [
                        visitedCount,
                        " / ",
                        totalPlaces,
                        "개 방문"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 229,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 152,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_page_tsx_0es_sk2._.js.map