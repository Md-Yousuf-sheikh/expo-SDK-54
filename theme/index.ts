import { StyleSheet } from 'react-native-unistyles'

// Define your breakpoints
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000
} as const

// Define your theme
export const lightTheme = {
  colors: {
    typography: '#000000',
    background: '#FFFFFF',
    backgroundSecondary: '#F5F5F5',
    accent: '#007AFF',
    accentLight: '#E3F2FD',
    border: '#E0E0E0',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    // Messaging specific colors
    messageBackground: '#F0F0F0',
    messageBackgroundOwn: '#007AFF',
    messageText: '#000000',
    messageTextOwn: '#FFFFFF',
    inputBackground: '#FFFFFF',
    inputBorder: '#E0E0E0',
    // Additional colors for calendar
    textSecondary: '#666666',
    text: '#000000',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal' as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal' as const,
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      fontWeight: 'normal' as const,
      lineHeight: 16,
    },
  },
  // Helper functions for spacing
  sizing: (value: number) => value,
  gap: (value: number) => value,
  padding: (value: number) => value,
  margin: (value: number) => value,
} as const

export const darkTheme = {
  colors: {
    typography: '#FFFFFF',
    background: '#000000',
    backgroundSecondary: '#1C1C1E',
    accent: '#0A84FF',
    accentLight: '#1C1C1E',
    border: '#38383A',
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#64D2FF',
    // Messaging specific colors
    messageBackground: '#2C2C2E',
    messageBackgroundOwn: '#0A84FF',
    messageText: '#FFFFFF',
    messageTextOwn: '#FFFFFF',
    inputBackground: '#1C1C1E',
    inputBorder: '#38383A',
    // Additional colors for calendar
    textSecondary: '#999999',
    text: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal' as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal' as const,
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      fontWeight: 'normal' as const,
      lineHeight: 16,
    },
  },
  // Helper functions for spacing
  sizing: (value: number) => value,
  gap: (value: number) => value,
  padding: (value: number) => value,
  margin: (value: number) => value,
} as const

// Register the configuration using new StyleSheet.configure API
type AppBreakpoints = typeof breakpoints
type AppThemes = {
  light: typeof lightTheme
  dark: typeof darkTheme
}

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  breakpoints,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  settings: {
    adaptiveThemes: true,
  }
})