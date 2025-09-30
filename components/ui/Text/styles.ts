import { StyleSheet } from "react-native-unistyles";

/**
 * Styles for custom Text component using theme system.
 */
export const styles = StyleSheet.create((theme) => ({
  text: {
    color: theme.colors.text,

    variants: {
      variant: {
        light: {
          fontWeight: '300',
        },
        regular: {
          fontWeight: '400',
        },
        medium: {
          fontWeight: '500',
        },
        semibold: {
          fontWeight: '600',
        },
        bold: {
          fontWeight: 'bold',
        },
      },
      size: {
        xs: {
          fontSize: 12,
        },
        sm: {
          fontSize: 14,
        },
        base: {
          fontSize: 16,
        },
        lg: {
          fontSize: 18,
        },
        xl: {
          fontSize: 20,
        },
        "2xl": {
          fontSize: 24,
        },
        "3xl": {
          fontSize: 28,
        },
        "4xl": {
          fontSize: 32,
        },
        "5xl": {
          fontSize: 36,
        },
        "6xl": {
          fontSize: 40,
        },
        "7xl": {
          fontSize: 44,
        },
      },
    },
  },
}));
