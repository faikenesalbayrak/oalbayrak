import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import DronAdmin from "@/pages/DronAdmin";
import DronForm from "@/pages/DronForm";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect, useRef } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { trackEvent } from "./lib/analytics";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

/**
 * SPA rota değişimlerini GA4'e bildirir. page_view'ı GA4'ün kendi
 * "tarayıcı geçmişi" ölçümü zaten gönderir; burada sadece hangi rotadan
 * hangi rotaya geçildiğini kaydeden ek bir etkinlik üretilir.
 */
function RouteTracker() {
  const [location] = useLocation();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    if (previous.current !== null && previous.current !== location) {
      trackEvent("route_change", {
        from_path: previous.current,
        to_path: location,
        page_title: document.title,
      });
    }
    previous.current = location;
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/form"} component={DronForm} />
      <Route path={"/admin"} component={DronAdmin} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <RouteTracker />
            <Router />
            <Analytics />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
