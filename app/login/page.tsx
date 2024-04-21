
"use client";

import { Button, FooterDivider, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { customInputBoxTheme, customsubmitTheme } from "../customTheme/appTheme";
import { HiMail } from "react-icons/hi";
import { FormEvent, useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../DB/firebaseConnection";
import { useRouter } from "next/navigation";
import { failureMessage, successMessage } from "../notifications/successError";
import { AppContext } from "../Context/appContext";

export default function Login() {
    const{setLoggedIn}=useContext(AppContext);
    const [username,SetUserName]=useState("");
    const[password,setPassword]=useState("");
    const[loading,setloading]=useState(false);
    const router=useRouter();
    const AttemptLogin=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(username!=="" && password!==""){
            try {
                const auth = getAuth(app);
            setloading(true);
            let resp=await signInWithEmailAndPassword(auth,username.trim(),password);
            if(resp.user.uid!==""){
                setloading(false);
                SetUserName("");
                setPassword("");
                successMessage("Succesful login in...");
                setLoggedIn(true);
                router.replace("/");
            }else{
                setloading(false);
                failureMessage(String("No user found"));
            }
            } catch (error:any) {
                setPassword("");
                setloading(false);
                failureMessage(String(error.message));
            }
        }
    }
    return (
        <div className="w-full h-full mt-20 mb-8 flex items-center justify-center">
            <div>
                <form onSubmit={(e)=>AttemptLogin(e)} className="flex max-w-md flex-col gap-4 w-screen flex-grow border p-7 rounded-md shadow-md">
                    <h2 className="text-lg">Log into Your Account</h2>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your Email" />
                        </div>
                        <TextInput onChange={(e)=>SetUserName(e.target.value)} value={username} theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput onChange={(e)=>setPassword(e.target.value)} value={password} theme={customInputBoxTheme} color={"focuscolor"} id="password1" type="password" required />
                    </div>

                    <Button isProcessing={loading} theme={customsubmitTheme} type="submit" color="appsuccess">Log In</Button>
                    <FooterDivider></FooterDivider>
                    <div className="flex justify-between">
                        <Link href={"register"}>Not yet register?</Link>
                        <Link href={"forgotpassword"}>Forgot password?</Link>

                    </div>

                </form>
            </div>
        </div>

    );
}
