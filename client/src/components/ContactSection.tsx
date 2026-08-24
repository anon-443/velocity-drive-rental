/**
 * Velocity Drive visual system: a streamlined inquiry desk paired with an accessible rental FAQ.
 */
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { question: "What do I need to make a reservation request?", answer: "Select a vehicle, provide your contact details, add the rental dates, and submit the request. A team member can then confirm final vehicle and collection availability." },
  { question: "What is included in the daily rate?", answer: "The displayed rate is a clear daily vehicle estimate. Optional extras are priced separately in the reservation flow, while final collection terms are confirmed before handover." },
  { question: "Can I change my rental dates?", answer: "Yes. Submit a fresh request with the preferred dates or contact the team with your reservation reference so the availability window can be reviewed." },
  { question: "Where can I collect a vehicle?", answer: "The first-page search offers collection branches across Bishkek, including the airport, railway station, and city hubs. The confirmed collection point appears in your final reservation details." },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General rental question", message: "" });
  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 12) {
      toast.error("Please add your name, a valid email, and a short message of at least 12 characters.");
      return;
    }
    toast.success("Your inquiry is ready for the Velocity Drive team.");
    setForm({ name: "", email: "", subject: "General rental question", message: "" });
  };

  return <section id="contact" className="scroll-mt-24 bg-[#eaf0f3] py-[4.5rem] sm:py-20"><div className="container">
    <div><p className="eyebrow"><span /> 05 / Contact Velocity</p><h2 className="mt-5 max-w-md font-editorial text-5xl leading-[0.94] tracking-[-0.06em] text-[#0f1e2e] sm:text-6xl">An informed question is a better place to start</h2><p className="mt-5 max-w-none text-left text-sm leading-7 text-slate-600 lg:whitespace-nowrap">Tell us what you are planning, from a specific vehicle request to a question about collection</p></div>
    <div className="route-rule mt-8" />
    <form onSubmit={submitInquiry} className="mt-8 rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(15,30,46,0.05)] sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><Field label="Your name" value={form.name} placeholder="Full name" onChange={(name) => setForm({ ...form, name })} /><Field label="Email address" type="email" value={form.email} placeholder="you@example.com" onChange={(email) => setForm({ ...form, email })} /></div><label className="mt-5 block"><span className="fleet-kicker text-slate-500">Inquiry type</span><select value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-[#0f1e2e] outline-none transition focus:border-[#d97706] focus:ring-4 focus:ring-orange-100"><option>General rental question</option><option>Vehicle availability</option><option>Corporate rental inquiry</option><option>Collection branch question</option></select></label><label className="mt-5 block"><span className="fleet-kicker text-slate-500">How can we help?</span><textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell us the vehicle, dates, and question you have in mind." className="mt-2 min-h-32 w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-[#0f1e2e] outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#d97706] focus:ring-4 focus:ring-orange-100" /></label><div className="mt-6 flex flex-wrap items-center justify-between gap-4"><p className="max-w-sm text-xs leading-5 text-slate-500">Your details remain in this browser demonstration until a production form service is connected.</p><button className="flex items-center gap-2 rounded-xl bg-[#d97706] px-5 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#b45309] active:scale-[0.97]" type="submit">Send inquiry <Send className="h-4 w-4" /></button></div></form>
    <div className="mt-12 grid gap-8 xl:grid-cols-[0.62fr_1.38fr]"><div><p className="eyebrow"><span /> Rental notes</p><h3 className="mt-4 max-w-sm font-editorial text-4xl leading-[0.95] tracking-[-0.055em] text-[#0f1e2e]">A few answers before you ask</h3></div><Accordion type="single" collapsible className="rounded-[20px] border border-slate-200 bg-white px-6 sm:px-7">{faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`}><AccordionTrigger className="py-5 text-[15px] font-extrabold text-[#0f1e2e] hover:no-underline">{faq.question}</AccordionTrigger><AccordionContent className="max-w-2xl pb-5 text-sm leading-7 text-slate-600">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></div>
  </div></section>;
}

function Field({ label, value, type = "text", placeholder, onChange }: { label: string; value: string; type?: string; placeholder: string; onChange: (value: string) => void }) {
  return <label className="block"><span className="fleet-kicker text-slate-500">{label}</span><input type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-[#0f1e2e] outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#d97706] focus:ring-4 focus:ring-orange-100" /></label>;
}
