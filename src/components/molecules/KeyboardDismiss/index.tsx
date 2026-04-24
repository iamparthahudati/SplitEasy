import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

// ---------------------------------------------------------------------------
// KeyboardDismiss
// ---------------------------------------------------------------------------

export interface KeyboardDismissProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function KeyboardDismiss({ children, style }: KeyboardDismissProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.inner, style]}>{children}</View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
  },
});

// ---------------------------------------------------------------------------
// useKeyboardVisible
// ---------------------------------------------------------------------------

export function useKeyboardVisible(): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setIsVisible(true);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setIsVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return isVisible;
}
