
-- Add server-side validation constraints on appointments table

-- Restrict treatment to allowed values
ALTER TABLE public.appointments ADD CONSTRAINT valid_treatment
  CHECK (treatment IN ('Dental Implants','Root Canal','Teeth Whitening','Braces & Aligners','Smile Design','Pediatric Dentistry','General Check-up'));

-- Enforce text length limits matching client-side validation
ALTER TABLE public.appointments ADD CONSTRAINT valid_name_length CHECK (length(name) <= 100);
ALTER TABLE public.appointments ADD CONSTRAINT valid_phone_length CHECK (length(phone) <= 20);
ALTER TABLE public.appointments ADD CONSTRAINT valid_email_length CHECK (length(email) <= 255);
ALTER TABLE public.appointments ADD CONSTRAINT valid_message_length CHECK (length(message) <= 1000);
ALTER TABLE public.appointments ADD CONSTRAINT valid_clinic_length CHECK (length(clinic_location) <= 100);
