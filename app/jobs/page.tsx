'use client';

import Image from "next/image";
import Landscape from '../../public/Landscape.jpg';
import { customInputBoxTheme, customsubmitTheme } from "../customTheme/appTheme";
import {Button, TextInput } from "flowbite-react";
import { HiSearch } from 'react-icons/hi';
import Jobtemplate from "../components/JobTemplate";
import { useFetchUserAccount, useFetchUserProjects } from "../_hooks/useFetch";
import { useContext, useState } from "react";
import { HiHome } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { AppContext } from "../Context/appContext";

const Jobs = () => {
    const { UserProjects } = useFetchUserProjects("");
    const [SearchText,SetSerarchText]=useState("");
    const { ukey } = useContext(AppContext);
    const { UserData} = useFetchUserAccount(ukey);
    const router=useRouter();
    return (
        <div className="w-full gap-4 mt-16 mb-10">
            <div className="relative w-full">
                <Image
                    src={Landscape}
                    alt="inspiration"
                    className="bannerText aspect-[3/4] object-cover w-full" />

                <div className="grid grid-cols-2 absolute z-10 bottom-3 flex-grow bg-opacity-75 bg-black p-3 w-full">
                    <div className="p-2 gap-3">
                        <h1 className="text-4xl font-bold tracking-tight text-white dark:text-white">GET HIRED TODAY</h1>
                        <p className="text-sm tracking-tight text-white dark:text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s,</p>
                    </div>
                    <div className="h-full items-center justify-items-center">
                    
                    <TextInput onChange={(e)=>SetSerarchText(e.target.value.trim())} value={SearchText} icon={HiSearch} theme={customInputBoxTheme} color={"focuscolor"} id="Town" type="text" placeholder="search for a project" required shadow />
                    </div>
                </div>
            </div>
            <Button theme={customsubmitTheme} onClick={()=>router.replace("/")} className="m-2" size={"md"} color="light">
                <HiHome className="-ml-0.5 mr-2 h-4 w-4" />Home</Button>
           { SearchText=="" ?
            UserProjects?.map((item)=>(
                <Jobtemplate item={item} key={item.ProjectId} membership={UserData[0]?.membership} CurrUserKey={UserData[0]?.Id}/>
            )) : SearchText !== "" && UserProjects.filter((value) => {
                return SearchText.toLocaleLowerCase() === '' ? value : value.task.toLowerCase().includes(SearchText.toLocaleLowerCase());
            }).map((itm)=>(
                <Jobtemplate item={itm} key={itm.ProjectId} membership={UserData[0]?.membership} CurrUserKey={UserData[0]?.Id}/>
            ))
           }  
        </div>
    );
}

export default Jobs;