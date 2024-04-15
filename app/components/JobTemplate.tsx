import { LongLorems, customTheme, customsubmitTheme } from "../customTheme/appTheme";
import { Badge, Button } from "flowbite-react";
import caponlycrop from '../../public/caponlycrop.png';
import { HiOutlineBriefcase, HiLocationMarker, HiPhone, HiMail, HiCash, HiClock } from 'react-icons/hi';
import Image from "next/image";
import { IProjects } from "../Interfaces/appInterfaces";

const Jobtemplate = ({ item }: { item: IProjects }) => {
    return (
        <div key={item.id} className="border w-full z-10 m-2 p-1 rounded-md shadow">
            <div className="gridCont grid">
                <div className="imageNownwer">
                    <Image
                        src={caponlycrop}
                        alt="company logo"
                        height={40}
                        width={40}
                        className="aspect-square rounded border mt-2 mb-2 mr-2"
                    />
                    <div>
                        <h2 className="text-base font-semibold">{item.owner}</h2>

                        <div className="flex gap-2">
                            <Badge theme={customTheme} color={"success"} className="w-fit" icon={HiPhone}>{item.phone}</Badge>
                            <Badge theme={customTheme} color={"success"} className="w-fit" icon={HiMail}>{item.email}</Badge>
                            <Badge theme={customTheme} color={"success"} className="w-fit" icon={HiCash}>R{(item.budget).toFixed(2)}</Badge>
                        </div>

                    </div>
                </div>

                <div className="items-center gap-1">
                    <Badge className="w-fit p-1" color={"gray"} icon={HiLocationMarker}> {item.addrs}</Badge>
                    <Badge className="w-fit p-1 mt-1" color={"gray"} icon={HiClock}> {item.postTime}</Badge>
                </div>

            </div>
            <Badge icon={HiOutlineBriefcase}  color={"gray"} className="w-fit p-1 mt-1"> Job/Project : {item.category}</Badge>
            <p className="text-clip text-wrap">{item.description}</p>
            <Button className="place-self-end" theme={customsubmitTheme} type="submit" color="appsuccess">Bid</Button>
        </div>
    );
}

export default Jobtemplate;