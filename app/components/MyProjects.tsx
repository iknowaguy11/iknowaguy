import { customsubmitTheme } from "../customTheme/appTheme";
import { Badge, Button, Tooltip } from "flowbite-react";
import { HiOutlineBriefcase,HiCollection, HiLocationMarker, HiCash, HiClock, HiOutlineTrash, HiOutlineCheckCircle } from 'react-icons/hi';
import Image from "next/image";
import { IProjects } from "../Interfaces/appInterfaces";
import { handlerDelete } from "../Controllers/DeleteDocument";
import HoverProfile from "./HoverProfile";

const MyProjects = ({ item }: { item: IProjects }) => {

    return (
        <div key={item.ProjectId} className="border w-full z-10 m-2 p-1 rounded-md shadow">
            <div className="gridCont grid">
                <div className="imageNownwer">
                    <Image
                        src={item?.Profpic}
                        alt="Owner Picture"
                        height={40}
                        width={40}
                        priority={false}
                        className="aspect-[3/4] rounded border mt-2 mb-2 mr-2"
                    />

                </div>

                <div className="items-center gap-1">
                    <Badge className="w-fit p-1" color={"gray"} icon={HiLocationMarker}> {item?.addrs}</Badge>
                    <Badge className="w-fit p-1 mt-1" color={"gray"} icon={HiClock}> {item?.postTime}</Badge>
                    <Badge className="w-fit p-1 mt-1" color={"success"} icon={HiClock}> {"Status: " + item?.Status}</Badge>
                </div>

            </div>

            <Badge icon={HiOutlineBriefcase} color={"gray"} className="w-fit p-1 mt-1"> Job/Project : {item?.task}</Badge>
            <Badge icon={HiCash} color={"gray"} className="w-fit p-1 mt-1"> Budget : R{parseFloat(item?.budget).toFixed(2)}</Badge>
            <Badge icon={HiCash} color={"gray"} className="w-fit p-1 mt-1"> Best Offer : R{item?.bestOffer} {item?.winnerId == "myId" && item?.Status == "Closed" ? "🤝🏽✅" : null}</Badge>
            <p className="text-clip text-wrap">{item?.description}</p>
            <Badge icon={HiCollection}  color={"light"} className="w-fit p-1 mt-1 mb-1"> N0. of Bids Received : {item?.AllcontactorKeys?.length}</Badge>
            <div className="flex flex-wrap gap-2">
                {
                    item?.otherOffers.length > 0 && item?.otherOffers?.map((ofrs, index) => (
                        <HoverProfile key={index} ofrs={ofrs}/>
                    ))
                }
                {item.Status == "Active" ? <>{item?.otherOffers.length>0 ? null: null} {item?.otherOffers.length<=0 ? <Tooltip className="self-center" content="You can delete a project only if best offer is still R0.00" style="dark"><HiOutlineTrash onClick={() => handlerDelete("Projects", item.ProjectId.trim())} className="mr-2 h-5 w-5 self-center hover:cursor-pointer" /></Tooltip>:null }</> : null}
            </div>
        </div>
    );
}

export default MyProjects;