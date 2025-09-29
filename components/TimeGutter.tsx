import React from "react";
import { View } from "react-native";
import { format } from "date-fns";
import Animated from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Text } from "@/components/ui/Text";
import { useCalendar } from "./CalendarProvider";

export function TimeGutter() {
  const { theme } = useUnistyles();
  const { dimensions, timeSlots, timeGutterScrollViewRef } = useCalendar();
  const { headerHeight, timeSlotHeight, timeGutterWidth } = dimensions;

  return (
    <Animated.ScrollView
      ref={timeGutterScrollViewRef}
      style={[
        styles.scrollView,
        { width: timeGutterWidth, marginTop: headerHeight },
      ]}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      scrollToOverflowEnabled
    >
      {timeSlots.map((hour, index) => (
        <View
          key={`day-hour-${index}`}
          style={[styles.timeSlot, { height: timeSlotHeight }]}
        >
          <Text
            color={theme.colors.textSecondary}
            size={"sm"}
            variant={"semibold"}
            style={styles.timeText}
          >
            {format(hour, "HH:mm")}
          </Text>
        </View>
      ))}
    </Animated.ScrollView>
  );
}

export const styles = StyleSheet.create((theme) => ({
  scrollView: {
    flexGrow: 0,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    paddingTop: theme.padding(5),
  },
  timeSlot: {
    alignItems: "flex-end",
    paddingRight: theme.padding(1.5),
  },
  timeText: {
    marginTop: -theme.sizing(2),
  },
}));
