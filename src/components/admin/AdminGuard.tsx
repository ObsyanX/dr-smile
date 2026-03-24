import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

<<<<<<< HEAD
=======
/**
 * AdminGuard — protects all /admin/* routes.
 *
 * Redirect rules:
 *   - Still loading          → show spinner (never flash a redirect)
 *   - No user                → redirect to /admin/login
 *   - User but not admin     → redirect to /admin/login so they can retry
 *                              with the correct account (not to "/" which
 *                              would silently swallow the reason for the fail)
 *   - User and admin         → render the protected children
 */
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
<<<<<<< HEAD
  if (!isAdmin) return <Navigate to="/" replace />;
=======
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
>>>>>>> 20a29a9 (Fresh start for dr-smile project)

  return <>{children}</>;
};

export default AdminGuard;
