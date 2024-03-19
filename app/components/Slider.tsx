
'use client';

import { Carousel, Card, Button, Label, Select, TextInput } from 'flowbite-react';
import Image from 'next/image';
import plumber from '../../public/1.jpg';
import electrican from '../../public/3.jpg';
import gardener from '../../public/4.jpg';
import construction from '../../public/5.jpg';
import homegarden from '../../public/homegarden.jpg';
import { HiSearch } from 'react-icons/hi';
import { customInputBoxTheme, customselectTheme } from '../customTheme/appTheme';
import Searchresults from './Searchresults';
import { Dispatch, useState } from 'react';

export function Slider() {
    const [typedValue,SetFilter]=useState<string|any>("");
    return (
        <div className="relative content-center">
            <Card className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-fit max-h-fit" horizontal>
                <h5 className="text-3xl tracking-tight leading-6 text-gray-900 dark:text-white">
                    Find reliable contructors for your home
                </h5>
                {/* <div className="flex flex-wrap gap-2">
                    <Image
                        alt="Bonnie image"
                        src={caponlycrop}
                        className="h-8 w-8 mb-3 rounded-full shadow-lg"
                    />
                    <Image
                        alt="Bonnie image"
                        src={caponlycrop}
                        className="h-8 w-8 mb-3 rounded-full shadow-lg"
                    />
                    <Image
                        alt="Bonnie image"
                        src={caponlycrop}
                        className="h-8 w-8 mb-3 rounded-full shadow-lg"
                    />

                </div> */}
                <div>
                    <div className="max-w-xl gap-2 xl:flex lg:flex xl:flex-row lg:flex-row sm:flex-col md:flex-col flex-nowrap justify-end">
                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="email4" value="Search for a Service" />
                            </div>
                            <TextInput theme={customInputBoxTheme} onChange={(e)=>SetFilter((e.target.value).toLocaleLowerCase())} value={typedValue} color={"focuscolor"} id="email4" type="email" icon={HiSearch} placeholder="service" required />
                        </div>
                        <div className="xl:lg:w-1/2 sm:w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="countries" value="Select your location" />
                        </div>
                        <Select className="max-w-md" id="countries" theme={customselectTheme} color={"success"} required>
                            <option>All</option>
                            <option>Kwazulu Natal</option>
                            <option>Limpopo</option>
                            <option>Gauteng</option>
                            <option>Northern cape</option>
                            <option>Western cape</option>
                        </Select>
                        </div>
                        <div className='flex flex-col justify-end mt-2 sm:mt-2 md:mt-2 lg:mt-0 xl:mt-0'>
                        <Button className='serch bg-appGreen text-white' size="md" as="a" color="light">search</Button>
                        </div>
                        
                    </div>
                </div>

                {/*search results*/}
                <Searchresults typedValue={typedValue} SetFilter={SetFilter}/>
                
            </Card>
            <Carousel className='h-[100dvh] w-[100dvw]' pauseOnHover>
                <Image className='sliderimages' src={construction} alt="..." />
                <Image className='sliderimages' src={electrican} alt="..." />
                <Image className='sliderimages' src={gardener} alt="..." />
                <Image className='sliderimages' src={plumber} alt="..." />
                <Image className='sliderimages' src={homegarden} alt="..." />
            </Carousel>
        </div>
    );
}
