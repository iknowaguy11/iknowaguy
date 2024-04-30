'use client';
import Image from "next/image";
import Landscape from '../../public/Landscape.jpg';
import { Button, Checkbox, Label, TextInput, Textarea, Card, Select, Alert } from 'flowbite-react';
import Link from 'next/link';
import { customCheckboxTheme, customInputBoxTheme, customselectTheme, customsubmitTheme } from '../customTheme/appTheme';
import { useFetchProvinces, useFetchServices, useFetchUserAccount } from "../_hooks/useFetch";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { failureMessage, successMessage } from "../notifications/successError";
import { addDoc, collection } from "firebase/firestore";
import { AppContext } from "../Context/appContext";
import TimeAgo from "react-timeago";
import moment from 'moment';
import { db } from "../DB/firebaseConnection";

const Postproject = () => {

    const { ProvinceData, DataError, isLoading } = useFetchProvinces();
    const { ServiceData, serviceError, isLoadingservies } = useFetchServices();
    const [Address, setAddress] = useState<string>("");
    const [selectedServices, SetSelectedServices] = useState<string>("");
    const [isprocessing, Setprocessing] = useState<boolean>(false);
    const [Visibility, setVisibility] = useState<boolean>(true);
    const [budget, SetBudget] = useState("50.00");
    const [Comment, SetComment] = useState("");
    const CuurentTimeDate = moment().format('MMMM Do YYYY, h:mm a');
    const [tncs, setTnCs] = useState<boolean>(false);
    const router = useRouter();

    if (window?.sessionStorage?.getItem("ukey") == undefined || window?.sessionStorage?.getItem("ukey") == null || window?.sessionStorage?.getItem("ukey") == "") {
        router.replace('login');
    } else {
        const { ukey } = useContext(AppContext);
        const { UserData, accountError, isGettingAccount } = useFetchUserAccount(ukey);
        const AddPost = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            Setprocessing(true);
            if (IsError()) return;
            AddFirestoreData();
        }

        const IsError = () => {
            let found: Boolean;
            found = false;
            try {

                if (selectedServices == "" || Address == "" ||
                    budget == "") {
                    found = true;
                    Setprocessing(false);
                    failureMessage("Please correct your form entry.");
                }
                if (parseInt(budget) < 50) {
                    found = true;
                    Setprocessing(false);
                    failureMessage("Please add an amount grater than R50.00");
                }
                if (selectedServices.length == 0) {
                    found = true;
                    Setprocessing(false);
                    failureMessage("Please select a service you want");
                }

            } catch (error) {
                found = true;
                Setprocessing(false);
                failureMessage("Please select a service you want");

            } finally {
                return found;
            }
        }

        const VisibileRegisterButton = () => {
            cleanUp();
            setVisibility(true);
        }

        const cleanUp = () => {
            setAddress("");
            SetSelectedServices("");
            SetBudget("");
            SetComment("");
            setTnCs(false);
            router.refresh();
        }

        const AddFirestoreData = async () => {
            try {
                const projectData = {
                    owner: UserData[0]?.firstName + " " + UserData[0]?.LastName,
                    ownerId: UserData[0]?.Id,
                    Profpic:UserData[0]?.profileImage,
                    task: selectedServices,
                    email: UserData[0]?.companyEmail,
                    phone: UserData[0]?.phone,
                    addrs: Address,
                    postTime: CuurentTimeDate,
                    description: Comment == "" ? "no comment" : Comment,
                    budget: budget,
                    otherOffers: [],
                    bestOffer: "00.00",
                    Status: "Active",
                    winnerId: "noId",
                    bstOffrId:"noId",
                    tncs: tncs ? "agreed" : "not agreed but posted a project"
                }
                var docRef;
                docRef = await addDoc(collection(db, "Projects"), projectData);
                if (docRef?.id) {
                    successMessage("Succesfully added Project");
                    Setprocessing(false);
                    setVisibility(false);
                    setTimeout(VisibileRegisterButton, 4000);
                }
            } catch (error: any) {
                failureMessage(error?.message);
                Setprocessing(false);
            }
        }
        useEffect(() => {
            if (ProvinceData && ProvinceData.length > 0) {
                const firstTown = ProvinceData[0]?.Towns[0]?.area;
                setAddress(firstTown);
            }
            if (ServiceData && ServiceData.length > 0) {
                const firstService = ServiceData[0]?.actualTask[0]?.task;
                SetSelectedServices(firstService);
            }
        }, [ProvinceData, ServiceData]);

        return (
            <div className="w-full gap-4 h-dvh">
                <div className="relative w-full h-full mt-16 mb-1">
                    <Image
                        src={Landscape}
                        alt="inspiration"
                        className="aspect-[3/4] h-full w-full" />

                    <div className="grid grid-cols-2 items-center justify-items-center absolute z-10 bottom-3 flex-grow bg-opacity-75 bg-black p-3 w-full">
                        <div className="p-2 gap-3 mt-4">
                            <h1 className="text-4xl font-bold tracking-tight text-white dark:text-white">HAVE SOMETHING NEEDED TO BE DONE?</h1>
                            <p className="text-sm tracking-tight text-white dark:text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                        </div>
                        <div className="h-full items-center justify-items-center">

                            <Card className='flex max-w-lg flex-grow rounded'>
                                <form onSubmit={(e) => AddPost(e)} className="flex max-w-lg flex-col gap-4 flex-grow">

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="addrSecltor" value="Project's Address*" />
                                        </div>

                                        <Select id="addrSecltor" onChange={(e) => setAddress(e.target.value)} className="max-w-md" theme={customselectTheme} color={"success"} required>
                                            {ProvinceData?.map((item, index) => (
                                                <optgroup label={item.province} key={item.Id}>
                                                    {item?.Towns?.map((ars, index) => (
                                                        <option key={index}>{ars.area}</option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </Select>

                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="job" value="Select Job Category *" />
                                        </div>
                                        <Select onChange={(e) => SetSelectedServices(e.target.value)} className="max-w-md" id="job" theme={customselectTheme} color={"success"} required>
                                            {ServiceData?.map((item) => (
                                                <optgroup label={item.ServiceType} key={item.Id}>
                                                    {item?.actualTask?.map((ars, index) => (
                                                        <option key={index}>{ars.task}</option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </Select>
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="budget" value="What is your budget *" />
                                            <span className="text-xs text-gray-600 font-light text-wrap">minimum amount : R50.00</span>
                                        </div>
                                        <TextInput theme={customInputBoxTheme} color={"focuscolor"} onChange={(e) => SetBudget(e.target.value)} value={budget} id="budget" type="number" placeholder="How much are you willing to spend" required shadow />
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="comment" value="Comment (optional)" />
                                        </div>
                                        <Textarea theme={customInputBoxTheme} color={"focuscolor"} onChange={(e) => SetComment(e.target.value)} value={Comment} id="comment" placeholder="Leave a message for your contractor(s)" rows={3} />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Checkbox checked={tncs} onChange={() => setTnCs(tncs ? false : true)} id="agree" theme={customCheckboxTheme} color="success" />
                                        <Label htmlFor="agree" className="flex">
                                            I agree with the&nbsp;
                                            <Link href="terms-and-conditions" className="text-appGreen hover:underline dark:text-appGreen">
                                                terms and conditions
                                            </Link>
                                        </Label>
                                    </div>
                                    {Visibility ? <Button isProcessing={isprocessing} disabled={isprocessing} theme={customsubmitTheme} type="submit" color="appsuccess">Post</Button>
                                        : <Alert color="warning" rounded>
                                            <span className="font-medium">Hurray!</span> You have succesfully added a project.
                                        </Alert>}</form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Postproject;