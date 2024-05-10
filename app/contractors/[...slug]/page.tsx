'use client';

import caponlycrop from '../../../public/caponlycrop.png';
import compani from '../../../public/Naledi.png';
import compani2 from '../../../public/youngman.gif';
import pool from '../../../public/pool.jpg';
import ark from '../../../public/ark.jpg';
import { notFound } from "next/navigation";
import { NewContractorTemplate } from "@/app/components/NewContractorTemplate";
import { Icontractors } from "@/app/Interfaces/appInterfaces";
import { useFetchContractorsAccount } from '@/app/_hooks/useFetch';

     const contractors:Icontractors[]=[
    {id:"qw",company:"ABC Solutions",imgsr:compani2,encouragingWords:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document",rating:67,jobcategory:["plumping","gardening","internal house decor"],experience:8,phone:"0769053002",address:"205 Alberton East Extention 2 Gauteng"},
    {id:"ribkr",company:"Africa Solutions",imgsr:compani,encouragingWords:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document",rating:7,jobcategory:["plumping","gardening","internal house decor"],experience:23,phone:"0769053002",address:"205 Alberton East Extention 2 Kwazulu Natal"},
    {id:"khkd",company:"Pipes Care",imgsr:pool,encouragingWords:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",rating:67,jobcategory:["plumping","gardening"],experience:12,phone:"0769053002",address:"205 Alberton East Extention 2 Limpopo"},
    {id:"eeeefd",company:"Diamond Electricity",imgsr:ark,encouragingWords:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document",rating:34,jobcategory:["plumping","electrician"],experience:32,phone:"0769053002",address:"205 Alberton East Extention 2 Northern cape"},
    {id:"wsdlslxs",company:"ABC Solutions",imgsr:caponlycrop,encouragingWords:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document",rating:22,jobcategory:["plumping","gardening","internal house decor"],experience:10,phone:"0769053002",address:"205 Alberton East Extention 2 Northern cape"},
];
const Contractors = ({params}:{params:{slug:string[]}}) => {
    const { UserData, accountError, isGettingAccount}=useFetchContractorsAccount(decodeURIComponent(params.slug[3]).trim());
    console.log(decodeURIComponent(params.slug[0]).trim())
    console.log(decodeURIComponent(params.slug[1]).trim())
    console.log(decodeURIComponent(params.slug[2]).trim())
    console.log(decodeURIComponent(params.slug[3]).trim())
    if(params.slug.length==4){
        return ( 
            <div className='flex justify-center items-center mt-28 mb-10'>
                <NewContractorTemplate contractors={UserData} params={params.slug} isGettingAccount={isGettingAccount} accountError={accountError}/>
            </div>
         );
    }
    else{
        notFound();
    }
}
 
export default Contractors;