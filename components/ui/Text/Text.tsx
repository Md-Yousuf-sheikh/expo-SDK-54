import React from "react";
import { Text as RNText } from "react-native";
import { styles } from "./styles";
import type { TextProps } from "./types";

export const Text: React.FC<TextProps> = ({
  children,
  style,
  variant = "regular",
  size = "base",
  color,
  ...props
}) => {
  styles.useVariants({
    variant,
    size,
  });

  return (
    <RNText style={[styles.text, color && { color }, style]} {...props}>
      {children}
    </RNText>
  );
};