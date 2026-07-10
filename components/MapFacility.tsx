type Props = {
  id : string;
  name: string;
  image: string;
  top: string;
  left: string;
  unlocked: boolean;

  zIndex: number;
};

export default function MapFacility({
  id,
  name,
  image,
  top,
  left,
  unlocked,
  zIndex,

}: Props) {
  return (
    <div
      className="
        absolute
        flex
        flex-col
        items-center
        cursor-pointer "
      style={{
        left,
        top,
        zIndex,
        transform: "translate(-50%, -50%)",
      }}
    >

      {/* 시설명 시스템창 */}
       <div
          className={`
            absolute
            w-max
            mb-[-3px]
            px-[3px]
            py-0
            border-1
            border-black
            text-[9px]
            whitespace-nowrap
            flex
            items-center
            justify-center
            font-galmuri
            z-20
            pointer-events-none
            ${
              unlocked
                ? "bg-white text-black"
                : "bg-gray-500 text-black"
            }
          `}
          style={{
            top: unlocked ? "-10px" : "-20px",
          }}
        >
          {name}
        </div>


        {/* unlocked : 시설 이미지 locked : 자물쇠 아이콘 */}
        {unlocked ? (
          <img
            src={image}
            alt={name}
            className="w-16 h-16 object-contain relative z-10"
          />
        ) : (

          //잠금 아이콘 이미지
          <img
            src="/img/lock.png"
            alt="잠금"
            className="w-8 h-8 object-contain relative z-0"
          />
        )}

    </div>
  );
}
