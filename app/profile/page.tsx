'use client';
import Image from "next/image";
import { Button,Label, TextInput, Card, Tooltip, Badge } from 'flowbite-react';
import Link from 'next/link';
import { customInputBoxTheme, customsubmitTheme } from '../customTheme/appTheme';
import logoApp from '../../public/Naledi.png';
import iknown from '../../public/logoinknow.png';
import { projects } from "../components/CenterBody";
import MyBids from "../components/MyBids";

const profile = () => {

    return (

        <div className="w-full h-full mt-16 mb-8 grid grid-cols-2 items-center justify-items-center">

            <div className="h-full items-center justify-items-center">
                <Card className='flex max-w-lg flex-grow rounded mt-3'>
                    <form className="flex max-w-lg flex-col gap-4 flex-grow">
                        <div className="mb-2 block">
                            <Image
                                src={logoApp}
                                alt="Picture of the author"
                                className="mr-3 w-auto sm:h-9"
                                width={176}
                                height={40}
                                priority
                            />
                        </div>
                        <p className="text-xs text-gray-500">info@naledi.co.za</p>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="contemail" value="Company Name *" />
                            </div>
                            <Tooltip content="Admin Attention is Requires" style="dark">
                                <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="contemail" type="tel" value={"Naledi Natural Stones"} disabled placeholder="How much are you willing to spend" required shadow />

                            </Tooltip>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="contemail" value="Contractor's Name *" />
                            </div>
                            <Tooltip content="Admin Attention is Requires" style="dark">
                                <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="contemail" type="tel" value={"Sipho Ndaba"} disabled placeholder="How much are you willing to spend" required shadow />
                            </Tooltip>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Project's Address *" />
                                <p className="text-xs text-gray-500">Please enter a valid address, project(s) commonly get rejected due to invalid address</p>
                            </div>
                            <TextInput theme={customInputBoxTheme} value={"Pretoria, Sunny Side"} color={"focuscolor"} id="addr" type="text" placeholder="The address where the work will be done" required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Company Phone No. *" />
                            </div>
                            <TextInput theme={customInputBoxTheme} value={"011 657 6000"} color={"focuscolor"} id="addr" type="tel" placeholder="The company's phone numbers" maxLength={10} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Specialities" />
                            </div>
                            <div className="flex gap-1">
                                <Badge className="bg-appGreen" color="success">Plumber</Badge>
                                <Badge className="bg-appGreen" color="success">Electrician</Badge>
                                <Badge className="bg-appGreen" color="success">Carpenter</Badge>
                            </div>
                        </div>
                        <Button theme={customsubmitTheme} type="submit" color="appsuccess">Update</Button>
                    </form>
                </Card>
            </div>

            {/*second col*/}

            <div className="h-full items-center justify-items-center">
                <Card className='flex max-w-lg flex-grow rounded mt-3'>
                    <form className="flex max-w-lg flex-col gap-4 flex-grow">
                        <div className="mb-2 block">
                            <Image
                                src={iknown}
                                alt="Picture of the author"
                                className="mr-3 w-auto sm:h-9"
                                width={176}
                                height={40}
                                priority
                            />
                        </div>
                        <p className="text-xs text-gray-500">support@ikag.co.za</p>

                        {
                            projects?.map((item) => (
                                <MyBids item={item} />
                            ))
                        }

                    </form>
                </Card>
            </div>


        </div>

    );
}

export default profile;