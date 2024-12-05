
'use client';

import { Carousel, Card, Button, Select } from 'flowbite-react';
import Image from 'next/image';
import plumber from '../../public/1.jpg';
import electrican from '../../public/3.jpg';
import gardener from '../../public/4.jpg';
import construction from '../../public/5.jpg';
import homegarden from '../../public/homegarden.jpg';
import Searchresults from './Searchresults';
import { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { useFetchProvinces, useFetchServices } from '../_hooks/useFetch';
import { IActualTasks, ITowns } from '../Interfaces/appInterfaces';
import Select_API from 'react-select';
import { failureMessage } from '../notifications/successError';

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

    type prv={
        value:string,
        label:string
    }
    type srv={
        value:string,
        label:string
    }
    const [provinces,Set_Provinces]=useState<prv[]>([]);
    const [Services,Set_Services]=useState<prv[]>([]);
    useEffect(()=>{
        let provinces_ = ProvinceData?.map((province) => ({
            value: province.province,
            label: province.province,
        }));
        let Services_ = ServiceData?.map((province) => ({
            value: province.ServiceType,
            label: province.ServiceType,
        }));
        Set_Services(Services_);
        Set_Provinces(provinces_);
    },[ProvinceData || Services]);

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
        }else{
            failureMessage("Empty search or incomplete search keys cannot be proccessed");
        }
    }
    return (
        <div id='searchBox' className="relative content-center">
            <Card className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] sm:w-[60%] lg:max-w-fit lg:min-w-fit max-h-fit p-2 " horizontal>
                <h5 className="capMsg text-center tracking-tight leading-8 text-gray-900  dark:text-white lg:text-nowrap xl:text-nowrap md:text-wrap sm:text-wrap">
                    Find Trusted, Reliable Contractors For Your Home
                </h5>
                <div className='gap-1'>
                    <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1">
                        <div className="w-full gap-2">
                            <Select_API instanceId={ServiceCategory?.toString()} placeholder={"Select Service"} options={Services} onChange={(e) => SetSelectedService(e?.value)} />

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

                        <div className="w-full mt-1">

                            <Select_API instanceId={provCategory?.toString()} placeholder={"Select Your Location"} options={provinces} onChange={(e) => SetProvince(e?.value)} />

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
                    <Button className='serch mt-4 bg-appGreen text-white' size="md" as="a" color="light"
                        onClick={() => performSeach()}>
                        <HiSearch className="mr-2 h-5 w-5" />
                        Search</Button>
                </div>

                {/*search results*/}
                <Searchresults typedValue={typedValue} SetFilter={SetFilter} />

            </Card>
            <Carousel className="h-[100dvh] w-full" pauseOnHover>
                <Image className="sliderimages" src={construction} priority alt="Construction" />
                <Image className="sliderimages" src={electrican} priority alt="Electrician" />
                <Image className="sliderimages" src={gardener} priority alt="Gardener" />
                <Image className="sliderimages" src={plumber} priority alt="Plumber" />
                <Image className="sliderimages" src={homegarden} priority alt="Home Garden" />
            </Carousel>
        </div>
    );
}
