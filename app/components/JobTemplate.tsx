import { customTheme, customsubmitTheme } from "../customTheme/appTheme";
import { Badge, Button } from "flowbite-react";
import caponlycrop from '../../public/caponlycrop.png';
import { HiOutlineBriefcase, HiCollection, HiLocationMarker, HiPhone, HiMail, HiCash, HiClock } from 'react-icons/hi';
import Image from "next/image";
import { IProjects } from "../Interfaces/appInterfaces";
import { useState } from "react";
import AcceptBidingModal from "./AcceptBidingModal";

const Jobtemplate = ({ item, membership, CurrUserKey }: { item: IProjects, membership: string, CurrUserKey: string }) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="border w-full z-10 ml-2 mr-2 mt-6 mb-3 p-1 rounded-md shadow">
            <div className="gridCont grid">
                <div className="imageNownwer">
                    {/* <Image
                        src={caponlycrop}
                        alt="company logo"
                        height={40}
                        width={40}
                        className="aspect-square rounded border mt-2 mb-2 mr-2"
                    /> */}
                    <div>
                        <h2 className="text-base font-semibold">{item?.owner?.replace(item?.owner?.substring(2, item?.owner?.length - 1), "***")}</h2>

                        <div className="flex gap-2">
                            <Badge theme={customTheme} color={"success"} className="w-fit" icon={HiPhone}>{item?.phone?.replace(item.phone.substring(2, item?.phone?.length - 1), "***")}</Badge>
                            <Badge theme={customTheme} color={"success"} className="w-fit" icon={HiMail}>{item?.email?.replace(item.email.substring(1, item?.email?.indexOf("@")), "*******")}</Badge>
                            <Badge theme={customTheme} color={"success"} className="w-fit" icon={HiCash}>R{parseFloat((item?.budget)).toFixed(2)}</Badge>
                        </div>

                    </div>
                </div>

                <div className="items-center gap-1">
                    <Badge className="w-fit p-1" color={"gray"} icon={HiLocationMarker}> {item?.addrs}</Badge>
                    <Badge className="w-fit p-1 mt-1" color={"gray"} icon={HiClock}> {item?.postTime}</Badge>
                </div>

            </div>
            <Badge icon={HiOutlineBriefcase} color={"gray"} className="w-fit p-1 mt-1"> Job/Project : {item?.task}</Badge>
            <Badge icon={HiCollection} color={"light"} className="w-fit p-1 mt-1"> N0. of Bids Received : {item?.AllcontactorKeys?.length}</Badge>
            <p className="text-clip text-wrap">{item?.description}</p>
            {
                membership == "contractor" &&
                <> {!item.AllcontactorKeys.includes(CurrUserKey.trim()) && item?.AllcontactorKeys?.length < 5 && <Button onClick={() => setOpenModal(!openModal)} className="place-self-end" theme={customsubmitTheme} type="submit" color="appsuccess">Bid</Button>}

                    <AcceptBidingModal openModal={openModal} setOpenModal={setOpenModal} ProjectIdBid={item?.ProjectId} projectBudget={item?.budget} otherOffers={item?.otherOffers} bestOffer={item?.bestOffer} bstOffrId={item?.bstOffrId} AllcontactorKeys={item?.AllcontactorKeys} homeownerPhone={item?.phone} task={item?.task} owner={item?.owner} />
                </>
            }
        </div>
    );
}
export default Jobtemplate;