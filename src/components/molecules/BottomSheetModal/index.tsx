import React, { JSX, useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import Icon from '../../atoms/Icon';
import styles, {
  ANIM_DURATION,
  OVERLAY_OPACITY,
  SCREEN_HEIGHT,
  SNAP_HEIGHTS,
} from './styles';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SnapHeight = 'quarter' | 'half' | 'full' | 'auto';

export interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  /** Show a close (X) button in the top-right corner */
  showCloseButton?: boolean;
  /** Tapping the backdrop dismisses the sheet — default true */
  closeOnBackdrop?: boolean;
  snapHeight?: SnapHeight;
  children?: React.ReactNode;
  /** Extra style applied to the sheet panel itself */
  style?: StyleProp<ViewStyle>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BottomSheetModal({
  visible,
  onClose,
  title,
  showCloseButton = true,
  closeOnBackdrop = true,
  snapHeight = 'auto',
  children,
  style,
}: BottomSheetModalProps): JSX.Element {
  const insets = useSafeAreaInsets();

  // translateY: 0 = fully visible, SCREEN_HEIGHT = fully off-screen
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // ── Animate in ──
  const animateIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: ANIM_DURATION,
        easing: Easing.out(Easing.bezier(0.25, 0.46, 0.45, 0.94)),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: OVERLAY_OPACITY,
        duration: ANIM_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, overlayOpacity]);

  // ── Animate out then call onClose ──
  const animateOut = useCallback(() => {
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: ANIM_DURATION - 40,
        easing: Easing.in(Easing.bezier(0.55, 0, 1, 0.45)),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: ANIM_DURATION - 40,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onClose();
      }
    });
  }, [translateY, overlayOpacity, onClose]);

  useEffect(() => {
    if (visible) {
      animateIn();
    } else {
      // Reset immediately when closed externally (e.g. navigation)
      translateY.setValue(SCREEN_HEIGHT);
      overlayOpacity.setValue(0);
    }
  }, [visible, animateIn, translateY, overlayOpacity]);

  // ── Sheet height style ──
  const sheetHeightStyle: ViewStyle =
    snapHeight === 'auto'
      ? { maxHeight: SCREEN_HEIGHT * 0.92 }
      : { height: SNAP_HEIGHTS[snapHeight] };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={animateOut}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ── Backdrop ── */}
        <Animated.View
          style={[styles.backdrop, { opacity: overlayOpacity }]}
          pointerEvents={closeOnBackdrop ? 'auto' : 'none'}
        >
          <Pressable
            style={styles.flex}
            onPress={closeOnBackdrop ? animateOut : undefined}
            accessibilityLabel="Close sheet"
            accessibilityRole="button"
          />
        </Animated.View>

        {/* ── Sheet panel ── */}
        <Animated.View
          style={[
            styles.sheet,
            sheetHeightStyle,
            { paddingBottom: insets.bottom || spacing[4] },
            { transform: [{ translateY }] },
            style,
          ]}
        >
          {/* Drag handle */}
          <View style={styles.handleWrap} pointerEvents="none">
            <View style={styles.handle} />
          </View>

          {/* Header row */}
          {title || showCloseButton ? (
            <View style={styles.header}>
              {/* Left spacer keeps title centered when close button is shown */}
              {showCloseButton ? <View style={styles.headerSide} /> : null}

              {title ? (
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
              ) : (
                <View style={styles.flex} />
              )}

              {showCloseButton ? (
                <View style={styles.headerSide}>
                  <Pressable
                    onPress={animateOut}
                    style={({ pressed }) => [
                      styles.closeBtn,
                      pressed && styles.closeBtnPressed,
                    ]}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Close"
                  >
                    <Icon
                      name="close"
                      size={16}
                      stroke={colors.text3}
                      fill="none"
                    />
                  </Pressable>
                </View>
              ) : null}
            </View>
          ) : null}

          {/* Content */}
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
