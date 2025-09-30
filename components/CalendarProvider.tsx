import React, { ComponentRef, createContext, useContext } from "react";
import { useUnistyles } from "react-native-unistyles";
import { addDays, format, startOfDay, addHours, subDays } from "date-fns";
import { range } from "lodash";
import { AnimatedFlashList } from "@shopify/flash-list";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  AnimatedRef,
  SharedValue,
} from "react-native-reanimated";
import type { CalendarEvent } from "@/data/fixedEvents";

type CalendarDimensions = {
  timeGutterWidth: number;
  daySize: number;
  timeSlotHeight: number;
  headerHeight: number;
  dateFormatter: string;
  totalHours: number;
  startHour: number;
};

export type CalendarDayData = {
  day: Date;
  formatted: string;
};

type CalendarContextValue = {
  // Dimensions.
  dimensions: CalendarDimensions;

  // Configuration.
  daysInWeekToDisplay: number;

  // Data.
  days: CalendarDayData[];
  timeSlots: Date[];
  events: { [date: string]: CalendarEvent[] };

  // Scroll.
  headerRef: AnimatedRef<Animated.FlatList<CalendarDayData>>;
  timeGutterScrollViewRef: AnimatedRef<Animated.ScrollView>;
  eventsOverlayRef: AnimatedRef<Animated.FlatList<any>>;
  flatListRef: AnimatedRef<ComponentRef<typeof AnimatedFlashList>>;
  scrollX: SharedValue<number>;
  scrollY: SharedValue<number>;
  horizontalScrollHandler: (event: any) => void;
  verticalScrollHandler: (event: any) => void;

  currentDayIndex: number;
};

const CalendarContext = createContext<CalendarContextValue | null>(null);

type CalendarProviderProps = {
  children: React.ReactNode;
  events: { [date: string]: CalendarEvent[] };
};

export function CalendarProvider({ children, events }: CalendarProviderProps) {
  const { theme, rt } = useUnistyles();

  // Dimensions logic.
  const dateFormatter = "yyyy-MM-dd";
  const daysInWeekToDisplay = 3;
  const timeGutterWidth = theme.sizing(18);
  const startHour = 8;
  const totalHours = 12;
  const timeSlotHeight = theme.sizing(22);
  const headerHeight = theme.sizing(17);
  const daySize = (rt.screen.width - timeGutterWidth) / daysInWeekToDisplay;

  const dimensions: CalendarDimensions = {
    timeGutterWidth,
    daySize,
    timeSlotHeight,
    headerHeight,
    dateFormatter,
    totalHours,
    startHour,
  };

  // Generate days with 1 year before and after today.
  const _generateDays = () => {
    const today = new Date();
    const daysInYear = 365;
    const totalDays = daysInYear * 2 + 1; // 1 year before + today + 1 year after
    const startDay = subDays(today, daysInYear);

    return [...Array(totalDays)].map((_, index) => {
      const day = addDays(startDay, index);
      return {
        day,
        formatted: format(day, dateFormatter),
      };
    });
  };
  const days = _generateDays();

  // Today is always at the center index (365 days from start).
  const currentDayIndex = 365;

  // Generates hourly time slots for the calendar.
  const _generateTimeSlots = () => {
    const dayStart = startOfDay(new Date());
    return range(totalHours + 1).map((hour: number) =>
      addHours(dayStart, hour + startHour),
    );
  };
  const timeSlots = _generateTimeSlots();

  // Scroll logic.
  const headerRef = useAnimatedRef<Animated.FlatList<CalendarDayData>>();
  const timeGutterScrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const eventsOverlayRef = useAnimatedRef<Animated.FlatList<any>>();
  const flatListRef = useAnimatedRef<ComponentRef<typeof AnimatedFlashList>>();

  const scrollX = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const horizontalScrollHandler = useAnimatedScrollHandler((event) => {
    // Sync header with calendar grid.
    scrollX.value = event.contentOffset.x;
    scrollTo(headerRef, scrollX.value, 0, false);
  });

  const verticalScrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    scrollTo(timeGutterScrollViewRef, 0, scrollY.value, false);
  });

  const value: CalendarContextValue = {
    dimensions,
    daysInWeekToDisplay,
    days,
    timeSlots,
    events,
    headerRef,
    timeGutterScrollViewRef,
    eventsOverlayRef,
    flatListRef,
    scrollX,
    scrollY,
    horizontalScrollHandler,
    verticalScrollHandler,
    currentDayIndex,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar(): CalendarContextValue {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}