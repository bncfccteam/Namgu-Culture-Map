import { places } from "@/data/places";
import MapFacility from "./MapFacility";

type Props = {
  visitedPlaces: string[];
};

export default function MapCanvas({
  visitedPlaces,
}: Props) {
  return (
     <div
      className="relative w-full"
      style={{
        aspectRatio: "720 / 1560",
      }}
    >
      {/* 바다 */}
      <div
        className="
          absolute
          inset-0
          -z-10
          bg-repeat
        "
        style={{
          backgroundImage: "url('/img/water-tile.png')",
        }}
      />

      {/* 월드맵 */}
      <img
        src="/img/world-map.png"
        alt="world map"
        className="
          absolute
          inset-0
          w-full
          h-full
          "
      />

      {/* 시설 */}
      {places.map((place) => (
        <MapFacility
          key={place.id}
          name={place.name}
          image={place.mapImage}
          top={place.top}
          left={place.left}
          unlocked={visitedPlaces.includes(place.id)}
        />
      ))}

      {/* 하단 안개 */}
      <img
        src="/img/bottom-fog.png"
        alt=""
        className="
          absolute
          bottom-0
          left-0
          w-full
          pointer-events-none
        "
      />
    </div>
  );
}