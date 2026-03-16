-- Create enum for appointment status
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'cancelled');

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  treatment TEXT NOT NULL,
  preferred_date DATE,
  message TEXT,
  clinic_location TEXT,
  status appointment_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public appointment form)
CREATE POLICY "Anyone can submit an appointment" 
ON public.appointments FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Only authenticated users (admin) can read
CREATE POLICY "Authenticated users can view appointments" 
ON public.appointments FOR SELECT 
TO authenticated 
USING (true);