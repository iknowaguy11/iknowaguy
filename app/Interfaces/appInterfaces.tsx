import { StaticImageData } from "next/image";

//listing  on popular
export interface Ijobs {
    id: string,
    jobname: string,
    imgsr:StaticImageData,
    def:string,
    duties :string[]
};

export interface IhowItwors{
    tittle:string,
    imgsr:StaticImageData,
}
export interface IProjects{
    id:string,
    owner:string,
    category:string,
    email:string,
    description:string,
    budget:number
}
export interface Iservices{
    serviceType:string
}
export interface Iinspirations{
    id:string,
    tittle:string,
    imgsr:StaticImageData,
    caption:string,
    sharelink:string
}
export interface Icontractors{
    id:string,
    company:string,
    imgsr:StaticImageData,
    encouragingWords:string,
    rating:number,
    jobcategory:string[],
    experience:number,
    phone:string,
    address:string
}