import { a11y } from '@utils/helper';
import React, { JSX } from 'react';
import {
  OpaqueColorValue,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import createStyles from './styles';

// ─── Icon Names ───────────────────────────────────────────────────────────────

export type IconName =
  | 'chevron-down-black'
  | 'chevron-down-gray'
  | 'chevron-up-gray'
  | 'chevron-right'
  | 'chevron-left'
  | 'arrow-back'
  | 'arrow-forward'
  | 'plus'
  | 'minus'
  | 'close'
  | 'check'
  | 'check-circle'
  | 'search'
  | 'bell'
  | 'bell-filled'
  | 'settings'
  | 'user'
  | 'users'
  | 'camera'
  | 'edit'
  | 'trash'
  | 'share'
  | 'send'
  | 'copy'
  | 'link'
  | 'mail'
  | 'phone'
  | 'calendar'
  | 'receipt'
  | 'dollar'
  | 'credit-card'
  | 'percent'
  | 'repeat'
  | 'refresh'
  | 'download'
  | 'upload'
  | 'filter'
  | 'tag'
  | 'home'
  | 'activity'
  | 'bar-chart'
  | 'file-text'
  | 'info'
  | 'alert-triangle'
  | 'alert-circle'
  | 'eye'
  | 'eye-off'
  | 'lock'
  | 'globe'
  | 'star'
  | 'star-filled'
  | 'log-out'
  | 'help-circle'
  | 'shield'
  | 'crown'
  | 'zap'
  | 'gift'
  | 'hash'
  | 'qr-code';

// ─── SVG Type ─────────────────────────────────────────────────────────────────

type SvgComponent = React.FC<SvgProps>;

// ─── Icon Map ─────────────────────────────────────────────────────────────────

const IconMap: Record<IconName, SvgComponent> = {
  'chevron-down-black': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  // ── Remaining icons: add the SVG file to src/assets/icons/ and uncomment ──
  'chevron-down-gray': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  'chevron-up-gray': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  'chevron-right': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  'chevron-left': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  'arrow-back': require('../../../assets/icons/chevron-down-black.svg').default,
  'arrow-forward': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  plus: require('../../../assets/icons/chevron-down-black.svg').default,
  minus: require('../../../assets/icons/chevron-down-black.svg').default,
  close: require('../../../assets/icons/chevron-down-black.svg').default,
  check: require('../../../assets/icons/chevron-down-black.svg').default,
  'check-circle': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  search: require('../../../assets/icons/chevron-down-black.svg').default,
  bell: require('../../../assets/icons/chevron-down-black.svg').default,
  'bell-filled': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  settings: require('../../../assets/icons/chevron-down-black.svg').default,
  user: require('../../../assets/icons/chevron-down-black.svg').default,
  users: require('../../../assets/icons/chevron-down-black.svg').default,
  camera: require('../../../assets/icons/chevron-down-black.svg').default,
  edit: require('../../../assets/icons/chevron-down-black.svg').default,
  trash: require('../../../assets/icons/chevron-down-black.svg').default,
  share: require('../../../assets/icons/chevron-down-black.svg').default,
  send: require('../../../assets/icons/chevron-down-black.svg').default,
  copy: require('../../../assets/icons/chevron-down-black.svg').default,
  link: require('../../../assets/icons/chevron-down-black.svg').default,
  mail: require('../../../assets/icons/chevron-down-black.svg').default,
  phone: require('../../../assets/icons/chevron-down-black.svg').default,
  calendar: require('../../../assets/icons/chevron-down-black.svg').default,
  receipt: require('../../../assets/icons/chevron-down-black.svg').default,
  dollar: require('../../../assets/icons/chevron-down-black.svg').default,
  'credit-card': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  percent: require('../../../assets/icons/chevron-down-black.svg').default,
  repeat: require('../../../assets/icons/chevron-down-black.svg').default,
  refresh: require('../../../assets/icons/chevron-down-black.svg').default,
  download: require('../../../assets/icons/chevron-down-black.svg').default,
  upload: require('../../../assets/icons/chevron-down-black.svg').default,
  filter: require('../../../assets/icons/chevron-down-black.svg').default,
  tag: require('../../../assets/icons/chevron-down-black.svg').default,
  home: require('../../../assets/icons/chevron-down-black.svg').default,
  activity: require('../../../assets/icons/chevron-down-black.svg').default,
  'bar-chart': require('../../../assets/icons/chevron-down-black.svg').default,
  'file-text': require('../../../assets/icons/chevron-down-black.svg').default,
  info: require('../../../assets/icons/chevron-down-black.svg').default,
  'alert-triangle': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  'alert-circle': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  eye: require('../../../assets/icons/chevron-down-black.svg').default,
  'eye-off': require('../../../assets/icons/chevron-down-black.svg').default,
  lock: require('../../../assets/icons/chevron-down-black.svg').default,
  globe: require('../../../assets/icons/chevron-down-black.svg').default,
  star: require('../../../assets/icons/chevron-down-black.svg').default,
  'star-filled': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  'log-out': require('../../../assets/icons/chevron-down-black.svg').default,
  'help-circle': require('../../../assets/icons/chevron-down-black.svg')
    .default,
  shield: require('../../../assets/icons/chevron-down-black.svg').default,
  crown: require('../../../assets/icons/chevron-down-black.svg').default,
  zap: require('../../../assets/icons/chevron-down-black.svg').default,
  gift: require('../../../assets/icons/chevron-down-black.svg').default,
  hash: require('../../../assets/icons/chevron-down-black.svg').default,
  'qr-code': require('../../../assets/icons/chevron-down-black.svg').default,
};

// ─── Guard ────────────────────────────────────────────────────────────────────

const filteredIconName = (value: string): IconName => {
  const validNames = Object.keys(IconMap) as IconName[];
  return validNames.includes(value as IconName) ? (value as IconName) : 'info';
};

// ─── Props ────────────────────────────────────────────────────────────────────

export type IconProps = {
  name: IconName;
  stroke?: string | OpaqueColorValue;
  fill?: string | OpaqueColorValue;
  fillSecondary?: string | OpaqueColorValue;
  strokeSecondary?: string | OpaqueColorValue;
  size?: number;
  height?: number;
  width?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

const Icon: React.FC<IconProps> = ({
  name = 'info',
  stroke = 'none',
  fill = 'none',
  size = 18,
  height,
  width,
  style,
  onPress,
}): JSX.Element => {
  const finalIconName = filteredIconName(name);
  const CustomIcon = IconMap[finalIconName];
  const styles = createStyles;

  return (
    <Pressable
      testID={`icon-${finalIconName}`}
      style={[styles.mainContainerStyle, style]}
      onPress={onPress}
      disabled={!onPress}
      {...a11y()}
    >
      <CustomIcon
        height={height ?? size}
        width={width ?? size}
        fill={fill}
        stroke={stroke}
      />
    </Pressable>
  );
};

export default React.memo(Icon);
