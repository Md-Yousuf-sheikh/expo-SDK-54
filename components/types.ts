// Calendar types - keeping only the data types, component props are now managed via context
// Note: CalendarDayData is now exported from CalendarProvider to avoid conflicts with CalendarDay component

export type CalendarData = {
  days: Array<{ day: Date; formatted: string }>;
  timeSlots: Date[];
};
