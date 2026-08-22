/**
 * Velocity Drive visual system: Modern Motor Journal — a streamlined road-horizon emblem paired with an editorial split wordmark.
 */
type BrandLockupProps = { inverse?: boolean };

export default function BrandLockup({ inverse = false }: BrandLockupProps) {
  const ink = inverse ? "text-white" : "text-[#0f1e2e]";
  const detail = inverse ? "text-white/60" : "text-slate-500";
  const emblemSurface = inverse ? "bg-[#f8f7f2]" : "bg-white";
  return <span className="flex items-center gap-3 leading-none"><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[13px] ${emblemSurface} p-1.5 shadow-[0_5px_14px_rgba(15,30,46,0.10)]`}><img src="/manus-storage/velocity-drive-new-mark_c1ed0e2a.png" alt="" className="h-full w-full object-contain" /></span><span className="grid gap-1 text-left"><span className={`font-editorial text-[23px] tracking-[-0.06em] ${ink}`}>Velocity<span className="ml-1 inline-block h-1.5 w-1.5 -translate-y-0.5 bg-[#d97706]" /></span><span className={`text-[9px] font-extrabold uppercase tracking-[0.28em] ${detail}`}>Drive / Rental</span></span></span>;
}
