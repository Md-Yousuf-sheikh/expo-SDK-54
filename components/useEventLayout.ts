import { sortBy } from "lodash";
import type { CalendarEvent } from "@/data/fixedEvents";

type EventWithLayout = {
  event: CalendarEvent;
  left: number;
  top: number;
  width: number;
  height: number;
};

type CalendarDimensions = {
  daySize: number;
  timeSlotHeight: number;
  startHour: number;
};

/**
 * Simplified hook that calculates layout positions for events of a single day.
 * Returns events with relative positions within the day container.
 */
export function useEventLayout(
  dayEvents: CalendarEvent[],
  dimensions: CalendarDimensions,
): EventWithLayout[] {
  const { daySize, timeSlotHeight, startHour } = dimensions;

  // Helper function to convert time to pixels.
  const _timeToPixels = (timeString: string): number => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes - startHour * 60;
    const pixelsPerMinute = timeSlotHeight / 60;
    return totalMinutes * pixelsPerMinute;
  };

  // Helper function to calculate event height.
  const _durationToHeight = (startTime: string, endTime: string): number => {
    const startPixels = _timeToPixels(startTime);
    const endPixels = _timeToPixels(endTime);
    return Math.max(endPixels - startPixels, 24); // Minimum height (fixed value instead of theme)
  };

  // Helper function to check if two events overlap in time.
  const _eventsOverlap = (eventA: CalendarEvent, eventB: CalendarEvent): boolean => {
    const startA = _timeToPixels(eventA.startTime);
    const endA = _timeToPixels(eventA.endTime);
    const startB = _timeToPixels(eventB.startTime);
    const endB = _timeToPixels(eventB.endTime);
    return startA < endB && startB < endA;
  };

  // Calculate events layout for the single day.
  const _calculateEventsLayout = () => {
    if (dayEvents.length === 0) return [];

    // Find overlapping groups of events.
    const overlapGroups: CalendarEvent[][] = [];
    const processedEvents = new Set<string>();

    dayEvents.forEach((event) => {
      if (processedEvents.has(event.id)) return;

      // Find all events that overlap with this event.
      const currentGroup: CalendarEvent[] = [event];
      const toProcess = [event];
      processedEvents.add(event.id);

      while (toProcess.length > 0) {
        const currentEvent = toProcess.shift()!;

        dayEvents.forEach((otherEvent) => {
          if (
            !processedEvents.has(otherEvent.id) &&
            _eventsOverlap(currentEvent, otherEvent)
          ) {
            currentGroup.push(otherEvent);
            toProcess.push(otherEvent);
            processedEvents.add(otherEvent.id);
          }
        });
      }

      overlapGroups.push(currentGroup);
    });

    // Calculate layout for each group.
    const result: EventWithLayout[] = [];

    overlapGroups.forEach((group) => {
      if (group.length === 1) {
        // Single event - use full day width.
        const event = group[0];
        result.push({
          event,
          left: 0, // Relative to day container
          top: _timeToPixels(event.startTime),
          width: daySize,
          height: _durationToHeight(event.startTime, event.endTime),
        });
      } else {
        // Multiple overlapping events - create columns.
        const sortedEvents = sortBy(group, (event) => _timeToPixels(event.startTime));
        const columns: CalendarEvent[][] = [];

        sortedEvents.forEach((event) => {
          // Find first column where this event doesn't overlap.
          let placedInColumn = false;

          for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const hasOverlap = column.some((existingEvent) =>
              _eventsOverlap(event, existingEvent)
            );

            if (!hasOverlap) {
              column.push(event);
              placedInColumn = true;
              break;
            }
          }

          // If no suitable column found, create a new one.
          if (!placedInColumn) {
            columns.push([event]);
          }
        });

        // Calculate positions for each column.
        const columnWidth = daySize / columns.length;

        columns.forEach((column, columnIndex) => {
          column.forEach((event) => {
            result.push({
              event,
              left: columnIndex * columnWidth, // Relative to day container
              top: _timeToPixels(event.startTime),
              width: columnWidth,
              height: _durationToHeight(event.startTime, event.endTime),
            });
          });
        });
      }
    });

    return result;
  };
  const eventsWithLayout = _calculateEventsLayout();

  return eventsWithLayout;
}