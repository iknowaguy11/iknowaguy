'use client';
import { Badge, Button, Card } from "flowbite-react";
import Image from "next/image";
import Post from '../../public/Post.png';
import Quotes from '../../public/Quotes.png';
import Accept from '../../public/Accept.png';
import Rate from '../../public/Rate.png';
import Bedroom from '../../public/Bedroom.jpg';
import Bathroom from '../../public/Bathroom.jpg';
import Kitchen from '../../public/Kitchen.jpg';
import InteriorDecor from '../../public/Interior-Decor.jpg';
import Landscape from '../../public/Landscape.jpg';
import HouseExterior from '../../public/House-Exterior.jpg';
import Diningroom from '../../public/Dining-room.jpg';
import KidsRoom from '../../public/Kids-Room.jpg';
import caponlycrop from '../../public/caponlycrop.png';
import { IhowItwors, Iinspirations } from "../Interfaces/appInterfaces";
import {  customTheme, customsubmitTheme } from "../customTheme/appTheme";
import { HiShare } from 'react-icons/hi';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFetchUserProjects } from "../_hooks/useFetch";


let howitworks: IhowItwors[] = [{
    tittle: "Post a project and tell us what you need done",
    imgsr: Post
},
{
    tittle: "Receive up to 5 bids from home services professionals",
    imgsr: Quotes
},
{
    tittle: "Hire the person who best suits your needs and budget",
    imgsr: Accept
},
{
    tittle: "Rate and Review on completion of the job",
    imgsr: Rate
}

];


const inspirations: Iinspirations[] = [
    { id: 'difuf', tittle: 'Bedroom', imgsr: Bedroom, caption: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500.", sharelink: "https://www.iknowaguysa.co.za/get-inspired/" },
    { id: 'fkgh', tittle: 'Bathroom', imgsr: Bathroom, caption: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500.", sharelink: "https://www.iknowaguysa.co.za/get-inspired/" },
    { id: 'vjdc', tittle: 'Kitchen', imgsr: Kitchen, caption: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500.", sharelink: "https://www.iknowaguysa.co.za/get-inspired/" },
    { id: 'kljh', tittle: 'Interior Decor', imgsr: InteriorDecor, caption: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500.", sharelink: "https://www.iknowaguysa.co.za/get-inspired/" },
    { id: 'dhdyrhv', tittle: 'Landscape', imgsr: Landscape, caption: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500.", sharelink: "https://www.iknowaguysa.co.za/get-inspired/" },
    { id: 'wfd', tittle: 'Home Exterior', imgsr: HouseExterior, caption: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500.", sharelink: "https://www.iknowaguysa.co.za/get-inspired/" },
    { id: 'ioiyu', tittle: 'Dining Room', imgsr: Diningroom, caption: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500.", sharelink: "https://www.iknowaguysa.co.za/get-inspired/" },
    { id: 'cvcvcrgd', tittle: 'Kids Room', imgsr: KidsRoom, caption: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500.", sharelink: "https://www.iknowaguysa.co.za/get-inspired/" },
]

const CenterBody = () => {
    const router = useRouter();
    const { UserProjects } = useFetchUserProjects("");
    return (
        <main>
            {/*section 1*/}
            <div className="flex flex-col justify-center items-center gap-2 p-6">
                <h1 className="text-4xl">What is IKAG</h1>
                <p className="text-gray-600 ml-5 mr-5">I Know A Guy is a user-driven platform on which home-owners can find trusted, reliable home care contractors. Whether you are looking for a handyman for small jobs around the house or a builder for a big renovation project, you will find them on I Know A Guy. Unlike other business directories, the listings on I Know A Guy are Recommended by people who have interacted with those contractors, people who have used their services and can vouch that you will receive good service from them.</p>
                <p className="text-gray-600 ml-5 mr-5">There are two ways in which you can use I Know A Guy to find contractors. Firstly, you can <a onClick={()=>{
            const element = document.getElementById('searchBox');
            element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }} className="text-appGreen">Find Contractors</a> by location and type of service you require and select one from our user-generated list. 


Alternatively, you can <Link href={'/postproject'} className="text-appGreen">Post A Project</Link>. When posting a project, you will be required to provide specific information about the work you need done. Once you have done that, a maximum of 5 contractors will then submit quotes to you by email. The more detailed the information you provide about your project, the more accurately the contractors will be able to quote you. When the contractor you appoint has completed the work, you can share your experience with other users on I Know A Guy by rating and reviewing the contractor. </p>
            </div>
            {/*section 2*/}
            <div id="whatIsIkg" className="flex flex-col justify-center items-center gap-2 p-6">
                <h1 className="text-4xl">How It Works</h1>

                <div id='HowItWorks' className="flex-row justify-evenly m-4 grid gap-3 sm:grid-cols-4 md:grid-cols-4 xm:grid-cols-1 xs:grid-cols-1 justify-items-center mt-5 bg-slate-50 overflow-hidden p-2 rounded-md">
                    {
                        howitworks?.map((item, index) => (
                            <Card key={index} className="max-w-sm flex flex-col justify-center items-center gap-3">
                                <Image className='aspect-[4/3] object-contain self-center w-auto h-auto'
                                    width={46}
                                    height={46}
                                    src={item.imgsr} alt="..." />
                                <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                                    {item.tittle}</p>
                            </Card>
                        ))
                    }

                </div>

            </div>
            {/*section 3*/}
            <div id="jobSection" className="flex flex-col justify-center items-center gap-2 p-6">
                <Button onClick={()=>router.push("/postproject")} theme={customsubmitTheme} size={"md"} type="submit" color="appsuccess">Post A Project</Button>
                <h1 className="text-4xl m-3">Current Projects</h1>
                <div className="flex-row justify-between m-4 grid gap-3 sm:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 xs:grid-cols-1 justify-items-center mt-5 bg-slate-50 overflow-hidden p-2 rounded-md">
                    {
                        UserProjects?.map((item, index) =>
                            Number(index) < 4 ?
                                (
                                    <Card key={item.ProjectId}>
                                        <div className="py-3 sm:py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="shrink-0">
                                                    <Image
                                                        alt="client(s)"
                                                        src={caponlycrop}
                                                        blurDataURL={"https://firebasestorage.googleapis.com/v0/b/inknowaguy.appspot.com/o/caponlycrop.png?alt=media&token=99e3aa53-2ec1-4b25-96c0-53ee0d03a8a5"}
                                                        height={32}
                                                        className="rounded-full aspect-[4/3] object-contain w-auto h-auto"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{item.owner}</p>
                                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">{item.email}</p>
                                                    <p className=" text-sm text-gray-500 dark:text-gray-400">category: {item.task}</p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    R{parseFloat(item.budget).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <Button theme={customsubmitTheme} color="appsuccess" size="xs">Explore</Button>
                                        </div>
                                    </Card>
                                ) : null
                        )
                    }

                </div>
                <Button onClick={()=>router.push("/jobs")} theme={customsubmitTheme} color="appsuccess" size="md">See more projects</Button>

            </div>
            {/*section 4*/}
            <div id='inspirations' className="flex flex-col justify-center items-center gap-2 p-6">
                <h1 className="text-4xl">Get Inspired</h1>
                <p className="text-gray-600 ml-5 mr-5">Find your inspiration and make it a reality</p>
                <div className="flex-row justify-between m-4 grid gap-3 sm:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 xs:grid-cols-1 justify-items-center mt-5 bg-slate-50 overflow-hidden p-2 rounded-md">
                    {inspirations?.map((item) => (
                        <div
                             key={item.id} className="max-w-sm relative overflow-hidden rounded-md hover:cursor-pointer"
                        >
                            <Badge onClick={() => router.push(item.sharelink)} theme={customTheme} color={"success"} className="absolute z-10 w-fit top-0 m-1 hover:cursor-pointer" icon={HiShare}>share</Badge>
                            <Image
                            onClick={()=>router.push("inspirations/"+item.tittle)}
                                src={item.imgsr}
                                alt="inspiration"
                                className="aspect-[4/3] object-cover"
                            />
                            <div className="flex-wrap absolute z-10 bottom-0 bg-opacity-75 bg-black p-3">
                                <h5 onClick={()=>router.push("inspirations/"+item.tittle)} className="text-2xl font-bold tracking-tight text-white dark:text-white hover:text-appGreen">
                                    {item.tittle}
                                </h5>
                                <p className="font-normal text-stone-100 dark:text-stone-100">
                                    {item.caption}
                                </p>

                            </div>
                        </div>
                    ))}


                </div>

            </div>

        </main>
    );
}

export default CenterBody;