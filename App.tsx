import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ProductPricesScreen } from './screens/ProductPricesScreen';
import { ReportPriceScreen } from './screens/ReportPriceScreen';
import { MapScreen } from './screens/MapScreen';
import { ShoppingListScreen } from './screens/ShoppingListScreen';
import { ComparePricesScreen } from './screens/ComparePricesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SignInScreen } from './screens/SignInScreen';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '278987662574-2r6731ufovfnpf9u8tdd72fobacnucbo.apps.googleusercontent.com',
});

type ScreenName = 'splash' | 'signIn' | 'home' | 'productPrices' | 'productDetail' | 'reportPrice' | 'myReports' | 'map' | 'shoppingList' | 'comparePrices' | 'profile';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const { isDark } = useTheme();

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen as ScreenName);
  };

  const handleSplashFinish = async () => {
    try {
      const hasSession = await GoogleSignin.hasPreviousSignIn();
      if (hasSession) {
        await GoogleSignin.signInSilently();
        navigateTo('home');
      } else {
        navigateTo('signIn');
      }
    } catch (error) {
      console.log('Silent sign-in failed, navigating to signIn:', error);
      navigateTo('signIn');
    }
  };

  if (currentScreen === 'splash') {
    return (
      <>
        <SplashScreen onFinish={handleSplashFinish} />
        <StatusBar style="light" />
      </>
    );
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        {currentScreen === 'signIn' && <SignInScreen navigateTo={navigateTo} />}
        {currentScreen === 'home' && <HomeScreen navigateTo={navigateTo} />}
        {currentScreen === 'productPrices' && <ProductPricesScreen navigateTo={navigateTo} />}
        {currentScreen === 'productDetail' && <ProductPricesScreen navigateTo={navigateTo} />}
        {currentScreen === 'reportPrice' && <ReportPriceScreen navigateTo={navigateTo} />}
        {currentScreen === 'myReports' && <HomeScreen navigateTo={navigateTo} />}
        {currentScreen === 'map' && <MapScreen navigateTo={navigateTo} />}
        {currentScreen === 'shoppingList' && <ShoppingListScreen navigateTo={navigateTo} />}
        {currentScreen === 'comparePrices' && <ComparePricesScreen navigateTo={navigateTo} />}
        {currentScreen === 'profile' && <ProfileScreen navigateTo={navigateTo} />}
      </View>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
