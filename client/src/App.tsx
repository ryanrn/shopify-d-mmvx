import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import PasswordGate from "./components/PasswordGate";
import { ThemeProvider } from "./contexts/ThemeContext";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Lookbook from "./pages/Lookbook";

// Páginas públicas ficam atrás do password gate.
// O /admin usa o login Manus (role admin) e fica fora do gate.
function PublicSite() {
  return (
    <PasswordGate>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/lookbook" component={Lookbook} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </PasswordGate>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin fora do gate público */}
      <Route path="/admin" component={Admin} />
      {/* Todo o resto é site público (com gate) */}
      <Route component={PublicSite} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
