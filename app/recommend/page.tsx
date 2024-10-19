
'use client';

import { Button, Checkbox, Label, TextInput, Card, Select, Alert, Badge } from 'flowbite-react';
import Link from 'next/link';
import { Offline, Online } from "react-detect-offline";
import { NetworkMessage, NetworkTitle, customCheckboxTheme, customInputBoxTheme, customselectTheme, customsubmitTheme } from '../customTheme/appTheme';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useFetchProvinces, useFetchServices } from '../_hooks/useFetch';
import { HiTrash, HiInformationCircle } from 'react-icons/hi';
import { db } from '../DB/firebaseConnection';
import { failureMessage, successMessage } from '../notifications/successError';
import { useRouter } from 'next/navigation';
import { addDoc, collection } from 'firebase/firestore';
import ReCAPTCHA from 'react-google-recaptcha';
import { SendMailToContractor, SendMailToIknowaguy } from '../utils/SendEmail';
import Select_API from 'react-select';
import { IActualTasks, IRecommendationDetails, ITowns } from '../Interfaces/appInterfaces';
import validator from 'validator';
import { Sendsmscustomer } from '../utils/Sendsms';
import moment from 'moment';

export default function Recommend() {
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const { ProvinceData, DataError, isLoading } = useFetchProvinces();
    const { ServiceData, serviceError, isLoadingservies } = useFetchServices();
    const [ContractorName, SetContractorName] = useState<string>("");
    const [ContractorPhone, SetContractorPhone] = useState<string>("");
    const [CompanyName, SetCompanyName] = useState<string>("");
    const [RecommederName, SetRecommederName] = useState<string>("");
    const [HowdoYouKnowThem, SetHowdoYouKnowThem] = useState<string>("");
    //const [Address, setAddress] = useState<string>("");
    const [ContractorEmail, SetContractorEmail] = useState<string>("");
    const [selectedServices, SetSelectedServices] = useState<string[]>([]);
    const [tncs, setTnCs] = useState<boolean>(false);
    const [isprocessing, Setprocessing] = useState<boolean>(false);
    const [Visibility, setVisibility] = useState<boolean>(true);

    //
    //const [SelectedSubcategory, SetSelectedSubcategory] = useState<string>("");
    //const [Selectedsubarea, SetSelectedsubarea] = useState<string>("");
    const [subcategory, SetSubcategory] = useState<IActualTasks[]>([]);
    const [subareas, SetSubareas] = useState<ITowns[]>([]);
    const [provCategory, setprovCategory] = useState<string | null | undefined>("Select Provice");
    const [ServiceCategory, setServiceCategory] = useState<string | null | undefined>("Select Service");
    const [selectedAddress, SetSelectedAddress] = useState<string[]>([]);//adress

    const Services = [
        { value: "PLUMBING", label: "PLUMBING" },
        { value: "HANDYMAN", label: "HANDYMAN" },
        { value: "ELECTRICAL", label: "ELECTRICAL" },
        { value: "PAINTING", label: "PAINTING" },
        { value: "CARPENTRY", label: "CARPENTRY" },
        { value: "GARDEN AND LANDSCAPING", label: "GARDEN AND LANDSCAPING" },
        { value: "BUILDING AND RENOVATIONS", label: "BUILDING AND RENOVATIONS" },
        { value: "MORE CATEGORIES", label: "MORE CATEGORIES" },
    ];

    const provinces = [
        { value: "Limpopo", label: "Limpopo" },
        { value: "Gauteng", label: "Gauteng" },
        { value: "Eastern Cape", label: "Eastern Cape" },
        { value: "Free State", label: "Free State" },
        { value: "KwaZulu Natal", label: "KwaZulu Natal" },
        { value: "Mpumalanga", label: "Mpumalanga" },
        { value: "North West", label: "North West" },
        { value: "Northern Cape", label: "Northern Cape" },
        { value: "Western Cape", label: "Western Cape" }

    ];

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
    //
    let responseMessage: string;
    const setResponseMessage = (msg: any) => responseMessage = msg;
    const router = useRouter();
    const AppendSelectedServices = useCallback((value: string) => {
        if (!selectedServices.includes(value) && selectedServices.length < 15) {
            const updatedSelectedServices = [...selectedServices, value];
            SetSelectedServices(updatedSelectedServices);
        }
    }, [selectedServices, SetSelectedServices]);
    const RemoveServices = (value: string) => {
        const updatedServices = selectedServices.filter((item) => item !== value);
        SetSelectedServices(updatedServices);
    }
     //address
     const AppendSelectedAddress = useCallback((value: string) => {
        if (!selectedAddress.includes(value) && selectedAddress.length < 15) {
            const updatedSelectedAddress = [...selectedAddress, value];
            SetSelectedAddress(updatedSelectedAddress);
        }
    }, [selectedAddress, SetSelectedAddress]);
    
    const RemoveAddress = (value: string) => {
        const updatedAddress = selectedAddress.filter((item) => item !== value);
        SetSelectedAddress(updatedAddress);
    }
    //
    const handleRecaptchaChange = (token: string | null) => {
        setRecaptchaToken(token);
    };
    
    const VisibileRegisterButton = () => {
        cleanUp();
        setVisibility(true);
        router.replace('/');
    }

    const cleanUp = () => {
        SetContractorName("");
        SetContractorPhone("");
        SetCompanyName("");
        SetRecommederName("");
        SetContractorEmail("");
        SetSelectedServices([]);
        SetSelectedAddress([]);
        setTnCs(false);
        Setprocessing(false);
        setVisibility(true);
    }

    const RecomentContractor = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Setprocessing(true);
        if (IsError()) return;
        AddFirestoreData();
    }
    const IsError = () => {
        let found: Boolean;
        found = false;
        if (!validator.isEmail(ContractorEmail?.trim()) || ContractorEmail == "" ||
            ContractorName == "" || !validator.isMobilePhone(ContractorPhone?.trim()) || ContractorPhone == "" || HowdoYouKnowThem == "" || HowdoYouKnowThem == "---"
        ) {
            found = true;
            Setprocessing(false);
            failureMessage("Please correct your form entry.");
        }
        if (selectedServices.length == 0) {
            found = true;
            Setprocessing(false);
            failureMessage("Please select at lest one or more service(s).");
        }
        if (selectedAddress.length == 0) {
            found = true;
            Setprocessing(false);
            failureMessage("Please select at lest one or more Address.");
        }
        if (!tncs) {
            found = true;
            Setprocessing(false);
            failureMessage("Please agree to the terms and conditions.");
        };
        return found;
    }

    const AddFirestoreData = async () => {
        try {
            const response = await fetch('https://payfastpaymentvalidator.onrender.com/verify-recaptcha/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: recaptchaToken }),
            });

            const data = await response.json();
            setResponseMessage(data.message);

            if (data.message == "reCAPTCHA verification successful" && data.success == true) {
                try {
                    const myCollection = collection(db, 'Recommended');
                    const myDocumentData = {
                        ContractorName,
                        ContractorPhone,
                        CompanyName: CompanyName.trim() !== "" ? CompanyName : "Skilled Individual",
                        HowdoYouKnowThem: (HowdoYouKnowThem.trim() == "" ? "Preferred not to say" : HowdoYouKnowThem),
                        RecommederName: (RecommederName.trim() == "" ? "Anonymous" : RecommederName),
                        Address: selectedAddress,
                        ContractorEmail: ContractorEmail.trim().toLocaleLowerCase(),
                        Services: selectedServices,
                        tncs: tncs ? "agreed" : "not agreed but registered",
                        dateOfReccomnd:moment().format('MMMM Do YYYY, h:mm a')
                    };
                    const newDocRef = await addDoc(myCollection, myDocumentData);
                    if (newDocRef?.id) {
                        Setprocessing(false);
                        successMessage("Sucessfully Recommended A Contractor");
                        
                        let message:IRecommendationDetails={
                            contName:ContractorName,
                            cmpName:CompanyName.trim() !== "" ? CompanyName : "Skilled Individual",
                            cmpPhone:ContractorPhone,
                            cmpAddr:selectedAddress,
                            cmpService:selectedServices,
                            recomName:RecommederName.trim() == "" ? "Anonymous" : RecommederName,
                            relation:HowdoYouKnowThem.trim() == "" ? "Preferred not to say" : HowdoYouKnowThem,
                            dateOfReccomnd:moment().format('MMMM Do YYYY, h:mm a')
                        }
                        const relationship=HowdoYouKnowThem.trim() == "" ? "Preferred not to say" : HowdoYouKnowThem;
                        const reviewEmail:string="Review Details on your email";
                        //const messg: string = `Dear ${ContractorName},\n\nYou have been recommended on I Know A Guy website.\n\nRecommendation Details\nContractor's Name : ${ContractorName}\nCompany Name: ${ContractorName}\nContractor's Phone No. : ${ContractorPhone}\nCompany's Address : ${selectedAddress}\nCompany's Service(s) : ${selectedServices}\nRecommending Person's Name : ${RecommederName.trim() == "" ? "Anonymous" : RecommederName}\nIndicated Relationship : ${relationship}. Click the link to register on the website : ${"https://inkowaguy.vercel.app/contractor-registration"}\n\nKind Regards,\n IKAG Admin`;
                        const messg: string = `Dear ${ContractorName},\n\nYou have been recommended on I Know A Guy website.\n\nRecommendation Details\nContractor's Name : ${ContractorName}\nCompany Name: ${ContractorName}\nContractor's Phone No. : ${ContractorPhone}\nCompany's Address : ${reviewEmail}\nCompany's Service(s) : ${reviewEmail}\nRecommending Person's Name : ${RecommederName.trim() == "" ? "Anonymous" : RecommederName}\nIndicated Relationship : ${relationship}. Click the link to register on the website : ${"https://inkowaguy.vercel.app/contractor-registration"}\n\nKind Regards,\n IKAG Admin`;

                        Sendsmscustomer(messg,ContractorPhone);
                        // SendMailToContractor(ContractorEmail, ContractorName,message, "I Know A Guy - Recommendation");
                        // SendMailToIknowaguy("submissions@iknowaguy.co.za", ContractorName,message, "I Know A Guy - Recommendation");
                        setVisibility(false);
                        setTimeout(VisibileRegisterButton, 4000);
                    }
                } catch (error: any) {
                    failureMessage(error?.message);
                    Setprocessing(false);
                }
            } else {
                Setprocessing(false);
                failureMessage(responseMessage);
            }
        } catch (error) {
            Setprocessing(false);
            console.error('Error submitting reCAPTCHA token:', error);
            setResponseMessage('Error submitting reCAPTCHA token');
            failureMessage("Error submitting reCAPTCHA token");
        }
    }
    return (
        <div className='divRecommend flex justify-center items-center'>
            <div className='grid lg:grid-cols-2 xl:lg:grid-cols-2 md:lg:grid-cols-1 sm:lg:grid-cols-1 justify-center'>
                <div className='pl-2 mt-32'>
                    <h2 className='text-4xl text-white'>Recommend A &quot;Guy&quot;</h2>
                    <p className='text-lg text-white text-wrap'>Do you know of a good, reliable tradesman or home care professional who does great work? Please tell us about him/her so that others can also benefit from the great service they provide.</p>
                </div>
                <Card className='flex max-w-md gap-4 flex-grow mt-28 mb-10 ml-2'>
                    <form onSubmit={(e) => RecomentContractor(e)} className="flex max-w-md flex-col gap-4 flex-grow">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="contrname" value="Contractor's Name *" />
                            </div>
                            <TextInput onChange={(e) => SetContractorName(e?.target?.value)} value={ContractorName} theme={customInputBoxTheme} color={"focuscolor"} id="contrname" type="text" placeholder="Name Of The Person You Are Recommending" required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="companyName" value="Their Company Name *" />
                            </div>
                            <TextInput onChange={(e) => SetCompanyName(e?.target?.value)} value={CompanyName} theme={customInputBoxTheme} color={"focuscolor"} id="companyName" type="text" placeholder="Contractor Company Name" required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="contractphone" value="Contractor's Phone No. *" />
                            </div>
                            <TextInput onChange={(e) => SetContractorPhone(e?.target?.value)} value={ContractorPhone} theme={customInputBoxTheme} color={"focuscolor"} id="contractphone" type="tel" placeholder="Contractor’s Phone Number" maxLength={10} required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="contemail" value="Their Email *" />
                            </div>
                            <TextInput onChange={(e) => SetContractorEmail(e?.target?.value)} value={ContractorEmail} theme={customInputBoxTheme} color={"focuscolor"} id="contemail" type="email" placeholder="Someone@mailprovider.co.za" required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Compay's Address *" />
                                <span className="text-xs text-gray-600 font-light text-wrap"> Limit : 15</span>
                            </div>
                            <Select_API placeholder={"Select Provice"} options={provinces} onChange={(e) => SetProvince(e?.value)} />

                            {
                                subareas.length > 0 &&

                                <Select
                                    className="max-w-md rounded mt-1 mb-1"
                                    onChange={(e) => e?.target.value !== "Select A Sub Area" ? AppendSelectedAddress(e?.target.value) : null}
                                >
                                    <option>Select A Sub Area</option>
                                    {
                                        subareas?.map((item, index) => (
                                            <option key={item?.area}>{item?.area}</option>
                                        ))
                                    }
                                </Select>
                            }
                            <div className="grid grid-cols-3  gap-1 pt-2">
                                {selectedAddress?.map((itm, index) => (
                                    <div key={index} className='flex flex-wrap gap-2'>
                                        <Badge onClick={() => RemoveAddress(itm)} className="w-fit hover:cursor-pointer bg-appGreen text-white" icon={HiTrash} color="success">{itm}</Badge>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Company's Service(s) *" />
                                <span className="text-xs text-gray-600 font-light text-wrap"> Limit : 15</span>
                            </div>
                            <Select_API placeholder={"Select Service"} options={Services} onChange={(e) => SetSelectedService(e?.value)} />

                            {subcategory.length > 0 &&

                                <Select
                                    className="max-w-md rounded mt-1 mb-1"
                                    onChange={(e) => e?.target.value !=="Select A Sub Service" ?  AppendSelectedServices(e?.target.value) : null}
                                >
                                    <option>Select A Sub Service</option>
                                    {
                                        subcategory?.map((item, index) => (
                                            <option key={item?.task}>{item?.task}</option>
                                        ))
                                    }
                                </Select>                              
                            }
                            <div className="grid grid-cols-3  gap-1 pt-2">
                                {selectedServices?.map((itm, index) => (
                                    <div key={index} className='flex flex-wrap gap-2'>
                                        <Badge onClick={() => RemoveServices(itm)} className="w-fit hover:cursor-pointer bg-appGreen text-white" icon={HiTrash} color="success">{itm}</Badge>
                                    </div>
                                ))}
                            </div>
                        </div>

                        


                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="shareUrName" value="Share your Name " />
                            </div>
                            <TextInput onChange={(e) => SetRecommederName(e?.target?.value)} value={RecommederName} theme={customInputBoxTheme} color={"focuscolor"} id="shareUrName" type="text" placeholder='Share your Name' shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="relation" value="How Do You Know Them *" />
                            </div>
                            <Select onChange={(e) => SetHowdoYouKnowThem(e?.target?.value)} className="max-w-md" id="Service" theme={customselectTheme} color={"success"} required>
                                <option >---</option>
                                <option >I&apos;ve hired them</option>
                                <option >Friend or Family Member</option>
                                <option >I&apos;m recommending myself/my company</option>
                                <option >Other</option>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="agree" checked={tncs} onChange={() => setTnCs(tncs ? false : true)} theme={customCheckboxTheme} color="success" />
                            <Label htmlFor="agree" className="flex">
                                I agree with the&nbsp;
                                <Link href="terms-and-conditions" target="_blank" className="text-appGreen hover:underline dark:text-appGreen">
                                    terms and conditions
                                </Link>
                            </Label>
                        </div>
                        {Visibility ? <Online><Button isProcessing={isprocessing} disabled={isprocessing} theme={customsubmitTheme} type="submit" color="appsuccess">Recommend</Button></Online>
                            : <Alert color="warning" rounded>
                                <span className="font-medium">Hurray!</span> Thank You For Recommeding a &quot;Guy&quot;.
                            </Alert>}
                        <Offline>
                            <Alert color="warning" icon={HiInformationCircle}>
                                <span className="font-medium">Info alert!</span>{NetworkTitle}
                                <p className="text-xs text-gray-500">{NetworkMessage}</p>
                            </Alert></Offline>
                    </form>
                    <ReCAPTCHA
                        className='self-center'
                        sitekey={(process?.env?.NEXT_PUBLIC_SITE_KEY)?.toString() || ""}
                        onChange={(e) => handleRecaptchaChange(e)}
                    />
                </Card>
            </div>
        </div>
    );
}
