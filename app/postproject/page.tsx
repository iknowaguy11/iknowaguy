'use client';
import Image from "next/image";
import Landscape from '../../public/Landscape.jpg';
import { Button, Checkbox, Label, TextInput, Textarea, Card, Select, Alert } from 'flowbite-react';
import Link from 'next/link';
import { customCheckboxTheme, customInputBoxTheme, customsubmitTheme } from '../customTheme/appTheme';
import { useFetchProvinces, useFetchServices, useFetchUserAccount } from "../_hooks/useFetch";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { failureMessage, successMessage } from "../notifications/successError";
import { addDoc, collection } from "firebase/firestore";
import { AppContext } from "../Context/appContext";
import moment from 'moment';
import { db } from "../DB/firebaseConnection";
import { IActualTasks, ITowns } from "../Interfaces/appInterfaces";
import Select_API from 'react-select';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const Postproject = () => {
    const router = useRouter();
    useEffect(() => {
        if (window?.sessionStorage?.getItem("ukey") == undefined || window?.sessionStorage?.getItem("ukey") == null || window?.sessionStorage?.getItem("ukey") == "") {
            router.replace('login');
        }

    }, [router]);
    const { ProvinceData, DataError, isLoading } = useFetchProvinces();
    const { ServiceData, serviceError, isLoadingservies } = useFetchServices();
    const { ukey } = useContext(AppContext);
    const { UserData, accountError, isGettingAccount } = useFetchUserAccount(ukey);
    //const [Address, setAddress] = useState<string>("");

    const [isprocessing, Setprocessing] = useState<boolean>(false);
    const [Visibility, setVisibility] = useState<boolean>(true);
    const [budget, SetBudget] = useState("50.00");
    const [Comment, SetComment] = useState("");
    const [tncs, setTnCs] = useState<boolean>(false);
    if (UserData[0]?.Id && UserData[0]?.membership.trim().toLocaleLowerCase() !== "homeowner") {
        router.replace('/');
    }
    //
    const [Selectedsubarea, SetSelectedsubarea] = useState<string>("");
    const [subareas, SetSubareas] = useState<ITowns[]>([]);
    const [subcategory, SetSubcategory] = useState<IActualTasks[]>([]);
    const [selectedServices, SetSelectedServices] = useState<string>("");
    const [provCategory, setprovCategory] = useState<string | null | undefined>("Select Provice");
    const [ServiceCategory, setServiceCategory] = useState<string | null | undefined>("Select Service");

    type prv={
        value:string,
        label:string
    }
    type srv={
        value:string,
        label:string
    }
    const [provinces,Set_Provinces]=useState<prv[]>([]);
    const [Services,Set_Services]=useState<prv[]>([]);
    useEffect(()=>{
        let provinces_ = ProvinceData?.map((province) => ({
            value: province.province,
            label: province.province,
        }));
        let Services_ = ServiceData?.map((province) => ({
            value: province.ServiceType,
            label: province.ServiceType,
        }));
        Set_Services(Services_);
        Set_Provinces(provinces_);
    },[ProvinceData || Services]);

    const SetProvince = (category: string | null | undefined) => {
        setprovCategory(category);
        if (category !== "" && category !== "Select Provice") {
            ProvinceData?.forEach((item) => {
                if (item?.province == category?.replace("🛠️", '').trim()) {
                    SetSubareas(item?.Towns);
                }
            })
        } else {
            SetSubareas([]);
        }
    }

    const SetSelectedService = (category: string | null | undefined) => {
        setServiceCategory(category);
        if (category !== "" && category !== "Select Service") {
            ServiceData?.forEach((item) => {
                if (item?.ServiceType == category?.replace("🛠️", '').trim()) {
                    SetSubcategory(item?.actualTask);
                }
            })
        } else {
            SetSubcategory([]);
        }
    }

    //
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

            if (selectedServices == "" || Selectedsubarea == "" ||
                Selectedsubarea == "Select A Sub Area" || selectedServices == "Select A Sub Area" ||
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
        SetSelectedsubarea("");
        SetSelectedServices("");
        SetBudget("");
        SetComment("");
        setTnCs(false);
        router.refresh();
    }

    const AddFirestoreData = async () => {
        try {
            const projectData = {
                owner: UserData[0]?.YourName + " " + UserData[0]?.YourSurName,
                ownerId: UserData[0]?.Id,
                Profpic: UserData[0]?.profileImage,
                task: selectedServices,
                email: UserData[0]?.companyEmail,
                phone: UserData[0]?.phone,
                addrs: Selectedsubarea,
                postTime: moment().format('MMMM Do YYYY, h:mm a'),
                AllcontactorKeys: [],
                description: Comment == "" ? "no comment" : Comment,
                budget: budget,
                otherOffers: [],
                bestOffer: "00.00",
                Status: "Active",
                winnerId: "noId",
                bstOffrId: "noId",
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
    // useEffect(() => {
    //     if (ProvinceData && ProvinceData.length > 0) {
    //         const firstTown = ProvinceData[0]?.Towns[0]?.area;
    //         setAddress(firstTown);
    //     }
    //     if (ServiceData && ServiceData.length > 0) {
    //         const firstService = ServiceData[0]?.actualTask[0]?.task;
    //         SetSelectedServices(firstService);
    //     }
    // }, [ProvinceData, ServiceData]);

   return (
    <div className="w-full h-dvh bg-gray-100">
        <div className="relative w-full h-full mt-32 mb-1">
            <Image
                src={Landscape}
                alt="inspiration"
                className="aspect-[3/4] h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col lg:flex-row items-center justify-between p-4 gap-6">
                <div className="text-center lg:text-left w-full lg:w-1/2 p-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
                        NEEDING SOMETHING DONE IN YOUR HOME?
                    </h1>
                    <p className="text-sm sm:text-base text-gray-300 mb-4">
                        Describe what you need done in as much detail as possible and receive up to 5 quotes from trusted contractors in your area to meet your specific needs.
                    </p>
                    <Alert color="warning" className="mt-2" rounded>
                        <span className="font-medium">
                            <HiOutlineExclamationCircle />
                        </span>
                        &nbsp; By submitting a project, you agree that service providers who wish to bid on your project may contact you to obtain additional information.
                    </Alert>
                </div>

                <div className="w-full lg:w-1/2 flex justify-center">
                    <Card className="w-full max-w-lg rounded shadow-lg mb-10 ">
                        <form onSubmit={(e) => AddPost(e)} className="flex flex-col gap-4 p-4">
                            <div>
                                <Label htmlFor="addrSelector" value="Project's Address*" />
                                <Select_API
                                    instanceId={provCategory?.toString()}
                                    placeholder="Select Province"
                                    options={provinces}
                                    onChange={(e) => SetProvince(e?.value)}
                                />

                                {subareas.length > 0 && (
                                    <Select
                                        className="max-w-md rounded mt-1 mb-1"
                                        onChange={(e) => SetSelectedsubarea(e?.target.value)}
                                    >
                                        <option>Select A Sub Area</option>
                                        {subareas.map((item) => (
                                            <option key={item?.area}>{item?.area}</option>
                                        ))}
                                    </Select>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="job" value="Select Job Category *" />
                                <Select_API
                                    instanceId={ServiceCategory?.toString()}
                                    placeholder="Select Service"
                                    options={Services}
                                    onChange={(e) => SetSelectedService(e?.value)}
                                />

                                {subcategory.length > 0 && (
                                    <Select
                                        className="max-w-md rounded mt-1 mb-1"
                                        onChange={(e) => SetSelectedServices(e?.target.value)}
                                    >
                                        <option>Select A Sub Service</option>
                                        {subcategory.map((item) => (
                                            <option key={item?.task}>{item?.task}</option>
                                        ))}
                                    </Select>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="budget" value="What is your budget *" />
                                <span className="text-xs text-gray-600 font-light">
                                    Minimum amount: R50.00
                                </span>
                                <TextInput
                                    theme={customInputBoxTheme}
                                    color="focuscolor"
                                    onChange={(e) => SetBudget(e.target.value)}
                                    value={budget}
                                    id="budget"
                                    type="number"
                                    placeholder="How much are you willing to spend"
                                    required
                                    shadow
                                />
                            </div>

                            <div>
                                <Label htmlFor="comment" value="Comment (optional)" />
                                <Textarea
                                    theme={customInputBoxTheme}
                                    color="focuscolor"
                                    onChange={(e) => SetComment(e.target.value)}
                                    value={Comment}
                                    id="comment"
                                    placeholder="Leave a message for your contractor(s)"
                                    rows={3}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={tncs}
                                    onChange={() => setTnCs(!tncs)}
                                    id="agree"
                                    theme={customCheckboxTheme}
                                    color="success"
                                />
                                <Label htmlFor="agree" className="flex">
                                    I agree with the&nbsp;
                                    <Link
                                        href="terms-and-conditions"
                                        target="_blank"
                                        className="text-appGreen hover:underline"
                                    >
                                        terms and conditions
                                    </Link>
                                </Label>
                            </div>

                            {Visibility ? (
                                <Button
                                    isProcessing={isprocessing}
                                    disabled={isprocessing}
                                    theme={customsubmitTheme}
                                    type="submit"
                                    color="appsuccess"
                                >
                                    Post
                                </Button>
                            ) : (
                                <Alert color="warning" rounded>
                                    <span className="font-medium">Hurray!</span> You have successfully added a project.
                                </Alert>
                            )}
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    </div>
);

}

export default Postproject;