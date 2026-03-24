-- Fix: Replace self-referential RLS policy on user_roles.
--
-- The previous policy "Admins can view roles" used has_role() to check
-- if the caller is an admin, but has_role() itself queries user_roles —
-- creating a circular dependency that silently returned empty for all users,
-- including real admins. This broke checkAdmin() on the frontend.
--
-- The fix: each authenticated user may only SELECT their own row.
-- This is sufficient for the frontend role-check and eliminates the deadlock.

DROP POLICY IF EXISTS "Admins can view roles" ON public.user_roles;

CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());
