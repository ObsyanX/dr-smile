import { parse, addMinutes, format, isSunday, parseISO, isBefore, isEqual } from "date-fns";

/**
 * Generates the valid 15-minute intervals based on strict clinic hours.
 * Madhyamgram: 6:15 PM - 9:00 PM (Every day)
 * Dum Dum: 10:30 AM - 2:30 PM (Mon-Sat, Closed on Sunday)
 */
export function generateClinicSlots(clinicLocation: string | null, dateStr: string | null): string[] {
  if (!clinicLocation) return [];
  
  const baseDate = new Date();
  const slots: string[] = [];

  if (clinicLocation === "Madhyamgram") {
    let current = parse("18:15", "HH:mm", baseDate);
    const end = parse("21:00", "HH:mm", baseDate);

    while (isBefore(current, end) || isEqual(current, end)) {
      slots.push(format(current, "hh:mm a"));
      current = addMinutes(current, 15);
    }
  } else if (clinicLocation === "Dum Dum") {
    // Dum Dum is closed on Sundays
    if (dateStr && isSunday(parseISO(dateStr))) {
      return [];
    }

    let current = parse("10:30", "HH:mm", baseDate);
    const end = parse("14:30", "HH:mm", baseDate);

    while (isBefore(current, end) || isEqual(current, end)) {
      slots.push(format(current, "hh:mm a"));
      current = addMinutes(current, 15);
    }
  }

  return slots;
}

/**
 * Checks if the selected clinic is entirely closed on the chosen date.
 */
export function isClinicClosedOnDate(clinicLocation: string | null, dateStr: string | null): boolean {
  if (clinicLocation === "Dum Dum" && dateStr && isSunday(parseISO(dateStr))) {
    return true;
  }
  return false;
}

/**
 * Validates if the given time was manually added rather than picked from standard slots
 * by checking if it falls outside the system-generated valid list for that clinic/date.
 */
export function isCustomTime(clinicLocation: string | null, dateStr: string | null, time: string | null): boolean {
  if (!time || !clinicLocation) return false;
  
  const validSlots = generateClinicSlots(clinicLocation, dateStr);
  const isStandard = validSlots.some(slot => slot.toUpperCase() === time.toUpperCase());
  
  return !isStandard;
}
