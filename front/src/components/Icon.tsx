// Icon.tsx
type IconProps = {
  name: string;
  width?: number;
  height?: number;
  alt?: string;
  isActive?: boolean;
  color?: string; //svg 파일에 따라 적용이 안 될 수 있음
};

const Icon = ({ name, width = 45, height = 15, alt = "", isActive = true, color }: IconProps) => {
  const src = `/icons/${name}.svg`;

  return (
    <img
      src={src}
      alt={alt || name}
      width={width}
      height={height}
      style={{
        filter: isActive ? "none" : "grayscale(100%)",
        ...(color ? { filter: `invert(1) sepia(1) saturate(5) hue-rotate(${color})` } : {}),
      }}
    />
  );
};

export default Icon;
