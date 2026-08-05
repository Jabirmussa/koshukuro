import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radii, spacing } from '../theme/colors';
import { typography } from '../theme/typography';

type StoreCardProps = {
  nome: string;
  cadeia: string;
  distanciaKm: number;
  totalReports: number;
  onPress: () => void;
};

export function StoreCard({ nome, cadeia, distanciaKm, totalReports, onPress }: StoreCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>🏬</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.cadeia}>{cadeia} · {distanciaKm.toFixed(1)} km</Text>
      </View>
      <Text style={styles.reports}>{totalReports} preços</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.bgLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconText: { fontSize: 20 },
  nome: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.md,
    color: colors.textDark,
  },
  cadeia: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  reports: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    color: colors.primary,
  },
});
