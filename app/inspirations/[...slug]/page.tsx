'use client';
import EmblaCarousel from "@/app/components/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import { StaticImageData } from "next/image";
import Kitchen from '../../../public/Kitchen.jpg';
import kitchen1 from '../../../public/kitchen1.jpg';
import kitchen2 from '../../../public/kitchen2.jpg';
import kitchen3 from '../../../public/kitchen3.jpg';
import kitchen4 from '../../../public/kitchen4.jpg';
import { notFound, useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import { HiHome } from 'react-icons/hi';
import { customsubmitTheme } from "@/app/customTheme/appTheme";
import InsiprationFullView from "@/app/components/InsiprationFullView";

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
    const paths_Segments = [
        "Bedroom", "Bathroom", "Kitchen", "Interior-Decor", "Landscape", "Home-Exterior", "Dining-Room", "Kids-Room"
    ]
    if (paths_Segments.includes(params.slug[0]) && (params?.slug[1]==undefined || params?.slug[1]==null)) {
        return (<>
            <EmblaCarousel slides={params.slug[0] == "Bedroom" ? Bedroom :
                params.slug[0] == "Bathroom" ? Bathroom : params.slug[0] == "Kitchen" ? KitchenSlides :
                    params.slug[0] == "Interior-Decor" ? InteriorDecor : params.slug[0] == "Landscape" ? Landscape :
                        params.slug[0] == "Home-Exterior" ? HomeExterior : params.slug[0] == "Dining-Room" ? Dining :
                            params.slug[0] == "Kids-Room" ? KidsRoom : []
            } options={OPTIONS} Category={params.slug[0]} />
            <div className="flex justify-center m-2">
                <Button onClick={() => router.push('/')} className="gap-2" size={"md"} theme={customsubmitTheme} color="appsuccess">
                    <HiHome className="mr-3 h-4 w-4" />Home</Button>
            </div>
        </>);
    }
    else if(paths_Segments.includes(params.slug[0]) &&
     (params?.slug[1]!==undefined || params?.slug[1]!==null) && !isNaN(parseInt(params.slug[1]))){
        return(
            <InsiprationFullView paths_Segments={paths_Segments} inpiration_folder={params?.slug[1]}/>
        )
    }
     else {
        notFound();
    }
}

export default Inspirations;