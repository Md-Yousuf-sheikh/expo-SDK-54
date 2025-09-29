import { StyleSheet } from "react-native-unistyles";

/**
 * Styles for custom Text component using theme system.
 */
export const styles = StyleSheet.create((theme) => ({
  text: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,

    variants: {
      variant: {
        light: {
          fontFamily: theme.typography.fontFamily.light,
        },
        regular: {
          fontFamily: theme.typography.fontFamily.regular,
        },
        medium: {
          fontFamily: theme.typography.fontFamily.medium,
        },
        semibold: {
          fontFamily: theme.typography.fontFamily.semibold,
        },
        bold: {
          fontFamily: theme.typography.fontFamily.bold,
        },
      },
      size: {
        xs: {
          fontSize: theme.typography.fontSize.xs,
          letterSpacing: theme.typography.letterSpacing.xs,
        },
        sm: {
          fontSize: theme.typography.fontSize.sm,
          letterSpacing: theme.typography.letterSpacing.sm,
        },
        base: {
          fontSize: theme.typography.fontSize.base,
          letterSpacing: theme.typography.letterSpacing.base,
        },
        lg: {
          fontSize: theme.typography.fontSize.lg,
          letterSpacing: theme.typography.letterSpacing.lg,
        },
        xl: {
          fontSize: theme.typography.fontSize.xl,
          letterSpacing: theme.typography.letterSpacing.xl,
          lineHeight: theme.typography.lineHeight.xl,
        },
        "2xl": {
          fontSize: theme.typography.fontSize["2xl"],
          letterSpacing: theme.typography.letterSpacing["2xl"],
          lineHeight: theme.typography.lineHeight["2xl"],
        },
        "3xl": {
          fontSize: theme.typography.fontSize["3xl"],
          letterSpacing: theme.typography.letterSpacing["3xl"],
          lineHeight: theme.typography.lineHeight["3xl"],
        },
        "4xl": {
          fontSize: theme.typography.fontSize["4xl"],
          letterSpacing: theme.typography.letterSpacing["4xl"],
          lineHeight: theme.typography.lineHeight["4xl"],
        },
        "5xl": {
          fontSize: theme.typography.fontSize["5xl"],
          letterSpacing: theme.typography.letterSpacing["5xl"],
          lineHeight: theme.typography.lineHeight["5xl"],
        },
        "6xl": {
          fontSize: theme.typography.fontSize["6xl"],
          letterSpacing: theme.typography.letterSpacing["6xl"],
          lineHeight: theme.typography.lineHeight["6xl"],
        },
        "7xl": {
          fontSize: theme.typography.fontSize["7xl"],
          letterSpacing: theme.typography.letterSpacing["7xl"],
          lineHeight: theme.typography.lineHeight["7xl"],
        },
      },
    },
  },
}));
