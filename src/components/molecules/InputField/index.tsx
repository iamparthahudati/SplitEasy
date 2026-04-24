import React, { useRef, useState } from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleProp,
  Text,
  TextInput,
  type TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import Icon, { IconName } from '../../atoms/Icon';
import styles from './styles';

export interface InputFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  leftIcon?: IconName;
  rightElement?: React.ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  style?: StyleProp<ViewStyle>;
  inputStyle?: TextStyle;
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  hint,
  leftIcon,
  rightElement,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  editable = true,
  autoCapitalize = 'none',
  style,
  inputStyle,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const hasError = !!error;
  const isDisabled = !editable;

  const borderColor = hasError
    ? colors.neg
    : focused
    ? colors.brand
    : colors.borderMid;

  const containerBg = isDisabled ? colors.border : colors.white;

  return (
    <View style={[styles.wrapper, style]}>
      {label ? (
        <Text style={[styles.label, hasError && styles.labelError]}>
          {label}
        </Text>
      ) : null}

      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={[
          styles.inputContainer,
          { borderColor, backgroundColor: containerBg },
          focused && !hasError && styles.inputContainerFocused,
          multiline && {
            height: undefined,
            minHeight: 52 + (numberOfLines - 1) * 22,
            alignItems: 'flex-start',
            paddingVertical: spacing[3],
          },
        ]}
        accessible={false}
      >
        {leftIcon ? (
          <View style={styles.leftIconWrap}>
            <Icon
              name={leftIcon}
              size={18}
              stroke={focused ? colors.brand : colors.text3}
              fill="none"
            />
          </View>
        ) : null}

        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeft : null,
            rightElement ? styles.inputWithRight : null,
            multiline && styles.inputMultiline,
            isDisabled && styles.inputDisabled,
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text4}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          textAlignVertical={multiline ? 'top' : 'center'}
        />

        {rightElement ? (
          <View style={styles.rightElementWrap}>{rightElement}</View>
        ) : null}
      </Pressable>

      {hasError ? (
        <View style={styles.feedbackRow}>
          <View style={styles.errorDot} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
}
