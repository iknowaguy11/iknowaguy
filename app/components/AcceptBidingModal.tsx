"use client";

import { Button, Modal, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { customInputBoxTheme, customsubmitTheme } from "../customTheme/appTheme";
import { AppContext } from "../Context/appContext";
import { useFetchUserAccount } from "../_hooks/useFetch";
import { failureMessage, successMessage } from "../notifications/successError";
import { v4 } from "uuid";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../DB/firebaseConnection";
import { IOtherOffers } from "../Interfaces/appInterfaces";
import Link from "next/link";
export const AcceptBidingModal = ({ openModal, setOpenModal, ProjectIdBid, projectBudget, otherOffers, bestOffer, bstOffrId,AllcontactorKeys }: { openModal: boolean, setOpenModal: Dispatch<SetStateAction<boolean>>, ProjectIdBid: string, projectBudget: string, otherOffers: IOtherOffers[], bestOffer: string, bstOffrId: string,AllcontactorKeys:string[] }) => {
    const { ukey } = useContext(AppContext);
    const { UserData, accountError, isGettingAccount } = useFetchUserAccount(ukey);
    const [myOffer, setMyOffer] = useState<string>("0.00");
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    let Creditbalance:number;
    Creditbalance=0;
    let CreditType:string;
    CreditType="";//free or paid
    const processBid = () => {
        if (!isError()) {
            BalanceCheck();
        }
    };

    const BalanceCheck = async () => {
        setIsProcessing(true);
        const docRef = doc(db, "BidCredits", UserData[0]?.Id);
        const docSnap = await getDoc(docRef);

        const projRef = doc(db, "Projects", ProjectIdBid);
        const projSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            if (parseInt(docSnap.data()?.credit) > 0) {
                //check if they had already place a bid here on that project
                Creditbalance=parseInt(docSnap.data()?.credit);
                CreditType=docSnap.data()?.CreditType;
                if(projSnap.exists()){
                    if(projSnap.data()?.AllcontactorKeys?.includes(UserData[0]?.Id)){
                        setIsProcessing(false);
                        successMessage("Your have aready places a bid on this project. You can only Bid once per project");
                    }else{
                        //allow placing bid
                        appendBid();
                        //successMessage("Your have aready places a bid on this project. You can only Bid once per project");
                    }
                }else{
                    setIsProcessing(false);
                    failureMessage("Sorry, Project may have been removed, attempt to refresh page and try again.");
                }
            } else {
                setIsProcessing(false);
                failureMessage("You have run out of bidding funds, Please purchase funds");
            }
        } else {
            setIsProcessing(false);
            failureMessage("Sorry, We could not verify your biding wallet. Please contact Administrator or try again");
        }
    }

    const appendBid = () => {
        let MyBidOffer = {
            Id: v4(),
            companyName: UserData[0]?.companyName,
            companyEmail: UserData[0]?.companyEmail,
            firstName: UserData[0]?.YourName,
            LastName: UserData[0]?.membership == "contractor" ? "" : UserData[0]?.LastName,
            phone: UserData[0]?.phone,
            profileImage: UserData[0]?.profileImage,
            Address: UserData[0]?.Address,
            membership: UserData[0]?.membership,
            CompanyKey: UserData[0]?.Id,
            OfferMade: parseFloat(myOffer).toFixed(2).toString(),
        };
        try {
            setIsProcessing(true);
            let AddMyOffer: IOtherOffers[] = [];
            let tempAllKeys:string[]=[];
            if (otherOffers.length > 0) {
                AddMyOffer = [...otherOffers, MyBidOffer];
                tempAllKeys=[...AllcontactorKeys,UserData[0]?.Id];
            } else {
                AddMyOffer = [MyBidOffer];
                tempAllKeys=[UserData[0]?.Id];
            }
            const update = {
                otherOffers: AddMyOffer,
                bstOffrId: parseFloat(myOffer) < parseFloat(bestOffer) ? UserData[0]?.Id : parseFloat(bestOffer).toFixed(2).toString() == "0.00" ? UserData[0]?.Id : bstOffrId,
                bestOffer: parseFloat(myOffer) < parseFloat(bestOffer) ? parseFloat(myOffer).toFixed(2).toString() : parseFloat(bestOffer).toFixed(2).toString() == "0.00" ? parseFloat(myOffer).toFixed(2).toString() : bestOffer,
                AllcontactorKeys:tempAllKeys,
            };
            let updateBalance={};
            if(CreditType=="free"){
                updateBalance={
                    credit:Creditbalance-1,
                    CreditType:"paid"
                }
            }else if(CreditType=="paid"){
                updateBalance={
                    credit:Creditbalance-1,
                }
            }
            
            setDoc(doc(db, 'Projects', ProjectIdBid.trim()), update, { merge: true }).then(async() => {
                setIsProcessing(false);
                setOpenModal(false);
                setMyOffer("0.00");
                successMessage("Bid placed successful");
                await setDoc(doc(db, 'BidCredits', UserData[0]?.Id.trim()), updateBalance, { merge: true });
            });
        } catch (error) {
            console.log(error);
            setIsProcessing(false);
            failureMessage(String(error));
        }
    };

    const isError = () => {
        let error = false;
        try {
            if (parseFloat(myOffer) > parseFloat(projectBudget)) {
                setErrorMsg("Your offer cannot be bigger than the project budget.");
                error = true;
            } if (parseFloat(myOffer) <= parseFloat("0.00")) {
                setErrorMsg("Your offer cannot be less or equal R0.00.");
                error = true;
            }
            else {
                setErrorMsg("");
            }
        } catch (error: any) {
            failureMessage(String(error.message));
            error = true;
        }
        return error;
    };

    return (
        <Modal show={openModal} size={"lg"} onClose={() => setOpenModal(false)}>
            <Modal.Header>Accept Terms of Biding</Modal.Header>
            <Modal.Body>
                <div className="space-y-6 p-6">
                    <p className="text-base leading-relaxed text-black dark:text-black font-semibold">
                        You are about to place a bid on this project. If your happy with the terms below your may type your offer and click &quot;accept&quot;
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                        to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                        soon as possible of high-risk data breaches that could personally affect them. <Link href="terms-and-conditions" className="text-appGreen hover:underline dark:text-appGreen">
                                    Read more terms and conditions
                                </Link>
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer className="flex flex-row justify-center items-center">
                <Button size={"sm"} isProcessing={isProcessing} disabled={isProcessing ? true : false} theme={customsubmitTheme} color="appsuccess" onClick={() => processBid()}>Accept</Button>
                <Button size={"sm"} color="gray" onClick={() => setOpenModal(false)}>
                    Decline
                </Button>
                <div>
                    <div className="mb-2 block">
                        
                        <p className={errorMsg !== "" ? "text-xs text-red-500" : "text-xs text-gray-500"}>{errorMsg}</p>
                    </div>
                    <TextInput
                        value={myOffer}
                        onChange={(e) => setMyOffer(e.target.value)}
                        theme={customInputBoxTheme} color={"focuscolor"} id="offer" type="number" placeholder="Bidding Offer " required shadow />
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default AcceptBidingModal;
