import { format, addDays, subDays } from "date-fns";

export type CalendarEvent = {
  id: string;
  startTime: string;
  endTime: string;
  date: string;
  title: string;
  description: string;
  category: string;
  priority: number;
  color: string;
};

const today = new Date();

const descriptions = [
  "Event description",
  "Important meeting",
  "Task completion",
  "Project review",
  "Team sync",
  "Planning session",
  "Status update",
  "Review meeting",
  "Discussion",
  "Milestone check",
  "Progress review",
  "Follow-up",
  "Action items",
  "Coordination",
  "Alignment",
];

const categories = [
  "Work",
  "Meeting",
  "Personal",
  "Project",
  "Review",
  "Planning",
  "Development",
  "Testing",
  "Design",
  "Research",
  "Documentation",
  "Training",
  "Maintenance",
  "Support",
  "General",
];

const colors = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#6366F1",
  "#8B5A2B",
  "#DC2626",
  "#059669",
  "#D97706",
  "#7C3AED",
];

const timeSlots = [
  { start: "08:00", end: "09:00" },
  { start: "08:30", end: "09:30" },
  { start: "09:00", end: "10:00" },
  { start: "09:30", end: "10:30" },
  { start: "10:00", end: "11:00" },
  { start: "10:30", end: "11:30" },
  { start: "11:00", end: "12:00" },
  { start: "11:30", end: "12:30" },
  { start: "12:00", end: "13:00" },
  { start: "13:00", end: "14:00" },
  { start: "13:30", end: "14:30" },
  { start: "14:00", end: "15:00" },
  { start: "14:30", end: "15:30" },
  { start: "15:00", end: "16:00" },
  { start: "15:30", end: "16:30" },
  { start: "16:00", end: "17:00" },
  { start: "16:30", end: "17:30" },
  { start: "17:00", end: "18:00" },
  { start: "17:30", end: "18:30" },
  { start: "18:00", end: "19:00" },
  { start: "18:30", end: "19:30" },
  { start: "19:00", end: "20:00" },
];

const _generateEventsForDay = (
  date: Date,
  dayOffset: number,
): CalendarEvent[] => {
  const eventsCount = Math.floor(Math.random() * 3) + 6; // 6-8 events per day
  const events: CalendarEvent[] = [];
  const usedTimeSlots = new Set<number>();

  for (let i = 0; i < eventsCount; i++) {
    let timeSlotIndex;
    do {
      timeSlotIndex = Math.floor(Math.random() * timeSlots.length);
    } while (usedTimeSlots.has(timeSlotIndex));

    usedTimeSlots.add(timeSlotIndex);

    const timeSlot = timeSlots[timeSlotIndex];
    const eventId = `${Math.abs(dayOffset)}_${i + 1}`;

    events.push({
      id: eventId,
      startTime: timeSlot.start,
      endTime: timeSlot.end,
      date: format(date, "yyyy-MM-dd"),
      title: `Event ${i + 1}`,
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      priority: Math.floor(Math.random() * 5) + 1, // 1-5 priority
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  return events.sort((a, b) => a.startTime.localeCompare(b.startTime));
};

const _generateEvents = (): { [date: string]: CalendarEvent[] } => {
  const events: { [date: string]: CalendarEvent[] } = {};

  // Generate events before.
  for (let i = -365; i < 0; i++) {
    const date = subDays(today, Math.abs(i));
    events[format(date, "yyyy-MM-dd")] = _generateEventsForDay(date, i);
  }

  // Generate events for today.
  events[format(today, "yyyy-MM-dd")] = _generateEventsForDay(today, 0);

  // Generate events after.
  for (let i = 1; i <= 365; i++) {
    const date = addDays(today, i);
    events[format(date, "yyyy-MM-dd")] = _generateEventsForDay(date, i);
  }

  return events;
};

export const EVENTS: { [date: string]: CalendarEvent[] } = _generateEvents();
