import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getCarById } from "@/data/fleet";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CompareVehicles from "./pages/CompareVehicles";
import Home from "./pages/Home";
import BookingTerms from "./pages/BookingTerms";
import VehicleDetails from "./pages/VehicleDetails";

/** Velocity Drive visual system: Modern Motor Journal — a stable light theme with a query bridge for crawler-friendly vehicle pages. */
function Router() {
  // make sure to consider if you need authentication for certain routes
  return <Switch><Route path="/" component={Home} /><Route path="/fleet/:id" component={VehicleDetails} /><Route path="/compare" component={CompareVehicles} /><Route path="/booking-terms" component={BookingTerms} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

function VehicleQueryBridge() {
  const [location, setLocation] = useLocation();
  useEffect(() => { if (location !== "/") return; const vehicleId = new URLSearchParams(window.location.search).get("vehicle"); if (vehicleId && getCarById(vehicleId)) setLocation(`/fleet/${vehicleId}`); }, [location, setLocation]);
  return null;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster position="top-right" richColors /><VehicleQueryBridge /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
