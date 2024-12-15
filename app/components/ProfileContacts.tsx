'use client';

import { Badge, Tooltip } from 'flowbite-react';
import Image from 'next/image';
import { HiPhone, HiHome, HiBriefcase, HiMail, HiShare } from 'react-icons/hi';
import { customTheme, customsubmitTheme } from '../customTheme/appTheme';
import { Button } from 'flowbite-react';
import { failureMessage, successMessage } from '../notifications/successError';
import { IUser } from '../Interfaces/appInterfaces';

const ProfileContacts = ({ item }: { item: IUser }) => {
    return (
        <div className='bg-white border rounded-md p-5 shadow-lg max-w-4xl mx-auto my-6'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>{item?.companyName || item?.YourName}</h2>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">

                <div className="space-y-4">
                    <p className='text-gray-600'>{item?.AdvertisingMsg}</p>
                    <Button.Group className='grid gap-2'>
                        {item?.Services.map((service, index) => (
                            <Button key={index} theme={customsubmitTheme} color='appsuccess' size="sm" className='flex items-center justify-start'>
                                <HiBriefcase className="mr-2 h-4 w-4" />
                                {service}
                            </Button>
                        ))}
                    </Button.Group>
                </div>

                <div className="space-y-4">
                    <div className='flex items-center gap-2'>
                        <Badge theme={customTheme} color={"success"} icon={HiPhone} />
                        <p className='text-sm text-gray-700'>{item?.phone}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Badge theme={customTheme} color={"success"} icon={HiMail} />
                        <p className='text-sm text-gray-700'>{item?.companyEmail}</p>
                    </div>
{/* 
                    <div className='flex items-center gap-2'>
                        <Badge className='w-fit' theme={customTheme} color={"success"} icon={HiHome}>Address</Badge>
                    </div> */}
                    <div>
                        {Array.isArray(item?.Address) ? (
                            <ul className='space-y-2'>
                                {item?.Address.map((adr, index) => (
                                    <li key={index} className='flex items-center gap-2'>
                                        <Badge theme={customTheme} color={"success"} icon={HiHome} />
                                        <p className='text-sm text-gray-700'>{adr}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <Badge theme={customTheme} color={"success"} icon={HiHome} />
                                <p className='text-sm text-gray-700'>{item?.Address}</p>
                            </div>
                        )}
                    </div>

                    <div className='flex gap-2 mt-4'>
                        <Tooltip content="Copy profile link">
                            <Badge
                                onClick={() => {
                                    try {
                                        navigator.clipboard.writeText('https://inkowaguy.vercel.app/profile/' + item?.Id)
                                        successMessage("Profile link copied!");
                                    } catch (error: any) {
                                        failureMessage(error?.message);
                                    }
                                }}
                                theme={customTheme}
                                color={"success"}
                                icon={HiShare}
                            />
                        </Tooltip>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <Image
                        className='object-cover rounded-lg shadow-md'
                        src={item?.profileImage}
                        alt="Company Profile"
                        height={150}
                        width={120}
                    />
                </div>

            </div>
        </div>
    );
}

export default ProfileContacts;
