import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Rend la carte cliquable — deep-link vers son module (Command Center composable, §0.b). */
  href?: string;
}

export function Card({ children, className, href }: CardProps) {
  const body = <div className={cn("fm-glass-card fm-row rounded-2xl p-5", href && "cursor-pointer", className)}>{children}</div>;
  if (!href) return body;
  return (
    <Link href={href} className="block no-underline">
      {body}
    </Link>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("font-grotesk text-xs uppercase tracking-[0.14em] text-fmmuted", className)}>{children}</h3>;
}
