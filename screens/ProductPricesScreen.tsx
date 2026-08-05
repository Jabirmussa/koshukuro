import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { PriceCard } from '../components/PriceCard';
import { useTheme } from '../context/ThemeContext';

const precosMock = [
  { id: '1', lojaNome: 'Shoprite Nampula Shopping', cadeia: 'Shoprite', preco: 480, reportadoHa: 'há 2 dias', score: 92 },
  { id: '2', lojaNome: 'Kero Nampula', cadeia: 'Kero', preco: 495, reportadoHa: 'há 5 dias', score: 78 },
  { id: '3', lojaNome: 'Game Nampula', cadeia: 'Game', preco: 510, reportadoHa: 'há 1 semana', score: 65 },
];

export function ProductPricesScreen({ navigateTo }: { navigateTo: (screen: string) => void }) {
  const { isDark } = useTheme();
  const maisBarato = Math.min(...precosMock.map((p) => p.preco));

  return (
    <SafeAreaView edges={['top']} style={[styles.container, isDark && styles.containerDark]}>
      <TouchableOpacity style={styles.backRow} onPress={() => navigateTo('home')}>
        <Feather name="arrow-left" size={16} color={isDark ? colors.white : colors.textMuted} />
        <Text style={[styles.back, isDark && styles.backDark]}>Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo('productDetail')}>
        <Text style={[styles.productName, isDark && styles.productNameDark]}>Arroz Twenty 5kg</Text>
        <Text style={[styles.productMeta, isDark && styles.productMetaDark]}>3 lojas · última atualização há 2 dias</Text>
      </TouchableOpacity>

      <ScrollView style={{ marginTop: spacing.lg }} showsVerticalScrollIndicator={false}>
        {precosMock.map((item) => (
          <PriceCard
            key={item.id}
            lojaNome={item.lojaNome}
            cadeia={item.cadeia}
            preco={item.preco}
            reportadoHa={item.reportadoHa}
            scoreConfianca={item.score}
            isMaisBarato={item.preco === maisBarato}
            onConfirmar={() => {}}
            onDenunciar={() => {}}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigateTo('reportPrice')}>
        <Feather name="plus-circle" size={18} color={colors.white} style={{ marginRight: 8 }} />
        <Text style={styles.fabText}>Reportar preço aqui</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, padding: spacing.lg },
  containerDark: {
    backgroundColor: '#0D1F29',
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  back: {
    fontFamily: typography.fontFamily.medium,
    color: colors.textMuted,
  },
  backDark: {
    color: '#a0a0a0',
  },
  productName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xl,
    color: colors.textDark,
  },
  productNameDark: {
    color: colors.white,
  },
  productMeta: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginTop: 4,
  },
  productMetaDark: {
    color: '#a0a0a0',
  },
  fab: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  fabText: {
    color: colors.white,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.md,
  },
});