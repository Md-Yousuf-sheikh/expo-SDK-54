import type { TextProps as RNTextProps } from "react-native";

/**
 * Props for custom Text component.
 */
export type TextProps = RNTextProps & {
  /** Text variant for different font weights. */
  variant?: "light" | "regular" | "medium" | "semibold" | "bold";
  /** Text size variant. */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  /** Text color as string (theme color or any valid color). */
  color?: string;
};