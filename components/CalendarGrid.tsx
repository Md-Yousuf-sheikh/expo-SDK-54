import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { CalendarDay } from "./CalendarDay";
import { useCalendar, CalendarDayData } from "./CalendarProvider";
import type { CalendarEvent } from "@/data/fixedEvents";

// Create Animated FlashList component.
const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList<CalendarDayData>,
);

type CalendarGridProps = {
  renderEvent: (event: CalendarEvent) => React.ReactNode;
};

export function CalendarGrid({ renderEvent }: CalendarGridProps) {
  const { rt } = useUnistyles();
  const {
    dimensions,
    days,
    flatListRef,
    horizontalScrollHandler,
    verticalScrollHandler,
    currentDayIndex,
  } = useCalendar();
  const { daySize } = dimensions;

  const _renderItem = ({ item }: ListRenderItemInfo<CalendarDayData>) => (
    <CalendarDay day={item} renderEvent={renderEvent} />
  );

  return (
    <View style={styles.gridContainer}>
      <Animated.ScrollView
        onScroll={verticalScrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.verticalScrollView}
      >
        <AnimatedFlashList
          ref={flatListRef}
          data={days}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={_renderItem}
          keyExtractor={(item) => item.formatted}
          //snapToInterval={daySize}
          pagingEnabled
          decelerationRate={"fast"}
          bounces={false}
          onScroll={horizontalScrollHandler}
          scrollEventThrottle={16}
          initialScrollIndex={currentDayIndex}
          // drawDistance={rt.screen.width}
          //  removeClippedSubviews={false}
          //  getItemType={() => "grid"}
          //  onMoveShouldSetResponder={() => true}
          // maxItemsInRecyclePool={50}
        />
      </Animated.ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create((theme) => ({
  gridContainer: {
    flex: 1,
    position: "relative",
  },
  verticalScrollView: {
    flex: 1,
    paddingTop: theme.padding(5),
  },
  flashList: {
    overflow: "visible",
  },
}));
