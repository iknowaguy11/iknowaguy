import { doc, setDoc } from "firebase/firestore";
import { db } from "../DB/firebaseConnection"; // Adjust the path as necessary


setDoc(doc(db, "cities", "express"), {
  name: "Los Angeles",
  state: "express",
  country: "express"
}).then(()=>{}).catch(err=>{});
export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    try {
      // Add a new document in collection "cities"
      await setDoc(doc(db, "cities", "express"), {
        name: "Los router",
        state: "express router",
        country: "express"
      });
      res.status(200).json({ message: "Document successfully written!" });
    } catch (error) {
      console.error("Error writing document: ", error);
      res.status(500).json({ error: "Error writing document" });
    }
  } else if (req.method === 'GET') {
    try {
      // Add a new document in collection "cities"
      await setDoc(doc(db, "cities", "express"), {
        name: "Los Angeles",
        state: "express",
        country: "express"
      });
      res.status(200).json({ message: "Document successfully written!" });
    } catch (error) {
      console.error("Error writing document: ", error);
      res.status(500).json({ error: "Error writing document" });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
