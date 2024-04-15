import EmblaCarousel from "@/app/components/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import { StaticImageData } from "next/image";
import Kitchen from '../../../public/Kitchen.jpg';
import kitchen1 from '../../../public/kitchen1.jpg';
import kitchen2 from '../../../public/kitchen2.jpg';
import kitchen3 from '../../../public/kitchen3.jpg';
import kitchen4 from '../../../public/kitchen4.jpg';

const OPTIONS: EmblaOptionsType = {}
//const SLIDE_COUNT = 10
export interface IinspirationsCarosal{
    id:number,
    imageSrc:StaticImageData,
}
//const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
var CarosalSlides:IinspirationsCarosal[]=[];
CarosalSlides=[
    {id:0,imageSrc:Kitchen},
    {id:1,imageSrc:kitchen1},
    {id:2,imageSrc:kitchen2},
    {id:3,imageSrc:kitchen3},
    {id:4,imageSrc:kitchen4},
]
const Inspirations = () => {
    return ( <EmblaCarousel slides={CarosalSlides} options={OPTIONS} />);
}
 
export default Inspirations;