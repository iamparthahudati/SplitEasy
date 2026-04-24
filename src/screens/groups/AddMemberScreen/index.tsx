import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chip from '../../../components/atoms/Chip';
import Icon from '../../../components/atoms/Icon';
import { InputField } from '../../../components/molecules/InputField';
import { ListRow } from '../../../components/molecules/ListRow';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { SectionHeader } from '../../../components/molecules/SectionHeader';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import styles from './styles';

// ─── Suggested contacts ───────────────────────────────────────────────────────

interface Contact {
  id: string;
  name: string;
  email: string;
}

const SUGGESTIONS: Contact[] = [
  { id: '1', name: 'Emma Wilson', email: 'emma.wilson@email.com' },
  { id: '2', name: 'Liam Brown', email: 'liam.brown@email.com' },
  { id: '3', name: 'Olivia Davis', email: 'olivia.davis@email.com' },
  { id: '4', name: 'Noah Martinez', email: 'noah.martinez@email.com' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function AddMemberScreen() {
  const { goBack } = useNavigation();
  const [search, setSearch] = useState('');
  const [addedNames, setAddedNames] = useState<string[]>([]);

  const filteredSuggestions = SUGGESTIONS.filter(c => {
    if (!search.trim()) {
      return true;
    }
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  });

  const toggleAdd = (name: string) => {
    setAddedNames(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name],
    );
  };

  const removeAdded = (name: string) => {
    setAddedNames(prev => prev.filter(n => n !== name));
  };

  const handleConfirm = () => {
    // In a real app: dispatch add member action
    goBack();
  };

  const confirmLabel =
    addedNames.length === 0
      ? 'Add Member'
      : addedNames.length === 1
      ? 'Add 1 Member'
      : `Add ${addedNames.length} Members`;

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <ScreenHeader title="Add Member" onBack={goBack} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Search ──────────────────────────────────────────────────────── */}
          <View style={styles.searchWrap}>
            <InputField
              value={search}
              onChangeText={setSearch}
              placeholder="Search by name or email..."
              leftIcon="search"
            />
          </View>

          {/* ── Suggestions ─────────────────────────────────────────────────── */}
          <SectionHeader title="SUGGESTIONS" compact />

          <View style={styles.suggestionsCard}>
            {filteredSuggestions.map(contact => {
              const isAdded = addedNames.includes(contact.name);
              return (
                <ListRow
                  key={contact.id}
                  title={contact.name}
                  subtitle={contact.email}
                  leftIcon={<Avatar name={contact.name} size="sm" />}
                  leftIconBg="transparent"
                  showChevron={false}
                  rightElement={
                    <Pressable
                      onPress={() => toggleAdd(contact.name)}
                      style={[styles.addPill, isAdded && styles.addPillAdded]}
                      accessibilityLabel={
                        isAdded
                          ? `Remove ${contact.name}`
                          : `Add ${contact.name}`
                      }
                    >
                      <Text
                        style={[
                          styles.addPillLabel,
                          isAdded && styles.addPillLabelAdded,
                        ]}
                      >
                        {isAdded ? 'Added' : 'Add'}
                      </Text>
                    </Pressable>
                  }
                />
              );
            })}
          </View>

          {/* ── Added chips ─────────────────────────────────────────────────── */}
          {addedNames.length > 0 && (
            <View style={styles.chipsSection}>
              <Text style={styles.chipsSectionLabel}>Added</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsScrollContent}
              >
                {addedNames.map(name => (
                  <Chip
                    key={name}
                    label={name}
                    selected
                    onPress={() => removeAdded(name)}
                    leftIcon={
                      <Icon
                        name="close"
                        size={12}
                        stroke={colors.white}
                        fill="none"
                      />
                    }
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>

        {/* ── Confirm button ───────────────────────────────────────────────── */}
        <View style={styles.bottomBar}>
          <Button
            label={confirmLabel}
            onPress={handleConfirm}
            disabled={addedNames.length === 0}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
