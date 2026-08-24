/**
 * Velocity Drive visual system: editorial vehicle discovery with a focused lead card,
 * compact supporting cards, and motion that respects visitor preferences.
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarCheck2, Check, ChevronRight, CircleDollarSign, Heart, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { CarType, FleetCar } from "@/data/fleet";
import { fleetCategories } from "@/data/fleet";
import { Link, useLocation } from "wouter";

type SortBy = "featured" | "low" | "high" | "newest" | "popular";
export type PriceBand = "all" | "under-70" | "70-100" | "over-100";
export type PassengerBand = "all" | "five" | "six-plus";
export type FuelFilter = "all" | "petrol" | "hybrid" | "electric";
type CarGridProps = {
  cars: FleetCar[];
  searchTerm: string;
  selectedCategory: "All" | CarType;
  sortBy: SortBy;
  priceBand: PriceBand;
  passengerBand: PassengerBand;
  fuelFilter: FuelFilter;
  savedCarIds: string[];
  availabilityLabel: string;
  totalCars: number;
  isFiltering: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: "All" | CarType) => void;
  onSortChange: (value: SortBy) => void;
  onPriceBandChange: (value: PriceBand) => void;
  onPassengerBandChange: (value: PassengerBand) => void;
  onFuelFilterChange: (value: FuelFilter) => void;
  onClearFilters: () => void;
  onBook: (car: FleetCar) => void;
  onToggleSaved: (carId: string) => void;
};

const priceFilters: Array<{ value: PriceBand; label: string }> = [
  { value: "all", label: "Any daily rate" },
  { value: "under-70", label: "Under $70 / day" },
  { value: "70-100", label: "$70–$100 / day" },
  { value: "over-100", label: "$100+ / day" },
];
const passengerFilters: Array<{ value: PassengerBand; label: string }> = [
  { value: "all", label: "Any cabin size" },
  { value: "five", label: "Up to 5 seats" },
  { value: "six-plus", label: "6+ seats" },
];

export default function CarGrid({
  cars,
  searchTerm,
  selectedCategory,
  sortBy,
  priceBand,
  passengerBand,
  fuelFilter,
  savedCarIds,
  availabilityLabel,
  totalCars,
  isFiltering,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onPriceBandChange,
  onPassengerBandChange,
  onFuelFilterChange,
  onClearFilters,
  onBook,
  onToggleSaved,
}: CarGridProps) {
  const [leadCar, ...comparisonCars] = cars;
  const [, setLocation] = useLocation();
  const [openingCarId, setOpeningCarId] = useState<string | null>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const hasActiveFilters = Boolean(searchTerm || selectedCategory !== "All" || sortBy !== "featured" || priceBand !== "all" || passengerBand !== "all" || fuelFilter !== "all");
  const filterChips = [searchTerm && `Search: ${searchTerm}`, selectedCategory !== "All" && selectedCategory, fuelFilter !== "all" && `${fuelFilter} fuel`, priceBand !== "all" && priceFilters.find((filter) => filter.value === priceBand)?.label, passengerBand !== "all" && passengerFilters.find((filter) => filter.value === passengerBand)?.label].filter(Boolean) as string[];

  const openVehicle = (event: React.MouseEvent<HTMLAnchorElement>, carId: string) => {
    event.preventDefault();
    if (openingCarId) return;
    setOpeningCarId(carId);
    window.setTimeout(() => setLocation(`/fleet/${carId}`), reduceMotion ? 0 : 230);
  };

  return (
    <section id="fleet" className="scroll-mt-24 bg-[#f7f8f6] py-[4.5rem] sm:py-20">
      <div className="container">
        <div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <p className="eyebrow"><span /> The fleet</p>
              <span className="h-px w-8 bg-slate-300" />
              <span className="fleet-kicker text-slate-400">01 / vehicle journal</span>
            </div>
            <h2 className="mt-5 max-w-xl font-editorial text-4xl leading-[0.98] tracking-[-0.055em] text-[#0f1e2e] sm:text-5xl">Find the car that fits the way you move</h2>
          </div>
          <p className="max-w-[72rem] text-sm leading-7 text-slate-600 sm:text-[15px]">Use the filter rail to compare cabin space, vehicle type, and daily rate before choosing a better match for the journey</p>
        </div>

        <div className="route-rule mt-10" />
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-600">
          <CalendarCheck2 className="h-4 w-4 shrink-0 text-[#d97706]" />
          {availabilityLabel}
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[252px_minmax(0,1fr)]">
          <FilterSidebar selectedCategory={selectedCategory} priceBand={priceBand} passengerBand={passengerBand} fuelFilter={fuelFilter} hasActiveFilters={hasActiveFilters} onCategoryChange={onCategoryChange} onPriceBandChange={onPriceBandChange} onPassengerBandChange={onPassengerBandChange} onFuelFilterChange={onFuelFilterChange} onClear={onClearFilters} />
          <div className="min-w-0">
            <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
              <div className="relative w-full 2xl:max-w-sm">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search a model or class" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-[#0f1e2e] outline-none transition placeholder:text-slate-400 focus:border-[#0f1e2e] focus:ring-4 focus:ring-slate-200" aria-label="Search the fleet" />
              </div>
              <label className="relative flex h-12 w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-500 sm:w-auto">
                <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                <span className="sr-only">Sort the fleet</span>
                <select aria-label="Sort the fleet" className="w-full appearance-none bg-transparent pr-5 text-xs font-extrabold text-[#0f1e2e] outline-none sm:w-auto" value={sortBy} onChange={(event) => onSortChange(event.target.value as SortBy)}>
                  <option value="featured">Featured first</option>
                  <option value="low">Price: low to high</option>
                  <option value="high">Price: high to low</option>
                  <option value="newest">Newest model year</option>
                  <option value="popular">Most popular</option>
                </select>
              </label>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-bold text-slate-500">Showing <strong className="text-[#0f1e2e]">{cars.length}</strong> of {totalCars} demo vehicles</p>{filterChips.length > 0 && <div className="flex flex-wrap items-center gap-2">{filterChips.map((chip) => <span key={chip} className="rounded-full bg-[#eaf0f3] px-3 py-1.5 text-[11px] font-extrabold text-slate-600">{chip}</span>)}<button onClick={onClearFilters} className="text-[11px] font-extrabold text-[#b45309] transition hover:text-[#0f1e2e]">Clear all</button></div>}</div>

            <div className="relative mt-5 min-h-[360px]">
              <AnimatePresence>{isFiltering && !openingCarId && <FleetSkeleton />}{openingCarId && <FleetLoadingOverlay openingVehicle />}</AnimatePresence>
              <AnimatePresence mode="popLayout">
                {leadCar && <LeadVehicle key={leadCar.id} car={leadCar} saved={savedCarIds.includes(leadCar.id)} onBook={onBook} onToggleSaved={onToggleSaved} onOpenDetails={openVehicle} reduceMotion={reduceMotion} />}
              </AnimatePresence>
              {comparisonCars.length > 0 && (
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {comparisonCars.map((car, index) => <ComparisonVehicle key={car.id} car={car} index={index} saved={savedCarIds.includes(car.id)} onBook={onBook} onToggleSaved={onToggleSaved} onOpenDetails={openVehicle} reduceMotion={reduceMotion} />)}
                  </AnimatePresence>
                </div>
              )}
              {cars.length === 0 && <EmptyFleet onClear={onClearFilters} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterSidebar({ selectedCategory, priceBand, passengerBand, fuelFilter, hasActiveFilters, onCategoryChange, onPriceBandChange, onPassengerBandChange, onFuelFilterChange, onClear }: { selectedCategory: "All" | CarType; priceBand: PriceBand; passengerBand: PassengerBand; fuelFilter: FuelFilter; hasActiveFilters: boolean; onCategoryChange: (value: "All" | CarType) => void; onPriceBandChange: (value: PriceBand) => void; onPassengerBandChange: (value: PassengerBand) => void; onFuelFilterChange: (value: FuelFilter) => void; onClear: () => void }) {
  return <aside className="h-fit rounded-[20px] border border-slate-200 bg-white p-5 xl:sticky xl:top-24"><div className="flex items-start justify-between gap-3"><div><p className="eyebrow"><span /> Filter rail</p><h3 className="mt-3 font-editorial text-3xl tracking-[-0.055em] text-[#0f1e2e]">Narrow the route</h3></div><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf0f3] text-[#0f1e2e]"><SlidersHorizontal className="h-4 w-4" /></span></div><FilterGroup title="Vehicle type">{fleetCategories.map((category) => <FilterChoice key={category} checked={selectedCategory === category} label={category === "All" ? "All vehicle types" : category} onClick={() => onCategoryChange(category)} />)}</FilterGroup><FilterGroup title="Fuel type">{(["all", "petrol", "hybrid", "electric"] as FuelFilter[]).map((fuel) => <FilterChoice key={fuel} checked={fuelFilter === fuel} label={fuel === "all" ? "Any fuel" : `${fuel[0].toUpperCase()}${fuel.slice(1)}`} onClick={() => onFuelFilterChange(fuel)} />)}</FilterGroup><FilterGroup title="Daily rate">{priceFilters.map((filter) => <FilterChoice key={filter.value} checked={priceBand === filter.value} label={filter.label} onClick={() => onPriceBandChange(filter.value)} />)}</FilterGroup><FilterGroup title="Passenger capacity">{passengerFilters.map((filter) => <FilterChoice key={filter.value} checked={passengerBand === filter.value} label={filter.label} onClick={() => onPassengerBandChange(filter.value)} />)}</FilterGroup><button disabled={!hasActiveFilters} onClick={onClear} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-extrabold text-slate-600 transition hover:border-[#0f1e2e] hover:text-[#0f1e2e] disabled:cursor-not-allowed disabled:opacity-40"><RotateCcw className="h-3.5 w-3.5" /> Reset filters</button></aside>;
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) { return <div className="mt-6 border-t border-slate-100 pt-5"><p className="fleet-kicker text-slate-400">{title}</p><div className="mt-3 space-y-1">{children}</div></div>; }
function FilterChoice({ checked, label, onClick }: { checked: boolean; label: string; onClick: () => void }) { return <button onClick={onClick} aria-pressed={checked} className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-xs font-bold transition ${checked ? "bg-[#eaf0f3] text-[#0f1e2e]" : "text-slate-500 hover:bg-slate-50 hover:text-[#0f1e2e]"}`}><span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${checked ? "border-[#0f1e2e] bg-[#0f1e2e] text-white" : "border-slate-300 bg-white"}`}>{checked && <Check className="h-3 w-3" />}</span>{label}</button>; }
function FleetLoadingOverlay({ openingVehicle = false }: { openingVehicle?: boolean }) { return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.14 }} className="absolute inset-0 z-20 flex items-center justify-center rounded-[20px] bg-[#f7f8f6]/82 backdrop-blur-[2px]" aria-live="polite"><motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-lg"><span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf0f3] text-[#d97706]"><CircleDollarSign className="h-4 w-4 animate-pulse" /></span><p className="mt-2 text-xs font-extrabold text-[#0f1e2e]">{openingVehicle ? "Opening vehicle journal" : "Refining the fleet"}</p><p className="mt-1 text-[10px] font-bold text-slate-400">{openingVehicle ? "Preparing the full specification view" : "Matching your route and filters"}</p></motion.div></motion.div>; }
function FleetSkeleton() { return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.14 }} className="absolute inset-0 z-20 grid gap-4 rounded-[20px] bg-[#f7f8f6]/94 p-1 md:grid-cols-2 xl:grid-cols-3" aria-live="polite" aria-label="Updating vehicle results"><div className="rounded-[24px] border border-slate-200 bg-white p-5 md:col-span-2 xl:col-span-3"><div className="h-48 rounded-2xl bg-slate-200 motion-safe:animate-pulse sm:h-56" /><div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]"><div className="space-y-3"><div className="h-7 w-48 rounded bg-slate-200 motion-safe:animate-pulse" /><div className="h-4 w-32 rounded bg-slate-100 motion-safe:animate-pulse" /></div><div className="h-9 w-20 rounded bg-slate-200 motion-safe:animate-pulse" /></div></div>{Array.from({ length: 3 }, (_, index) => <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="h-28 rounded-xl bg-slate-200 motion-safe:animate-pulse" /><div className="mt-4 h-5 w-2/3 rounded bg-slate-200 motion-safe:animate-pulse" /><div className="mt-3 h-3 w-full rounded bg-slate-100 motion-safe:animate-pulse" /></div>)}</motion.div>; }
function SaveButton({ saved, carId, onToggleSaved }: { saved: boolean; carId: string; onToggleSaved: (carId: string) => void }) { return <button onClick={() => onToggleSaved(carId)} aria-label={saved ? "Remove from saved vehicles" : "Save vehicle"} className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${saved ? "border-[#d97706] bg-orange-50 text-[#d97706]" : "border-slate-200 bg-white text-slate-500 hover:border-[#0f1e2e] hover:text-[#0f1e2e]"}`}><Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} /></button>; }

function LeadVehicle({ car, saved, onBook, onToggleSaved, onOpenDetails, reduceMotion }: { car: FleetCar; saved: boolean; onBook: (car: FleetCar) => void; onToggleSaved: (carId: string) => void; onOpenDetails: (event: React.MouseEvent<HTMLAnchorElement>, carId: string) => void; reduceMotion: boolean }) {
  return <motion.article layout initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} whileInView={{ opacity: 1, y: 0 }} whileHover={reduceMotion ? undefined : { y: -4 }} viewport={{ once: true, amount: 0.18 }} exit={{ opacity: 0, y: reduceMotion ? 0 : 12 }} transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }} className="fleet-card group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition duration-300 hover:border-slate-400 hover:shadow-[0_25px_58px_rgba(15,30,46,0.13)] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
    <Link href={`/fleet/${car.id}`} onClick={(event) => onOpenDetails(event, car.id)} className="relative block min-h-[290px] overflow-hidden bg-[#eaf0f3] lg:min-h-[420px]" aria-label={`View full details for ${car.name}`}><img src={car.image} alt={`${car.name} ${car.modelYear}`} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.055]" /><div className="absolute inset-0 bg-gradient-to-t from-[#0f1e2e]/60 via-transparent to-transparent transition group-hover:from-[#0f1e2e]/70" /><div className="absolute bottom-5 left-5 flex items-end gap-4 text-white"><span className="font-editorial text-5xl tracking-[-0.07em]">01</span><span className="fleet-kicker mb-1.5 text-white/75">Lead selection / {car.type}</span></div></Link>
    <div className="flex flex-col p-6 sm:p-7 lg:px-8 lg:pb-7 lg:pt-8"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="fleet-kicker text-slate-400">Featured for today</p><Link href={`/fleet/${car.id}`} onClick={(event) => onOpenDetails(event, car.id)} className="mt-3 block max-w-[26rem] font-editorial text-[44px] leading-[0.95] tracking-[-0.055em] text-[#0f1e2e] transition hover:text-[#d97706] sm:text-[48px]">{car.name}</Link><p className="mt-2 text-sm font-bold text-slate-500">{car.modelYear} · {car.accent}</p></div><div className="flex shrink-0 items-center gap-2"><span className="rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#b45309]">Available</span><SaveButton saved={saved} carId={car.id} onToggleSaved={onToggleSaved} /></div></div><p className="mt-5 max-w-md border-l-2 border-[#d97706] pl-4 text-sm leading-6 text-slate-600">{car.note}</p><div className="my-6 grid grid-cols-[1fr_1.35fr_1fr] border-y border-slate-200"><SpecRail label="Energy" value={car.fuel} /><SpecRail label="Transmission" value={car.transmission} /><SpecRail label="Capacity" value={`${car.seats} seats`} /></div><div className="mt-auto flex flex-wrap items-end justify-between gap-5"><div><p className="fleet-kicker text-slate-400">Daily rate</p><p className="mt-1 font-editorial text-5xl tracking-[-0.065em] text-[#d97706]">${car.rate}<span className="ml-1 font-sans text-sm font-bold tracking-normal text-slate-400">/ day</span></p></div><div className="flex flex-wrap gap-3"><Link href={`/fleet/${car.id}`} onClick={(event) => onOpenDetails(event, car.id)} className="fleet-action flex h-12 items-center gap-2 rounded-xl border-[1.5px] border-slate-300 px-4 text-sm font-extrabold text-[#0f1e2e] transition hover:border-[#0f1e2e]">Full details <ChevronRight className="h-4 w-4" /></Link><button onClick={() => onBook(car)} className="fleet-action flex h-12 items-center gap-2 rounded-xl bg-[#d97706] px-5 text-sm font-extrabold text-white transition hover:bg-[#b45309] active:scale-[0.97]">Reserve <ArrowUpRight className="h-4 w-4" /></button></div></div></div>
  </motion.article>;
}

function ComparisonVehicle({ car, index, saved, onBook, onToggleSaved, onOpenDetails, reduceMotion }: { car: FleetCar; index: number; saved: boolean; onBook: (car: FleetCar) => void; onToggleSaved: (carId: string) => void; onOpenDetails: (event: React.MouseEvent<HTMLAnchorElement>, carId: string) => void; reduceMotion: boolean }) {
  return <motion.article layout initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }} whileHover={reduceMotion ? undefined : { y: -5 }} viewport={{ once: true, amount: 0.12 }} exit={{ opacity: 0, y: reduceMotion ? 0 : 12 }} transition={{ duration: 0.26, delay: reduceMotion ? 0 : index * 0.06, ease: [0.23, 1, 0.32, 1] }} className="fleet-card group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition duration-300 hover:border-slate-400 hover:shadow-[0_22px_42px_rgba(15,30,46,0.12)]">
    <Link href={`/fleet/${car.id}`} onClick={(event) => onOpenDetails(event, car.id)} className="relative block h-[250px] overflow-hidden bg-[#eaf0f3] sm:h-[270px]" aria-label={`View full details for ${car.name}`}><img src={car.image} alt={`${car.name} ${car.modelYear}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.07]" /><div className="absolute inset-0 bg-gradient-to-t from-[#0f1e2e]/25 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" /><span className="fleet-kicker absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[#0f1e2e]"><span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" /> {car.type}</span><span className="absolute inset-0 flex items-center justify-center"><span className="translate-y-2 rounded-xl bg-white px-4 py-2 text-xs font-extrabold text-[#0f1e2e] opacity-0 shadow-lg transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">Quick view</span></span><span className="fleet-kicker absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[#0f1e2e]">0{index + 2} / {car.badge}</span></Link>
    <span className="absolute right-3 top-3"><SaveButton saved={saved} carId={car.id} onToggleSaved={onToggleSaved} /></span>
    <div className="p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><Link href={`/fleet/${car.id}`} onClick={(event) => onOpenDetails(event, car.id)} className="block font-editorial text-[23px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#0f1e2e] transition hover:text-[#d97706]">{car.name}</Link><p className="mt-1 text-xs font-bold text-slate-500">{car.modelYear}</p></div><p className="flex shrink-0 items-baseline font-editorial text-[22px] font-bold tracking-[-0.045em] text-[#0f1e2e]">${car.rate}<span className="ml-0.5 font-sans text-sm font-bold tracking-normal text-[#0f1e2e]">/d</span></p></div><p className="fleet-card-description mt-3 text-sm leading-[1.5] text-[#666]">{car.accent}</p><div className="mt-4 grid grid-cols-3 border-y border-slate-100"><SpecRail label="Energy" value={car.fuel} compact /><SpecRail label="Drive" value={car.transmission} compact /><SpecRail label="Cabin" value={`${car.seats} seats`} compact /></div><div className="mt-4 flex items-center justify-between gap-3"><Link href={`/fleet/${car.id}`} onClick={(event) => onOpenDetails(event, car.id)} className="fleet-action flex items-center gap-1.5 text-[13px] font-extrabold text-[#0f1e2e] transition hover:text-[#d97706]">Vehicle profile <ChevronRight className="h-3.5 w-3.5" /></Link><button onClick={() => onBook(car)} className="fleet-action text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#b45309]">Reserve</button></div></div>
  </motion.article>;
}

function SpecRail({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) { return <div className={`fleet-spec min-w-0 border-r border-slate-200 last:border-r-0 ${compact ? "px-2 py-3 first:pl-0 last:pr-0" : "px-3 py-4 first:pl-0 last:pr-0"}`}><p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-slate-400">{label}</p><p className={`mt-0.5 break-words font-bold leading-[1.35] text-[#0f1e2e] ${compact ? "text-[13px]" : "text-sm"}`}>{value}</p></div>; }
function EmptyFleet({ onClear }: { onClear: () => void }) { return <div className="flex min-h-80 flex-col items-center justify-center rounded-[20px] border border-dashed border-slate-300 bg-white px-6 text-center"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-[#0f1e2e]"><CalendarCheck2 className="h-5 w-5" /></span><h3 className="mt-4 font-editorial text-2xl text-[#0f1e2e]">No vehicles match this route</h3><p className="mt-2 max-w-sm text-sm text-slate-500">Try widening the daily rate or cabin filter, choose another date window, or reset the rail to see the broader fleet</p><button onClick={onClear} className="mt-5 flex items-center gap-2 rounded-xl bg-[#0f1e2e] px-4 py-3 text-xs font-extrabold text-white transition hover:bg-[#d97706]"><RotateCcw className="h-3.5 w-3.5" /> Reset the fleet</button></div>; }
