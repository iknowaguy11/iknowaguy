import { Icontractors } from "@/app/Interfaces/appInterfaces";
import { ContactorTemplate } from "@/app/components/ContactorTemplate";
import caponlycrop from '../../../public/caponlycrop.png';
import { notFound } from "next/navigation";

export const contractors:Icontractors[]=[
    {id:"qw",company:"ABC Solutions",imgsr:caponlycrop,encouragingWords:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document",rating:67,jobcategory:["plumping","gardening","home decor"],experience:8,phone:"0769053002",address:"205 Alberton East Extention 2"},
    {id:"ribkr",company:"Africa Solutions",imgsr:caponlycrop,encouragingWords:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document",rating:7,jobcategory:["plumping","gardening","home decor"],experience:23,phone:"0769053002",address:"205 Alberton East Extention 2"},
    {id:"khkd",company:"Pipes Care",imgsr:caponlycrop,encouragingWords:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",rating:67,jobcategory:["plumping","gardening"],experience:12,phone:"0769053002",address:"205 Alberton East Extention 2"},
    {id:"eeeefd",company:"Diamond Electricity",imgsr:caponlycrop,encouragingWords:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document",rating:34,jobcategory:["electricity"],experience:32,phone:"0769053002",address:"205 Alberton East Extention 2"},
    {id:"wsdlslxs",company:"ABC Solutions",imgsr:caponlycrop,encouragingWords:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document",rating:22,jobcategory:["plumping","gardening","home decor"],experience:10,phone:"0769053002",address:"205 Alberton East Extention 2"},
];
const Contractors = ({params}:{params:{slug:string[]}}) => {
    if(params.slug.length==2){
        return ( 
            <div className='flex justify-center items-center mt-28 mb-10'>
                <ContactorTemplate contractors={contractors} params={params.slug}/>
                
            </div>
         );
    }else{
        notFound();
    }
}
 
export default Contractors;