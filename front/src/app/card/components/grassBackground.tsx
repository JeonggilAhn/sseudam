"use client";
import Image from "next/image";

const GrassBackground = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
      {/* <div className="z-[120] w-full h-[80vh] rounded-t-full bg-[#62B84A] translate-y-[35%]"></div> */}
      <Image
        src="/background.png"
        alt="배경 이미지"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};

export default GrassBackground;
