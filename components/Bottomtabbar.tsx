import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { useTheme } from '../context/ThemeContext';

type TabItem = {
  key: string;
  icon: keyof typeof Feather.glyphMap;
  label: string;
  isCenter?: boolean;
};

const tabs: TabItem[] = [
  { key: 'home', icon: 'home', label: 'Início' },
  { key: 'productPrices', icon: 'grid', label: 'Preços' },
  { key: 'reportPrice', icon: 'plus', label: 'Reportar', isCenter: true },
  { key: 'shoppingList', icon: 'list', label: 'Lista' },
  { key: 'profile', icon: 'user', label: 'Perfil' },
];

export function BottomTabBar({
  active,
  navigateTo,
}: {
  active: string;
  navigateTo: (screen: string) => void;
}) {
  const { isDark } = useTheme();

  return (
    <SafeAreaView edges={['bottom']} style={[styles.container, isDark && styles.containerDark]}>
      {tabs.map((tab) =>
        tab.isCenter ? (
          <TouchableOpacity
            key={tab.key}
            style={styles.centerBtn}
            onPress={() => navigateTo(tab.key)}
          >
            <Feather name={tab.icon} size={24} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabBtn}
            onPress={() => navigateTo(tab.key)}
          >
            <Feather
              name={tab.icon}
              size={22}
              color={active === tab.key ? colors.primary : (isDark ? colors.white : colors.textMuted)}
            />
            <Text style={[styles.tabLabel, active === tab.key && styles.tabLabelActive, isDark && styles.tabLabelDark]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  containerDark: {
    backgroundColor: '#0D1F29',
    borderTopColor: '#1A3848',
  },
  tabBtn: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  tabLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.textMuted,
    marginTop: 4,
  },
  tabLabelDark: {
    color: '#a0a0a0',
  },
  tabLabelActive: {
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
  },
  centerBtn: {
    width: 56,
    height: 56,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});