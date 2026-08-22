/**
 * Velocity Drive visual system: Modern Motor Journal — an operational search desk bridging editorial hero and fleet selection.
 */
import { ArrowRight, CalendarDays, CarFront, ChevronDown, MapPin } from "lucide-react";
import { FormEvent, useState } from "react";
import type { CarType } from "@/data/fleet";

export type QuickSearchCriteria = { location: string; pickupDate: string; returnDate: string; carType: "All" | CarType; };
type HeroSearchProps = { onSearch: (criteria: QuickSearchCriteria) => void; };
const fieldClass = "h-12 w-full appearance-none bg-transparent pr-8 text-sm font-bold text-[#0f1e2e] outline-none";

export default function HeroSearch({ onSearch }: HeroSearchProps) {
  const [criteria, setCriteria] = useState<QuickSearchCriteria>({ location: "Downtown Hub", pickupDate: "", returnDate: "", carType: "All" });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onSearch(criteria); };
  return <form onSubmit={handleSubmit} className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-[0_20px_60px_rgba(15,30,46,0.12)]"><div className="grid gap-1 lg:grid-cols-[1.1fr_1fr_1fr_1fr_auto]">
    <label className="relative flex min-w-0 items-center gap-3 rounded-[15px] px-3 py-2 transition focus-within:bg-slate-50"><MapPin className="h-5 w-5 shrink-0 text-slate-500" /><span className="min-w-0 flex-1"><span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">Pick-up point</span><select aria-label="Pick-up location" className={fieldClass} value={criteria.location} onChange={(event) => setCriteria({ ...criteria, location: event.target.value })}><option>Downtown Hub</option><option>Airport Terminal</option><option>Harbor District</option></select></span><ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400" /></label>
    <label className="relative flex min-w-0 items-center gap-3 rounded-[15px] px-3 py-2 transition focus-within:bg-slate-50"><CalendarDays className="h-5 w-5 shrink-0 text-slate-500" /><span className="min-w-0 flex-1"><span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">Pick-up date</span><input aria-label="Pick-up date" className={fieldClass} type="date" value={criteria.pickupDate} onChange={(event) => setCriteria({ ...criteria, pickupDate: event.target.value })} /></span></label>
    <label className="relative flex min-w-0 items-center gap-3 rounded-[15px] px-3 py-2 transition focus-within:bg-slate-50"><CalendarDays className="h-5 w-5 shrink-0 text-slate-500" /><span className="min-w-0 flex-1"><span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">Return date</span><input aria-label="Return date" className={fieldClass} type="date" value={criteria.returnDate} onChange={(event) => setCriteria({ ...criteria, returnDate: event.target.value })} /></span></label>
    <label className="relative flex min-w-0 items-center gap-3 rounded-[15px] px-3 py-2 transition focus-within:bg-slate-50"><CarFront className="h-5 w-5 shrink-0 text-slate-500" /><span className="min-w-0 flex-1"><span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">Vehicle class</span><select aria-label="Vehicle class" className={fieldClass} value={criteria.carType} onChange={(event) => setCriteria({ ...criteria, carType: event.target.value as QuickSearchCriteria["carType"] })}><option value="All">All vehicles</option><option value="SUV">SUV</option><option value="Sedan">Sedan</option><option value="Electric">Electric</option><option value="Luxury">Luxury</option></select></span><ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400" /></label>
    <button className="flex min-h-14 items-center justify-center gap-2 rounded-[15px] bg-[#0f1e2e] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#24374c] active:scale-[0.97]" type="submit">Find vehicles <ArrowRight className="h-4 w-4" /></button>
  </div></form>;
}
