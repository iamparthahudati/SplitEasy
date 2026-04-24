import React, { useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../../components/atoms/Icon';
import { InputField } from '../../../components/molecules/InputField';
import { ListRow } from '../../../components/molecules/ListRow';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import { fontSizes } from '../../../theme/typography';
import styles from './styles';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
];

function CheckIcon() {
  return (
    <View style={styles.checkIcon}>
      <Icon name="check" size={18} stroke={colors.brand} fill="none" />
    </View>
  );
}

export function DefaultCurrencyScreen() {
  const { goBack } = useNavigation();
  const [selected, setSelected] = useState('USD');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      c => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Default Currency" onBack={goBack} />

      <View style={styles.searchWrapper}>
        <InputField
          value={query}
          onChangeText={setQuery}
          placeholder="Search currencies..."
          leftIcon="search"
          autoCapitalize="none"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.code}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={styles.card} />}
        ListEmptyComponent={
          <View style={styles.emptyWrapper}>
            <Text style={{ color: colors.text3, fontSize: fontSizes.base }}>
              No currencies found
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={index === 0 ? styles.card : undefined}>
            <ListRow
              title={item.name}
              subtitle={item.code}
              rightLabel={item.symbol}
              rightElement={selected === item.code ? <CheckIcon /> : undefined}
              onPress={() => setSelected(item.code)}
              showChevron={false}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
