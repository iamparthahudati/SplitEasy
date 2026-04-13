import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StoreProvider } from './src/store/useAppStore';
import { NavigationProvider } from './src/navigation/NavigationContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <StoreProvider>
        <NavigationProvider initialScreen="Splash">
          <RootNavigator />
        </NavigationProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
}
