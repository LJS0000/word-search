import { db } from '../firebase';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
} from 'firebase/firestore';

/**
 * 특정 Firestore 컬렉션의 모든 문서를 가져옵니다.
 * @param collectionName - 데이터를 가져올 컬렉션 이름
 * @returns 컬렉션의 모든 문서 데이터를 포함한 배열
 */
export const fetchCollectionData = async (
  collectionName: string
): Promise<DocumentData[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * Firestore 컬렉션에 새로운 문서를 추가합니다.
 * @param collectionName - 문서를 추가할 컬렉션 이름
 * @param data - 새 문서에 저장할 데이터
 */
export const addDocumentToCollection = async (
  collectionName: string,
  data: DocumentData
): Promise<void> => {
  try {
    await addDoc(collection(db, collectionName), data);
    console.log('Successfully added document');
  } catch (err) {
    console.error('Error adding document', err);
  }
};

/**
 * Firestore 컬렉션의 특정 문서를 업데이트합니다.
 * @param collectionName - 문서가 속한 컬렉션 이름
 * @param docId - 업데이트할 문서의 ID
 * @param data - 문서에 업데이트할 데이터
 */
export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: DocumentData
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
};

/**
 * Firestore 컬렉션의 특정 문서를 삭제합니다.
 * @param collectionName - 문서가 속한 컬렉션 이름
 * @param docId - 삭제할 문서의 ID
 */
export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};
