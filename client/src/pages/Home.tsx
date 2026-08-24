/**
 * Velocity Drive visual system: Modern Motor Journal — a light automotive editorial with an off-center hero stage, route labels, and amber reserved for priority states.
 */
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, BadgeCheck, CalendarCheck2, CarFront, CircleDollarSign, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import BookingModal from "@/components/BookingModal";
import CarGrid, { type FuelFilter, type PassengerBand, type PriceBand } from "@/components/CarGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroSearch, { type QuickSearchCriteria } from "@/components/HeroSearch";
import Navbar from "@/components/Navbar";
import { fleet, isCarAvailableForDates, type CarType, type FleetCar } from "@/data/fleet";
import type { TripRecord } from "@/lib/velocityStore";
import { useBookings } from "@/lib/useBookings";
import { useFleetVisibility } from "@/lib/useFleetVisibility";
import { useFavorites } from "@/lib/useFavorites";
import { staticAssetPath } from "@/lib/staticDemo";
import { toast } from "sonner";

type SortBy = "featured" | "low" | "high" | "newest" | "popular";
const pageReveal = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };

export default function Home() {

  const reduceMotion = Boolean(useReducedMotion());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | CarType>("All");
  const [sortBy, setSortBy] = useState<SortBy>("featured");
  const [priceBand, setPriceBand] = useState<PriceBand>("all");
  const [passengerBand, setPassengerBand] = useState<PassengerBand>("all");
  const [fuelFilter, setFuelFilter] = useState<FuelFilter>("all");
  const [isFiltering, setIsFiltering] = useState(false);
  const hasInitializedFilters = useRef(false);
  const [selectedCar, setSelectedCar] = useState<FleetCar | null>(null);
  const [rentalCriteria, setRentalCriteria] = useState<QuickSearchCriteria>({ location: "Bishkek Downtown Hub", pickupDate: "", returnDate: "", carType: "All" });
  const { savedCarIds, toggleFavorite, isSynced: areFavoritesSynced } = useFavorites();
  const { addBooking } = useBookings();
  const { visibleCarIds } = useFleetVisibility();
  useEffect(() => {
    if (!hasInitializedFilters.current) {
      hasInitializedFilters.current = true;
      return;
    }
    setIsFiltering(true);
    const timer = window.setTimeout(() => setIsFiltering(false), 280);
    return () => window.clearTimeout(timer);
  }, [searchTerm, selectedCategory, sortBy, priceBand, passengerBand, fuelFilter, rentalCriteria]);
  const filteredFleet = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const visible = fleet.filter((car) => visibleCarIds.includes(car.id) && (!normalizedSearch || `${car.name} ${car.modelYear} ${car.type} ${car.fuel}`.toLowerCase().includes(normalizedSearch)) && (selectedCategory === "All" || car.type === selectedCategory) && (fuelFilter === "all" || car.fuel.toLowerCase().includes(fuelFilter)) && (priceBand === "all" || priceBand === "under-70" && car.rate < 70 || priceBand === "70-100" && car.rate >= 70 && car.rate <= 100 || priceBand === "over-100" && car.rate > 100) && (passengerBand === "all" || passengerBand === "five" && car.seats <= 5 || passengerBand === "six-plus" && car.seats >= 6) && isCarAvailableForDates(car, rentalCriteria.pickupDate, rentalCriteria.returnDate));
    return [...visible].sort((a, b) => sortBy === "low" ? a.rate - b.rate : sortBy === "high" ? b.rate - a.rate : sortBy === "newest" ? Number(b.modelYear) - Number(a.modelYear) : sortBy === "popular" ? b.popularity - a.popularity : 0);
  }, [searchTerm, selectedCategory, sortBy, priceBand, passengerBand, fuelFilter, rentalCriteria, visibleCarIds]);
  const scrollToFleet = () => { const target = document.querySelector<HTMLElement>("#fleet"); if (!target) return; const headerHeight = document.querySelector<HTMLElement>(".interior-nav")?.offsetHeight ?? 76; const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - 12); window.scrollTo({ top, behavior: "smooth" }); };
  const handleQuickSearch = (criteria: QuickSearchCriteria) => { setRentalCriteria(criteria); setSelectedCategory(criteria.carType); };
  const handleToggleSaved = (carId: string) => { const car = fleet.find((entry) => entry.id === carId); const removing = savedCarIds.includes(carId); toggleFavorite(carId); if (car) toast.success(removing ? `${car.name} removed from Favorites.` : `${car.name} added to Favorites.`); };
  const handleBookingComplete = (booking: TripRecord) => addBooking(booking);
  const clearFleetFilters = () => { setSearchTerm(""); setSelectedCategory("All"); setSortBy("featured"); setPriceBand("all"); setPassengerBand("all"); setFuelFilter("all"); };
  return <div id="home" className="velocity-interior min-h-screen overflow-x-hidden bg-[#f7f8f6] text-[#0f1e2e]"><Navbar /><main>
    <section className="hero-atmosphere interior-hero relative overflow-hidden bg-[#eaf0f3] pb-4 pt-12 sm:pt-16 lg:min-h-[calc(100svh-76px)] lg:pb-8 lg:pt-4 xl:pt-5"><div className="absolute right-0 top-0 hidden h-full w-[42%] bg-white/45 lg:block" /><div className="wide-shell relative z-10"><div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(500px,0.9fr)] lg:gap-12 xl:gap-16 2xl:grid-cols-[minmax(0,0.78fr)_minmax(720px,1.22fr)] 2xl:gap-10">
      <motion.div initial="hidden" animate="visible" transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }} variants={pageReveal} className="hero-copy interior-hero-copy pb-0 lg:pb-4 xl:pb-6"><p className="eyebrow"><span /> Modern car rental</p><h1 className="interior-display mt-6 max-w-[790px] font-hero-display text-[clamp(3.1rem,10vw,4.45rem)] leading-[0.9] tracking-[-0.045em] text-[#0f1e2e] sm:text-[clamp(3.7rem,6vw,5rem)] lg:text-[clamp(4.7rem,4.85vw,5.8rem)]"><span className="lg:block lg:whitespace-nowrap">The fleet for a</span> <em className="font-medium text-[#d97706] sm:whitespace-nowrap">well-planned</em><span className="block whitespace-nowrap">way forward</span></h1><p className="mt-7 max-w-[34rem] text-[15px] leading-7 text-slate-600 sm:text-base lg:mt-8 lg:text-[17px] lg:leading-8">From weekday work to a weekend away, select a vehicle with clear pricing, practical details, and less friction at every turn.</p><div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs font-extrabold text-slate-600 lg:mt-9 lg:text-sm"><span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#0f1e2e]" /> Clear daily rates</span><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#0f1e2e]" /> Reservation support</span><span className="flex items-center gap-2"><CalendarCheck2 className="h-4 w-4 text-[#0f1e2e]" /> 48h planning window</span></div><div className="mt-8"><button onClick={scrollToFleet} className="flex items-center gap-2 rounded-xl bg-[#d97706] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(217,119,6,0.2)] transition hover:-translate-y-0.5 hover:bg-[#b45309] active:scale-[0.97]">Browse fleet <ArrowDownRight className="h-4 w-4" /></button></div></motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.35, ease: [0.23, 1, 0.32, 1] }} className="interior-hero-media relative self-stretch md:-translate-y-4 md:mb-[-1rem] lg:min-h-[540px] xl:min-h-[610px] 2xl:min-h-[720px]"><div className="interior-hero-frame relative h-full min-h-[350px] overflow-hidden rounded-[38px] bg-[#0f1e2e] shadow-[0_28px_70px_rgba(15,30,46,0.14)] sm:rounded-tl-[70px] lg:rounded-tl-[96px] lg:rounded-br-[48px]"><img src={staticAssetPath("/manus-storage/velocity-hero_0ffdea12.jpg")} alt="Executive sedan on a bright coastal boulevard" className="h-full w-full object-cover object-center 2xl:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-[#0f1e2e]/62 via-transparent to-transparent" /><div className="absolute bottom-5 right-5 flex justify-end text-white sm:bottom-7 sm:right-7"><span className="shrink-0 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] backdrop-blur-sm">Lead selection / SUV</span></div></div><motion.div animate={reduceMotion ? undefined : { y: [0, -6, 0] }} transition={reduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-2 top-8 hidden rounded-[18px] bg-[#d97706] p-4 text-white shadow-[0_18px_34px_rgba(180,83,9,0.28)] sm:block lg:-right-5 xl:p-5"><CarFront className="h-5 w-5" /><p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/75">Today’s fleet</p><p className="mt-1 font-editorial text-3xl tracking-[-0.05em] xl:text-4xl">{fleet.length} cars</p></motion.div></motion.div>
    </div><motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.35, ease: [0.23, 1, 0.32, 1] }} className="interior-search relative z-20 mt-5 lg:mt-6"><HeroSearch onSearch={handleQuickSearch} /></motion.div></div></section>
    <CarGrid cars={filteredFleet} totalCars={visibleCarIds.length} searchTerm={searchTerm} selectedCategory={selectedCategory} sortBy={sortBy} priceBand={priceBand} passengerBand={passengerBand} fuelFilter={fuelFilter} savedCarIds={savedCarIds} isFiltering={isFiltering} onSearchChange={setSearchTerm} onCategoryChange={setSelectedCategory} onSortChange={setSortBy} onPriceBandChange={setPriceBand} onPassengerBandChange={setPassengerBand} onFuelFilterChange={setFuelFilter} onClearFilters={clearFleetFilters} onBook={setSelectedCar} onToggleSaved={handleToggleSaved} />
    <section id="why-velocity" className="scroll-mt-24 bg-[#f7f8f6] py-[4.5rem] sm:py-20"><div className="container"><div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center"><div><div className="rounded-[30px] bg-[#0f1e2e] p-7 text-white sm:p-10"><p className="fleet-kicker text-[#f6b256]">03 / Made for the details</p><h2 className="mt-5 max-w-md font-editorial text-5xl leading-[0.94] tracking-[-0.06em] sm:text-6xl">Less guesswork, more of the road ahead</h2><p className="mt-7 max-w-md text-sm leading-7 text-slate-300">This interface makes each important detail legible before the booking request: the car, the cost, the dates, and the practical additions.</p></div></div><div className="grid gap-4 sm:grid-cols-2"><Benefit icon={<CircleDollarSign />} title="Transparent pricing" text="The daily rate and selected add-ons are recalculated in the reservation view." /><Benefit icon={<Clock3 />} title="Support-minded" text="Contact details and dates stay together, ready for an availability follow-up." /><Benefit icon={<ShieldCheck />} title="Clear before commit" text="Validation highlights the missing details before a request can be submitted." /><Benefit icon={<BadgeCheck />} title="Designed to adapt" text="The layout and controls resize cleanly from a small phone to a wide desktop." /></div></div></div></section>
    <ContactSection />
  </main><Footer /><BookingModal car={selectedCar} onClose={() => setSelectedCar(null)} onBookingComplete={handleBookingComplete} /></div>;
}

function Benefit({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="rounded-[18px] border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf0f3] text-[#0f1e2e]">{icon}</span><h3 className="mt-5 text-sm font-extrabold text-[#0f1e2e]">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{text}</p></div>; }
