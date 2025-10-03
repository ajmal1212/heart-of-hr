
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import OrganizationHierarchy from "./pages/OrganizationHierarchy";
import Leaves from "./pages/Leaves";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import Recruitment from "./pages/Recruitment";
import Performance from "./pages/Performance";
import Documents from "./pages/Documents";
import Analytics from "./pages/Analytics";
import Announcements from "./pages/Announcements";
import Settings from "./pages/Settings";
import Lead from "./pages/Lead";
import Tickets from "./pages/Tickets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/organization-hierarchy" element={<OrganizationHierarchy />} />
              <Route path="/leaves" element={<Leaves />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/recruitment" element={<Recruitment />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/lead" element={<Lead />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
