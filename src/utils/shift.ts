export const SHIFT_WINDOWS = {
  lunch:  { start: 10, end: 16 }, // 10:00–16:59
  dinner: { start: 17, end: 23 }, // 17:00–23:59
} as const;

export function toDateShift(dateTimeISO: string) {
  // En producción conviene usar una lib con TZ (dayjs/luxon). Aquí simple:
  const d = new Date(dateTimeISO);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const date = `${yyyy}-${mm}-${dd}`;

  const hour = d.getHours();
  if (hour >= SHIFT_WINDOWS.lunch.start && hour <= SHIFT_WINDOWS.lunch.end) {
    return { date, shift: 'lunch' as const };
  }
  return { date, shift: 'dinner' as const };
}
