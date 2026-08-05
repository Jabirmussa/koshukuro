import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { useTheme } from '../context/ThemeContext';

interface ListItem {
  name: string;
  quantity: number;
}

interface StorePrice {
  storeName: string;
  totalPrice: number;
  savings: number;
  items: { name: string; price: number }[];
}

// Mock data - in real app this would come from API
const mockShoppingList: ListItem[] = [
  { name: 'Cenoura', quantity: 2 },
  { name: 'Pimento', quantity: 1 },
  { name: 'Repolho', quantity: 3 },
];

const mockStorePrices: StorePrice[] = [
  {
    storeName: 'Shoprite Nampula Shopping',
    totalPrice: 680,
    savings: 0,
    items: [
      { name: 'Cenoura', price: 120 },
      { name: 'Pimento', price: 85 },
      { name: 'Repolho', price: 95 },
    ],
  },
  {
    storeName: 'Kero Nampula',
    totalPrice: 745,
    savings: -65,
    items: [
      { name: 'Cenoura', price: 130 },
      { name: 'Pimento', price: 95 },
      { name: 'Repolho', price: 105 },
    ],
  },
  {
    storeName: 'Game Nampula',
    totalPrice: 810,
    savings: -130,
    items: [
      { name: 'Cenoura', price: 145 },
      { name: 'Pimento', price: 110 },
      { name: 'Repolho', price: 115 },
    ],
  },
];

export function ComparePricesScreen({ navigateTo }: { navigateTo: (screen: string) => void }) {
  const { isDark } = useTheme();
  const cheapestStore = mockStorePrices.reduce((min, store) => 
    store.totalPrice < min.totalPrice ? store : min
  );

  return (
    <SafeAreaView edges={['top']} style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('shoppingList')}>
          <Feather name="chevron-left" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>Comparar Preços</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Summary */}
        <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
          <Text style={[styles.summaryTitle, isDark && styles.summaryTitleDark]}>Sua lista ({mockShoppingList.length} itens)</Text>
          <Text style={[styles.summarySubtitle, isDark && styles.summarySubtitleDark]}>
            {mockShoppingList.map(item => `${item.name} x${item.quantity}`).join(', ')}
          </Text>
        </View>

        {/* Best deal highlight */}
        <View style={styles.bestDealCard}>
          <View style={styles.bestDealHeader}>
            <Feather name="award" size={24} color={colors.primary} />
            <Text style={styles.bestDealTitle}>Melhor opção</Text>
          </View>
          <Text style={styles.bestDealStore}>{cheapestStore.storeName}</Text>
          <Text style={styles.bestDealPrice}>{cheapestStore.totalPrice} MT</Text>
          <Text style={styles.bestDealSavings}>Poupa até {Math.abs(cheapestStore.savings)} MT</Text>
        </View>

        {/* All stores comparison */}
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Comparação por supermercado</Text>
        
        {mockStorePrices.map((store, index) => (
          <View 
            key={index} 
            style={[
              styles.storeCard, 
              store.storeName === cheapestStore.storeName && styles.storeCardBest,
              isDark && styles.storeCardDark
            ]}
          >
            <View style={styles.storeHeader}>
              <Text style={[styles.storeName, isDark && styles.storeNameDark]}>{store.storeName}</Text>
              {store.storeName === cheapestStore.storeName && (
                <View style={styles.bestBadge}>
                  <Feather name="check" size={12} color={colors.white} />
                </View>
              )}
            </View>
            
            <View style={styles.storeItems}>
              {store.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.storeItem}>
                  <Text style={[styles.itemName, isDark && styles.itemNameDark]}>{item.name}</Text>
                  <Text style={[styles.itemPrice, isDark && styles.itemPriceDark]}>{item.price} MT</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.storeFooter}>
              <Text style={[styles.totalLabel, isDark && styles.totalLabelDark]}>Total</Text>
              <Text style={styles.totalPrice}>{store.totalPrice} MT</Text>
            </View>
            
            {store.savings !== 0 && (
              <Text style={[
                styles.savingsText,
                store.savings > 0 ? styles.savingsPositive : styles.savingsNegative
              ]}>
                {store.savings > 0 ? '+' : ''}{store.savings} MT
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerDark: {
    backgroundColor: '#0D1F29',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xl,
    color: colors.textDark,
  },
  headerTitleDark: {
    color: colors.white,
  },
  scrollViewContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  summaryCard: {
    backgroundColor: colors.bgLight,
    borderRadius: radii.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryCardDark: {
    backgroundColor: '#1A3848',
  },
  summaryTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.md,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  summaryTitleDark: {
    color: colors.white,
  },
  summarySubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },
  summarySubtitleDark: {
    color: '#a0a0a0',
  },
  bestDealCard: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  bestDealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  bestDealTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.md,
    color: colors.white,
  },
  bestDealStore: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xl,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  bestDealPrice: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xxl,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  bestDealSavings: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.white,
    opacity: 0.9,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.lg,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  sectionTitleDark: {
    color: colors.white,
  },
  storeCard: {
    backgroundColor: colors.bgLight,
    borderRadius: radii.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  storeCardDark: {
    backgroundColor: '#1A3848',
  },
  storeCardBest: {
    borderColor: colors.primary,
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  storeName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.md,
    color: colors.textDark,
  },
  storeNameDark: {
    color: colors.white,
  },
  bestBadge: {
    backgroundColor: colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeItems: {
    marginBottom: spacing.md,
  },
  storeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  itemName: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.textBody,
  },
  itemNameDark: {
    color: colors.white,
  },
  itemPrice: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.textDark,
  },
  itemPriceDark: {
    color: colors.white,
  },
  storeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  totalLabel: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.md,
    color: colors.textDark,
  },
  totalLabelDark: {
    color: colors.white,
  },
  totalPrice: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xl,
    color: colors.primary,
  },
  savingsText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    marginTop: spacing.sm,
  },
  savingsPositive: {
    color: colors.success,
  },
  savingsNegative: {
    color: colors.danger,
  },
});
