# React Native Unistyles 3.0 Setup Guide

This project is now configured with `react-native-unistyles` v3.0 for modern, type-safe styling with theme support and responsive design.

## What's New in Unistyles 3.0

- **No more hooks**: Removed `useStyles` hook for better performance
- **Simplified API**: Direct `StyleSheet.create` usage
- **Better performance**: CSS media queries for responsive design
- **Cleaner syntax**: No more `createStyleSheet` wrapper

## What's Included

### 1. Configuration (`unistyles.ts`)
- **Breakpoints**: Responsive design breakpoints (xs, sm, md, lg, xl, superLarge, tvLike)
- **Themes**: Light and dark theme support with adaptive switching
- **Design System**: Colors, spacing, typography, and border radius tokens

### 2. Theme Structure
```typescript
{
  colors: {
    typography, background, backgroundSecondary,
    accent, accentLight, border,
    success, warning, error, info
  },
  spacing: { xs, sm, md, lg, xl, xxl },
  borderRadius: { sm, md, lg, xl, full },
  typography: { h1, h2, h3, body, caption, small }
}
```

## How to Use

### Basic Component Styling (Unistyles 3.0)
```typescript
import { StyleSheet } from 'react-native-unistyles';

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.typography,
  },
}));
```

### Responsive Design
```typescript
const styles = StyleSheet.create((theme) => ({
  container: {
    width: {
      xs: '100%',
      sm: '90%',
      md: '80%',
      lg: '70%',
      xl: '60%',
    },
    padding: {
      xs: theme.spacing.sm,
      md: theme.spacing.lg,
    },
  },
}));
```

### Theme-Aware Components
The themes automatically switch based on the device's appearance settings. You can also manually control themes:

```typescript
import { UnistylesRuntime } from 'react-native-unistyles';

// Get current theme
const currentTheme = UnistylesRuntime.themeName;

// Set theme manually
UnistylesRuntime.setTheme('dark');
```

### Accessing Theme in Components
If you need to access the theme in your component logic, use `useUnistyles`:

```typescript
import { useUnistyles } from 'react-native-unistyles';

const MyComponent = () => {
  const { theme } = useUnistyles();
  
  return (
    <Button color={theme.colors.primary} />
  );
};
```

## Key Features

1. **Type Safety**: Full TypeScript support with autocomplete
2. **Theme Support**: Automatic light/dark mode switching
3. **Responsive Design**: Breakpoint-based styling with CSS media queries
4. **Performance**: Optimized for React Native with no re-renders
5. **Design System**: Consistent spacing, colors, and typography
6. **No Hooks**: Direct style usage without `useStyles` hook

## Migration from Unistyles 2.0

The main changes in v3.0:
- Replace `createStyleSheet` with `StyleSheet.create`
- Remove `useStyles` hook usage
- Use `StyleSheet.configure` instead of `UnistylesRegistry`
- Styles are now directly accessible without hooks

## Example Components

Check out `components/ExampleCard.tsx` for a complete example of:
- Responsive design with breakpoints
- Theme-aware styling
- Touchable components with proper styling

## Next Steps

1. Customize the theme colors and spacing in `unistyles.ts`
2. Add more breakpoints if needed
3. Create reusable styled components
4. Implement your calendar-specific styling

## Resources

- [Unistyles 3.0 Documentation](https://www.unistyl.es/)
- [Migration Guide](https://www.unistyl.es/v3/start/migration-guide/)
- [GitHub Repository](https://github.com/nandorojo/react-native-unistyles)
