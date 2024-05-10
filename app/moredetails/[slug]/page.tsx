'use client';

import Image from "next/image";
import Landscape from '../../../public/Landscape.jpg';
import Jobtemplate from "@/app/components/JobTemplate";
import { useFetchSingleProjects, useFetchUserAccount } from "@/app/_hooks/useFetch";
import ProjectNotFound from "@/app/components/ProjectNotFound";
import { useContext } from "react";
import { AppContext } from "@/app/Context/appContext";
import { Button } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { customsubmitTheme } from "@/app/customTheme/appTheme";

const MoreDetails = ({params}:{params:{slug:string}}) => {
    const { SingleProject } = useFetchSingleProjects(params?.slug);
    const { ukey } = useContext(AppContext);
    const { UserData, accountError, isGettingAccount } = useFetchUserAccount(ukey);
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
                    
                    {/* <TextInput onChange={(e)=>SetSerarchText(e.target.value.trim())} value={SearchText} icon={HiSearch} theme={customInputBoxTheme} color={"focuscolor"} id="Town" type="text" placeholder="search for a project" required shadow /> */}
                    </div>
                </div>
            </div>
            <Button theme={customsubmitTheme} onClick={()=>router.replace("/")} className="m-2" size={"md"} color="light">
                <HiHome className="-ml-0.5 mr-2 h-4 w-4" />Home</Button>
           { 
           SingleProject?.ProjectId!=="" ?
            <Jobtemplate item={SingleProject} key={SingleProject?.ProjectId} membership={UserData[0]?.membership} CurrUserKey={UserData[0]?.Id}/> : <ProjectNotFound/>
           } 
        </div>
     );
}
 
export default MoreDetails;