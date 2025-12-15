import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import DespreNoi from "./pages/DespreNoi";
import Servicii from "./pages/Servicii";
import Urgente from "./pages/Urgente";
import Echipa from "./pages/Echipa";
import Recenzii from "./pages/Recenzii";
import Articole from "./pages/Articole";
import ArticleDetail from "./pages/ArticleDetail";
import Galerie from "./pages/Galerie";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminArticles from "./pages/admin/Articles";
import AdminEditArticle from "./pages/admin/EditArticle";
import { isAdminAuthenticated } from "./lib/adminAuth";

const RequireAdmin = () => {
  return isAdminAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/despre" element={<DespreNoi />} />
            <Route path="/servicii" element={<Servicii />} />
            <Route path="/urgente" element={<Urgente />} />
            <Route path="/echipa" element={<Echipa />} />
            <Route path="/recenzii" element={<Recenzii />} />
            <Route path="/articole" element={<Articole />} />
            <Route path="/articole/:slug" element={<ArticleDetail />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<RequireAdmin />}>
              <Route path="/admin/articole" element={<AdminArticles />} />
              <Route path="/admin/articole/:id" element={<AdminEditArticle />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
