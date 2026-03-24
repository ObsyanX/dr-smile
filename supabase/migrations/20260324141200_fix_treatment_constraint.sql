-- Fix: Drop the overly-restrictive valid_treatment CHECK constraint that only
-- allowed 7 hard-coded values and caused 400 Bad Request for all other
-- treatments submitted via the Contact form.
-- Replacing it with the full list that matches the frontend treatment options.

ALTER TABLE public.appointments DROP CONSTRAINT IF EXISTS valid_treatment;

ALTER TABLE public.appointments ADD CONSTRAINT valid_treatment
  CHECK (treatment IN (
    'Fixed Partial Denture',
    'Removable Partial Denture',
    'Oral Cyst and Tumor Surgery',
    'Tooth Scaling',
    'Tooth Color Filling',
    'Tooth Capping',
    'Dental Implants',
    'Root Canal Treatment',
    'Teeth Whitening',
    'Braces & Aligners',
    'Smile Design',
    'Pediatric Dentistry',
    'General Check-up'
  ));
