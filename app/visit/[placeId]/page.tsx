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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
      <h1 className="text-5xl font-bold text-red-500 mb-4">
        테스트 방문 완료!
      </h1>

      {currentPlace && (
        <img
          src={currentPlace.image}
          alt={currentPlace.name}
          className="w-48 h-48 object-contain mb-6 rounded-2xl shadow-2xl transition-all duration-700"
          style={{
            animation: isAnimating
              ? "floatBounce 3s ease-out forwards"
              : "floating 3s ease-in-out infinite",
          }}
        />
      )}

      <p className="text-lg text-white mb-6">
        새로운 문화시설이 지도에 추가되었습니다.
      </p>

      <a
        href="/"
        className="px-6 py-3 bg-red-500 text-white rounded-full hover:scale-105 transition"
      >
        내 지도 보기
      </a>
    </main>
  );
}

