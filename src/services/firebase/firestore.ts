/**
 * Firestore service stub.
 * Structure mirrors the data schema from the roadmap:
 *
 *   users/{userId}/profile
 *   groups/{groupId}/info
 *   groups/{groupId}/expenses/{expenseId}
 *   groups/{groupId}/settlements/{settlementId}
 *   groups/{groupId}/recurring/{recurringId}
 *
 * TODO: install firebase and replace each stub with real Firestore calls.
 */

import { Group } from '../../types/group';
import { Expense, Settlement } from '../../types/expense';
import { UserProfile } from '../../types/user';

// ── User ─────────────────────────────────────────────────────────────────────

export async function createUserProfile(profile: UserProfile): Promise<void> {
  // TODO: await setDoc(doc(db, 'users', profile.uid, 'profile'), profile);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  // TODO: const snap = await getDoc(doc(db, 'users', uid, 'profile'));
  // TODO: return snap.exists() ? (snap.data() as UserProfile) : null;
  return null;
}

export async function updateUserProfile(
  uid: string,
  updates: Partial<UserProfile>,
): Promise<void> {
  // TODO: await updateDoc(doc(db, 'users', uid, 'profile'), updates);
}

// ── Groups ────────────────────────────────────────────────────────────────────

export async function createGroup(group: Group): Promise<void> {
  // TODO: await setDoc(doc(db, 'groups', group.id, 'info'), group);
  // TODO: await updateDoc(doc(db, 'users', group.createdBy, 'profile'), {
  //   groupIds: arrayUnion(group.id)
  // });
}

export async function getGroup(groupId: string): Promise<Group | null> {
  // TODO: const snap = await getDoc(doc(db, 'groups', groupId, 'info'));
  // TODO: return snap.exists() ? (snap.data() as Group) : null;
  return null;
}

export async function getUserGroups(groupIds: string[]): Promise<Group[]> {
  // TODO: const promises = groupIds.map(id => getGroup(id));
  // TODO: const results = await Promise.all(promises);
  // TODO: return results.filter((g): g is Group => g !== null);
  return [];
}

export function subscribeToGroup(
  groupId: string,
  onUpdate: (group: Group) => void,
): () => void {
  // TODO: return onSnapshot(doc(db, 'groups', groupId, 'info'), snap => {
  //   if (snap.exists()) onUpdate(snap.data() as Group);
  // });
  return () => {};
}

export async function archiveGroup(groupId: string): Promise<void> {
  // TODO: await updateDoc(doc(db, 'groups', groupId, 'info'), { archived: true });
}

// ── Expenses ──────────────────────────────────────────────────────────────────

export async function addExpense(
  groupId: string,
  expense: Expense,
): Promise<void> {
  // TODO: await setDoc(doc(db, 'groups', groupId, 'expenses', expense.id), expense);
}

export async function updateExpense(
  groupId: string,
  expense: Expense,
): Promise<void> {
  // TODO: await updateDoc(doc(db, 'groups', groupId, 'expenses', expense.id), expense as any);
}

export async function deleteExpense(
  groupId: string,
  expenseId: string,
): Promise<void> {
  // TODO: await deleteDoc(doc(db, 'groups', groupId, 'expenses', expenseId));
}

export function subscribeToExpenses(
  groupId: string,
  onUpdate: (expenses: Expense[]) => void,
): () => void {
  // TODO: return onSnapshot(collection(db, 'groups', groupId, 'expenses'), snap => {
  //   onUpdate(snap.docs.map(d => d.data() as Expense));
  // });
  return () => {};
}

// ── Settlements ───────────────────────────────────────────────────────────────

export async function addSettlement(
  groupId: string,
  settlement: Settlement,
): Promise<void> {
  // TODO: await setDoc(doc(db, 'groups', groupId, 'settlements', settlement.id), settlement);
}

export function subscribeToSettlements(
  groupId: string,
  onUpdate: (settlements: Settlement[]) => void,
): () => void {
  // TODO: return onSnapshot(collection(db, 'groups', groupId, 'settlements'), snap => {
  //   onUpdate(snap.docs.map(d => d.data() as Settlement));
  // });
  return () => {};
}
