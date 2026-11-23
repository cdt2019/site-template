import { siteConfig } from "@/config/site";

/** 字标：青柠方块 + 衬线斜体首字母 + 品牌名 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid size-8 place-items-center rounded-[9px] bg-accent font-serif text-xl italic leading-none text-accent-ink shadow-[inset_0_-2px_0_rgb(0_0_0/0.12)]">
        {siteConfig.name.charAt(0)}
      </span>
      <span className="text-[1.05rem] font-semibold tracking-tight">{siteConfig.name}</span>
    </span>
  );
}
