import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radii, spacing } from '../theme/colors';
import { typography } from '../theme/typography';

type PriceCardProps = {
  lojaNome: string;
  cadeia: string;
  preco: number;
  reportadoHa: string; // ex: "há 2 dias"
  isMaisBarato?: boolean;
  scoreConfianca: number; // 0-100
  onConfirmar: () => void;
  onDenunciar: () => void;
};

export function PriceCard({
  lojaNome,
  cadeia,
  preco,
  reportadoHa,
  isMaisBarato,
  scoreConfianca,
  onConfirmar,
  onDenunciar,
}: PriceCardProps) {
  return (
    <View style={[styles.card, isMaisBarato && styles.cardDestaque]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.lojaNome}>{lojaNome}</Text>
          <Text style={styles.cadeia}>{cadeia}</Text>
        </View>
        {isMaisBarato && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Mais barato</Text>
          </View>
        )}
      </View>

      <Text style={[styles.preco, isMaisBarato && { color: colors.primary }]}>
        {preco.toFixed(2)} MT
      </Text>

      <View style={styles.footerRow}>
        <Text style={styles.meta}>{reportadoHa} · confiança {scoreConfianca}%</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onConfirmar} style={styles.actionBtn}>
            <Text style={styles.actionConfirmar}>✓ Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDenunciar} style={styles.actionBtn}>
            <Text style={styles.actionDenunciar}>⚠ Errado</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgLight,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardDestaque: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lojaNome: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.md,
    color: colors.textDark,
  },
  cadeia: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  badgeText: {
    color: colors.white,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
  },
  preco: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xxl,
    color: colors.textDark,
    marginTop: spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  meta: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionBtn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  actionConfirmar: {
    color: colors.primary,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
  },
  actionDenunciar: {
    color: colors.secondary,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
  },
});
