/**
 * Firebase Storage service stub.
 * Used for receipt photo uploads.
 * TODO: install firebase and replace stubs with real Storage calls.
 */

export async function uploadReceiptPhoto(
  groupId: string,
  expenseId: string,
  localUri: string,
): Promise<string> {
  // TODO: const ref = storageRef(storage, `groups/${groupId}/receipts/${expenseId}`);
  // TODO: const response = await fetch(localUri);
  // TODO: const blob = await response.blob();
  // TODO: await uploadBytes(ref, blob);
  // TODO: return await getDownloadURL(ref);
  throw new Error('Firebase Storage not yet installed');
}

export async function deleteReceiptPhoto(photoUrl: string): Promise<void> {
  // TODO: const ref = storageRef(storage, photoUrl);
  // TODO: await deleteObject(ref);
}
