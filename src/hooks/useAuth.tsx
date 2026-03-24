<<<<<<< HEAD
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

=======
import { createContext, useContext, useEffect, useState, useCallback, ReactNode, useRef } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Helper to prevent promises from hanging indefinitely (e.g. Supabase lock deadlocks)
const withTimeout = <T,>(promise: Promise<T>, ms: number, timeoutErrorMessage: string): Promise<T> => {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(timeoutErrorMessage)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
};

>>>>>>> 20a29a9 (Fresh start for dr-smile project)
interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
<<<<<<< HEAD
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
=======
  signIn: (email: string, password: string) => Promise<{ error: Error | null, isAdmin?: boolean }>;
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isAdmin: false,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

<<<<<<< HEAD
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase
=======
/**
 * Queries the user_roles table for the given userId.
 *
 * IMPORTANT: This only works because the RLS policy on user_roles now
 * uses `USING (user_id = auth.uid())` — each user can read their own
 * row only. The old policy "Admins can view roles" was circular and
 * always returned false for every user.
 */
const checkAdminRole = async (userId: string, accessToken?: string): Promise<boolean> => {
  try {
    if (accessToken) {
      // Use direct fetch to bypass Supabase client state lock deadlocks in React Strict Mode
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/user_roles?select=role&user_id=eq.${userId}&role=eq.admin`, {
        headers: {
          "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          "Authorization": `Bearer ${accessToken}`
        }
      });
      if (!res.ok) {
        console.error("[Auth] Direct role check error:", res.status, await res.text());
        return false;
      }
      const data = await res.json();
      return data && data.length > 0;
    }

    // Fallback if no access token is explicitly provided
    const { data, error } = await supabase
>>>>>>> 20a29a9 (Fresh start for dr-smile project)
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
<<<<<<< HEAD
    setIsAdmin(!!data);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await checkAdmin(session.user.id);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await checkAdmin(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };
=======

    if (error) {
      console.error("[Auth] Role check error:", error.message, error);
      return false;
    }
    
    if (!data) {
      console.warn(`[Auth] No admin role found for user: ${userId}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[Auth] Unexpected role check failure:", err instanceof Error ? err.message : err);
    return false;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const isAuthenticating = useRef(false);
  const currentUserId = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Failsafe: if Supabase Auth gets stuck initializing (e.g., due to local storage locks),
    // force loading to false after a timeout so the UI isn't permanently disabled.
    const fallbackTimer = setTimeout(() => {
      if (mounted) {
        setLoading(prev => {
          if (prev) console.warn("[Auth] Initialization timed out. Forcing UI unblock.");
          return false;
        });
      }
    }, 3000);

    /**
     * Single source of truth for auth state.
     *
     * onAuthStateChange fires for:
     *   INITIAL_SESSION  — on mount (replaces the old initializeAuth call)
     *   SIGNED_IN        — after signInWithPassword succeeds
     *   TOKEN_REFRESHED  — automatic token refresh
     *   SIGNED_OUT       — after signOut
     *
     * We intentionally do NOT run a separate initializeAuth() effect.
     * Having two concurrent async flows (initializeAuth + onAuthStateChange)
     * caused a race condition where they overwrote each other's isAdmin state.
     */
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return;

        if (event === "SIGNED_OUT") {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // INITIAL_SESSION, SIGNED_IN, TOKEN_REFRESHED, USER_UPDATED
        if (currentSession?.user) {
          // Prevent double update uncontrolled during manual signIn
          if (isAuthenticating.current) {
            return;
          }

          if (currentSession.user.id !== currentUserId.current) {
            // New user or initial load, fetch role
            const adminResult = await checkAdminRole(currentSession.user.id, currentSession.access_token);
            if (!mounted) return;
            setIsAdmin(adminResult);
            currentUserId.current = currentSession.user.id;
          }

          setSession(currentSession);
          setUser(currentSession.user);
          setLoading(false);
        } else {
          // No session (e.g. INITIAL_SESSION with no stored session)
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
      subscription.unsubscribe();
    };
  }, []);

  /**
   * signIn direct state synchronization
   * We do not signOut() to prevent race conditions.
   * We directly set the session, user, and admin role upon successful login.
   */
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      isAuthenticating.current = true;
      setLoading(true);

      const { data, error } = await withTimeout(
        supabase.auth.signInWithPassword({ email, password }),
        10000,
        "Sign in request timed out. Please try again or refresh the page."
      );
      
      if (error) {
        return { error: error as Error };
      }

      if (data.session && data.user) {
        // Immediately fetch and set admin role
        const adminResult = await withTimeout(
          checkAdminRole(data.user.id, data.session.access_token),
          5000,
          "Role check timed out."
        ).catch((err) => {
          console.error(err);
          return false; // Fail safe to false if it times out
        });
        
        setSession(data.session);
        setUser(data.user);
        setIsAdmin(adminResult);
        currentUserId.current = data.user.id;
        
        return { error: null, isAdmin: adminResult };
      }
      
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    } finally {
      setLoading(false);
      isAuthenticating.current = false;
    }
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    // State is reset by the SIGNED_OUT event in onAuthStateChange above.
  }, []);
>>>>>>> 20a29a9 (Fresh start for dr-smile project)

  return (
    <AuthContext.Provider value={{ session, user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
