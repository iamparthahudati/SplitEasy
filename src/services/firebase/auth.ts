import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

function mapFirebaseUser(user: FirebaseAuthTypes.User): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<AuthUser> {
  const credential = await auth().signInWithEmailAndPassword(email, password);
  return mapFirebaseUser(credential.user);
}

export async function signInWithGoogle(): Promise<AuthUser> {
  throw new Error('Google Sign-In not yet configured');
}

export async function signInWithApple(): Promise<AuthUser> {
  throw new Error('Apple Sign-In not yet configured');
}

export async function sendPasswordReset(email: string): Promise<void> {
  await auth().sendPasswordResetEmail(email);
}

export async function signOut(): Promise<void> {
  await auth().signOut();
}

export function onAuthStateChanged(
  callback: (user: AuthUser | null) => void,
): () => void {
  return auth().onAuthStateChanged(
    (firebaseUser: FirebaseAuthTypes.User | null) => {
      callback(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
    },
  );
}
