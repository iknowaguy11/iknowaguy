import { doc, getDoc } from "firebase/firestore";
import { db } from "../DB/firebaseConnection";

export const isGrantedAccess = async (userKey: string) => {
    if (userKey=='' || userKey==undefined) return false;
    const docRef = doc(db, "Users", userKey);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return false;
    return docSnap.data()?.isactive?.toLocaleLowerCase().trim() =="yes" ? true : false;
}