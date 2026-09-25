export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export interface OpeningHours {
  day: Weekday;
  open: string;
  close: string;
}

/**
 * Horario de atención al cliente (página de Contactar). El nombre de cada día
 * y el formato del tramo se traducen vía `translation.json` (contact.hours).
 */
export const OPENING_HOURS: OpeningHours[] = [
  { day: 'monday', open: '09:00', close: '14:00' },
  { day: 'tuesday', open: '09:00', close: '14:00' },
  { day: 'wednesday', open: '09:00', close: '14:00' },
  { day: 'thursday', open: '09:00', close: '14:00' },
  { day: 'friday', open: '09:00', close: '14:00' },
];
