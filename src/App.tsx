import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import RouteMetadata from "@/components/RouteMetadata";

const Memory = lazy(() => import("./pages/Memory"));
const Journal = lazy(() => import("./pages/Journal"));
const Language = lazy(() => import("./pages/Language"));
const Game = lazy(() => import("./pages/Game"));
const Systems = lazy(() => import("./pages/Systems"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Videos = lazy(() => import("./pages/Videos"));
const Lectures = lazy(() => import("./pages/Lectures"));
const Resume = lazy(() => import("./pages/Resume"));
const ResumeSummary = lazy(() => import("./pages/ResumeSummary"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <RouteMetadata />
          <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-muted-foreground">載入中…</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/memory" element={<Memory />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/language" element={<Language />} />
              <Route path="/game" element={<Game />} />
              <Route path="/systems" element={<Systems />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/lectures" element={<Lectures />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/resume-summary" element={<ResumeSummary />} />
              <Route path="/resume/summary" element={<ResumeSummary />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
