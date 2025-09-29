import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { CalendarHeader } from "./CalendarHeader";
import { TimeGutter } from "./TimeGutter";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarProvider } from "./CalendarProvider";
import type { CalendarEvent } from "@/data/fixedEvents";

type CalendarProps = {
  events: { [date: string]: CalendarEvent[] };
  renderEvent: (event: CalendarEvent) => React.ReactNode;
};

export function Calendar({
  events,
  renderEvent,
}: CalendarProps) {
  return (
    <CalendarProvider events={events}>
      <View style={styles.content}>
        <TimeGutter />
        <View style={styles.rightSection}>
          <CalendarHeader />
          <CalendarGrid renderEvent={renderEvent} />
        </View>
      </View>
    </CalendarProvider>
  );
}

export const styles = StyleSheet.create((theme) => ({
  content: {
    flex: 1,
    flexDirection: "row",
  },
  rightSection: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.gap(4),
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.padding(6),
    gap: theme.gap(2),
  },
  errorText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  errorCode: {
    fontSize: 14,
    textAlign: "center",
  },
}));
