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
    <main className="min-h-screen bg-gray-100 p-6 relative">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 text-black">
        {/* 제목 */}
        <h1 className="text-3xl font-bold text-center mb-4">
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
