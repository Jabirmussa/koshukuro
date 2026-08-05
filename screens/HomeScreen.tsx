import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { BottomTabBar } from '../components/Bottomtabbar';
import { BannerCarousel } from '../components/Bannercarousel';
import { useTheme } from '../context/ThemeContext';

const categorias: { nome: string; emoji: string; bg: string }[] = [
  { nome: 'Grãos', emoji: '🌾', bg: '#FDEAEA' },
  { nome: 'Laticínios', emoji: '🥛', bg: '#E8F5E9' },
  { nome: 'Limpeza', emoji: '🧼', bg: '#FFF6DE' },
  { nome: 'Carnes', emoji: '🥩', bg: '#FDEDE9' },
];

const reportadosRecentemente = [
  { id: '1', nome: 'Cenoura', unidade: '1kg', precoMin: 120, emoji: '🥕', image: require('../assets/cenora.png') },
  { id: '2', nome: 'Pimento', unidade: '500g', precoMin: 85, emoji: '🫑', image: require('../assets/pimento.png') },
  { id: '3', nome: 'Repolho', unidade: '1kg', precoMin: 95, emoji: '🥬', image: require('../assets/repolho.png') },
  { id: '4', nome: 'Carne', unidade: '1kg', precoMin: 380, emoji: '🥩', image: require('../assets/carne.png') },
];

export function HomeScreen({ navigateTo }: { navigateTo: (screen: string) => void }) {
  const { isDark } = useTheme();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: isDark ? '#0D1F29' : colors.white }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header: avatar + saudação + localização */}
        <View style={[styles.header, isDark && styles.headerDark]}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Feather name="user" size={20} color={colors.primary} />
            </View>
            <View style={{ marginLeft: spacing.sm }}>
              <Text style={[styles.greeting, isDark && styles.greetingDark]}>Bom dia</Text>
              <Text style={[styles.userName, isDark && styles.userNameDark]}>Jabir</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.locationPill} onPress={() => navigateTo('map')}>
            <Feather name="map-pin" size={14} color={colors.primary} />
            <Text style={styles.locationText}>Nampula</Text>
            <Feather name="chevron-down" size={14} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Busca */}
        <TouchableOpacity style={styles.searchBar} onPress={() => navigateTo('productPrices')}>
          <Feather name="search" size={18} color={colors.textMuted} />
          <Text style={styles.searchPlaceholder}>Buscar produto ou categoria</Text>
        </TouchableOpacity>

        {/* Carrossel de banners de destaque */}
        <View style={{ marginTop: spacing.lg }}>
          <BannerCarousel
            slides={[
              {
                id: '1',
                label: 'Esta semana',
                title: 'Poupa até 15%',
                ctaLabel: 'Comparar lista',
                bgColor: colors.primary,
                onPress: () => navigateTo('shoppingList'),
                image: require('../assets/banner.png'),
              },
              {
                id: '2',
                label: 'Novidade',
                title: '12 lojas no mapa',
                ctaLabel: 'Ver mapa',
                bgColor: colors.primaryDark,
                onPress: () => navigateTo('map'),
                image: require('../assets/banner.png'),
              },
              {
                id: '3',
                label: 'Comunidade',
                title: '+340 reports este mês',
                ctaLabel: 'Reportar preço',
                bgColor: colors.secondary,
                onPress: () => navigateTo('reportPrice'),
                image: require('../assets/banner.png'),
              },
            ]}
          />
        </View>

        {/* Categorias */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Categorias</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categorias}
          keyExtractor={(item) => item.nome}
          contentContainerStyle={{ gap: spacing.lg, paddingRight: spacing.lg }}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <View style={[styles.categoryCircle, { backgroundColor: item.bg }]}>
                <Text style={styles.categoryEmoji}>{item.emoji}</Text>
              </View>
              <Text style={[styles.categoryText, isDark && styles.categoryTextDark]}>{item.nome}</Text>
            </View>
          )}
        />

        {/* Reportados recentemente (grid 2 colunas) */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Reportados recentemente</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.productGrid}>
          {reportadosRecentemente.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.productCard, isDark && styles.productCardDark]}
              onPress={() => navigateTo('productDetail')}
            >
              <View style={styles.productImageArea}>
                {item.image ? (
                  <ImageBackground
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.productImage, styles.productEmojiFallback]}>
                    <Text style={styles.productEmoji}>{item.emoji}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.productName, isDark && styles.productNameDark]}>{item.nome}</Text>
              <View style={styles.productFooter}>
                <View>
                  <Text style={styles.productPrice}>{item.precoMin} MT</Text>
                  <Text style={[styles.productUnit, isDark && styles.productUnitDark]}>{item.unidade}</Text>
                </View>
                <View style={styles.productActionBtn}>
                  <Feather name="arrow-up-right" size={16} color={colors.white} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomTabBar active="home" navigateTo={navigateTo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  headerDark: {
    // No specific dark style needed for header
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.bgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },
  greetingDark: {
    color: '#a0a0a0',
  },
  userName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.md,
    color: colors.textDark,
  },
  userNameDark: {
    color: colors.white,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.bgLight,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  locationText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    color: colors.textDark,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgLight,
    borderRadius: radii.pill,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    gap: 10,
  },
  searchPlaceholder: {
    fontFamily: typography.fontFamily.regular,
    color: colors.textMuted,
    fontSize: typography.size.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.lg,
    color: colors.textDark,
  },
  sectionTitleDark: {
    color: colors.white,
  },
  seeAll: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.primary,
  },
  categoryItem: { alignItems: 'center', width: 68 },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryEmoji: {
    fontSize: 26,
  },
  categoryText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    color: colors.textDark,
    marginTop: 6,
    textAlign: 'center',
  },
  categoryTextDark: {
    color: colors.white,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: colors.bgLight,
    borderRadius: radii.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  productCardDark: {
    backgroundColor: '#1A3848',
  },
  productImageArea: {
    width: 90,
    height: 90,
    borderRadius: radii.sm,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    alignSelf: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productEmojiFallback: {
    backgroundColor: colors.bgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: {
    fontSize: 36,
  },
  productName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.sm,
    color: colors.textDark,
  },
  productNameDark: {
    color: colors.white,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.sm,
  },
  productPrice: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.md,
    color: colors.primary,
  },
  productUnit: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },
  productUnitDark: {
    color: '#a0a0a0',
  },
  productActionBtn: {
    width: 30,
    height: 30,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});