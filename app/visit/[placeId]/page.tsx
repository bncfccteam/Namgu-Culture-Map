'use client';

import { useEffect } from "react";

type VisitPageProps = {
  params: {
    placeId: string;
  };
};

export default function VisitPage({ params }: VisitPageProps) {
  useEffect(() => {
    const placeId = params.placeId;

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
  }, [params.placeId]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">
        방문 완료!
      </h1>

      <p className="text-lg text-gray-600 mb-6">
        새로운 문화시설이 지도에 추가되었습니다.
      </p>

      <a
        href="/"
        className="px-6 py-3 bg-black text-white rounded-full"
      >
        내 지도 보기
      </a>
    </main>
  );
}

//깃허브에 마지막 내용 올렸는지 확인 (0521목욜에)