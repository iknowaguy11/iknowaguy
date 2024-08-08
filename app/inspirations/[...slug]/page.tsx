'use client';
import EmblaCarousel from "@/app/components/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import Image, { StaticImageData } from "next/image";
import Kitchen from '../../../public/Kitchen.jpg';
import kitchen1 from '../../../public/kitchen1.jpg';
import kitchen2 from '../../../public/kitchen2.jpg';
import kitchen3 from '../../../public/kitchen3.jpg';
import kitchen4 from '../../../public/kitchen4.jpg';
import { notFound, useRouter } from "next/navigation";
import { Alert, Button, Spinner } from "flowbite-react";
import { HiHome } from 'react-icons/hi';
import { customsubmitTheme } from "@/app/customTheme/appTheme";
import InsiprationFullView from "@/app/components/InsiprationFullView";
import { useFetchInspirations } from "@/app/_hooks/useFetch";

const OPTIONS: EmblaOptionsType = {}

export interface IinspirationsCarosal {
    id: number,
    imageSrc: StaticImageData,
}
var KitchenSlides: IinspirationsCarosal[] = [];
KitchenSlides = [
    { id: 0, imageSrc: Kitchen },
    { id: 1, imageSrc: kitchen1 },
    { id: 2, imageSrc: kitchen2 },
    { id: 3, imageSrc: kitchen3 },
    { id: 4, imageSrc: kitchen4 },
];
var Bedroom: IinspirationsCarosal[] = [];
var Bathroom: IinspirationsCarosal[] = [];
var InteriorDecor: IinspirationsCarosal[] = [];
var Landscape: IinspirationsCarosal[] = [];
var HomeExterior: IinspirationsCarosal[] = [];
var Dining: IinspirationsCarosal[] = [];
var KidsRoom: IinspirationsCarosal[] = [];

const Inspirations = ({ params }: { params: { slug: string[] } }) => {
    const router = useRouter();
    const { InspirationData, DataError, isLoading } = useFetchInspirations(params?.slug[0].replaceAll('-', " "));
    const paths_Segments = [
        "Bedroom", "Bathroom", "Kitchen", "Interior-Decor", "Landscape", "Home-Exterior", "Dining-Room", "Kids-Room"
    ]
    if (paths_Segments.includes(params.slug[0]) && (params?.slug[1] == undefined || params?.slug[1] == null)) {
        return (<div className={InspirationData?.length == 0 ? "h-dvh" : "mt-20 "}>
            {InspirationData?.length > 0 ? <Button onClick={() => router.replace('/')} theme={customsubmitTheme} className="ml-4" color="appsuccess">Home</Button> : null}
            <div className="flex-row justify-between m-4 grid gap-3 sm:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 xs:grid-cols-1 justify-items-center mt-5 bg-slate-50 overflow-hidden p-2 rounded-md">
                {InspirationData[0]?.media?.map((item, index) => (
                    <div
                        key={index} className="max-w-sm relative overflow-hidden rounded-md hover:cursor-pointer"
                    >
                        <Image
                            onClick={() => router.push(item?.url)}
                            src={item.url}
                            alt="inspiration"
                            width={600}
                            height={600}
                            priority
                            className="aspect-[4/3] object-cover"
                        />
                        <div className="flex-wrap absolute z-10 bottom-0 bg-opacity-75 bg-black p-3">
                            {/* <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white hover:text-appGreen">
                                {item.category}
                            </h5> */}
                            <div className="flex gap-1">
                                <Button onClick={() => router.push(item?.url)} theme={customsubmitTheme} color="appsuccess">Full View</Button>
                                <Button onClick={() => navigator?.clipboard.writeText(item?.url)} theme={customsubmitTheme} color="appsuccess">Share Image</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {InspirationData?.length == 0 ? <div className="ml-4 mt-16">

                <Alert color="warning" rounded>
                    {isLoading ? <Spinner className="m-2" aria-label="Extra large spinner" size="xl" /> : <><span className="font-medium">Info alert!</span> No Inspiration Images found in this category</> }
                    
                    <Button onClick={() => router.replace('/')} theme={customsubmitTheme} color="appsuccess">Home</Button>
                </Alert>


            </div> : null}

        </div>);
    }
    else if (paths_Segments.includes(params.slug[0]) &&
        (params?.slug[1] !== undefined || params?.slug[1] !== null) && !isNaN(parseInt(params.slug[1]))) {
        return (
            <InsiprationFullView paths_Segments={paths_Segments} inpiration_folder={params?.slug[1]} />
        )
    }
    else {
        notFound();
    }
}

export default Inspirations;