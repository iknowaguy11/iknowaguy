'use client';

import { Button, Checkbox, Label, TextInput, Badge, Card, Select, Avatar, FileInput } from 'flowbite-react';
import Link from 'next/link';
import { HiTrash } from 'react-icons/hi';
import { customCheckboxTheme, customInputBoxTheme, customselectTheme, customsubmitTheme } from '../customTheme/appTheme';
import { useFetchProvinces, useFetchServices } from "../_hooks/useFetch";
import { useRef, useState } from "react";

const HomeOwnerRegistration = () => {
    const { ProvinceData, DataError, isLoading } = useFetchProvinces();
    const { ServiceData, serviceError, isLoadingservies } = useFetchServices();
    const [selectedServices, SetSelectedServices] = useState<string[]>([]);
    const AppendSelectedServices = (value: string) => {
        if (!selectedServices.includes(value) && selectedServices.length < 15) {
            const updatedSelectedServices = [...selectedServices, value];
            SetSelectedServices(updatedSelectedServices);
        }
    }
    const RemoveServices = (value: string) => {
        const updatedServices = selectedServices.filter((item) => item !== value);
        SetSelectedServices(updatedServices);
    }
    const fileInputRef = useRef<any>(null);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            // Check if the selected file is an image and is not gif
            if (!file.type.startsWith('image/') || file.type === 'image/gif') {
                alert('Please select a non-GIF image file.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event: any) => {
                // Set the image source to the selected file
                const imageDataUrl = event.target.result;
                setAvatarImage(imageDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const OpenImagePicker = () => {
        // Open the file picker by clicking the hidden file input
        fileInputRef.current.click();
    };

    const [avatarImage, setAvatarImage] = useState(null);

    return (
        <div className="w-full gap-4">
            <div className="h-full flex justify-center bg-opacity-75 bg-black">
                <Card className='flex max-w-lg flex-grow rounded top-0 mt-20 mb-3 ml-1 mr-1'>
                    <form className="flex max-w-lg flex-col gap-4 flex-grow">
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <Avatar size={"lg"} className='hover:cursor-pointer' onClick={OpenImagePicker} img={avatarImage == null ? "" : avatarImage}>
                                <div className="space-y-1 font-medium dark:text-white">
                                    <div>Your Facial image</div>
                                </div>
                            </Avatar>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="First Name *" />
                            </div>
                            <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="name" type="text" placeholder="First Name" required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="lstN" value="Last Name *" />
                            </div>
                            <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="lstN" type="text" placeholder="Last Name" required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="emailclient" value="Your Email *" />
                            </div>
                            <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="emailclient" type="email" placeholder="Your Email" required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="pass" value="Your Password *" />
                            </div>
                            <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="pass" type="password" placeholder="Your Password" required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Cpass" value="Confirm Your Password *" />
                            </div>
                            <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="Cpass" type="password" placeholder="Confirm Your Password" required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Phone No. *" />
                            </div>
                            <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="addr" type="tel" placeholder="Phone numbers" maxLength={10} required shadow />
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
                        <Button theme={customsubmitTheme} type="submit" color="appsuccess">Register</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default HomeOwnerRegistration;