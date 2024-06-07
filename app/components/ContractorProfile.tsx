import { Card, Label, Tooltip, TextInput, Select, Badge, Button } from "flowbite-react";
import { useFetchBidCredits, useFetchProvinces, useFetchServices, useFetchgetContractorProjects } from "../_hooks/useFetch";
import { useCallback, useEffect, useState } from "react";
import certificatePng from '../../public/certificate.png';
import iknown from '../../public/logoinknow.png';
import MyBids from "../components/MyBids";
import { customInputBoxTheme, customsubmitTheme, customselectTheme } from '../customTheme/appTheme';
import Image from "next/image";
import Link from "next/link";
import { HiTrash, HiShoppingCart } from 'react-icons/hi';
import { IUser } from "../Interfaces/appInterfaces";
import { useRouter } from "next/navigation";
import { updateProfile } from "../Controllers/UpdateProfile";

const ContractorProfile = ({ UserData }: { UserData: IUser[] }) => {
    const { ProvinceData, DataError, isLoading } = useFetchProvinces();
    const { ServiceData, serviceError, isLoadingservies } = useFetchServices();
    const { ContractorProjects, ProjectsError, isGettingProjects } = useFetchgetContractorProjects(UserData[0]?.Id);
    const { BidCredits } = useFetchBidCredits(UserData[0]?.Id);

    const [companyName, setcompanyName] = useState<string>(UserData[0]?.companyName);
    const [Address, setAddress] = useState<string>(UserData[0]?.Address);
    const [phone, setPhone] = useState<string>(UserData[0]?.phone);
    const router = useRouter();

    const [selectedServices, SetSelectedServices] = useState<string[]>([]);
    const [HistoryServices, setHistoryServices] = useState<string[]>([]);

    const RemoveOldServices = (value: string) => {
        const updatedServices = HistoryServices.filter((item) => item !== value);
        setHistoryServices(updatedServices);
    }
    const RemoveServices = (value: string) => {
        const updatedServices = selectedServices.filter((item) => item !== value);
        SetSelectedServices(updatedServices);
    }
    const AppendSelectedServices = useCallback((value: string) => {
        if (!selectedServices.includes(value) && selectedServices.length < 15) {
            const updatedSelectedServices = [...selectedServices, value];
            SetSelectedServices(updatedSelectedServices);
        }
    }, [selectedServices, SetSelectedServices]);

    useEffect(() => {

        if (ServiceData && ServiceData.length > 0) {
            const firstService = ServiceData[0]?.actualTask[0]?.task;
            AppendSelectedServices(firstService);
        }
    }, [ServiceData]);

    useEffect(() => {
        setHistoryServices(UserData[0]?.Services);
    }, [])
    

    return (
        <>
            <div className="h-full items-center justify-items-center">
                <Card className='flex max-w-lg flex-grow rounded mt-3'>
                    <form onSubmit={(e) => updateProfile(e,router, { Address, phone,Services:[...new Set([...selectedServices,...HistoryServices])]},UserData[0]?.Id)} className="flex max-w-lg flex-col gap-4 flex-grow">
                        <div className="mb-2 block">
                            {
                                UserData[0]?.profileImage &&
                                <Image
                                    src={UserData[0]?.profileImage}
                                    alt="Picture of the author"
                                    className="mr-3 w-auto sm:h-9"
                                    width={170}
                                    height={40}

                                />
                            }
                        </div>
                        <p className="text-xs text-gray-500">{UserData[0]?.companyEmail}</p>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="contemail" value="Company Name *" />
                            </div>
                            <Tooltip content="Admin Attention is Requires" style="dark">
                                <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="contemail" type="tel" readOnly value={companyName || UserData[0]?.companyName} disabled placeholder="Company Name" required shadow />

                            </Tooltip>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Project's Address *" />
                                <p className="text-xs text-gray-500">Please choose a valid address, project(s) commonly get rejected due to invalid address</p>
                            </div>
                            <TextInput theme={customInputBoxTheme} value={Address || UserData[0]?.Address} readOnly color={"focuscolor"} id="addr" disabled type="text" placeholder="The address where the work will be done" required shadow />
                        </div>
                        {
                            ProvinceData.length > 0 &&
                            <Select id="addrSecltor" onChange={(e) => setAddress(e.target.value)} className="max-w-md" theme={customselectTheme} color={"success"} required>
                                {ProvinceData?.map((item, index) => (
                                    <optgroup label={item.province} key={item.Id}>
                                        {item?.Towns?.map((ars, index) => (
                                            <option key={index}>{ars.area}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </Select>
                        }

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone" value={"Company Phone No as recorded : " + UserData[0]?.phone} />
                            </div>
                            <TextInput theme={customInputBoxTheme} onChange={(e) => setPhone(e.target.value)} value={phone} color={"focuscolor"} id="addr" type="tel" placeholder="The company's phone numbers" maxLength={10} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="certificate" value="Company Certificate" />
                            </div>
                            {
                                UserData[0]?.certificate && <Link href={UserData[0]?.certificate} target="_blank">
                                    <Image
                                        alt="certificate pdf"
                                        src={certificatePng}
                                        width={25}
                                        height={25}
                                    />
                                </Link>
                            }
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="specialty" value="Specialities" />
                            </div>
                            <div className="grid grid-cols-3  gap-1 pt-2">
                                {
                                    HistoryServices?.map((serv, index) => (
                                        <div key={index} className='flex flex-wrap gap-2'>
                                            <Badge onClick={() => RemoveOldServices(serv)} icon={HiTrash} className="bg-appGreen text-white hover:cursor-pointer" color="success">{serv}</Badge>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>

                        {ServiceData.length > 0 &&
                            <Select onChange={(e) => AppendSelectedServices(e.target.value)} className="max-w-md" id="Service" theme={customselectTheme} color={"success"} required>
                                {ServiceData?.map((item) => (
                                    <optgroup label={item.ServiceType} key={item.Id}>
                                        {item?.actualTask?.map((ars, index) => (
                                            <option key={index}>{ars.task}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </Select>

                        }
                        <div className="grid grid-cols-3  gap-1 pt-2">
                            {selectedServices?.map((itm, index) => (
                                <div key={index} className='flex flex-wrap gap-2'>
                                    <Badge onClick={() => RemoveServices(itm)} className="w-fit hover:cursor-pointer bg-appGreen text-white" icon={HiTrash} color="success">{itm}</Badge>
                                </div>
                            ))}
                        </div>
                        <Button theme={customsubmitTheme} type="submit" color="appsuccess">Update</Button>
                    </form>
                </Card>
            </div>

            {/*second col*/}

            <div className="h-full items-center justify-items-center">
                <Card className='flex max-w-lg flex-grow rounded mt-3'>
                    <form className="flex max-w-lg flex-col gap-4 flex-grow">
                        <div className="mb-2 block">
                            <Image
                                src={iknown}
                                alt="Picture of the author"
                                className="mr-3 w-auto sm:h-9"
                                width={176}
                                height={40}
                                priority
                            />
                        </div>
                        <p className="text-xs text-gray-500">support@ikag.co.za</p>
                        <Button
                            onClick={() => router.push('purchase')}
                            size={"sm"}
                            theme={customsubmitTheme}
                            color="appsuccess"
                            type="button"
                            className="inline-flex w-full justify-center rounded-lg text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-200"
                        >
                            <HiShoppingCart className="mr-2 h-5 w-5" /> Purchase Bid Credits
                        </Button>
                        <p className="text-md text-gray-800">Balance:{BidCredits[0]?.credit || 0} Bid(s)</p>
                        {
                            ContractorProjects?.map((item) => (
                                <MyBids item={item} key={item.ProjectId} MyKey={UserData[0]?.Id} />
                            ))
                        }
                    </form>
                </Card>
            </div>
        </>
    );
}

export default ContractorProfile;