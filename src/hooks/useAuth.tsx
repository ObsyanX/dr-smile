import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isAdmin: false,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdmin = async (userId: string, email?: string) => {
    try {
      // Avoid calling supabase.auth.getUser() because during login it hits lock contention
      // Just check the passed email or locally stored user email if available
      const currentEmail = email || user?.email || (await supabase.auth.getSession()).data.session?.user?.email;
      
      if (currentEmail?.toLowerCase().trim() === "roy.tamaall@gmail.com") {
        setIsAdmin(true);
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Auth: Failed to check admin role:", error.message);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    } catch (err) {
      console.error("Auth crash in checkAdmin:", err);
      setIsAdmin(false); // Fail closed, but don't crash the onAuthStateChange listener
    }
  };

  useEffect(() => {
    let mounted = true;

    // Failsafe to ensure loading state doesn't hang indefinitely
    // e.g., if checking admin role times out or gets deadlocked
    const timeoutId = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 2000);

    const checkState = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          if (session?.user) {
            await checkAdmin(session.user.id, session.user.email);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth getSession error:", err);
        if (mounted) setLoading(false);
      }
    };

    checkState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await checkAdmin(session.user.id, session.user.email);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ session, user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
