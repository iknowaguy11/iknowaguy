import { customsubmitTheme } from "../customTheme/appTheme";
import { Badge, Button } from "flowbite-react";
import caponlycrop from '../../public/caponlycrop.png';
import { HiOutlineBriefcase,HiCollection, HiLocationMarker, HiCash, HiClock } from 'react-icons/hi';
import Image from "next/image";
import { IProjects } from "../Interfaces/appInterfaces";

const MyBids = ({ item,MyKey }: { item: IProjects,MyKey:string }) => {
    return (
        <div className="border w-full z-10 m-2 p-1 rounded-md shadow">
            <div className="gridCont grid">
                <div className="imageNownwer">
                    <Image
                        src={item?.Status=="Closed"? item.Profpic : caponlycrop}
                        alt="company logo"
                        height={40}
                        width={40}
                        className="aspect-square rounded border mt-2 mb-2 mr-2"
                    />
                </div>

                <div className="items-center gap-1">
                    <Badge className="w-fit p-1" color={"gray"} icon={HiLocationMarker}> {item?.addrs}</Badge>
                    <Badge className="w-fit p-1 mt-1" color={"gray"} icon={HiClock}> {item?.postTime}</Badge>
                    <Badge className="w-fit p-1 mt-1" color={"success"} icon={HiClock}> {"Status: "+item?.Status}</Badge>
                </div>

            </div>
            <Badge icon={HiOutlineBriefcase}  color={"gray"} className="w-fit p-1 mt-1"> Job/Project : {item?.task}</Badge>
            <Badge icon={HiCash}  color={"gray"} className="w-fit p-1 mt-1"> Budget : R{parseFloat(item?.budget).toFixed(2)}</Badge>
            <Badge icon={HiCash}  color={"gray"} className="w-fit p-1 mt-1"> Competing Offer : R{item?.bestOffer} {item?.winnerId=="competitorId" && item?.Status=="Closed" ? "🤝🏽✅" : null}</Badge>
            <p className="text-clip text-wrap">{item?.description}</p>
            <Badge icon={HiCollection}  color={"light"} className="w-fit p-1 mt-1"> N0. of Bids Received : {item?.AllcontactorKeys?.length}</Badge>
            {!item.AllcontactorKeys.includes(MyKey?.trim()) && <Button className="place-self-end" theme={customsubmitTheme} type="button" color="appsuccess">Bid</Button>}
        </div>
    );
}

export default MyBids;