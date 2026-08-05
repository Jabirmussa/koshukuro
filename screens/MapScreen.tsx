import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { StoreCard } from '../components/StoreCard';
import { useTheme } from '../context/ThemeContext';

// Troca por dados reais vindos da coleção `lojas` no Firestore,
// filtrados por bounding box em torno da localização do usuário
// (mesma abordagem de bounding box já usada no projeto MHB)
const lojasMock = [
  { id: '1', nome: 'Shoprite Nampula Shopping', cadeia: 'Shoprite', lat: -15.1165, lng: 39.2666, totalReports: 34 },
  { id: '2', nome: 'Kero Nampula', cadeia: 'Kero', lat: -15.1102, lng: 39.2701, totalReports: 21 },
  { id: '3', nome: 'Game Nampula', cadeia: 'Game', lat: -15.1201, lng: 39.2589, totalReports: 12 },
];

function distanciaKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const NAMPULA_FALLBACK = { lat: -15.1165, lng: 39.2666 };

export function MapScreen({ navigateTo }: { navigateTo: (screen: string) => void }) {
  const { isDark } = useTheme();
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [locError, setLocError] = useState<string | null>(null);
  const [lojaSelecionada, setLojaSelecionada] = useState<typeof lojasMock[0] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // 1. Verifica se o utilizador concedeu permissão
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocError('Permissão de localização negada');
          return;
        }

        // 2. Verifica se o serviço de localização do dispositivo está ligado
        // (isto é o que estava a causar o erro "location services unavailable")
        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setLocError('Ative o GPS/serviços de localização');
          return;
        }

        // 3. Tenta obter a posição, com fallback para última posição conhecida
        try {
          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          setUserLoc({ lat: loc.coords.latitude, lng: loc.coords.longitude });
        } catch (posErr) {
          // getCurrentPositionAsync pode falhar mesmo com tudo ativado
          // (comum em emuladores sem GPS mockado)
          const lastKnown = await Location.getLastKnownPositionAsync();
          if (lastKnown) {
            setUserLoc({ lat: lastKnown.coords.latitude, lng: lastKnown.coords.longitude });
          } else {
            setLocError('Não foi possível obter a localização');
          }
        }
      } catch (err) {
        setLocError('Erro ao aceder à localização');
      }
    })();
  }, []);

  const centro = userLoc ?? NAMPULA_FALLBACK;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: centro.lat,
          longitude: centro.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {lojasMock.map((loja) => (
          <Marker
            key={loja.id}
            coordinate={{ latitude: loja.lat, longitude: loja.lng }}
            onPress={() => setLojaSelecionada(loja)}
          >
            <View style={styles.pin}>
              <Feather name="shopping-bag" size={18} color={colors.white} />
            </View>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity style={[styles.backBtn, isDark && styles.backBtnDark]} onPress={() => navigateTo('home')}>
        <Feather name="arrow-left" size={20} color={isDark ? colors.white : colors.textDark} />
      </TouchableOpacity>

      {locError && (
        <View style={styles.errorBanner}>
          <Feather name="alert-circle" size={14} color="#856404" style={{ marginRight: 6 }} />
          <Text style={styles.errorText}>{locError} — a mostrar Nampula por defeito</Text>
        </View>
      )}

      {lojaSelecionada && (
        <View style={styles.sheet}>
          <StoreCard
            nome={lojaSelecionada.nome}
            cadeia={lojaSelecionada.cadeia}
            distanciaKm={distanciaKm(centro.lat, centro.lng, lojaSelecionada.lat, lojaSelecionada.lng)}
            totalReports={lojaSelecionada.totalReports}
            onPress={() => navigateTo('productPrices')}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  containerDark: {
    backgroundColor: '#0D1F29',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pin: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: spacing.lg,
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  backBtnDark: {
    backgroundColor: '#1A3848',
  },
  errorBanner: {
    position: 'absolute',
    top: 100,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    padding: spacing.sm,
    borderRadius: radii.sm,
  },
  errorText: {
    fontSize: 12,
    color: '#856404',
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
  },
});