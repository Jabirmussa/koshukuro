import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { useTheme } from '../context/ThemeContext';

export function ReportPriceScreen({ navigateTo }: { navigateTo: (screen: string) => void }) {
  const { isDark } = useTheme();
  const [preco, setPreco] = useState('');
  const [produto, setProduto] = useState('');
  const [loja, setLoja] = useState('');

  return (
    <SafeAreaView edges={['top']} style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView>
      <TouchableOpacity style={styles.backRow} onPress={() => navigateTo('productPrices')}>
        <Feather name="arrow-left" size={16} color={isDark ? colors.white : colors.textMuted} />
        <Text style={[styles.back, isDark && styles.backDark]}>Cancelar</Text>
      </TouchableOpacity>

      <Text style={[styles.title, isDark && styles.titleDark]}>Reportar preço</Text>
      <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>Ajuda a comunidade — o teu report leva menos de 30 segundos</Text>

      <Text style={[styles.label, isDark && styles.labelDark]}>Produto</Text>
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Ex: Arroz Twenty 5kg"
        placeholderTextColor={colors.textMuted}
        value={produto}
        onChangeText={setProduto}
      />

      <Text style={[styles.label, isDark && styles.labelDark]}>Loja</Text>
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Ex: Shoprite Nampula Shopping"
        placeholderTextColor={colors.textMuted}
        value={loja}
        onChangeText={setLoja}
      />

      <Text style={[styles.label, isDark && styles.labelDark]}>Preço (MT)</Text>
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="0.00"
        placeholderTextColor={colors.textMuted}
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />

      <TouchableOpacity style={styles.photoBtn}>
        <Feather name="camera" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
        <Text style={[styles.photoBtnText, isDark && styles.photoBtnTextDark]}>Adicionar foto do preço (opcional)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => navigateTo('myReports')}
      >
        <Text style={styles.submitText}>Enviar report</Text>
      </TouchableOpacity>
    </ScrollView>
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
  },
  back: {
    fontFamily: typography.fontFamily.medium,
    color: colors.textMuted,
  },
  backDark: {
    color: '#a0a0a0',
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xxl,
    color: colors.textDark,
    marginTop: spacing.lg,
  },
  titleDark: {
    color: colors.white,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  subtitleDark: {
    color: '#a0a0a0',
  },
  label: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.textDark,
    marginBottom: 6,
    marginTop: spacing.md,
  },
  labelDark: {
    color: colors.white,
  },
  input: {
    backgroundColor: colors.bgLight,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.md,
    color: colors.textDark,
  },
  inputDark: {
    backgroundColor: '#1A3848',
    color: colors.white,
  },
  photoBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radii.md,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  photoBtnText: {
    fontFamily: typography.fontFamily.medium,
    color: colors.textMuted,
    fontSize: typography.size.sm,
  },
  photoBtnTextDark: {
    color: '#a0a0a0',
  },
  submitBtn: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  submitText: {
    color: colors.white,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.md,
  },
});