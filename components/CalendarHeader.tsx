import React from "react";
import { View, FlatList, ListRenderItemInfo } from "react-native";
import { format } from "date-fns";
import Animated from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Text } from "@/components/ui/Text";
import { CalendarDayData, useCalendar } from "./CalendarProvider";
import { first, upperFirst } from "lodash";

// Create Animated FlatList component.
const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<CalendarDayData>,
);

export function CalendarHeader() {
  const { theme } = useUnistyles();
  const { dimensions, days, headerRef, currentDayIndex } = useCalendar();
  const { headerHeight, daySize } = dimensions;

  const _renderItem = ({ item }: ListRenderItemInfo<CalendarDayData>) => {
    const [dayNumber, dayText] = format(item.day, "d-EE").split("-");

    return (
      <View
        style={[
          styles.dayContainer,
          { width: daySize, height: headerHeight },
        ]}
      >
        <Text
          size={"xs"}
          color={theme.colors.textSecondary}
          variant={"medium"}
        >
          {upperFirst(first(dayText))}
        </Text>
        <Text variant={"semibold"} style={{ marginTop: theme.margin(2) }}>
          {dayNumber}
        </Text>
      </View>
    );
  };

  return (
    <AnimatedFlatList
      ref={headerRef}
      data={days}
      scrollEnabled={false}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.flatList}
      // snapToInterval={daySize}
      // decelerationRate={"fast"}
      renderItem={_renderItem}
      keyExtractor={(item) => item.formatted}
      initialScrollIndex={currentDayIndex}
      getItemLayout={(_, index) => ({
        length: daySize,
        offset: daySize * index,
        index,
      })}
    />
  );
}

export const styles = StyleSheet.create((theme) => ({
  flatList: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: theme.padding(3),
  },
}));
