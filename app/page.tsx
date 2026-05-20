'use client'; //0519_2주차_브라우저에서 실행되는 기능(localStorage)을 사용한다는 것을 명시하는 지시문
import Image from "next/image"; //Next.js의 이미지 컴포턴트 기능 가져오기(모듈)
import { useEffect, useState } from "react";


export default function Home() {
  const totalPlaces = 20;

  const [visitedPlaces, setVisitedPlaces] = useState<string[]>([]); 
  // 방문한 장소들의 ID를 저장하는 상태 변수. 초기값은 빈 배열로 설정.
  // python: visited_places = []

  useEffect(() => {
    const saved = localStorage.getItem("visitedPlaces");
      // localStorage에서 "visitedPlaces"라는 키로 저장된 데이터를 가져와서 saved 변수에 저장.
    if (saved) {
      setVisitedPlaces(JSON.parse(saved));
    } //저장된 데이터(visitedPlaces 배열에 데이터 O)가 있을 때만 다음 코드를 실행
  }, []); //useEffect : 페이지가 처음 열렸을 때 한 번 실행되는 코드

  const visitedCount = visitedPlaces.length;
  const progress = (visitedCount / totalPlaces) * 100;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6">
        {/* 제목 */}
        <h1 className="text-3xl font-bold text-center mb-4">
          나만의 남구 문화지도 완성하기
        </h1>

        {/* 설명 */}
        <p className="text-gray-600 text-center mb-6 leading-relaxed">
          부산 남구의 문화시설을 방문하며
          <br />
          나만의 문화지도를 완성해보세요.
        </p>

        {/* 지도 이미지 */}
        <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-200">
          <Image
            src="/map-placeholder.png"
            alt="문화지도"
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
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
