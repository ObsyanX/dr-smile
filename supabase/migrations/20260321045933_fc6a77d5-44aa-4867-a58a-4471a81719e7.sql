ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS appointment_time text;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS reminder_sent boolean NOT NULL DEFAULT false;