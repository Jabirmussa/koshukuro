import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { useTheme } from '../context/ThemeContext';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';

export function ProfileScreen({ navigateTo }: { navigateTo: (screen: string) => void }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await GoogleSignin.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to get current user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      navigateTo('signIn');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const menuItems = [
    { id: '1', icon: 'user' as const, label: 'Editar perfil', onPress: () => {} },
    { id: '2', icon: 'bell' as const, label: 'Notificações', onPress: () => {} },
    { id: '3', icon: 'moon' as const, label: 'Modo escuro', onPress: toggleTheme, isToggle: true, isOn: isDark },
    { id: '4', icon: 'help-circle' as const, label: 'Ajuda e suporte', onPress: () => {} },
    { id: '5', icon: 'info' as const, label: 'Sobre o app', onPress: () => {} },
    { id: '6', icon: 'log-out' as const, label: 'Sair', onPress: handleLogout, isDestructive: true },
  ];

  return (
    <SafeAreaView edges={['top']} style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigateTo('home')}>
            <Feather name="arrow-left" size={24} color={isDark ? colors.white : colors.textDark} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>Perfil</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Profile Card */}
        <View style={[styles.profileCard, isDark && styles.profileCardDark]}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, isDark && styles.avatarDark]}>
              {user?.user.photo ? (
                <Image source={{ uri: user.user.photo }} style={{ width: 80, height: 80, borderRadius: 40 }} />
              ) : (
                <Feather name="user" size={32} color={isDark ? colors.white : colors.primary} />
              )}
            </View>
          </View>
          <Text style={[styles.userName, isDark && styles.userNameDark]}>
            {user?.user.name || 'Jabir'}
          </Text>
          <Text style={[styles.userEmail, isDark && styles.userEmailDark]}>
            {user?.user.email || 'jabir@email.com'}
          </Text>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={[styles.menuSection, isDark && styles.menuSectionDark]}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={[styles.menuIcon, isDark && styles.menuIconDark]}>
                <Feather 
                  name={item.icon} 
                  size={20} 
                  color={item.isDestructive ? colors.danger : (isDark ? colors.white : colors.textDark)} 
                />
              </View>
              <Text style={[styles.menuLabel, isDark && styles.menuLabelDark, item.isDestructive && styles.menuLabelDestructive]}>
                {item.label}
              </Text>
              {item.isToggle ? (
                <View style={[styles.toggle, item.isOn && styles.toggleOn]}>
                  <View style={[styles.toggleDot, item.isOn && styles.toggleDotOn]} />
                </View>
              ) : (
                <Feather name="chevron-right" size={20} color={isDark ? colors.textMuted : colors.textMuted} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <Text style={[styles.versionText, isDark && styles.versionTextDark]}>Versão 1.0.0</Text>
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
  scrollViewContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  headerTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xl,
    color: colors.textDark,
  },
  headerTitleDark: {
    color: colors.white,
  },
  profileCard: {
    backgroundColor: colors.bgLight,
    borderRadius: radii.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  profileCardDark: {
    backgroundColor: '#1A3848',
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  avatarDark: {
    backgroundColor: '#1A3848',
  },
  userName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xl,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  userNameDark: {
    color: colors.white,
  },
  userEmail: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  userEmailDark: {
    color: '#a0a0a0',
  },
  editProfileBtn: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  editProfileText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.white,
  },
  menuSection: {
    backgroundColor: colors.bgLight,
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  menuSectionDark: {
    backgroundColor: '#1A3848',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuIconDark: {
    backgroundColor: '#1A3848',
  },
  menuLabel: {
    flex: 1,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.md,
    color: colors.textDark,
  },
  menuLabelDark: {
    color: colors.white,
  },
  menuLabelDestructive: {
    color: colors.danger,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.border,
    padding: 2,
  },
  toggleOn: {
    backgroundColor: colors.primary,
  },
  toggleDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    transform: [{ translateX: 0 }],
  },
  toggleDotOn: {
    transform: [{ translateX: 20 }],
  },
  versionText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.textMuted,
    textAlign: 'center',
  },
  versionTextDark: {
    color: '#a0a0a0',
  },
});
