'use client';

import { Badge, Tooltip } from 'flowbite-react';
import Image from 'next/image';
import { HiPhone, HiHome, HiBriefcase, HiMail, HiShare } from 'react-icons/hi';
import { customTheme, customsubmitTheme } from '../customTheme/appTheme';
import { Button } from 'flowbite-react';
import { usePathname, useRouter } from 'next/navigation';
import { IUser } from '../Interfaces/appInterfaces';
import LoadingProjects from './LoadingProjects';
import LoadingProjectError from './LoadingProjectError';
import { useEffect, useState } from 'react';
import { failureMessage, successMessage } from '../notifications/successError';

export function NewContractorTemplate({ contractors, params, isGettingAccount, accountError }: { contractors: IUser[], params: string[], isGettingAccount: boolean, accountError: unknown }) {
    const pathname = usePathname();
    const router = useRouter();
    const [TempContractor, SetTempContractor] = useState<IUser[]>([]);

    useEffect(() => {
        const filteredContractors = contractors.filter(it =>
            it.Services.toLocaleString().toLowerCase().split(',').includes(decodeURIComponent(params[1]).toLowerCase())
        );
        SetTempContractor(filteredContractors);
    }, [contractors, params]);

    const renderContractorCard = (item: IUser) => (
        <div key={item.Id} className="border z-10 rounded-md p-4 shadow-md m-4 bg-white">
            {/* Top Section: Logo and Name */}
            <div className="flex items-center mb-4">
                <Image
                    className="object-contain bg-white rounded-md mr-4"
                    src={item.profileImage}
                    alt="company"
                    height={80}
                    width={80}
                    priority
                />
                <div>
                    <h2 className="text-lg text-black font-bold">{item?.companyName || item?.YourName}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <Badge theme={customTheme} color="success" icon={HiPhone} />
                        <p className="text-sm">{item.phone}</p>
                    </div>
                    <div className="flex items-center mt-1 gap-2">
                        <Badge theme={customTheme} color="success" icon={HiMail} />
                        <p className="text-sm">{item.companyEmail}</p>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="mb-4">
                <p className="mb-2">{item.AdvertisingMsg}</p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {item.Services.map((service, index) => (
                        <li
                            key={index}
                            className="h-18 flex flex-col items-center justify-center p-2 border border-gray-200 rounded-md bg-[#65a55b] text-white hover:bg-[#5a9d50] text-center"
                        >
                            <HiBriefcase className="text-white w-6 h-6 mb-1" />
                            <span className="text-sm sm:text-base font-medium leading-snug line-clamp-2">
                                {service}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Address Section */}
            <div className="mb-4">
                {Array.isArray(item?.Address) ? (
                    <ul className="grid grid-cols-3 gap-2">
                        {item.Address.map((adr, index) => (
                            <li key={index} className="flex items-center gap-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                                <HiHome className="text-green-600 w-5 h-5" />
                                <span className="text-sm">{adr}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex items-center gap-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                        <HiHome className="text-green-600 w-5 h-5" />
                        <span className="text-sm">{item.Address}</span>
                    </div>
                )}
            </div>

            {/* Actions Section */}
            <div className="flex gap-2 mt-2">
                <Button
                    onClick={() => router.push('/profile/' + item.Id)}
                    size="xs"
                    type="button"
                    className="rounded-lg bg-blue-700 text-xs text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                >
                    Ratings & Reviews
                </Button>
                <Tooltip content="Copy profile">
                    <Badge
                        onClick={() => {
                            try {
                                navigator.clipboard.writeText('https://inkowaguy.vercel.app/profile/' + item.Id);
                                successMessage("Copied profile");
                            } catch (error: any) {
                                failureMessage(error.message);
                            }
                        }}
                        theme={customTheme}
                        color="success"
                        icon={HiShare}
                    />
                </Tooltip>
            </div>
        </div>
    );


    return (
        <div className="p-4">
            {pathname.trim() === "/contractors" ? (
                contractors.length > 0 ? (
                    contractors.map(renderContractorCard)
                ) : isGettingAccount && !accountError ? (
                    <LoadingProjects />
                ) : accountError ? (
                    <LoadingProjectError />
                ) : null
            ) : (
                TempContractor.length > 0 ? (
                    TempContractor.map(renderContractorCard)
                ) : isGettingAccount && !accountError ? (
                    <LoadingProjects />
                ) : accountError ? (
                    <LoadingProjectError />
                ) : (
                    <p>No Result(s) found</p>
                )
            )}
        </div>
    );
}
