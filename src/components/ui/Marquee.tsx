import { ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

const speedMap = {
  slow: "45s",
  normal: "30s",
  fast: "18s",
};

export const Marquee = ({ items, speed = "normal", className = "" }: MarqueeProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

      <div
        className="flex w-max animate-marquee gap-12"
        style={{ animationDuration: speedMap[speed] }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
