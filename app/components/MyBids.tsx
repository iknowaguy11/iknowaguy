import { LongLorems, customTheme, customsubmitTheme } from "../customTheme/appTheme";
import { Badge, Button } from "flowbite-react";
import caponlycrop from '../../public/caponlycrop.png';
import { HiOutlineBriefcase, HiLocationMarker, HiPhone, HiMail, HiCash, HiClock } from 'react-icons/hi';
import Image from "next/image";
import { IProjects } from "../Interfaces/appInterfaces";

const MyBids = ({ item }: { item: IProjects }) => {
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
                    
                </div>

                <div className="items-center gap-1">
                    <Badge className="w-fit p-1" color={"gray"} icon={HiLocationMarker}> {item.addrs}</Badge>
                    <Badge className="w-fit p-1 mt-1" color={"gray"} icon={HiClock}> {item.postTime}</Badge>
                    <Badge className="w-fit p-1 mt-1" color={"success"} icon={HiClock}> {"Status: "+item.Status}</Badge>
                </div>

            </div>
            <Badge icon={HiOutlineBriefcase}  color={"gray"} className="w-fit p-1 mt-1"> Job/Project : {item.category}</Badge>
            <Badge icon={HiCash}  color={"gray"} className="w-fit p-1 mt-1"> Budget : R{(item.budget).toFixed(2)}</Badge>
            <Badge icon={HiCash}  color={"gray"} className="w-fit p-1 mt-1"> My Offer : R{item.myOffer} {item.winnerId=="myId" && item.Status=="Closed" ? "🤝🏽✅" : null}</Badge>
            <Badge icon={HiCash}  color={"gray"} className="w-fit p-1 mt-1"> Competing Offer : R{item.bestOffer} {item.winnerId=="competitorId" && item.Status=="Closed" ? "🤝🏽✅" : null}</Badge>
            <p className="text-clip text-wrap">{item.description}</p>
            {item.Status=="Active" && <Button className="place-self-end" theme={customsubmitTheme} type="submit" color="appsuccess">Bid</Button>}
        </div>
    );
}

export default MyBids;