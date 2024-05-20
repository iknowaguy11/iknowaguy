
import axios from "axios";
import crypto from "crypto";
import dns from "dns";
import experes from "express"
import cors from "cors"
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../DB/firebaseConnection";

const app=experes();
const testingMode = true;
const pfHost = testingMode ? "sandbox.payfast.co.za" : "www.payfast.co.za";

app.use(cors());
app.use(experes.json());

app.post('/api/notify',async(req,res)=>{
// Add a new document in collection "cities"
await setDoc(doc(db, "cities", "express"), {
  name: "Los Angeles",
  state: "express",
  country: "express"
});
});


app?.listen(3000|| "https://inkowaguy.vercel.app/");




