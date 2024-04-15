'use client';

import Image from "next/image";
import Landscape from '../../public/Landscape.jpg';
import { customInputBoxTheme } from "../customTheme/appTheme";
import {TextInput } from "flowbite-react";
import { HiSearch } from 'react-icons/hi';
import Jobtemplate from "../components/JobTemplate";
import { projects } from "../components/CenterBody";

const Jobs = () => {
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
                        <p className="text-sm tracking-tight text-white dark:text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                    </div>
                    <div className="h-full items-center justify-items-center">
                    
                    <TextInput icon={HiSearch} theme={customInputBoxTheme} color={"focuscolor"} id="Town" type="text" placeholder="search for a project" required shadow />
                    </div>
                </div>
            </div>
           {/*job template*/}
           {
            projects?.map((item)=>(
                <Jobtemplate item={item}/>
            ))
           }  
        </div>
    );
}

export default Jobs;