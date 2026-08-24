/**
 * Velocity Drive visual system: Modern Motor Journal — route-aware navigation that returns detail-page visitors to the relevant homepage section.
 */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, LogIn, LogOut, Menu, Moon, Sun, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import BrandLockup from "@/components/BrandLockup";
import { startLogin } from "@/const";
import { isStaticDemo } from "@/lib/staticDemo";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [{ label: "Home", href: "#home" }, { label: "Fleet", href: "#fleet" }, { label: "Why Velocity", href: "#why-velocity" }, { label: "Contact", href: "#contact" }];
function scrollToSection(href: string) {
  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;
  const headerHeight = document.querySelector<HTMLElement>(".interior-nav")?.offsetHeight ?? 76;
  const extraOffset = href === "#fleet" ? 40 : 12;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - extraOffset);
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  useEffect(() => { const update = () => setIsCompact(window.scrollY > 32); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  const handleNavigation = (href: string) => { setIsOpen(false); if (href.startsWith("/")) { setLocation(href); return; } if (document.querySelector(href)) { scrollToSection(href); return; } setLocation("/"); window.setTimeout(() => scrollToSection(href), 90); };
  const handleAccount = async () => { if (isStaticDemo) { toast.info("Static internship demo: Favorites stay in this browser."); return; } if (!isAuthenticated) { startLogin(); return; } await logout(); toast.success("You have been signed out. Local Favorites remain available in this browser."); };
  const accountLabel = isStaticDemo ? "Demo mode" : loading ? "Checking account" : isAuthenticated ? `Signed in${user?.name ? ` · ${user.name.split(" ")[0]}` : ""}` : "Sign in";
  const mobileAccountLabel = isStaticDemo ? "Static demo mode" : isAuthenticated ? "Sign out" : "Sign in to sync Favorites";
  return <header className={`interior-nav sticky top-0 z-40 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-200 ${isCompact ? "border-slate-300/90 bg-[#f7f8f6]/98 shadow-[0_10px_28px_rgba(15,30,46,0.08)]" : "border-slate-200/80 bg-[#f7f8f6]/95"}`}><div className={`wide-shell flex items-center justify-between gap-5 transition-[height] duration-200 ${isCompact ? "h-[60px]" : "h-[76px]"}`}><button className="group text-left" onClick={() => handleNavigation("#home")} aria-label="Return to Velocity Drive home"><span className={`block transition-transform duration-200 group-hover:-translate-y-0.5 ${isCompact ? "scale-90 origin-left" : ""}`}><BrandLockup /></span></button><nav className={`hidden items-center transition-[gap] duration-200 lg:flex ${isCompact ? "gap-5" : "gap-6"}`} aria-label="Primary navigation">{navItems.map((item) => <button key={item.href} onClick={() => handleNavigation(item.href)} className="nav-link">{item.label}</button>)}</nav><div className="flex items-center gap-2"><button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Use light mode" : "Use night mode"} aria-pressed={theme === "dark"} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0f1e2e] transition hover:border-[#0f1e2e] active:scale-[0.97]">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button><button onClick={handleAccount} disabled={loading} className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-[#0f1e2e] transition hover:border-[#0f1e2e] disabled:cursor-wait disabled:opacity-60 xl:flex">{isAuthenticated ? <UserRound className="h-3.5 w-3.5" /> : <LogIn className="h-3.5 w-3.5" />}{accountLabel}</button><button onClick={() => handleNavigation("/book")} className={`hidden items-center gap-2 rounded-xl bg-[#d97706] text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(217,119,6,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#b45309] active:scale-[0.97] sm:flex ${isCompact ? "px-3 py-2.5" : "px-4 py-3"}`}>Book a vehicle <ArrowUpRight className="h-4 w-4" /></button><button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0f1e2e] transition hover:border-[#0f1e2e] lg:hidden" onClick={() => setIsOpen((current) => !current)} aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen}>{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div></div><AnimatePresence>{isOpen && <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }} className="border-t border-slate-200 bg-[#f7f8f6] px-4 py-5 lg:hidden" aria-label="Mobile navigation"><div className="mx-auto flex max-w-xl flex-col gap-1">{navItems.map((item) => <button key={item.href} onClick={() => handleNavigation(item.href)} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:bg-white hover:text-[#0f1e2e]">{item.label}<ArrowUpRight className="h-4 w-4 text-[#0f1e2e]" /></button>)}<button onClick={handleAccount} disabled={loading} className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-[#0f1e2e]">{isAuthenticated ? <LogOut className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}{mobileAccountLabel}</button><button onClick={() => handleNavigation("/book")} className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#d97706] px-4 py-3.5 text-sm font-extrabold text-white">Book a vehicle <ArrowUpRight className="h-4 w-4" /></button></div></motion.nav>}</AnimatePresence></header>;
}
