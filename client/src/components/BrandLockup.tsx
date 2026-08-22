/**
 * Velocity Drive visual system: Modern Motor Journal — one forward-leaning mark and split editorial wordmark used at every brand touchpoint.
 */
type BrandLockupProps = { inverse?: boolean };

export default function BrandLockup({ inverse = false }: BrandLockupProps) {
  const ink = inverse ? "text-white" : "text-[#0f1e2e]";
  const detail = inverse ? "text-white/60" : "text-slate-500";

  return (
    <span className="flex items-center gap-3 leading-none">
      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] border border-white/15 bg-[#0f1e2e] shadow-[0_6px_18px_rgba(15,30,46,0.12)]">
        <img src="/manus-storage/velocity-mark_b18ff697.png" alt="" className="relative z-10 h-7 w-7 object-contain" />
        <i className="absolute bottom-0 left-0 h-1 w-full bg-[#d97706]" />
      </span>
      <span className="grid gap-1 text-left">
        <span className={`font-editorial text-[23px] tracking-[-0.06em] ${ink}`}>Velocity<span className="ml-1 inline-block h-1.5 w-1.5 -translate-y-0.5 bg-[#d97706]" /></span>
        <span className={`text-[9px] font-extrabold uppercase tracking-[0.28em] ${detail}`}>Drive / Rental</span>
      </span>
    </span>
  );
}
