'use client';
import { Badge, Button, Card } from "flowbite-react";
import Image from "next/image";
import Post from '../../public/Post.png';
import Quotes from '../../public/Quotes.png';
import Accept from '../../public/Accept.png';
import Rate from '../../public/Rate.png';
import living from '../../public/livingroom.jpg';
import Bedroom from '../../public/Bedroom.jpg';
import Bathroom from '../../public/Bathroom.jpg';
import Kitchen from '../../public/Kitchen.jpg';
import InteriorDecor from '../../public/Interior-Decor.jpg';
import Landscape from '../../public/Landscape.jpg';
import HouseExterior from '../../public/House-Exterior.jpg';
import Diningroom from '../../public/Dining-room.jpg';
import KidsRoom from '../../public/Kids-Room.jpg';
import caponlycrop from '../../public/caponlycrop.png';
import { IProjects, IhowItwors, Iinspirations } from "../Interfaces/appInterfaces";
import { customTheme, customsubmitTheme } from "../customTheme/appTheme";
import { HiCheck, HiClock, HiShare } from 'react-icons/hi';
import { useRouter } from "next/navigation";



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

const projects: IProjects[] = [
    { id: 'qwqwsewd', owner: 'Rebone Mandy', email: 'mandy@gmail.com', description: "This project has to start ASAP make a me a better offer by bidding.", budget: 1230.90 },
    { id: 'jdxkekk', owner: 'Rebone Mandy', email: 'mandy@gmail.com', description: "This project has to start ASAP make a me a better offer by bidding.", budget: 4230.99 },
    { id: 'wuvjtbv', owner: 'Rebone Mandy', email: 'mandy@gmail.com', description: "This project has to start ASAP make a me a better offer by bidding.", budget: 7210.00 },
    { id: 'rufjyrtg', owner: 'Khensani Masango', email: 'mandy@gmail.com', description: "This project has to start ASAP make a me a better offer by bidding.", budget: 4530.45 },
    { id: 'uoimlxxb', owner: 'Hendric Dasil', email: 'mandy@gmail.com', description: "This project has to start ASAP make a me a better offer by bidding.", budget: 80230.00 }
]

const inspirations:Iinspirations[]=[
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
    const router= useRouter();
    return (
        <main>
            {/*section 1*/}
            <div className="flex flex-col justify-center items-center gap-2 p-6">
                <h1 className="text-4xl">What is IKAG</h1>
                <p className="text-gray-600 ml-5 mr-5">I Know A Guy is a user-driven platform on which home-owners can find trusted, reliable home care contractors. Whether you are looking for a handyman for small jobs around the house or a builder for a big renovation project, you will find them on I Know A Guy. Unlike other business directories, the listings on I Know A Guy are Recommended by people who have interacted with those contractors, people who have used their services and can vouch that you will receive good service from them.</p>
            </div>
            {/*section 2*/}
            <div className="flex flex-col justify-center items-center gap-2 p-6">
                <h1 className="text-4xl">How It Works</h1>

                <div className="flex-row justify-evenly m-4 grid gap-3 sm:grid-cols-4 md:grid-cols-4 xm:grid-cols-1 xs:grid-cols-1 justify-items-center mt-5 bg-slate-50 overflow-hidden p-2 rounded-md">
                    {
                        howitworks?.map((item, index) => (
                            <Card key={index} className="max-w-sm flex flex-col justify-center items-center gap-3">
                                <Image className='h-12 w-12 aspect-[4/3] object-cover self-center' src={item.imgsr} alt="..." />
                                <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                                    {item.tittle}</p>
                            </Card>
                        ))
                    }

                </div>

            </div>
            {/*section 3*/}
            <div className="flex flex-col justify-center items-center gap-2 p-6">
                <Button theme={customsubmitTheme} size={"md"} type="submit" color="appsuccess">Post A Project</Button>
                <h1 className="text-4xl m-3">Current Projects</h1>
                <div className="flex-row justify-between m-4 grid gap-3 sm:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 xs:grid-cols-1 justify-items-center mt-5 bg-slate-50 overflow-hidden p-2 rounded-md">
                    {
                        projects?.map((item, index) =>
                            Number(index) < 4 ?
                                (
                                    <Card key={item.id}>
                                        <div className="py-3 sm:py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="shrink-0">
                                                    <Image
                                                        alt="client(s)"
                                                        height="32"
                                                        src={caponlycrop}
                                                        width="32"
                                                        className="rounded-full"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Bonnie Green</p>
                                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@windster.com</p>
                                                    <p className=" text-sm text-gray-500 dark:text-gray-400">category: Plumping</p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    R{item.budget.toFixed(2)}
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

            </div>
            {/*section 4*/}
            <div className="flex flex-col justify-center items-center gap-2 p-6">
                <h1 className="text-4xl">Get Inspired</h1>
                <p className="text-gray-600 ml-5 mr-5">Find your inspiration and make it a reality</p>
                <div className="flex-row justify-between m-4 grid gap-3 sm:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 xs:grid-cols-1 justify-items-center mt-5 bg-slate-50 overflow-hidden p-2 rounded-md">
                    {inspirations?.map((item)=>(
                        <div
                        className="max-w-sm relative overflow-hidden rounded-md hover:cursor-pointer"
                    >
                        <Badge onClick={()=>router.push(item.sharelink)} theme={customTheme} color={"success"} className="absolute z-10 w-fit top-0 m-1 hover:cursor-pointer" icon={HiShare}>share</Badge>
                        <Image
                            src={item.imgsr}
                            alt="inspiration"
                            className="aspect-[4/3] object-cover"
                        />
                        <div className="flex-wrap absolute z-10 bottom-0 bg-opacity-75 bg-black p-3">
                            <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white">
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