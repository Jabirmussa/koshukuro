import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const t = setTimeout(onFinish, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>K</Text>
      </View>
      <Text style={styles.appName}>Koshukuro</Text>
      <Text style={styles.tagline}>Preços partilhados pela comunidade</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 48,
    color: colors.primary,
  },
  appName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xxl,
    color: colors.white,
  },
  tagline: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.white,
    marginTop: 6,
    opacity: 0.9,
  },
});
