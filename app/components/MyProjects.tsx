import { customsubmitTheme } from "../customTheme/appTheme";
import { Avatar, Badge, Button, Tooltip } from "flowbite-react";
import caponlycrop from '../../public/caponlycrop.png';
import t1 from '../../public/t1.jpg';
import t2 from '../../public/t2.png';
import t3 from '../../public/t3.png';
import t4 from '../../public/t4.png';
import t5 from '../../public/t5.png';
import { HiOutlineBriefcase, HiLocationMarker, HiCash, HiClock,HiOutlineTrash,HiOutlineCheckCircle } from 'react-icons/hi';
import Image from "next/image";
import { IProjects } from "../Interfaces/appInterfaces";


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
    <div className="flex flex-wrap gap-2">
      
        <Avatar img="https://firebasestorage.googleapis.com/v0/b/inknowaguy.appspot.com/o/t1.jpg?alt=media&token=5ab11aa9-b5d8-4122-8592-2e221dd6cf0b" rounded stacked/>
        <Avatar img="https://firebasestorage.googleapis.com/v0/b/inknowaguy.appspot.com/o/t2.png?alt=media&token=d1d99cb3-c391-4511-b10e-cba8cca9ac69" rounded stacked/>
        <Avatar img="https://firebasestorage.googleapis.com/v0/b/inknowaguy.appspot.com/o/t3.png?alt=media&token=fffca388-a384-47af-a576-9f9ac379193e" rounded stacked/>
        <Avatar img="https://firebasestorage.googleapis.com/v0/b/inknowaguy.appspot.com/o/t4.png?alt=media&token=eee604b0-d325-450c-a9fb-6e4c1b381cc7" rounded stacked />
        <Avatar img="https://firebasestorage.googleapis.com/v0/b/inknowaguy.appspot.com/o/t5.png?alt=media&token=423e77f9-17ad-4088-b1a4-0cab9e4ab354" rounded stacked />
      
      {item.Status=="Active" ? <><Button size={"md"} className="place-self-end" theme={customsubmitTheme} type="button" color="appsuccess"><HiOutlineCheckCircle className="mr-2 h-5 w-5" />Accept Offer</Button><Tooltip className="self-center" content="You can delete a project only if best offer is still R0.00" style="dark"><HiOutlineTrash className="mr-2 h-5 w-5 self-center hover:cursor-pointer" /></Tooltip></>  : null}
    </div>
        </div>
    );
}

export default MyProjects;