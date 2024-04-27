
'use client';

import { Carousel, Card, Button, Label, Select, Dropdown } from 'flowbite-react';
import Image from 'next/image';
import plumber from '../../public/1.jpg';
import electrican from '../../public/3.jpg';
import gardener from '../../public/4.jpg';
import construction from '../../public/5.jpg';
import homegarden from '../../public/homegarden.jpg';
import { customselectTheme } from '../customTheme/appTheme';
import Searchresults from './Searchresults';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFetchProvinces, useFetchServices } from '../_hooks/useFetch';
import { IActualTasks, ITowns } from '../Interfaces/appInterfaces';

export function Slider() {
    const { ProvinceData, DataError, isLoading } = useFetchProvinces();
    const { ServiceData, serviceError, isLoadingservies } = useFetchServices();
    const [typedValue, SetFilter] = useState<string | any>("");
    const [SelectedSubcategory, SetSelectedSubcategory] = useState<string>("");
    const[Selectedsubarea,SetSelectedsubarea]=useState<string>("");
    const [subcategory, SetSubcategory] = useState<IActualTasks[]>([]);
    const [subareas, SetSubareas] = useState<ITowns[]>([]);
   
    const [provCategory, setprovCategory] = useState<string>("Select your location");
    const [ServiceCategory, setServiceCategory] = useState<string>("Select Service");
    const SetSelectedService = (category: string) => {
        setServiceCategory(category);
        if (category !== "" && category !== "Select Service") {
            ServiceData.forEach((item) => {
                if (item.ServiceType == category.replace("🛠️", '').trim()) {
                    SetSubcategory(item.actualTask);
                }
            })
        } else {
            SetSubcategory([]);
        }
    }

    const SetProvince = (category: string) => {
        setprovCategory(category);
        if (category !== "" && category !== "Select your location") {
            ProvinceData.forEach((item) => {
                if (item.province == category.replace("🛠️", '').trim()) {
                    SetSubareas(item.Towns);
                }
            })
        } else {
            SetSubareas([]);
        }
    }

    const router = useRouter();
    const performSeach = () => {
        // if (selectedValue.toLocaleLowerCase().trim() == "all" && typedValue.trim() == "") {
        //     router.push('/contractors');
        // }
        // if ((selectedValue.toLocaleLowerCase().trim() == "all" || selectedValue.toLocaleLowerCase().trim() != "all") && typedValue.trim() != "") {
        //     router.push(`/contractors/${typedValue.toLowerCase()}/${selectedValue}`);
        // }
    }
    return (
        <div id='searchBox' className="relative content-center">
            <Card className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-fit min-w-fit max-h-fit" horizontal>
                <h5 className="text-3xl tracking-tight leading-8 text-gray-900 dark:text-white lg:text-nowrap xl:text-nowrap md:text-wrap sm:text-wrap">
                    Find Trusted, Reliable Contractors For Your Home
                </h5>
                <div className='gap-1'>
                    <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1">
                        <div className="w-full gap-2">

                            <Dropdown className='max-w-md' color='light' style={{ width: '100%' }} label={ServiceCategory}>

                                {ServiceData?.map((item) => (
                                    <Dropdown.Item onClick={() => SetSelectedService(item.ServiceType)} key={item.Id}>
                                        {"🛠️" + item.ServiceType}
                                    </Dropdown.Item>
                                )

                                )}
                            </Dropdown>
                            {subcategory.length > 0 &&

                                <Dropdown style={{ width: '100%' }} color='light' className="max-w-md mt-4" label={SelectedSubcategory}>

                                    {subcategory?.map((item, index) => (
                                        <Dropdown.Item onClick={() => SetSelectedSubcategory(item.task)} key={index}>
                                            {"🛠️" + item.task}
                                        </Dropdown.Item>
                                    )

                                    )}
                                </Dropdown>
                            }

                        </div>

                        <div className="w-full">

                            <Dropdown style={{ width: '100%' }} color='light' className="max-w-md" label={provCategory}>

                                {ProvinceData?.map((item) => (
                                    <Dropdown.Item onClick={() => SetProvince(item.province)} key={item.Id}>
                                        {"🛠️" + item.province}
                                    </Dropdown.Item>
                                )

                                )}
                            </Dropdown>

                            {
                                subareas.length > 0 &&

                                <Dropdown style={{ width: '100%' }} color='light' className="max-w-md mt-2" label={Selectedsubarea}>

                                    {subareas?.map((item, index) => (
                                        <Dropdown.Item onClick={() => SetSelectedsubarea(item.area)} key={index}>
                                            {"🛠️" + item.area}
                                        </Dropdown.Item>
                                    )

                                    )}
                                </Dropdown>
                            }

                        </div>


                    </div>
                    <Button className='serch mt-3 bg-appGreen text-white' size="md" as="a" color="light"
                        onClick={() => performSeach()}>search</Button>
                </div>

                {/*search results*/}
                <Searchresults typedValue={typedValue} SetFilter={SetFilter} />

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
