import Image from "next/image";

type IconProps = {
  name: string;
  width?: number;
  height?: number;
  alt?: string;
  isActive?: boolean;
  color?: string; // svg 파일에 따라 적용이 안 될 수 있음
};

const Icon = ({
  name,
  width = 60,
  height = 20,
  alt = "",
  isActive = true,
  color,
}: IconProps) => {
  const src = `/icons/${name}.svg`;

  const customStyle: React.CSSProperties = {
    filter: isActive ? "none" : "grayscale(100%)",
  };

  // color 필터가 있다면 기존 필터에 덮어씀
  if (color) {
    customStyle.filter = `invert(1) sepia(1) saturate(5) hue-rotate(${color})`;
  }

  return (
    <div style={{ width, height, position: "relative", ...customStyle }}>
      <Image
        src={src}
        alt={alt || name}
        fill
        sizes={`${width}px`}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default Icon;
