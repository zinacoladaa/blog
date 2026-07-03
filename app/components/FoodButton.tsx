import Link from "next/link";

type FoodButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function FoodButton({
  href,
  children,
  variant = "primary",
}: FoodButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Link href={href} className="inline-block">
      <div className={`relative group cursor-pointer`}>
        {/* Bowl shape with SVG */}
        <svg
          className={`w-40 h-32 ${
            isPrimary
              ? "fill-[#7a1f2b] hover:fill-[#5a1620]"
              : "fill-white hover:fill-[#1b6b4a]/5 stroke-[#1b6b4a]"
          } transition-all duration-300 drop-shadow-lg group-hover:drop-shadow-2xl`}
          viewBox="0 0 200 160"
          preserveAspectRatio="none"
        >
          {/* Bowl shape - curved top, wider at top */}
          <path
            d="M 20 80 Q 20 20, 100 10 Q 180 20, 180 80 L 180 140 Q 180 150, 170 150 L 30 150 Q 20 150, 20 140 Z"
            strokeWidth={variant === "secondary" ? "2" : "0"}
          />

          {/* Chopsticks decoration */}
          <line x1="60" y1="40" x2="50" y2="130" stroke="#fff" strokeWidth="2" opacity="0.3" />
          <line x1="140" y1="40" x2="150" y2="130" stroke="#fff" strokeWidth="2" opacity="0.3" />
        </svg>

        {/* Text inside the bowl */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-semibold text-center px-4 ${
              isPrimary ? "text-white" : "text-[#1b6b4a]"
            } text-sm leading-tight`}
          >
            {children}
          </span>
        </div>
      </div>
    </Link>
  );
}
