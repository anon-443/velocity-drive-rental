/**
 * Velocity Drive visual system: a streamlined inquiry desk for clear rental questions.
 */
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

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

  return <section id="contact" className="scroll-mt-20 bg-[#eaf0f3] pb-8 pt-5 sm:pb-10 sm:pt-6"><div className="container">
    <div><p className="eyebrow"><span /> 05 / Contact Velocity</p><h2 className="mt-2 max-w-[68rem] font-editorial text-3xl leading-[0.94] tracking-[-0.06em] text-[#0f1e2e] sm:text-4xl">An informed question is a better place to start</h2><p className="mt-2 max-w-none text-left text-sm leading-6 text-slate-600 lg:whitespace-nowrap">Tell us what you are planning, from a specific vehicle request to a question about collection</p></div>
    <div className="route-rule mt-4" />
    <form onSubmit={submitInquiry} className="contact-form mt-4 max-w-[1120px] rounded-[18px] border border-slate-200 bg-white p-3 shadow-[0_12px_30px_rgba(15,30,46,0.04)] sm:p-4"><div className="grid gap-2 sm:grid-cols-2"><Field label="Your name" value={form.name} placeholder="Full name" onChange={(name) => setForm({ ...form, name })} /><Field label="Email address" type="email" value={form.email} placeholder="you@example.com" onChange={(email) => setForm({ ...form, email })} /></div><label className="mt-2 block"><span className="fleet-kicker text-slate-500">Inquiry type</span><select value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-[#0f1e2e] outline-none transition focus:border-[#d97706] focus:ring-4 focus:ring-orange-100"><option>General rental question</option><option>Vehicle availability</option><option>Corporate rental inquiry</option><option>Collection branch question</option></select></label><label className="mt-2 block"><span className="fleet-kicker text-slate-500">How can we help?</span><textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell us the vehicle, dates, and question you have in mind." className="mt-1 min-h-20 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[#0f1e2e] outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#d97706] focus:ring-4 focus:ring-orange-100" /></label><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><p className="max-w-sm text-xs leading-5 text-slate-500">Your details remain in this browser demonstration until a production form service is connected.</p><button className="flex items-center gap-2 rounded-xl bg-[#d97706] px-4 py-2.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#b45309] active:scale-[0.97]" type="submit">Send inquiry <Send className="h-4 w-4" /></button></div></form>
  </div></section>;
}

function Field({ label, value, type = "text", placeholder, onChange }: { label: string; value: string; type?: string; placeholder: string; onChange: (value: string) => void }) {
  return <label className="block"><span className="fleet-kicker text-slate-500">{label}</span><input type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-[#0f1e2e] outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#d97706] focus:ring-4 focus:ring-orange-100" /></label>;
}
