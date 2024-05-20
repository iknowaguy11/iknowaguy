import { db } from "@/app/DB/firebaseConnection";
import { message } from "antd";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req:any,res:any){
    const body =await req.json();
    console.log(body);
    setDoc(doc(db, "citiesPay", "PaymentAttempt"), {
        name: "Los Angeles",
        state: "expressP",
        country: "expressP"
      }).then(()=>{}).catch(err=>{});
    return NextResponse.json({message:"Post succesfull"})
}