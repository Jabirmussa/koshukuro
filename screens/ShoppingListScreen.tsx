import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { useTheme } from '../context/ThemeContext';

interface ListItem {
  id: string;
  name: string;
  quantity: number;
}

const availableProducts = [
  { id: '1', name: 'Cenoura', image: require('../assets/cenora.png') },
  { id: '2', name: 'Pimento', image: require('../assets/pimento.png') },
  { id: '3', name: 'Repolho', image: require('../assets/repolho.png') },
  { id: '4', name: 'Carne', image: require('../assets/carne.png') },
];

export function ShoppingListScreen({ navigateTo }: { navigateTo: (screen: string) => void }) {
  const { isDark } = useTheme();
  const [list, setList] = useState<ListItem[]>([]);
  const [searchText, setSearchText] = useState('');

  const addToCart = (productId: string, productName: string) => {
    const existingItem = list.find(item => item.name === productName);
    if (existingItem) {
      setList(list.map(item => 
        item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setList([...list, { id: Date.now().toString(), name: productName, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setList(list.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setList(list.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const filteredProducts = availableProducts.filter(p => 
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView edges={['top']} style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('home')}>
          <Feather name="chevron-left" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>Minha Lista</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search bar */}
      <View style={[styles.searchContainer, isDark && styles.searchContainerDark]}>
        <Feather name="search" size={18} color={isDark ? colors.white : colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar produto..."
          placeholderTextColor={colors.textMuted}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Available products */}
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Adicionar produtos</Text>
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[styles.productCard, isDark && styles.productCardDark]}
              onPress={() => addToCart(product.id, product.name)}
            >
              <View style={styles.productImageArea}>
                <ImageBackground
                  source={product.image}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={[styles.productName, isDark && styles.productNameDark]}>{product.name}</Text>
              <Feather name="plus-circle" size={20} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Shopping list */}
        {list.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Sua lista ({list.length})</Text>
            {list.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <Text style={[styles.itemName, isDark && styles.itemNameDark]}>{item.name}</Text>
                <View style={styles.quantityControl}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, -1)}
                  >
                    <Feather name="minus" size={16} color={isDark ? colors.white : colors.textDark} />
                  </TouchableOpacity>
                  <Text style={[styles.quantityText, isDark && styles.quantityTextDark]}>{item.quantity}</Text>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Feather name="plus" size={16} color={isDark ? colors.white : colors.textDark} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Feather name="trash-2" size={18} color={colors.danger} />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {list.length > 0 && (
        <View style={[styles.footer, isDark && styles.footerDark]}>
          <TouchableOpacity 
            style={styles.compareButton}
            onPress={() => navigateTo('comparePrices')}
          >
            <Feather name="bar-chart-2" size={20} color={colors.white} style={{ marginRight: 8 }} />
            <Text style={styles.compareButtonText}>Comparar Preços</Text>
          </TouchableOpacity>
        </View>
      )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgLight,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: 10,
  },
  searchContainerDark: {
    backgroundColor: '#1A3848',
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.md,
    color: colors.textDark,
  },
  scrollViewContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.lg,
    color: colors.textDark,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitleDark: {
    color: colors.white,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: colors.bgLight,
    borderRadius: radii.md,
    padding: spacing.sm,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  productCardDark: {
    backgroundColor: '#1A3848',
  },
  productImageArea: {
    width: 70,
    height: 70,
    borderRadius: radii.sm,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  productNameDark: {
    color: colors.white,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgLight,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  listItemDark: {
    backgroundColor: '#1A3848',
  },
  itemName: {
    flex: 1,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.md,
    color: colors.textDark,
  },
  itemNameDark: {
    color: colors.white,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: spacing.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.md,
    color: colors.textDark,
    minWidth: 20,
    textAlign: 'center',
  },
  quantityTextDark: {
    color: colors.white,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerDark: {
    backgroundColor: '#0D1F29',
    borderTopColor: '#1A3848',
  },
  compareButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareButtonText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.md,
    color: colors.white,
  },
});
