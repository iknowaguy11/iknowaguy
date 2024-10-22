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
import { SendSmsToHomeOwner } from "../utils/Sendsms";

export const AcceptBidingModal = ({ openModal, setOpenModal, ProjectIdBid, projectBudget, otherOffers, bestOffer, bstOffrId,AllcontactorKeys,homeownerPhone,task,owner }: 
    { openModal: boolean, setOpenModal: Dispatch<SetStateAction<boolean>>, ProjectIdBid: string, projectBudget: string, otherOffers: IOtherOffers[], bestOffer: string, bstOffrId: string,AllcontactorKeys:string[],homeownerPhone:string,task:string,owner:string }) => {
    const { ukey } = useContext(AppContext);
    const { UserData} = useFetchUserAccount(ukey);
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
            LastName: UserData[0]?.membership == "contractor" ? "" : UserData[0]?.YourSurName,
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
                successMessage("Bid placed successful");
                //send sms to homeowner or project owner
                SendSmsToHomeOwner({task,owner,offerMade:myOffer,companyName: (UserData[0]?.membership == "contractor" ? UserData[0]?.companyName : UserData[0]?.YourName +" "+ UserData[0]?.YourSurName)},homeownerPhone);
                setMyOffer("0.00");
                setOpenModal(false);
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
        const bidAmount = parseFloat(myOffer);
        const budgetAmount = parseFloat(projectBudget);
    
        if (isNaN(bidAmount)) {
            setErrorMsg("Please enter a valid number.");
            error = true;
        } else if (bidAmount > budgetAmount && bidAmount!==budgetAmount) {
            setErrorMsg("Your offer cannot be bigger than the project budget of R"+budgetAmount);
            error = true;
        } else if (bidAmount <= 0) {
            setErrorMsg("Your offer cannot be less or equal to R0.00.");
            error = true;
        } else {
            setErrorMsg("");
        }
    
        return error;
    };
    
    return (
        <Modal show={openModal} size={"lg"} onClose={() => setOpenModal(false)}>
            <Modal.Header>Project Bidding</Modal.Header>
            <Modal.Body>
                <div className="space-y-6 p-6">
                    <p className="text-base leading-relaxed text-black dark:text-black font-semibold">
                    You are about to place a bid on this project. Your bid is 1 of only 5 that the homeowner will receive for the project. You are welcome to contact the homeowner to obtain all relevant information on the project so that you are able to provide them with an accurate quote. Please note that once you have submitted a price for the project, it will be communicated directly to the homeowner and that you will not be able to revise it.
                    </p>
                    {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                        to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                        soon as possible of high-risk data breaches that could personally affect them. <Link href="terms-and-conditions" className="text-appGreen hover:underline dark:text-appGreen">
                                    Read more terms and conditions
                                </Link>
                    </p> */}
                </div>
            </Modal.Body>
            <Modal.Footer className="flex flex-row justify-center items-center">
                <Button size={"sm"} isProcessing={isProcessing} disabled={isProcessing ? true : false} theme={customsubmitTheme} color="appsuccess" onClick={() => processBid()}>Submit Bid</Button>
                {/* <Button size={"sm"} color="gray" onClick={() => setOpenModal(false)}>
                    Decline
                </Button> */}
                <p>Bid Price (ZAR)</p>
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
