CREATE OR REPLACE FUNCTION public.check_appointment_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO recent_count
  FROM public.appointments
  WHERE (email = NEW.email OR phone = NEW.phone)
    AND created_at > (now() - interval '1 hour');

  IF recent_count >= 5 THEN
    RAISE EXCEPTION 'Too many appointment requests. Please try again later.';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER appointment_rate_limit
  BEFORE INSERT ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.check_appointment_rate_limit();