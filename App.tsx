import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './src/navigation/RootNavigator';
import { onAuthStateChanged } from './src/services/firebase/auth';
import { getUserProfile } from './src/services/firebase/firestore';
import { StoreProvider, useAppStore } from './src/store/useAppStore';

// ─── Auth bootstrap ───────────────────────────────────────────────────────────
// Listens to Firebase auth state and syncs user + profile into the global store.

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const { dispatch } = useAppStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async authUser => {
      if (authUser) {
        // Fetch full Firestore profile; fall back to auth data if not found yet
        const profile = await getUserProfile(authUser.uid);
        dispatch({
          type: 'SET_USER',
          payload: profile ?? {
            uid: authUser.uid,
            email: authUser.email ?? '',
            displayName: authUser.displayName ?? '',
            currency: 'USD',
            defaultSplit: 'equal',
            createdAt: new Date(),
            groupIds: [],
            isPremium: false,
          },
        });
        if (profile?.isPremium) {
          dispatch({ type: 'SET_PREMIUM', payload: true });
        }
      } else {
        dispatch({ type: 'SET_USER', payload: null });
        dispatch({ type: 'SET_PREMIUM', payload: false });
      }
      setReady(true);
    });

    return unsubscribe;
  }, [dispatch]);

  // Hold children until the first auth state is resolved so the
  // SplashScreen can make a correct routing decision.
  if (!ready) return null;

  return <>{children}</>;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <StoreProvider>
        <AuthBootstrap>
          <RootNavigator />
        </AuthBootstrap>
      </StoreProvider>
    </SafeAreaProvider>
  );
}
