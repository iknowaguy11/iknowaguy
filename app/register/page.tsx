'use client';
import { Button } from "flowbite-react";
import { customsubmitTheme } from "../customTheme/appTheme";
import gif1 from '../../public/giphy1.gif';
import gif2 from '../../public/giphy4.gif';
import Image from "next/image";
import { useRouter } from "next/navigation";
const Register = () => {

    const router = useRouter();
    return (
        <div className="w-full mt-18 mb-8 flex items-center justify-center h-dvh bg-slate-50">
            <div className="container mx-auto mr-9 ml-9 border rounded-sm shadow-md w-fit p-5 gap-3 bg-white">
                <h2 className="text-3xl text-center mt-5 ml-2 mr-2 text-gray-700">Sign Up Free Account</h2>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 mb-6">
                        <div className="bg-white p-6 flex flex-col items-center lg:border-r-2 md:border-r-2">
                            <h3 className="text-xl font-semibold mb-2 text-gray-700">Home Owner</h3>
                            <p className="mb-4 w-64 text-center text-gray-700 font-thin">Post a project, find Contractors and hire your favorite to work.</p>
                            <Button onClick={() => router.push("home-owner-registration")} size={"sm"} className="" theme={customsubmitTheme} type="button" color="appsuccess">Sign Up</Button>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2  mb-6">
                        <div className="bg-white p-6 flex flex-col items-center">
                            <h3 className="text-xl font-semibold mb-2 text-gray-700">Contractor</h3>
                            <p className="mb-4 w-64  text-center text-gray-700 font-thin">Create a professional profile and bid on job requests</p>
                            <Button onClick={() => router.push("contractor-registration")} size={"sm"} className="text-center" theme={customsubmitTheme} type="button" color="appsuccess">Sign Up</Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Register;