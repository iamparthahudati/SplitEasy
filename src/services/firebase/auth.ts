/**
 * Firebase Auth service stub.
 * Replace the TODOs with real Firebase SDK calls once
 * `npx expo install firebase` (or @react-native-firebase/auth) is installed.
 */

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// TODO: import { getAuth, signInWithEmailAndPassword, ... } from 'firebase/auth';
// TODO: import { GoogleSignin } from '@react-native-google-signin/google-signin';
// TODO: import appleAuth from '@invertase/react-native-apple-authentication';

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<AuthUser> {
  // TODO: const cred = await signInWithEmailAndPassword(getAuth(), email, password);
  // TODO: return { uid: cred.user.uid, email: cred.user.email, displayName: cred.user.displayName };
  throw new Error('Firebase not yet installed');
}

export async function signInWithGoogle(): Promise<AuthUser> {
  // TODO: await GoogleSignin.hasPlayServices();
  // TODO: const { idToken } = await GoogleSignin.signIn();
  // TODO: const googleCred = GoogleAuthProvider.credential(idToken);
  // TODO: const result = await signInWithCredential(getAuth(), googleCred);
  throw new Error('Firebase not yet installed');
}

export async function signInWithApple(): Promise<AuthUser> {
  // TODO: const appleAuthRequestResponse = await appleAuth.performRequest({ ... });
  // TODO: const { identityToken, nonce } = appleAuthRequestResponse;
  // TODO: const appleCred = OAuthProvider.credential({ idToken: identityToken!, rawNonce: nonce });
  // TODO: const result = await signInWithCredential(getAuth(), appleCred);
  throw new Error('Firebase not yet installed');
}

export async function sendPasswordReset(email: string): Promise<void> {
  // TODO: await sendPasswordResetEmail(getAuth(), email);
  throw new Error('Firebase not yet installed');
}

export async function signOut(): Promise<void> {
  // TODO: await getAuth().signOut();
  throw new Error('Firebase not yet installed');
}

export function onAuthStateChanged(
  callback: (user: AuthUser | null) => void,
): () => void {
  // TODO: return getAuth().onAuthStateChanged(firebaseUser => {
  //   callback(firebaseUser ? { uid: firebaseUser.uid, email: firebaseUser.email, displayName: firebaseUser.displayName } : null);
  // });
  callback(null);
  return () => {};
}
