import { db } from '../firebase';
import { ref, set, get, update, remove } from 'firebase/database';

/**
 * 특정 Realtime Database 경로의 모든 데이터를 가져옵니다.
 * @param collectionName - 데이터를 가져올 경로 (컬렉션 이름)
 * @returns 경로의 모든 데이터를 포함한 객체
 */
export const fetchCollectionData = async (
  collectionName: string
): Promise<any[]> => {
  const dbRef = ref(db, collectionName);
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  } else {
    console.log('No data available');
    return [];
  }
};

/**
 * Realtime Database에 새로운 문서를 추가합니다.
 * @param collectionName - 문서를 추가할 경로 (컬렉션 이름)
 * @param data - 새 문서에 저장할 데이터
 */
export const addDocumentToCollection = async (
  collectionName: string,
  data: any
): Promise<void> => {
  const newDocRef = ref(db, `${collectionName}/${Date.now()}`); // 고유 ID로 문서 생성
  try {
    await set(newDocRef, data);
    console.log('Successfully added document');
  } catch (err) {
    console.error('Error adding document', err);
  }
};

/**
 * Realtime Database의 특정 문서를 업데이트합니다.
 * @param collectionName - 문서가 속한 경로 (컬렉션 이름)
 * @param docId - 업데이트할 문서의 ID
 * @param data - 문서에 업데이트할 데이터
 */
export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: any
): Promise<void> => {
  const docRef = ref(db, `${collectionName}/${docId}`);
  try {
    await update(docRef, data);
    console.log('Successfully updated document');
  } catch (err) {
    console.error('Error updating document', err);
  }
};

/**
 * Realtime Database의 특정 문서를 삭제합니다.
 * @param collectionName - 문서가 속한 경로 (컬렉션 이름)
 * @param docId - 삭제할 문서의 ID
 */
export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  const docRef = ref(db, `${collectionName}/${docId}`);
  try {
    await remove(docRef);
    console.log('Successfully deleted document');
  } catch (err) {
    console.error('Error deleting document', err);
  }
};
