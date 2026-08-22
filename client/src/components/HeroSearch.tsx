/**
 * Velocity Drive visual system: Modern Motor Journal — a structured operational search desk with fixed icon lanes and deliberate date-picker affordances.
 */
import { ArrowRight, CalendarDays, CarFront, ChevronDown, MapPin } from "lucide-react";
import { FormEvent, useState } from "react";
import type { CarType } from "@/data/fleet";

export type QuickSearchCriteria = { location: string; pickupDate: string; returnDate: string; carType: "All" | CarType; };
type HeroSearchProps = { onSearch: (criteria: QuickSearchCriteria) => void; };

const labelClass = "text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400";

function formatDate(value: string, emptyLabel: string) {
  if (!value) return emptyLabel;
  const parsed = new Date(`${value}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? emptyLabel : new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(parsed);
}

export default function HeroSearch({ onSearch }: HeroSearchProps) {
  const [criteria, setCriteria] = useState<QuickSearchCriteria>({ location: "Downtown Hub", pickupDate: "", returnDate: "", carType: "All" });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onSearch(criteria); };

  return (
    <form onSubmit={handleSubmit} className="rounded-[22px] border border-slate-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,30,46,0.12)] sm:p-3">
      <div className="grid gap-2 lg:grid-cols-[1.15fr_1fr_1fr_1fr_184px] lg:gap-0 lg:overflow-hidden lg:rounded-[15px] lg:bg-slate-50 lg:divide-x lg:divide-slate-200">
        <SelectField icon={<MapPin className="h-5 w-5" />} label="Pick-up point" value={criteria.location} onChange={(value) => setCriteria({ ...criteria, location: value })} options={["Downtown Hub", "Airport Terminal", "Harbor District"]} />
        <DateField label="Pick-up date" value={criteria.pickupDate} onChange={(value) => setCriteria({ ...criteria, pickupDate: value })} />
        <DateField label="Return date" value={criteria.returnDate} onChange={(value) => setCriteria({ ...criteria, returnDate: value })} />
        <SelectField icon={<CarFront className="h-5 w-5" />} label="Vehicle class" value={criteria.carType} onChange={(value) => setCriteria({ ...criteria, carType: value as QuickSearchCriteria["carType"] })} options={["All vehicles", "SUV", "Sedan", "Electric", "Luxury"]} values={["All", "SUV", "Sedan", "Electric", "Luxury"]} />
        <button className="flex min-h-14 items-center justify-center gap-2 rounded-[14px] bg-[#0f1e2e] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#24374c] active:scale-[0.97] lg:m-1 lg:min-h-0" type="submit">Find vehicles <ArrowRight className="h-4 w-4" /></button>
      </div>
    </form>
  );
}

function SelectField({ icon, label, value, onChange, options, values }: { icon: React.ReactNode; label: string; value: string; onChange: (value: string) => void; options: string[]; values?: string[] }) {
  return (
    <label className="group relative flex min-h-[72px] items-center gap-3 rounded-[14px] border border-slate-200 bg-white px-4 transition focus-within:border-[#0f1e2e] focus-within:ring-4 focus-within:ring-slate-100 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-5 lg:focus-within:ring-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf0f3] text-[#0f1e2e] lg:h-auto lg:w-auto lg:bg-transparent">{icon}</span>
      <span className="min-w-0 flex-1"><span className={labelClass}>{label}</span><select aria-label={label} className="mt-1 block w-full appearance-none bg-transparent pr-6 text-sm font-extrabold text-[#0f1e2e] outline-none" value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option, index) => <option key={option} value={values?.[index] ?? option}>{option}</option>)}</select></span>
      <ChevronDown className="pointer-events-none h-4 w-4 shrink-0 text-slate-400 transition group-focus-within:rotate-180 group-focus-within:text-[#0f1e2e]" />
    </label>
  );
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="group relative flex min-h-[72px] items-center gap-3 rounded-[14px] border border-slate-200 bg-white px-4 transition focus-within:border-[#0f1e2e] focus-within:ring-4 focus-within:ring-slate-100 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-5 lg:focus-within:ring-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf0f3] text-[#0f1e2e] lg:h-auto lg:w-auto lg:bg-transparent"><CalendarDays className="h-5 w-5" /></span>
      <span className="min-w-0 flex-1"><span className={labelClass}>{label}</span><span className="mt-1 block truncate text-sm font-extrabold text-[#0f1e2e]">{formatDate(value, "Select date")}</span></span>
      <input aria-label={label} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" type="date" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
