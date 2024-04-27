'use client';

import { Button, Checkbox, Label, TextInput, Badge, Card, Select, Avatar, FileInput, Alert } from 'flowbite-react';
import Link from 'next/link';
import { HiTrash } from 'react-icons/hi';
import { customCheckboxTheme, customInputBoxTheme, customselectTheme, customsubmitTheme } from '../customTheme/appTheme';
import { useFetchProvinces, useFetchServices } from "../_hooks/useFetch";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";
import { db, storage } from '../DB/firebaseConnection';
import { failureMessage, successMessage } from '../notifications/successError';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const ContractorRegistration = () => {
    const { ProvinceData, DataError, isLoading } = useFetchProvinces();
    const { ServiceData, serviceError, isLoadingservies } = useFetchServices();
    const [avatarImage, setAvatarImage] = useState<any>(null);
    const [Imageupload, setImageupload] = useState<File | null>(null);
    const [Certificate, setCertificate] = useState<File | null>(null);
    let image_url: string;
    let pdf_url: string;
    const router = useRouter();
    const [companyName, setcompanyName] = useState<string>("");
    const [companyEmail, setcompanyEmail] = useState<string>("");
    const [companypassword, setcompanypassword] = useState<string>("");
    const [Address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [tncs, setTnCs] = useState<boolean>(false);
    const [isprocessing, Setprocessing] = useState<boolean>(false);
    const [Visibility, setVisibility] = useState<boolean>(true);
    var imgfilename: string;
    var pdffilename: string;
    const [selectedServices, SetSelectedServices] = useState<string[]>([]);
    const AppendSelectedServices = (value: string) => {
        if (!selectedServices.includes(value) && selectedServices.length < 15) {
            const updatedSelectedServices = [...selectedServices, value];
            SetSelectedServices(updatedSelectedServices);
        }
    }
    const RemoveServices = (value: string) => {
        const updatedServices = selectedServices.filter((item) => item !== value);
        SetSelectedServices(updatedServices);
    }
    const fileInputRef = useRef<any>(null);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            // Check if the selected file is an image and is not gif
            if (!file.type.startsWith('image/') || file.type === 'image/gif') {
                alert('Please select a non-GIF image file.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event: any) => {
                // Set the image source to the selected file
                const imageDataUrl = event.target.result;
                setAvatarImage(imageDataUrl);
                setImageupload(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const OpenImagePicker = () => {
        // Open the file picker by clicking the hidden file input
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (ProvinceData && ProvinceData.length > 0) {
            const firstTown = ProvinceData[0]?.Towns[0]?.area;
            setAddress(firstTown);
        }
        if (ServiceData && ServiceData.length > 0) {
            const firstService = ServiceData[0]?.actualTask[0]?.task;
            AppendSelectedServices(firstService);
        }
    }, [ProvinceData, ServiceData]);

    const RegisterMember = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Setprocessing(true);
        await uploadProfileImage();
        await uploadCertificate();
        if (image_url !== null && image_url?.includes("http") && pdf_url !== null && pdf_url?.includes("http")) {
            if (IsError()) return;
            AddFirestoreData();
        } else {
            Setprocessing(false);
            failureMessage("Opps... we had an issue while uploading your media files. (Try again)");
        }
    }

    const IsError = () => {
        let found: Boolean;
        found = false;
        if (companyName == "" || companyEmail == "" ||
            phone == "" || Address == "" || image_url == "" || pdf_url == "" || imgfilename == "" || pdffilename == "") {
            found = true;
            Setprocessing(false);
            failureMessage("Please correct your form entry.");
        }
        if (selectedServices.length == 0) {
            found = true;
            Setprocessing(false);
            failureMessage("Please select at lest one or more service(s).");
        }
        if (!tncs) {
            found = true;
            Setprocessing(false);
            failureMessage("Please agree to the terms and conditions.");
        };
        return found;
    }

    const VisibileRegisterButton = () => {
        cleanUp();
        setVisibility(true);
        router.replace('login');
    }

    const cleanUp = () => {
        setcompanyName("");
        setcompanyEmail("");
        setPhone("");
        setAddress("");
        image_url = "";
        pdf_url = "";
        imgfilename = "";
        pdffilename = "",
            setTnCs(false);
    }

    const AddFirestoreData = async () => {
        try {
            const auth = getAuth();
            const profileData = {
                companyName,
                companyEmail: companyEmail.toLowerCase(),
                phone,
                Address,
                profileImage: image_url,
                certificate: pdf_url,
                imgfilename,
                pdffilename,
                isactive: "no",
                membership: "contractor",
                Services: selectedServices,
                tncs: tncs ? "agreed" : "not agreed but registered"
            }
            let resp = await createUserWithEmailAndPassword(auth, companyEmail.trim(), companypassword);
            if (resp?.user?.uid !== undefined && resp?.user?.uid !== null) {
                setDoc(doc(db, 'Users', resp?.user?.uid.trim()), profileData).then(() => {
                    Setprocessing(false);
                    successMessage("Sucessfully registered");
                    setVisibility(false);
                    setTimeout(VisibileRegisterButton, 4000);
                }).catch((err: any) => {
                    Setprocessing(false);
                    failureMessage(err?.message);
                });
            }
        } catch (error: any) {
            failureMessage(error?.message);
        }
    }

    const uploadProfileImage = async () => {
        if (Imageupload == null) return;
        imgfilename = Imageupload?.name + v4();
        var filepath = `ProfileImages/${imgfilename}`;
        const imageRef = ref(storage, filepath);
        try {
            await uploadBytes(imageRef, Imageupload);
            image_url = await getDownloadURL(ref(storage, filepath));
        } catch (err: any) {
            failureMessage(err?.message);
        }
    }

    const uploadCertificate = async () => {
        if (Certificate == null) return;
        pdffilename = Certificate?.name + v4();
        var filepath = `Certificates/${pdffilename}`;
        const pdfRef = ref(storage, filepath);
        try {
            await uploadBytes(pdfRef, Certificate);
            pdf_url = await getDownloadURL(ref(storage, filepath));
        } catch (err: any) {
            failureMessage(err?.message);
        }
    }

    return (
        <div className="w-full gap-4">
            <div className="h-full flex justify-center bg-opacity-75 bg-black">
                <Card className='flex max-w-lg flex-grow rounded top-0 mt-20 mb-3 ml-1 mr-1'>
                    <form onSubmit={(e) => RegisterMember(e)} className="flex max-w-lg flex-col gap-4 flex-grow">
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <Avatar size={"lg"} className='hover:cursor-pointer' onClick={OpenImagePicker} img={avatarImage == null ? "" : avatarImage}>
                                <div className="space-y-1 font-medium dark:text-white">
                                    <div>Company logo</div>
                                </div>
                            </Avatar>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Company Name *" />
                                <p className="text-xs text-gray-500">Note this field once submitted it can only be updated with the help of administrator.</p>
                            </div>
                            <TextInput
                                value={companyName}
                                onChange={(e) => setcompanyName(e.target.value)}
                                theme={customInputBoxTheme} color={"focuscolor"} id="cmpName" type="text" placeholder="The company's Name" required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Company Email *" />
                                <p className="text-xs text-gray-500">Note this field once submitted it can only be updated with the help of administrator.</p>
                            </div>
                            <TextInput
                                value={companyEmail}
                                onChange={(e) => setcompanyEmail(e.target.value)}
                                theme={customInputBoxTheme} color={"focuscolor"} id="cmpEmail" type="email" placeholder="The company's Email" required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Account Password *" />
                                <p className="text-xs text-gray-500">Your password: {companypassword}</p>
                            </div>
                            <TextInput
                                value={companypassword}
                                onChange={(e) => setcompanypassword(e.target.value)}
                                theme={customInputBoxTheme} color={"focuscolor"} id="cmpPass" type="password" placeholder="The company's password" required shadow />
                        </div>

                        <div>
                            <div>
                                <Label htmlFor="file-upload-helper-text" value="Company Certification *" />
                            </div>
                            <FileInput onChange={(event: ChangeEvent<HTMLInputElement>) => setCertificate(event?.target?.files ? event?.target?.files[0] : null)} accept=".pdf" id="file-upload-helper-text" helperText=".pdf*" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Compay's Address*" />
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
                                <Label htmlFor="Town" value="Company's Service(s) *" />
                                <span className="text-xs text-gray-600 font-light text-wrap"> Limit : 15</span>
                            </div>
                            <Select onChange={(e) => AppendSelectedServices(e.target.value)} className="max-w-md" id="Service" theme={customselectTheme} color={"success"} required>
                                {ServiceData?.map((item) => (
                                    <optgroup label={item.ServiceType} key={item.Id}>
                                        {item?.actualTask?.map((ars, index) => (
                                            <option key={index}>{ars.task}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </Select>
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
                                <Label htmlFor="Town" value="Company Phone No. *" />
                            </div>
                            <TextInput
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                theme={customInputBoxTheme} color={"focuscolor"} id="phones" type="tel" placeholder="The company's phone numbers" maxLength={10} required shadow />
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox id="agree" checked={tncs} onChange={() => setTnCs(tncs ? false : true)} theme={customCheckboxTheme} color="success" />
                            <Label htmlFor="agree" className="flex">
                                I agree with the&nbsp;
                                <Link href="terms-and-conditions" className="text-appGreen hover:underline dark:text-appGreen">
                                    terms and conditions
                                </Link>
                            </Label>
                        </div>
                        {Visibility ? <Button isProcessing={isprocessing} theme={customsubmitTheme} type="submit" color="appsuccess">Register</Button>
                            : <Alert color="warning" rounded>
                                <span className="font-medium">Wellcome!</span> Thank You For Registering With Us.
                            </Alert>}
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default ContractorRegistration;