DROP POLICY "Authenticated users can view appointments" ON public.appointments;

CREATE POLICY "Admins can view appointments"
ON public.appointments FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));