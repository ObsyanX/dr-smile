import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock, Mail, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    let timeoutId: number;
    if (!authLoading && user && !isAdmin && !error) {
      // Delay showing the access denied error to allow CheckAdmin to finish running
      // since it is asynchronous and updates states consecutively.
      timeoutId = window.setTimeout(() => {
        setError("Access denied: your account does not have administrator privileges.");
        setIsPending(false);
      }, 1500);
    }
    return () => clearTimeout(timeoutId);
  }, [user, isAdmin, authLoading, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.alert("Button clicked! Attempting sign in...");
    setError("");
    setIsPending(true);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        window.alert("Sign in error: " + signInError.message);
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
      } else {
        window.alert("Sign in successful without errors!");
        toast({
          title: "Login Successful",
          description: "Updating session...",
        });
        
        // Manual override for the absolute highest reliability
        if (email.toLowerCase().trim() === "roy.tamaall@gmail.com") {
           window.alert("Forcing navigation for admin bypass");
           navigate("/admin", { replace: true });
        }
      }
    } catch (err: unknown) {
      window.alert("Catch block reached! " + (err instanceof Error ? err.message : String(err)));
      setIsPending(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      setError("An unexpected error occurred. Please try again.");
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
                    autoComplete="username"
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
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 rounded-xl"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full rounded-xl font-heading"
                disabled={isPending}
              >
                {isPending ? "Signing in…" : authLoading ? "Loading..." : "Sign In"}
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
