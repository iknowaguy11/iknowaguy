'use client';
import Image from "next/image";
import Landscape from '../../public/Landscape.jpg';
import { Button, Checkbox, Label, TextInput, Textarea, Card, Select } from 'flowbite-react';
import Link from 'next/link';
import { customCheckboxTheme, customInputBoxTheme, customselectTheme, customsubmitTheme } from '../customTheme/appTheme';

const Postproject = () => {
    return (
        <div className="w-full gap-4 h-dvh">
            <div className="relative w-full h-full mt-16 mb-1">
                <Image
                    src={Landscape}
                    alt="inspiration"
                    className="aspect-[3/4] h-full w-full" />

                <div className="grid grid-cols-2 items-center justify-items-center absolute z-10 bottom-3 flex-grow bg-opacity-75 bg-black p-3 w-full">
                    <div className="p-2 gap-3 mt-4">
                        <h1 className="text-4xl font-bold tracking-tight text-white dark:text-white">HAVE SOMETHING NEEDED TO BE DONE?</h1>
                        <p className="text-sm tracking-tight text-white dark:text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                    </div>
                    <div className="h-full items-center justify-items-center">

                    <Card className='flex max-w-lg flex-grow rounded'>
                        <form className="flex max-w-lg flex-col gap-4 flex-grow">
                        <div className="mb-2 block">
                            <Label htmlFor="countries" value="Select Job Category *" />
                        </div>
                        <Select className="max-w-md" id="countries" theme={customselectTheme} color={"success"} required>
                            <option>Plumping</option>
                            <option>Electrician</option>
                            <option>Gardener</option>
                            <option>Carpenter</option>
                            <option>Interior Designer</option>

                        </Select>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="contemail" value="What is your budget *" />
                                </div>
                                <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="contemail" type="tel" placeholder="How much are you willing to spend" required shadow />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Town" value="Project's Address *" />
                                    <p className="text-xs text-gray-500">Please enter a valid address, project(s) commonly get rejected due to invalid address</p>
                                </div>
                                <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="addr" type="text" placeholder="The address where the work will be done" required shadow />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Services" value="Comment (optional)" />
                                </div>
                                <Textarea theme={customInputBoxTheme} color={"focuscolor"} id="Services" placeholder="Leave a message for your contractor(s)" rows={3} />
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox id="agree" theme={customCheckboxTheme} color="success" />
                                <Label htmlFor="agree" className="flex">
                                    I agree with the&nbsp;
                                    <Link href="terms-and-conditions" className="text-appGreen hover:underline dark:text-appGreen">
                                        terms and conditions
                                    </Link>
                                </Label>
                            </div>
                            <Button theme={customsubmitTheme} type="submit" color="appsuccess">Post</Button>
                        </form>
                    </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Postproject;