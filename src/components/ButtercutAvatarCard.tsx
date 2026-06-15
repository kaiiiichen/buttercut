import Image from "next/image";

type ButtercutAvatarCardProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ButtercutAvatarCard({
  src,
  alt,
  className = "",
}: ButtercutAvatarCardProps) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width: 768px) 425px, 320px"
        className="object-cover object-top"
        unoptimized={src.endsWith(".svg")}
      />
    </div>
  );
}
