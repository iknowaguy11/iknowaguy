
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

    if (pathname.trim() == "/contractors") {
        return (
            <div>
                {
                    contractors.length > 0 ? contractors?.map((item) => (
                        <div key={item.Id} className='bg-slate-100 border z-10  rounded-md p-2 shadow-md m-5'>
                            <h2 className='text-lg text-black font-bold'>{item?.companyName || item?.YourName}</h2>
                            <div className="grid lg:grid-cols-3 xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 sm:w-fit md:w-fit lg:w-full xl:w-full" >

                                <div><p>{item.AdvertisingMsg}</p>
                                    <Button.Group className='grid gap-1 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 w-fit'>
                                        {
                                            item.Services.map((i, index) => (

                                                <Button className='mb-1' key={index} theme={customsubmitTheme} color='appsuccess' size={"xs"}>
                                                    <HiBriefcase className="mr-3 h-4 w-4" />
                                                    {i}
                                                </Button>

                                            ))
                                        }

                                    </Button.Group>
                                </div>

                                <div className='gap-1 ml-2'>
                                    <div className='flex items-center gap-1 m-2'>
                                        <Badge theme={customTheme} color={"success"} icon={HiPhone}></Badge>
                                        <p className='text-sm'>{item.phone}</p>
                                    </div>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiMail}></Badge>
                                        <p className='text-sm'> {item.companyEmail}</p>
                                    </div>
                                    <Badge className='w-fit' theme={customTheme} color={"success"} icon={HiHome}>Address located</Badge>
                                    <div className='flex items-center gap-1 m-1'>
                                    
                                        {

                                            Array.isArray(item?.Address) ?
                                                <>          
                                                    <ul>
                                                        {
                                                            item?.Address?.map((adr,index) => (
                                                                <div key={index} className='flex mb-1'>
                                                                <Badge theme={customTheme} color={"success"} icon={HiHome}></Badge>
                                                                <li className='text-sm'> {adr}</li>
                                                                </div>
                                                            ))
                                                        } </ul>
                                                </> :
                                                <>
                                                    <Badge theme={customTheme} color={"success"} icon={HiHome}></Badge>
                                                    <p className='text-sm'> {item.Address}</p>
                                                </>

                                        }

                                    </div>
                                    <div className='flex gap-2 mb-2'><Button onClick={() => router?.push('/profile/' + item?.Id)}
                                        size="xs"
                                        type="button"
                                        className="rounded-lg bg-blue-700 text-xs text-nowrap ml-1 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Ratings & Reviews
                                    </Button>
                                        <Tooltip content="copy profile">
                                            <Badge onClick={() => {
                                                try {
                                                    navigator.clipboard.writeText('https://inkowaguy.vercel.app/profile/' + item?.Id)
                                                    successMessage("Copied profile");

                                                } catch (error: any) {
                                                    failureMessage(error?.message);
                                                }
                                            }} theme={customTheme} color={"success"} icon={HiShare}></Badge>
                                        </Tooltip>

                                    </div>
                                </div>

                                <div>
                                    <Image
                                        className='object-[3/4] object-contain bg-white rounded-md w-auto'
                                        src={item.profileImage}
                                        alt='company'
                                        height={120}
                                        width={100}
                                    />
                                </div>

                            </div>
                        </div>
                    )) : isGettingAccount && (accountError == undefined || accountError == null) ? <LoadingProjects /> : accountError != undefined || accountError != null ? <LoadingProjectError /> : null
                }
            </div>
        );
    } else {
        return (
            <div>
                {
                    TempContractor.length > 0 ? TempContractor?.map((item) => (
                        <div key={item.Id} className='bg-slate-100 border z-10 rounded-md p-2 shadow-md m-5'>
                            <h2 className='text-lg text-black font-bold'>{item.companyName}</h2>
                            <div className="grid lg:grid-cols-3 xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 sm:w-fit md:w-fit lg:w-full xl:w-full" >

                                <div><p>{item.AdvertisingMsg}</p>
                                    <Button.Group className='grid gap-1 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 w-fit'>
                                        {
                                            item.Services.map((i, index) => (
                                                <Button key={index} theme={customsubmitTheme} color='appsuccess' size={"xs"}>
                                                    <HiBriefcase className="mr-3 h-4 w-4" />
                                                    {i}
                                                </Button>
                                            ))
                                        }

                                    </Button.Group>
                                </div>

                                <div className='gap-1'>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiPhone}></Badge>
                                        <p className='text-sm'>{item.phone}</p>
                                    </div>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiMail}></Badge>
                                        <p className='text-sm'> {item.companyEmail}</p>
                                    </div>

                                    {/* <Badge className='w-fit' theme={customTheme} color={"success"} icon={HiHome}>Address located</Badge> */}
                                    <div className='flex items-center gap-1 m-1'>
                                    
                                        {

                                            Array.isArray(item?.Address) ?
                                                <>
                                                    
                                                    <ul>
                                                        {
                                                            item?.Address?.map((adr,index) => (
                                                                <div key={index} className='flex mb-1'>
                                                                <Badge theme={customTheme} color={"success"} icon={HiHome}></Badge>
                                                                <li className='text-sm'> {adr}</li>
                                                                </div>
                                                            ))
                                                        } </ul>
                                                </> :
                                                <>
                                                    <Badge theme={customTheme} color={"success"} icon={HiHome}></Badge>
                                                    <p className='text-sm'> {item.Address}</p>
                                                </>

                                        }

                                    </div>
                                    <div className='flex gap-2 mb-2'><Button onClick={() => router?.push('/profile/' + item?.Id)}
                                        size="xs"
                                        type="button"
                                        className="rounded-lg bg-blue-700 text-xs text-nowrap ml-1 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Ratings & Reviews
                                    </Button>
                                        <Tooltip content="copy profile">
                                            <Badge onClick={() => {
                                                try {
                                                    navigator.clipboard.writeText('https://inkowaguy.vercel.app/profile/' + item?.Id)
                                                    successMessage("Copied profile");

                                                } catch (error: any) {
                                                    failureMessage(error?.message);
                                                }
                                            }} theme={customTheme} color={"success"} icon={HiShare}></Badge>
                                        </Tooltip>

                                    </div>
                                </div>

                                <div>
                                    <Image
                                        className='object-[3/4] object-contain rounded-md w-auto'
                                        src={item.profileImage}
                                        alt='company'
                                        height={120}
                                        width={100}
                                        priority
                                    />
                                </div>

                            </div>
                        </div>
                    )) : isGettingAccount && (accountError == undefined || accountError == null) ? <LoadingProjects /> : accountError != undefined || accountError != null ? <LoadingProjectError /> : <p>No Result(s) found</p>
                }
            </div>
        )
    }
}
