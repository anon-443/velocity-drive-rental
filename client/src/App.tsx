import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getCarById } from "@/data/fleet";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CompareVehicles from "./pages/CompareVehicles";
import Home from "./pages/Home";
import BookingTerms from "./pages/BookingTerms";
import BookingPage from "./pages/BookingPage";
import AdminPage from "./pages/AdminPage";
import VehicleDetails from "./pages/VehicleDetails";
import { isStaticDemo, pagesBasePath } from "./lib/staticDemo";
import RouteTransition from "./components/RouteTransition";

/** Velocity Drive visual system: Modern Motor Journal — a stable light theme with a query bridge for crawler-friendly vehicle pages. */
function AppRoutes() {
  // make sure to consider if you need authentication for certain routes
  return <Switch><Route path="/" component={Home} /><Route path="/fleet/:id" component={VehicleDetails} /><Route path="/book" component={BookingPage} /><Route path="/admin" component={AdminPage} /><Route path="/compare" component={CompareVehicles} /><Route path="/booking-terms" component={BookingTerms} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

function VehicleQueryBridge() {
  const [location, setLocation] = useLocation();
  useEffect(() => { if (location !== "/") return; const query = new URLSearchParams(window.location.search); const vehicleId = query.get("vehicle"); const savedPath = query.get("path"); if (savedPath?.startsWith("/")) { setLocation(savedPath); return; } if (vehicleId && getCarById(vehicleId)) setLocation(`/fleet/${vehicleId}`); }, [location, setLocation]);
  return null;
}

function App() {
  const base = isStaticDemo ? pagesBasePath() : "";
  return <ErrorBoundary><ThemeProvider defaultTheme="light" switchable><TooltipProvider><Toaster position="top-right" richColors /><WouterRouter base={base}><VehicleQueryBridge /><RouteTransition><AppRoutes /></RouteTransition></WouterRouter></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
