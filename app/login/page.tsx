
"use client";

import { Button, FooterDivider, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { customInputBoxTheme, customsubmitTheme } from "../customTheme/appTheme";
import { HiMail } from "react-icons/hi";

export default function Login() {
    return (
        <div className="w-full h-full mt-20 mb-8 flex items-center justify-center">
            <div>
                <form className="flex max-w-md flex-col gap-4 w-screen flex-grow border p-7 rounded-md shadow-md">
                    <h2 className="text-lg">Log into Your Account</h2>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your Email" />
                        </div>
                        <TextInput theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="password1" type="password" required />
                    </div>

                    <Button  theme={customsubmitTheme} type="button" color="appsuccess">Log In</Button>
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
