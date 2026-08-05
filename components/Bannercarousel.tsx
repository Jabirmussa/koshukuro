import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';
import { typography } from '../theme/typography';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH - spacing.lg * 2;
const CARD_HEIGHT = 140; // altura fixa apropriada para o banner

export type BannerSlide = {
  id: string;
  label: string;
  title: string;
  ctaLabel: string;
  bgColor: string;
  // Troca por: image: require('../assets/banners/o-teu-arquivo.jpg')
  // Baixa fotos livres em unsplash.com ou pexels.com (uso comercial permitido)
  image?: any;
  onPress: () => void;
};

export function BannerCarousel({ slides }: { slides: BannerSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (listRef.current) {
        const nextIndex = (activeIndex + 1) % slides.length;
        setActiveIndex(nextIndex);
        listRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [activeIndex, slides.length]);

  return (
    <View>
      <FlatList
        ref={listRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={slides}
        keyExtractor={(item) => item.id}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={CARD_WIDTH + spacing.sm}
        decelerationRate="fast"
        contentContainerStyle={{ gap: spacing.sm }}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} onPress={item.onPress}>
            <View style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}>
              {/* Imagem no lado esquerdo */}
              {item.image ? (
                <ImageBackground
                  source={item.image}
                  style={styles.imageArea}
                  imageStyle={{ borderRadius: radii.lg, borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
                />
              ) : (
                <View style={[styles.imageArea, styles.placeholderImg]}>
                  <Feather name="shopping-bag" size={28} color={colors.textMuted} />
                </View>
              )}

              {/* Caixa colorida com a oferta no lado direito */}
              <View style={[styles.offerBox, { backgroundColor: item.bgColor }]}>
                <Text style={styles.offerLabel}>{item.label}</Text>
                <Text style={styles.offerTitle}>{item.title}</Text>
                <View style={styles.ctaBtn}>
                  <Text style={styles.ctaText}>{item.ctaLabel}</Text>
                  <Feather name="chevron-right" size={14} color={item.bgColor} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Paginação por bolinhas */}
      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: colors.bgLight,
  },
  imageArea: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },
  placeholderImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerBox: {
    width: '52%',
    padding: spacing.md,
    justifyContent: 'center',
    borderTopRightRadius: radii.lg,
    borderBottomRightRadius: radii.lg,
  },
  offerLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.white,
    opacity: 0.9,
  },
  offerTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.lg,
    color: colors.white,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  ctaText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xs,
    color: colors.textDark,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.primary,
  },
});