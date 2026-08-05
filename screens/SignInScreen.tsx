import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { typography } from '../theme/typography';
import { colors, radii, spacing } from '../theme/colors';
import { useTheme } from '../context/ThemeContext';
import { Image } from 'react-native';

export function SignInScreen({ navigateTo }: { navigateTo: (screen: string) => void }) {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
      offlineAccess: true,
    });
  }, []);

  const handleSignIn = async () => {
    if (loading) return;

    setLoading(true);
    try {
      // Verifica se Google Play Services está disponível
      await GoogleSignin.hasPlayServices();
      
      // Realiza o login com Google
      const response = await GoogleSignin.signIn();

      // Obtém o ID token do usuário
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error('Não foi possível obter o idToken do Google.');
      }

      // Login com Google bem-sucedido
      // Aqui você pode adicionar lógica adicional para validar o token com seu backend
      console.log('Google Sign-In successful:', response.data?.user);
      console.log('User info:', {
        email: response.data?.user.email,
        name: response.data?.user.name,
        id: response.data?.user.id,
      });

      navigateTo('home');
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelado', 'Login com Google cancelado.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Em andamento', 'Processo de login já em andamento.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Erro', 'Google Play Services não disponível ou desatualizado.');
      } else {
        Alert.alert('Erro', 'Falha ao fazer login com Google: ' + (error.message || 'Erro desconhecido'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.root, isDark && styles.rootDark]} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Logo e branding */}
        <View style={styles.logoContainer}>
          <View>
            <Image source={require('../assets/koshukuro.png')} style={{ width: 400, height: 100 }} />
          </View>
          <Text style={[styles.appTagline, isDark && styles.subtitleDark]}>Preços partilhados pela comunidade</Text>
        </View>

        {/* Card de login */}
          <View style={styles.buttonArea}>
            {loading ? (
              <View style={[styles.loadingRow, isDark && styles.loadingRowDark]}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={[styles.loadingText, isDark && styles.subtitleDark]}>A entrar...</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.googleBtn, isDark && styles.googleBtnDark]}
                onPress={handleSignIn}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Ionicons name="logo-google" size={24} color={isDark ? '#fff' : '#333'} />
                <Text style={[styles.googleBtnText, isDark && styles.googleBtnTextDark]}>Entrar com Google</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* <Text style={[styles.appTagline, isDark && styles.textLight]}>
            Ao continuar, aceitas partilhar preços de forma honesta com a comunidade.
          </Text> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  rootDark: {
    backgroundColor: '#1a5c2e',
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl + 8,
  },
  logoCircleDark: {
    backgroundColor: '#1a2e35',
  },
  logoText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 36,
    color: colors.primary,
  },
  appName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 28,
    color: colors.white,
    marginBottom: 4,
  },
  textLight: {
    color: colors.white,
  },
  appTagline: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.md,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  subtitleDark: {
    color: '#8A9099',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl + 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardDark: {
    backgroundColor: '#16232B',
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: radii.pill,
    backgroundColor: colors.bgLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBadgeDark: {
    backgroundColor: '#1a2e35',
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 28,
    color: colors.textDark,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.md,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xl + 4,
    paddingHorizontal: spacing.md,
    lineHeight: 22,
  },
  buttonArea: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  googleBtn: {
    // width: '100%',
    height: 56,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    justifyContent: 'center',
    gap: spacing.sm,
  },
  googleBtnDark: {
    backgroundColor: '#1a2e35',
  },
  googleBtnText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.md,
    color: colors.textDark,
  },
  googleBtnTextDark: {
    color: colors.white,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.bgLight,
    borderRadius: radii.pill,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  loadingRowDark: {
    backgroundColor: '#1a2e35',
  },
  loadingText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.md,
    color: colors.textDark,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
  terms: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
    lineHeight: 18,
  },
});