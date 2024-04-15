
'use client';

import { Badge, Card } from 'flowbite-react';
import star from '../../public/star.png';
import Image from 'next/image';
import { HiPhone, HiHome, HiBriefcase, HiClock, HiMail, HiGlobeAlt } from 'react-icons/hi';
import { customTheme, customsubmitTheme } from '../customTheme/appTheme';
import { Button } from 'flowbite-react';
import { Icontractors } from '../Interfaces/appInterfaces';
import { usePathname } from 'next/navigation';

export function NewContractorTemplate({ contractors, params }: { contractors: Icontractors[], params: string[] }) {
    const pathname = usePathname();

    if (pathname.trim() == "/contractors") {
        return (
            <div>
                {
                    contractors.length > 0 ? contractors?.map((item) => (
                        <div className='bg-slate-100 border z-10 rounded-md p-2 shadow-md m-2'>
                            <h2 className='text-lg text-black font-bold'>{item.company}</h2>
                            <div key={item.id} className="grid lg:grid-cols-3 xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 sm:w-fit md:w-fit lg:w-full xl:w-full" >

                                <div><p>{item.encouragingWords}</p>
                                    <Button.Group outline>
                                        {
                                            item.jobcategory.map((i, index) => (
                                                <Button key={index} theme={customsubmitTheme} color='appsuccess' size={"xs"}>
                                                    <HiBriefcase className="mr-3 h-4 w-4" />
                                                    {i}
                                                </Button>
                                            ))
                                        }

                                    </Button.Group>
                                    <Badge className='w-fit mt-1' size={"xs"} theme={customTheme} color={"success"} icon={HiClock}> {item.experience} years </Badge>
                                </div>

                                <div className='gap-1'>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiPhone}></Badge>
                                        <p className='text-sm'>{item.phone}</p>
                                    </div>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiMail}></Badge>
                                        <p className='text-sm'> {"Probuilder@prb.co.za"}</p>
                                    </div>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiGlobeAlt}></Badge>
                                        <p className='text-sm'> {"Probuilder.co.za"}</p>
                                    </div>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiHome}></Badge>
                                        <p className='text-sm'> {item.address}</p>
                                    </div>
                                </div>

                                <div>
                                    <Image
                                        className='object-[3/4] object-contain bg-white rounded-md w-auto'
                                        src={item.imgsr}
                                        alt='company'
                                        height={120}
                                    />
                                </div>

                            </div>
                        </div>
                    )) : <p>Opps...! We could not find a contractor(s) for this search query</p>
                }

            </div>
        );
    } else if (params[1].toLowerCase() == "all") {
        let temp: Icontractors[];
        temp = contractors.filter(contractor => contractor.jobcategory.includes(decodeURIComponent(params[0])));
        return (
            <div>
                {
                    temp.length > 0 ? temp?.map((item) => (
                        <div className='bg-slate-100 border z-10 rounded-md p-2 shadow-md m-2'>
                            <h2 className='text-lg text-black font-bold'>{item.company}</h2>
                            <div key={item.id} className="grid lg:grid-cols-3 xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 sm:w-fit md:w-fit lg:w-full xl:w-full" >

                                <div><p>{item.encouragingWords}</p>
                                    <Button.Group outline>
                                        {
                                            item.jobcategory.map((i, index) => (
                                                <Button key={index} theme={customsubmitTheme} color='appsuccess' size={"xs"}>
                                                    <HiBriefcase className="mr-3 h-4 w-4" />
                                                    {i}
                                                </Button>
                                            ))
                                        }

                                    </Button.Group>
                                    <Badge className='w-fit mt-1' size={"xs"} theme={customTheme} color={"success"} icon={HiClock}> {item.experience} years </Badge>
                                </div>

                                <div className='gap-1'>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiPhone}></Badge>
                                        <p className='text-sm'>{item.phone}</p>
                                    </div>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiMail}></Badge>
                                        <p className='text-sm'> {"Probuilder@prb.co.za"}</p>
                                    </div>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiGlobeAlt}></Badge>
                                        <p className='text-sm'> {"Probuilder.co.za"}</p>
                                    </div>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiHome}></Badge>
                                        <p className='text-sm'> {item.address}</p>
                                    </div>
                                </div>

                                <div>
                                    <Image
                                        className='object-[3/4] object-contain bg-white rounded-md w-auto'
                                        src={item.imgsr}
                                        alt='company'
                                        height={120}
                                    />
                                </div>

                            </div>
                        </div>
                    )) : <p>Opps...! We could not find a contractor(s) for this search query</p>
                }

            </div>
        )
    } else if (params[1].toLowerCase() != "all" && params[0] != "") {

        let temp: Icontractors[];
        temp = contractors.filter(contractor => contractor.jobcategory.includes(decodeURIComponent(params[0])) && contractor.address.toLowerCase().includes(decodeURIComponent(params[1]).toLowerCase()));
        return (
            <div>
                {
                    temp.length > 0 ? temp?.map((item) => (
                        <div className='bg-slate-100 border z-10 rounded-md p-2 shadow-md m-2'>
                            <h2 className='text-lg text-black font-bold'>{item.company}</h2>
                            <div key={item.id} className="grid lg:grid-cols-3 xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 sm:w-fit md:w-fit lg:w-full xl:w-full" >

                                <div><p>{item.encouragingWords}</p>
                                    <Button.Group outline>
                                        {
                                            item.jobcategory.map((i, index) => (
                                                <Button key={index} theme={customsubmitTheme} color='appsuccess' size={"xs"}>
                                                    <HiBriefcase className="mr-3 h-4 w-4" />
                                                    {i}
                                                </Button>
                                            ))
                                        }

                                    </Button.Group>
                                    <Badge className='w-fit mt-1' size={"xs"} theme={customTheme} color={"success"} icon={HiClock}> {item.experience} years </Badge>
                                </div>

                                <div className='gap-1'>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiPhone}></Badge>
                                        <p className='text-sm'>{item.phone}</p>
                                    </div>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiMail}></Badge>
                                        <p className='text-sm'> {"Probuilder@prb.co.za"}</p>
                                    </div>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiGlobeAlt}></Badge>
                                        <p className='text-sm'> {"Probuilder.co.za"}</p>
                                    </div>
                                    <div className='flex items-center gap-1 m-1'>
                                        <Badge theme={customTheme} color={"success"} icon={HiHome}></Badge>
                                        <p className='text-sm'> {item.address}</p>
                                    </div>
                                </div>

                                <div>
                                    <Image
                                        className='object-[3/4] object-contain bg-white rounded-md w-auto'
                                        src={item.imgsr}
                                        alt='company'
                                        height={120}
                                    />
                                </div>

                            </div>
                        </div>
                    )) : <p>Opps...! We could not find a contractor(s) for this search query</p>
                }

            </div>
        )
    }

}
