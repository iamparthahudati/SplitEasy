import storage from '@react-native-firebase/storage';

/**
 * Firebase Storage service.
 * Handles receipt photo uploads and deletions via @react-native-firebase/storage.
 */

/**
 * Uploads a receipt photo for a given group and expense.
 * Fetches the local URI as a Blob, uploads it to
 * groups/{groupId}/receipts/{expenseId}, and returns the public download URL.
 */
export async function uploadReceiptPhoto(
  groupId: string,
  expenseId: string,
  localUri: string,
): Promise<string> {
  const response = await fetch(localUri);
  if (!response.ok) {
    throw new Error(
      `Failed to read local file: ${response.status} ${response.statusText}`,
    );
  }

  const blob = await response.blob();

  const ref = storage().ref(`groups/${groupId}/receipts/${expenseId}`);
  await ref.put(blob);

  const downloadUrl: string = await ref.getDownloadURL();
  return downloadUrl;
}

/**
 * Deletes a receipt photo by its download URL.
 * Resolves the storage reference directly from the URL and removes the object.
 */
export async function deleteReceiptPhoto(photoUrl: string): Promise<void> {
  const ref = storage().refFromURL(photoUrl);
  await ref.delete();
}
