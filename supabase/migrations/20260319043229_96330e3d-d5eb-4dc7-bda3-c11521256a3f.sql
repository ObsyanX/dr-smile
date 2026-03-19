
-- Add 'completed' to appointment_status enum
ALTER TYPE public.appointment_status ADD VALUE IF NOT EXISTS 'completed';

-- Create user_roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS on user_roles: only admins can read
CREATE POLICY "Admins can view roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create treatment_prices table
CREATE TABLE public.treatment_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  treatment_name text NOT NULL UNIQUE,
  price numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.treatment_prices ENABLE ROW LEVEL SECURITY;

-- Anyone can read prices, only admins can modify
CREATE POLICY "Anyone can view prices"
ON public.treatment_prices FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage prices"
ON public.treatment_prices FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert default treatment prices
INSERT INTO public.treatment_prices (treatment_name, price) VALUES
  ('Dental Implants', 3500),
  ('Root Canal', 2500),
  ('Teeth Whitening', 800),
  ('Braces & Aligners', 4000),
  ('Smile Design', 5000),
  ('Pediatric Dentistry', 500),
  ('General Check-up', 200);

-- Update appointments RLS: admins can update and delete
CREATE POLICY "Admins can update appointments"
ON public.appointments FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete appointments"
ON public.appointments FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Enable realtime for appointments
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
