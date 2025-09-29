import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useCalendar, type CalendarDayData } from "./CalendarProvider";
import { useEventLayout } from "./useEventLayout";
import type { CalendarEvent } from "@/data/fixedEvents";

type CalendarDayProps = {
  day: CalendarDayData;
  renderEvent: (event: CalendarEvent) => React.ReactNode;
};

export function CalendarDay({ day, renderEvent }: CalendarDayProps) {
  const { dimensions, timeSlots, events } = useCalendar();
  const { timeSlotHeight, daySize, startHour } = dimensions;

  // Get events for this specific day.
  const dayEvents = events[day.formatted] || [];

  // Dimensions object for useEventLayout.
  const layoutConfig = {
    daySize,
    timeSlotHeight,
    startHour,
  };

  // Calculate layout positions.
  const eventsWithLayout = useEventLayout(dayEvents, layoutConfig);

  const _renderEvents = () => {
    return eventsWithLayout.map((eventData) => {
      return (
        <View
          key={`day-${day.formatted}-event-${eventData.event.id}`}
          style={[
            styles.eventContainer,
            {
              left: eventData.left,
              top: eventData.top,
              width: eventData.width,
              height: eventData.height,
            },
          ]}
        >
          {renderEvent(eventData.event)}
        </View>
      );
    });
  };

  return (
    <View style={{ width: daySize, position: "relative" }}>
      {/* Time grid. */}
      {timeSlots.map((_, index) => (
        <View
          key={`day-${day.formatted}-hour-${index}`}
          style={[styles.timeSlot, { height: timeSlotHeight }]}
        >
          <View style={styles.absoluteBorder} />
        </View>
      ))}

      {/* Events. */}
      {_renderEvents()}
    </View>
  );
}

export const styles = StyleSheet.create((theme, rt) => ({
  timeSlot: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  absoluteBorder: {
    width: 1,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
    height: rt.screen.height * 2,
    position: "absolute",
    top: -rt.screen.height,
    left: -1,
  },
  eventContainer: {
    position: "absolute",
    zIndex: 1,
  },
}));