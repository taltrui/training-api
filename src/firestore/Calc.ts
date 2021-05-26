import { CALC_COLLECTION } from "../constants/firebase";
import { db } from "../config/firebase";

export const getExpById = (id: string): Promise<unknown> =>
  db
    .collection(CALC_COLLECTION)
    .doc(id)
    .get()
    .then((snapshot) => {
      if (!snapshot) return { error: `Expression ${id} not found` };
      return { expression: snapshot.data()?.expression };
    });

export const updateExpById = (
  id: string,
  expression: string
): Promise<unknown> =>
  db.collection(CALC_COLLECTION).doc(id).update({ expression });

export const createExp = (expression: string, uid: string): Promise<unknown> =>
  db.collection(CALC_COLLECTION).add({ expression, uid });

export const getAllExpsByUid = (
  uid: string
): Promise<
  | { data: unknown[] }
  | { error: string; data?: undefined }
  | { data: any[]; error?: undefined }
> =>
  db
    .collection(CALC_COLLECTION)
    .where("uid", "==", uid)
    .get()
    .then((snapshot) => {
      const items: Array<any> = [];

      if (!snapshot || snapshot.empty) return { error: "COLLECTION_NOT_FOUND" };
      snapshot.forEach((item) =>
        items.push({ expression: item.data().expression, id: item.id })
      );
      return { data: items };
    });

export const deleteExpById = (id: string): Promise<void> =>
  db.collection(CALC_COLLECTION).doc(id).delete();
