
"use client";

import { Button, FooterDivider, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { customInputBoxTheme, customsubmitTheme } from "../customTheme/appTheme";
import { HiMail } from "react-icons/hi";

export default function ForgotPassword() {
    return (
        <div className="w-full h-full mt-20 mb-8 flex items-center justify-center">
            <div>
                <form className="flex max-w-md flex-col gap-4 w-screen flex-grow border p-7 rounded-md shadow-md">
                    <h2 className="text-lg font-bold">Reset Your Password</h2>
                    <p className="text-gray-600 font-light">Enter your email address below. We'll look for your account and send you a password reset email.</p>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your Email" />
                        </div>
                        <TextInput theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                    </div>
                    
                    <Button  theme={customsubmitTheme} type="button" color="appsuccess">Sent Password Reset</Button>
                    <FooterDivider></FooterDivider>
                    <div className="flex justify-end gap-2">
                    <p>Already have an account?</p> <Link className="text-appGreen" href={"login"}> Login</Link>
                    </div>

                </form>
            </div>
        </div>

    );
}
