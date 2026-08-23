/**
 * Velocity Drive visual system: Modern Motor Journal — focused reservation desk with visible progress, pricing, and validation.
 */
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, CalendarDays, Check, ChevronLeft, ChevronRight, CircleAlert, Fuel, MapPin, Navigation, Plus, Settings2, ShieldCheck, UsersRound, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FleetCar } from "@/data/fleet";
import type { TripRecord } from "@/lib/velocityStore";

type BookingModalProps = {
  car: FleetCar | null;
  onClose: () => void;
  onBookingComplete: (booking: TripRecord) => void;
};

type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  license: string;
};

const initialCustomer: CustomerDetails = { name: "", email: "", phone: "", license: "" };

function calculateDays(pickupDate: string, returnDate: string) {
  if (!pickupDate || !returnDate) return 1;
  const start = new Date(`${pickupDate}T12:00:00`).getTime();
  const end = new Date(`${returnDate}T12:00:00`).getTime();
  const difference = Math.ceil((end - start) / 86_400_000);
  return Number.isFinite(difference) && difference > 0 ? difference : 1;
}

export default function BookingModal({ car, onClose, onBookingComplete }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState<CustomerDetails>(initialCustomer);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [addGps, setAddGps] = useState(false);
  const [addChildSeat, setAddChildSeat] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  useEffect(() => {
    if (car) {
      setStep(1);
      setCustomer(initialCustomer);
      setPickupDate("");
      setReturnDate("");
      setAddGps(false);
      setAddChildSeat(false);
      setErrors({});
      setConfirmationId(null);
    }
  }, [car]);

  const days = useMemo(() => calculateDays(pickupDate, returnDate), [pickupDate, returnDate]);
  const addOnDailyRate = (addGps ? 8 : 0) + (addChildSeat ? 12 : 0);
  const total = car ? days * (car.rate + addOnDailyRate) : 0;

  const validateCustomer = () => {
    const nextErrors: Record<string, string> = {};
    if (customer.name.trim().length < 2) nextErrors.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(customer.email)) nextErrors.email = "Enter a valid email address.";
    if (customer.phone.trim().length < 7) nextErrors.phone = "Enter a contact number.";
    if (customer.license.trim().length < 4) nextErrors.license = "Enter your license ID.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateTrip = () => {
    const nextErrors: Record<string, string> = {};
    if (!pickupDate) nextErrors.pickupDate = "Choose a pick-up date.";
    if (!returnDate) nextErrors.returnDate = "Choose a return date.";
    if (pickupDate && returnDate && new Date(returnDate) <= new Date(pickupDate)) nextErrors.returnDate = "Return must be after pick-up.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const proceed = () => {
    if (step === 2 && !validateCustomer()) return;
    setErrors({});
    setStep((current) => Math.min(3, current + 1));
  };

  const confirmBooking = () => {
    if (!validateTrip()) return;
    const reference = `VD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setConfirmationId(reference);
    onBookingComplete({ id: reference, carName: car?.name ?? "Vehicle", carImage: car?.image ?? "", pickupDate, returnDate, total, status: "Request received" });
  };

  if (!car) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto bg-[#0f1e2e]/55 px-4 py-5 backdrop-blur-sm sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Reserve ${car.name}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.985 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="relative mx-auto my-2 max-w-5xl overflow-hidden rounded-[24px] bg-white shadow-2xl sm:my-8"
        >
          <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#0f1e2e] shadow-sm transition hover:bg-[#0f1e2e] hover:text-white" aria-label="Close booking form">
            <X className="h-5 w-5" />
          </button>
          <div className="grid lg:grid-cols-[0.84fr_1.16fr]">
            <aside className="relative overflow-hidden bg-[#eaf0f3] p-6 sm:p-8">
              <p className="eyebrow"><span /> Your selection</p>
              <h2 className="mt-4 font-editorial text-4xl tracking-[-0.055em] text-[#0f1e2e]">{car.name}</h2>
              <p className="mt-1 text-sm font-bold text-slate-500">{car.modelYear} · {car.type}</p>
              <div className="mt-6 overflow-hidden rounded-[18px] border border-white/90 bg-white shadow-sm">
                <img src={car.image} alt={`${car.name} ${car.modelYear}`} className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-y border-slate-300/70 py-4">
                <div><Fuel className="h-4 w-4 text-[#d97706]" /><p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-slate-400">Fuel</p><p className="mt-0.5 text-xs font-bold text-[#0f1e2e]">{car.fuel}</p></div>
                <div><Settings2 className="h-4 w-4 text-[#d97706]" /><p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-slate-400">Gearbox</p><p className="mt-0.5 text-xs font-bold text-[#0f1e2e]">{car.transmission}</p></div>
                <div><UsersRound className="h-4 w-4 text-[#d97706]" /><p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-slate-400">Capacity</p><p className="mt-0.5 text-xs font-bold text-[#0f1e2e]">{car.seats} seats</p></div>
              </div>
              <div className="mt-5 rounded-[16px] bg-[#0f1e2e] p-4 text-white">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-white/55">Reservation estimate</p>
                <div className="mt-2 flex items-end justify-between"><span className="font-editorial text-4xl tracking-[-0.05em]">${total}</span><span className="mb-1 text-xs font-bold text-white/65">{days} {days === 1 ? "day" : "days"}</span></div>
                <p className="mt-2 border-t border-white/15 pt-2 text-xs text-white/65">${car.rate}/day {addOnDailyRate ? `+ $${addOnDailyRate}/day add-ons` : "· no extras added"}</p>
              </div>
            </aside>

            <main className="p-6 sm:p-8 lg:p-10">
              {confirmationId ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[430px] flex-col justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-[#d97706]"><BadgeCheck className="h-7 w-7" /></span>
                  <p className="eyebrow mt-7"><span /> Reservation received</p>
                  <h3 className="mt-4 max-w-lg font-editorial text-5xl leading-[0.95] tracking-[-0.06em] text-[#0f1e2e]">You’re on the road to a better trip.</h3>
                  <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">Your request for <strong className="text-[#0f1e2e]">{car.name}</strong> has been logged under <strong className="text-[#0f1e2e]">{confirmationId}</strong>. A team member will follow up using the details you provided.</p>
                  <div className="mt-7 flex flex-wrap gap-3 text-xs font-bold text-slate-600"><span className="rounded-full bg-[#eaf0f3] px-3 py-2">{pickupDate} → {returnDate}</span><span className="rounded-full bg-orange-50 px-3 py-2 text-[#b45309]">Estimate: ${total}</span></div>
                  <button onClick={onClose} className="mt-8 w-fit rounded-xl bg-[#0f1e2e] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#d97706]">Return to fleet</button>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-4 pr-12">
                    <div><p className="eyebrow"><span /> Reservation desk</p><h3 className="mt-3 font-editorial text-4xl tracking-[-0.055em] text-[#0f1e2e]">Secure your dates.</h3></div>
                    <span className="shrink-0 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">0{step} / 03</span>
                  </div>
                  <div className="mt-7 grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((number) => <div key={number} className={`h-1 rounded-full ${number <= step ? "bg-[#d97706]" : "bg-slate-100"}`} />)}
                  </div>

                  {step === 1 && (
                    <div className="mt-8 space-y-5">
                      <p className="max-w-lg text-sm leading-7 text-slate-600">Take a moment to review the vehicle selected for your trip. You’ll add your details and dates next.</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 p-4"><ShieldCheck className="h-5 w-5 text-[#d97706]" /><h4 className="mt-4 text-sm font-extrabold text-[#0f1e2e]">Clear daily rate</h4><p className="mt-1 text-xs leading-5 text-slate-500">Your selected daily rate and any extras are visible before you submit.</p></div>
                        <div className="rounded-2xl border border-slate-200 p-4"><Navigation className="h-5 w-5 text-[#d97706]" /><h4 className="mt-4 text-sm font-extrabold text-[#0f1e2e]">Flexible planning</h4><p className="mt-1 text-xs leading-5 text-slate-500">Add trip dates and practical extras in the final reservation step.</p></div>
                      </div>
                      <button onClick={proceed} className="mt-3 flex items-center gap-2 rounded-xl bg-[#0f1e2e] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#d97706]">Continue to your details <ChevronRight className="h-4 w-4" /></button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="mt-8">
                      <p className="mb-5 text-sm leading-7 text-slate-600">Use the details you’d like us to use when confirming availability and your collection time.</p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Full name" value={customer.name} error={errors.name} onChange={(value) => setCustomer({ ...customer, name: value })} placeholder="Your name" />
                        <Field label="Email address" type="email" value={customer.email} error={errors.email} onChange={(value) => setCustomer({ ...customer, email: value })} placeholder="you@example.com" />
                        <Field label="Phone number" type="tel" value={customer.phone} error={errors.phone} onChange={(value) => setCustomer({ ...customer, phone: value })} placeholder="Your contact number" />
                        <Field label="Driver’s license ID" value={customer.license} error={errors.license} onChange={(value) => setCustomer({ ...customer, license: value })} placeholder="License reference" />
                      </div>
                      <div className="mt-7 flex items-center gap-3"><button onClick={() => { setErrors({}); setStep(1); }} className="flex items-center gap-1 text-sm font-extrabold text-slate-500 transition hover:text-[#0f1e2e]"><ChevronLeft className="h-4 w-4" /> Back</button><button onClick={proceed} className="flex items-center gap-2 rounded-xl bg-[#0f1e2e] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#d97706]">Choose trip details <ChevronRight className="h-4 w-4" /></button></div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="mt-8">
                      <p className="mb-5 text-sm leading-7 text-slate-600">Choose your rental window and add only the extras that improve the trip.</p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <DateField label="Pick-up date" value={pickupDate} error={errors.pickupDate} onChange={setPickupDate} />
                        <DateField label="Return date" value={returnDate} min={pickupDate} error={errors.returnDate} onChange={setReturnDate} />
                      </div>
                      <div className="mt-6"><p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Optional add-ons</p><div className="mt-3 grid gap-3 sm:grid-cols-2"><ToggleCard active={addGps} onClick={() => setAddGps((value) => !value)} icon={<Navigation className="h-5 w-5" />} title="GPS navigation" description="$8 per day" /><ToggleCard active={addChildSeat} onClick={() => setAddChildSeat((value) => !value)} icon={<Plus className="h-5 w-5" />} title="Child seat" description="$12 per day" /></div></div>
                      <div className="mt-7 flex flex-wrap items-center gap-3"><button onClick={() => { setErrors({}); setStep(2); }} className="flex items-center gap-1 text-sm font-extrabold text-slate-500 transition hover:text-[#0f1e2e]"><ChevronLeft className="h-4 w-4" /> Back</button><button onClick={confirmBooking} className="flex items-center gap-2 rounded-xl bg-[#d97706] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(217,119,6,0.2)] transition hover:bg-[#b45309]">Request reservation <Check className="h-4 w-4" /></button></div>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, value, type = "text", placeholder, error, onChange }: { label: string; value: string; type?: string; placeholder: string; error?: string; onChange: (value: string) => void }) {
  return <label className="block"><span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-500">{label}</span><input type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className={`h-12 w-full rounded-xl border bg-white px-3.5 text-sm font-semibold text-[#0f1e2e] outline-none transition placeholder:text-slate-400 focus:ring-4 ${error ? "border-red-300 focus:border-red-400 focus:ring-red-50" : "border-slate-200 focus:border-[#d97706] focus:ring-orange-100"}`} />{error && <span className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-600"><CircleAlert className="h-3.5 w-3.5" />{error}</span>}</label>;
}

function DateField({ label, value, min, error, onChange }: { label: string; value: string; min?: string; error?: string; onChange: (value: string) => void }) {
  return <label className="block"><span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-500">{label}</span><span className={`flex h-12 items-center gap-3 rounded-xl border bg-white px-3.5 ${error ? "border-red-300" : "border-slate-200"}`}><CalendarDays className="h-4 w-4 text-[#d97706]" /><input type="date" min={min} value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#0f1e2e] outline-none" /></span>{error && <span className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-600"><CircleAlert className="h-3.5 w-3.5" />{error}</span>}</label>;
}

function ToggleCard({ active, onClick, icon, title, description }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; description: string }) {
  return <button onClick={onClick} type="button" className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${active ? "border-[#d97706] bg-orange-50" : "border-slate-200 bg-white hover:border-slate-300"}`}><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${active ? "bg-[#d97706] text-white" : "bg-[#eaf0f3] text-[#0f1e2e]"}`}>{icon}</span><span><span className="block text-sm font-extrabold text-[#0f1e2e]">{title}</span><span className="mt-0.5 block text-xs font-semibold text-slate-500">{description}</span></span><span className={`ml-auto flex h-5 w-5 items-center justify-center rounded-full border ${active ? "border-[#d97706] bg-[#d97706] text-white" : "border-slate-300 text-transparent"}`}><Check className="h-3 w-3" /></span></button>;
}
