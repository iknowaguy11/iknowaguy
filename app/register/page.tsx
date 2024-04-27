'use client';
import { Button } from "flowbite-react";
import { customsubmitTheme } from "../customTheme/appTheme";
import gif1 from '../../public/giphy1.gif';
import gif2 from '../../public/giphy4.gif';
import Image from "next/image";
import { useRouter } from "next/navigation";
const Register = () => {

    const router=useRouter();
    return (
        <div className="w-full mt-20 mb-8 flex items-center justify-center h-dvh">
            <div className="container mx-auto border shadow rounded gap-2 w-fit p-2">
                <h2 className="text-xl font-bold text-center mb-10 mt-10">Sign Up For A Free Account</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex justify-center">

                        <div className="flex flex-col items-center justify-items-center gap-2">
                            <Image
                                src={gif1}
                                alt="company logo"
                                height={70}
                                width={70}
                                className="aspect-square mt-2 mb-2 mr-2"
                            />
                            <h3 className="text-lg font-semibold">Home Owner</h3>
                            <p className="text-gray-600 font-light text-wrap">Post a project, find Contractors and hire your favorite to work.</p>
                            <Button onClick={()=>router.push("home-owner-registration")} size={"sm"} className="" theme={customsubmitTheme} type="button" color="appsuccess">Sign Up</Button>
                        </div>
                    </div>
                    {/* <h2 className="text-3xl text-appGreen font-extrabold text-center">Or</h2> */}
                    <div className="flex justify-center">

                        <div className="flex flex-col items-center justify-items-center gap-2">
                            <Image
                                src={gif2}
                                alt="company logo"
                                height={70}
                                width={70}
                                className="aspect-square rounded border mt-2 mb-2 mr-2"
                            />
                            <h3 className="text-lg font-semibold">Contractor</h3>
                            <p className="text-gray-600 font-light text-wrap">Create a professional profile and bid on job requests</p>
                            <Button onClick={()=>router.push("contractor-registration")} size={"sm"} className="" theme={customsubmitTheme} type="button" color="appsuccess">Sign Up</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;