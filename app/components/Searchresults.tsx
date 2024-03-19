import { Badge } from "flowbite-react";
import { Iservices } from "../Interfaces/appInterfaces";
import { customTheme } from "../customTheme/appTheme";
import { HiCheck } from 'react-icons/hi';
import { Dispatch } from "react";

const Services:Iservices[]=[
{serviceType:'Plumping'},
{serviceType:'Electrician'},
{serviceType:'Carpenter'},
{serviceType:'Home Exterior'},
{serviceType:'Interior Decor'},
{serviceType:'Landscape'}
]

const Searchresults = ({ typedValue,SetFilter }: { typedValue: string,SetFilter:any }) => {
    return (
        <>
            {typedValue !== "" && Services.filter((value) => {
                return typedValue.toLocaleLowerCase() === '' ? value : value.serviceType.toLowerCase().includes(typedValue);
            }).map((item,index) => (
                <div key={index} className="flex items-center border p-1 rounded-md z-10">
                    <p>{item.serviceType}</p>
                    <Badge onClick={() => {SetFilter(item.serviceType)}} theme={customTheme} color={"success"} className="w-fit top-0 m-1 hover:cursor-pointer" icon={HiCheck}>choose</Badge>
                            
                </div>
            ))
            }
        </>

    );
}

export default Searchresults;