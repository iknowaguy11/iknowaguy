
'use client';

import { Carousel, Card, Button, Select } from 'flowbite-react';
import Image from 'next/image';
import plumber from '../../public/1.jpg';
import electrican from '../../public/3.jpg';
import gardener from '../../public/4.jpg';
import construction from '../../public/5.jpg';
import homegarden from '../../public/homegarden.jpg';
import Searchresults from './Searchresults';
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { useFetchProvinces, useFetchServices } from '../_hooks/useFetch';
import { IActualTasks, ITowns } from '../Interfaces/appInterfaces';
import Select_API from 'react-select';

export function Slider() {
    const { ProvinceData} = useFetchProvinces();
    const { ServiceData} = useFetchServices();
    const [typedValue, SetFilter] = useState<string | any>("");
    const [SelectedSubcategory, SetSelectedSubcategory] = useState<string>("");
    const [Selectedsubarea, SetSelectedsubarea] = useState<string>("");
    const [subcategory, SetSubcategory] = useState<IActualTasks[]>([]);
    const [subareas, SetSubareas] = useState<ITowns[]>([]);

    const [provCategory, setprovCategory] = useState<string | null | undefined>("Select Your Location");
    const [ServiceCategory, setServiceCategory] = useState<string | null | undefined>("Select Service");

    const provinces = [
        { value: "Limpopo", label: "Limpopo" },
        { value: "Gauteng", label: "Gauteng" },
        { value: "Eastern Cape", label: "Eastern Cape" },
        { value: "Free State", label: "Free State" },
        { value: "KwaZulu Natal", label: "KwaZulu Natal" },
        { value: "Mpumalanga", label: "Mpumalanga" },
        { value: "North West", label: "North West" },
        { value: "Northern Cape", label: "Northern Cape" },
        { value: "Western Cape", label: "Western Cape" }

    ];
    const Services = [
        { value: "PLUMBING", label: "PLUMBING" },
        { value: "HANDYMAN", label: "HANDYMAN" },
        { value: "ELECTRICAL", label: "ELECTRICAL" },
        { value: "PAINTING", label: "PAINTING" },
        { value: "CARPENTRY", label: "CARPENTRY" },
        { value: "GARDEN AND LANDSCAPING", label: "GARDEN AND LANDSCAPING" },
        { value: "BUILDING AND RENOVATIONS", label: "BUILDING AND RENOVATIONS" },
        { value: "MORE CATEGORIES", label: "MORE CATEGORIES" },
    ];
    const SetSelectedService = (category: string | null | undefined) => {
        setServiceCategory(category);
        if (category !== "" && category !== "Select Service") {
            ServiceData?.forEach((item) => {
                if (item?.ServiceType == category?.replace("🛠️", '').trim()) {
                    SetSubcategory(item?.actualTask);
                }
            })
        } else {
            SetSubcategory([]);
        }
    }

    const SetProvince = (category: string | null | undefined) => {
        setprovCategory(category);
        if (category !== "" && category !== "Select Your Lcation") {
            ProvinceData?.forEach((item) => {
                if (item?.province == category?.replace("🛠️", '').trim()) {
                    SetSubareas(item?.Towns);
                }
            })
        } else {
            SetSubareas([]);
        }
    }

    const router = useRouter();
    const performSeach = () => {

        if ((ServiceCategory?.toLocaleLowerCase().trim() != "select service") && (SelectedSubcategory?.toLocaleLowerCase().trim() != "" && SelectedSubcategory?.toLocaleLowerCase().trim() !== "Select A Sub Area" && SelectedSubcategory?.toLocaleLowerCase().trim() !== "Select A Sub Service")
            && (provCategory?.toLocaleLowerCase().trim() != "select your location") && (Selectedsubarea?.toLocaleLowerCase().trim() != "" && SelectedSubcategory?.toLocaleLowerCase().trim() !== "Select A Sub Area" && SelectedSubcategory?.toLocaleLowerCase().trim() !== "Select A Sub Service")) {
            router.push(`/contractors/${ServiceCategory?.toLocaleLowerCase().trim()}/${SelectedSubcategory?.toLocaleLowerCase().trim()}/
            ${provCategory?.toLocaleLowerCase().trim()}/${Selectedsubarea?.trim()}`);
        }
    }
    return (
        <div id='searchBox' className="relative content-center">
            <Card className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-fit min-w-fit max-h-fit p-2" horizontal>
                <h5 className="capMsg text-center tracking-tight leading-8 text-gray-900 dark:text-white lg:text-nowrap xl:text-nowrap md:text-wrap sm:text-wrap">
                    Find Trusted, Reliable Contractors For Your Home
                </h5>
                <div className='gap-1'>
                    <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1">
                        <div className="w-full gap-2">
                            <Select_API placeholder={"Select Service"} options={Services} onChange={(e) => SetSelectedService(e?.value)} />

                            {subcategory.length > 0 &&

                                <Select
                                    className="max-w-md rounded mt-1 mb-1"
                                    onChange={(e) => SetSelectedSubcategory(e?.target.value)}
                                >
                                    <option>Select A Sub Service</option>
                                    {
                                        subcategory?.map((item, index) => (
                                            <option key={item?.task}>{item?.task}</option>
                                        ))
                                    }
                                </Select>
                            }

                        </div>

                        <div className="w-full">

                            <Select_API placeholder={"Select Your Location"} options={provinces} onChange={(e) => SetProvince(e?.value)} />

                            {
                                subareas.length > 0 &&

                                <Select
                                    className="max-w-md rounded mt-1 mb-1"
                                    onChange={(e) => SetSelectedsubarea(e?.target.value)}
                                >
                                    <option>Select A Sub Area</option>
                                    {
                                        subareas?.map((item, index) => (
                                            <option key={item?.area}>{item?.area}</option>
                                        ))
                                    }
                                </Select>
                            }

                        </div>


                    </div>
                    <Button className='serch mt-3 bg-appGreen text-white' size="md" as="a" color="light"
                        onClick={() => performSeach()}>
                        <HiSearch className="mr-2 h-5 w-5" />
                        Search</Button>
                </div>

                {/*search results*/}
                <Searchresults typedValue={typedValue} SetFilter={SetFilter} />

            </Card>
            <Carousel className='h-[100dvh] w-[100dvw]' pauseOnHover>
                <Image className='sliderimages' src={construction} priority alt="..." />
                <Image className='sliderimages' src={electrican} priority alt="..." />
                <Image className='sliderimages' src={gardener} priority alt="..." />
                <Image className='sliderimages' src={plumber} priority alt="..." />
                <Image className='sliderimages' src={homegarden} priority alt="..." />
            </Carousel>
        </div>
    );
}
