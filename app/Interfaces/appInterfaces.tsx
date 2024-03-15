import { StaticImageData } from "next/image";

//listing  on popular
export interface Ijobs {
    id: string,
    jobname: string,
    imgsr:StaticImageData,
    def:string,
    duties :string[]
};