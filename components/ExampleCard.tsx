import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface ExampleCardProps {
  title: string;
  description: string;
  onPress?: () => void;
}

export const ExampleCard: React.FC<ExampleCardProps> = ({ 
  title, 
  description, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    // Responsive design
    width: {
      xs: '100%',
      sm: '90%',
      md: '80%',
      lg: '70%',
      xl: '60%',
    },
    maxWidth: 400,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.typography,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.typography,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 22,
  },
}));
