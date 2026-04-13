import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { SettingsStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

type Nav = NativeStackNavigationProp<SettingsStackParamList, 'DefaultCurrency'>;

// ─── Currency data ─────────────────────────────────────────────────────────────

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$', flag: '🇲🇽' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  { code: 'CLP', name: 'Chilean Peso', symbol: 'CL$', flag: '🇨🇱' },
  { code: 'COP', name: 'Colombian Peso', symbol: 'CO$', flag: '🇨🇴' },
  { code: 'ARS', name: 'Argentine Peso', symbol: 'AR$', flag: '🇦🇷' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/.', flag: '🇵🇪' },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export function DefaultCurrencyScreen() {
  const navigation = useNavigation<Nav>();

  const [selected, setSelected] = useState('USD');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      c =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q),
    );
  }, [query]);

  function handleSelect(code: string) {
    setSelected(code);
    // TODO: dispatch SET_USER with updated currency + persist to Firestore
    setTimeout(() => navigation.goBack(), 300);
  }

  return (
    <SafeAreaView style={styles.root} edges={['bottom']}>
      {/* ── Search bar ─────────────────────────────────────────────── */}
      <View style={styles.searchWrap}>
        <View style={styles.searchRow}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search currencies…"
            placeholderTextColor={colors.text4}
            autoCorrect={false}
            clearButtonMode="while-editing"
            returnKeyType="search"
          />
        </View>
      </View>

      {/* ── List ───────────────────────────────────────────────────── */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        <View style={styles.card}>
          {filtered.map((currency, index) => {
            const isSelected = currency.code === selected;
            const isLast = index === filtered.length - 1;
            return (
              <React.Fragment key={currency.code}>
                <Pressable
                  style={({ pressed }) => [
                    styles.row,
                    pressed && styles.rowPressed,
                  ]}
                  onPress={() => handleSelect(currency.code)}
                  android_ripple={{ color: colors.brandLight }}
                >
                  {/* Flag + text */}
                  <Text style={styles.flag}>{currency.flag}</Text>
                  <View style={styles.rowMid}>
                    <Text style={styles.currencyCode}>{currency.code}</Text>
                    <Text style={styles.currencyName}>{currency.name}</Text>
                  </View>

                  {/* Right side */}
                  <View style={styles.rowRight}>
                    <Text
                      style={[
                        styles.symbol,
                        isSelected && styles.symbolSelected,
                      ]}
                    >
                      {currency.symbol}
                    </Text>
                    {isSelected && (
                      <View style={styles.checkmark}>
                        <Text style={styles.checkmarkText}>✓</Text>
                      </View>
                    )}
                  </View>
                </Pressable>
                {!isLast && <View style={styles.divider} />}
              </React.Fragment>
            );
          })}

          {filtered.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No currencies match "{query}"
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  // Search
  searchWrap: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderRadius: radius.sm,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    gap: spacing[2],
    borderWidth: 1,
    borderColor: colors.borderMid,
  },
  searchIcon: { fontSize: fontSizes.base },
  searchInput: {
    flex: 1,
    fontSize: fontSizes.base,
    color: colors.text1,
    padding: 0,
  },

  // List
  listContent: {
    padding: spacing[5],
    paddingTop: spacing[4],
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  // Currency row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3] + 2,
    gap: spacing[3],
  },
  rowPressed: {
    backgroundColor: colors.brandLight,
  },
  flag: {
    fontSize: fontSizes.lg + 2,
    lineHeight: 28,
    width: 28,
    textAlign: 'center',
  },
  rowMid: { flex: 1, gap: 1 },
  currencyCode: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
  },
  currencyName: {
    fontSize: fontSizes.sm,
    color: colors.text4,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  symbol: {
    fontSize: fontSizes.base,
    color: colors.text4,
    fontWeight: fontWeights.medium as any,
    minWidth: 20,
    textAlign: 'right',
  },
  symbolSelected: {
    color: colors.brand,
    fontWeight: fontWeights.semibold as any,
  },
  checkmark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold as any,
    color: colors.white,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing[4] + 28 + spacing[3], // align under text
  },

  // Empty state
  emptyState: {
    paddingVertical: spacing[8],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSizes.base,
    color: colors.text4,
  },
});
