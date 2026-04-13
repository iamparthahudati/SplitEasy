import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = Record<string, any>;

import { Expense, Settlement } from '../../types/expense';
import { Group } from '../../types/group';
import { UserProfile } from '../../types/user';

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Firestore stores Timestamps; convert them back to JS Dates so callers
 * always receive plain Date objects regardless of SDK serialisation.
 */
function toDate(
  value: FirebaseFirestoreTypes.Timestamp | Date | undefined,
): Date {
  if (!value) return new Date(0);
  if (value instanceof Date) return value;
  return (value as FirebaseFirestoreTypes.Timestamp).toDate();
}

function deserialiseUserProfile(
  data: FirebaseFirestoreTypes.DocumentData,
): UserProfile {
  return {
    ...(data as UserProfile),
    createdAt: toDate(data.createdAt),
    premiumExpiresAt: data.premiumExpiresAt
      ? toDate(data.premiumExpiresAt)
      : undefined,
  };
}

function deserialiseGroup(data: FirebaseFirestoreTypes.DocumentData): Group {
  return {
    ...(data as Group),
    createdAt: toDate(data.createdAt),
  };
}

function deserialiseExpense(
  data: FirebaseFirestoreTypes.DocumentData,
): Expense {
  return {
    ...(data as Expense),
    date: toDate(data.date),
    createdAt: toDate(data.createdAt),
  };
}

function deserialiseSettlement(
  data: FirebaseFirestoreTypes.DocumentData,
): Settlement {
  return {
    ...(data as Settlement),
    settledAt: toDate(data.settledAt),
  };
}

// ── User ─────────────────────────────────────────────────────────────────────

export async function createUserProfile(profile: UserProfile): Promise<void> {
  await firestore().collection('users').doc(profile.uid).set(profile);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await firestore().collection('users').doc(uid).get();
  if (!snap.exists()) return null;
  return deserialiseUserProfile(snap.data()!);
}

export async function updateUserProfile(
  uid: string,
  updates: Partial<UserProfile>,
): Promise<void> {
  await firestore()
    .collection('users')
    .doc(uid)
    .update(updates as AnyData);
}

// ── Groups ────────────────────────────────────────────────────────────────────

export async function createGroup(group: Group): Promise<void> {
  const db = firestore();
  const batch = db.batch();

  const groupRef = db.collection('groups').doc(group.id);
  batch.set(groupRef, group);

  const userRef = db.collection('users').doc(group.createdBy);
  batch.update(userRef, {
    groupIds: firestore.FieldValue.arrayUnion(group.id),
  });

  await batch.commit();
}

export async function getGroup(groupId: string): Promise<Group | null> {
  const snap = await firestore().collection('groups').doc(groupId).get();
  if (!snap.exists()) return null;
  return deserialiseGroup(snap.data()!);
}

export async function getUserGroups(groupIds: string[]): Promise<Group[]> {
  if (groupIds.length === 0) return [];
  const results = await Promise.all(groupIds.map(id => getGroup(id)));
  return results.filter((g): g is Group => g !== null);
}

export function subscribeToGroup(
  groupId: string,
  onUpdate: (group: Group) => void,
): () => void {
  return firestore()
    .collection('groups')
    .doc(groupId)
    .onSnapshot(snap => {
      if (snap.exists()) {
        onUpdate(deserialiseGroup(snap.data()!));
      }
    });
}

export async function archiveGroup(groupId: string): Promise<void> {
  await firestore()
    .collection('groups')
    .doc(groupId)
    .update({ archived: true });
}

// ── Expenses ──────────────────────────────────────────────────────────────────

export async function addExpense(
  groupId: string,
  expense: Expense,
): Promise<void> {
  await firestore()
    .collection('groups')
    .doc(groupId)
    .collection('expenses')
    .doc(expense.id)
    .set(expense);
}

export async function updateExpense(
  groupId: string,
  expense: Expense,
): Promise<void> {
  await firestore()
    .collection('groups')
    .doc(groupId)
    .collection('expenses')
    .doc(expense.id)
    .update(expense as unknown as AnyData);
}

export async function deleteExpense(
  groupId: string,
  expenseId: string,
): Promise<void> {
  await firestore()
    .collection('groups')
    .doc(groupId)
    .collection('expenses')
    .doc(expenseId)
    .delete();
}

export function subscribeToExpenses(
  groupId: string,
  onUpdate: (expenses: Expense[]) => void,
): () => void {
  return firestore()
    .collection('groups')
    .doc(groupId)
    .collection('expenses')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snap => {
      onUpdate(snap.docs.map(d => deserialiseExpense(d.data())));
    });
}

// ── Settlements ───────────────────────────────────────────────────────────────

export async function addSettlement(
  groupId: string,
  settlement: Settlement,
): Promise<void> {
  await firestore()
    .collection('groups')
    .doc(groupId)
    .collection('settlements')
    .doc(settlement.id)
    .set(settlement);
}

export function subscribeToSettlements(
  groupId: string,
  onUpdate: (settlements: Settlement[]) => void,
): () => void {
  return firestore()
    .collection('groups')
    .doc(groupId)
    .collection('settlements')
    .onSnapshot(snap => {
      onUpdate(snap.docs.map(d => deserialiseSettlement(d.data())));
    });
}
