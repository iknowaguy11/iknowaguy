import { doc, setDoc } from "firebase/firestore";
import { FormEvent } from "react";
import { db } from "../DB/firebaseConnection";
import { failureMessage, successMessage } from "../notifications/successError";

export const updateProfile=(e: FormEvent<HTMLFormElement>,router:any,updateData:any,_id:string)=>{
    e.preventDefault();
    setDoc(doc(db, 'Users', _id.trim()), updateData, { merge: true }).then(()=>{
        successMessage("Updated profile");
        window?.location?.reload();
        router.refresh();
    }).catch((error:any)=>{
        failureMessage("Error: "+error?.message);
    });
}