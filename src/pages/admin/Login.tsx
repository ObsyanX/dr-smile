import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
<<<<<<< HEAD
=======
import { useToast } from "@/hooks/use-toast";
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock, Mail, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const { signIn, isAdmin, user } = useAuth();
  const navigate = useNavigate();

  // Navigate once auth state confirms admin role
  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [user, isAdmin, navigate]);
=======
  const [isPending, setIsPending] = useState(false);
  const { signIn, isAdmin, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to dashboard once auth confirms admin role.
  // This effect runs after onAuthStateChange has settled, so isAdmin is stable.
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [user, isAdmin, navigate, authLoading]);

  // If a logged-in non-admin lands here, show a clear error message.
  // We do NOT auto-signOut here — signIn() already handles clearing the
  // previous session before every new login attempt.
  useEffect(() => {
    if (!authLoading && user && !isAdmin && !error) {
      setError("Access denied: your account does not have administrator privileges.");
    }
  }, [user, isAdmin, authLoading, error]);
>>>>>>> 20a29a9 (Fresh start for dr-smile project)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
<<<<<<< HEAD
    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
      }
      // On success, don't navigate here — the useEffect above handles it
      // after isAdmin is confirmed. Set a timeout fallback:
      setTimeout(() => setLoading(false), 5000);
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
=======
    setIsPending(true);

    try {
      const { error: signInError, isAdmin: userIsAdmin } = await signIn(email, password);
      if (signInError) {
        const isTimeout = signInError.message && signInError.message.includes("timed out");
        const errMsg = isTimeout 
          ? "Request timed out. Please hard refresh the page or clear browser cache." 
          : "Invalid credentials. Please try again.";
          
        toast({
          variant: "destructive",
          title: isTimeout ? "Timeout" : "Sign in failed",
          description: errMsg,
        });
        setError(errMsg);
      } else if (userIsAdmin === false) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You do not have administrator privileges.",
        });
        setError("Access denied: Admin privileges required.");
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back. Redirecting to dashboard...",
        });
        // Immediately redirect to dashboard, skipping wait for async effects
        navigate("/admin", { replace: true });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-2xl text-foreground">
            Smile<span className="text-primary">Care</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Admin Portal</p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-heading font-semibold text-lg text-foreground">Admin Login</h2>
            <p className="text-sm text-muted-foreground">Enter your credentials to access the dashboard</p>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-heading text-sm">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
<<<<<<< HEAD
=======
                    autoComplete="username"
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="pl-10 rounded-xl"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-heading text-sm">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
<<<<<<< HEAD
=======
                    autoComplete="current-password"
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 rounded-xl"
                    required
                  />
                </div>
              </div>
<<<<<<< HEAD
              <Button type="submit" className="w-full rounded-xl font-heading" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
=======
              <Button
                type="submit"
                className="w-full rounded-xl font-heading"
                disabled={isPending || authLoading}
              >
                {isPending ? "Signing in…" : "Sign In"}
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <a href="/" className="hover:text-primary transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
