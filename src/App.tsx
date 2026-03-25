import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/hooks/useAuth";
import AdminGuard from "@/components/admin/AdminGuard";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { programmaticPages } from "./pages/ProgrammaticPage";

const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// SEO Landing Pages
const DentalClinicMadhyamgram = lazy(() => import("./pages/DentalClinicMadhyamgram"));
const DentistDumDum = lazy(() => import("./pages/DentistDumDum"));
const RootCanalMadhyamgram = lazy(() => import("./pages/RootCanalMadhyamgram"));
const TeethWhiteningDumDum = lazy(() => import("./pages/TeethWhiteningDumDum"));
const ProgrammaticPageComponent = lazy(() => import("./pages/ProgrammaticPage"));

// Blog
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminAppointments = lazy(() => import("./pages/admin/Appointments"));
const AdminPatients = lazy(() => import("./pages/admin/Patients"));
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});


const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground font-heading">Loading...</p>
    </div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* SEO Landing Pages */}
          <Route path="/dental-clinic-madhyamgram" element={<DentalClinicMadhyamgram />} />
          <Route path="/dentist-dum-dum" element={<DentistDumDum />} />
          <Route path="/root-canal-madhyamgram" element={<RootCanalMadhyamgram />} />
          <Route path="/teeth-whitening-dum-dum" element={<TeethWhiteningDumDum />} />

          {/* Programmatic Location × Service Pages */}
          {programmaticPages.map((page) => (
            <Route
              key={page.slug}
              path={`/${page.slug}`}
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProgrammaticPageComponent page={page} />
                </Suspense>
              }
            />
          ))}

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
          <Route path="/admin/appointments" element={<AdminGuard><AdminAppointments /></AdminGuard>} />
          <Route path="/admin/patients" element={<AdminGuard><AdminPatients /></AdminGuard>} />
          <Route path="/admin/analytics" element={<AdminGuard><AdminAnalytics /></AdminGuard>} />
          <Route path="/admin/blogs" element={<AdminGuard><AdminBlogs /></AdminGuard>} />
          <Route path="/admin/blog-editor" element={<AdminGuard><AdminBlogEditor /></AdminGuard>} />
          <Route path="/admin/blog-editor/:id" element={<AdminGuard><AdminBlogEditor /></AdminGuard>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
