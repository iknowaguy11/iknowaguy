import { Offline, Online } from "react-detect-offline";
import { Button, Label, TextInput, Card, Select, Alert } from 'flowbite-react';
import { NetworkMessage, NetworkTitle, customInputBoxTheme, customselectTheme, customsubmitTheme } from '../customTheme/appTheme';
import { FormEvent, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { useFetchProvinces, useFetchServices } from "../_hooks/useFetch";
import { doc, setDoc } from "firebase/firestore";
import { failureMessage, successMessage } from "../notifications/successError";
import { db } from "../DB/firebaseConnection";

const TempServices = () => {

    const { ServiceData } = useFetchServices();
    const [yourTown, setYourTown] = useState("");
    const [yourProv, setYourProv] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [filteredTowns, setFilteredTowns] = useState([]);
    const [provId, setProvId] = useState<string>("");

    const provinces = [
        {key:"0hTM5azuNfRAtNDJ8nsz",prov:"PLUMBING"},
        {key:"ytfqQsIeNQBI9B6V9Vdr",prov:"HANDYMAN"},
        {key:"fzUl0PjEsD7oQ1wGkQId",prov:"ELECTRICAL"},
        {key:"OZ72DScRQlINQ6PnSrYO",prov:"PAINTING"},
        {key:"5UbtSVMF5QICyyWBTOnK",prov:"CARPENTRY"},
        {key:"EeZsrPUvPBSwgTFhnUmO",prov:"GARDEN AND LANDSCAPING"},
        {key:"PYto2HrVI3YbU1HotXwr",prov:"BUILDING AND RENOVATIONS"},
        {key:"PEdGF76LXT0ppGXHdZLo",prov:"MORE CATEGORIES"}
    ];
    const getProvId = (prov: string): string => {
        const province = provinces.find(it => it.prov === prov);
        return province ? province.key : "none";
    }

    const filterProvArray = (prov:string) => {
        
        setYourProv(prov);
        const id = getProvId(prov);
        setProvId(id);
        let filtered :any=[];
        filtered = ServiceData?.filter((itm) => itm.ServiceType?.trim()?.toLowerCase() === prov?.trim()?.toLowerCase());
        setFilteredTowns(filtered.length > 0 ? filtered[0].actualTask : []);
    }
    const removeDuplicates = (array:any)=> {
        const seen = new Set();
        return array.filter((item:any) => {
            const duplicate = seen.has(item.category + item.task);
            seen.add(item.category + item.task);
            return !duplicate;
        });
    };
    const submitDetails = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (yourProv.trim()=="" || yourProv.trim()=="---") return;
        // Filter duplicates and submit
        setIsProcessing(true);
        const uniqueTowns = removeDuplicates([...filteredTowns,{task: yourTown.trim(), category: yourProv.trim() }]);
        setDoc(doc(db, 'Services', provId.trim()), {"actualTask":uniqueTowns}, { merge: true }).then(() => {
            
            successMessage("Updated Services");
            setIsProcessing(false);
            window?.location?.reload();
            //router.refresh();
        }).catch((error: any) => {
            setIsProcessing(false);
            failureMessage("Error: " + error?.message);
        });
    }
    
    return ( 
        <form onSubmit={submitDetails}>
                    <Card className='flex max-w-md gap-4 flex-grow mt-28 mb-10 ml-2'>
                        <h3 className="text-lg text-black">Add Service Group(Category) and sub-service</h3>

                        <p className="text-xs text-black">Service Group(Category) *</p>
                        {ServiceData?.length > 0 && (
                            <Select 
                                onChange={(e) => filterProvArray(e.target.value)} 
                                className="max-w-md" 
                                id="Service" 
                                theme={customselectTheme} 
                                color={"success"} 
                                required
                            >
                                <option>---</option>
                                {provinces.map(itm => (
                                    <option key={itm?.key}>{itm?.prov.trim()}</option>
                                ))}
                            </Select>
                        )}

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="sub-service *" />
                            </div>
                            <TextInput
                                value={yourTown}
                                onChange={(e) => setYourTown(e.target.value)}
                                theme={customInputBoxTheme} 
                                color={"focuscolor"} 
                                id="cmpName" 
                                type="text" 
                                placeholder="Provide One sub-service Found In That Category" 
                                required 
                                shadow 
                            />
                        </div>

                        <Card>
                            <p className="text-xs text-black">Services as captured on the Database (read-only)</p>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Town" value="Services*" />
                                </div>
                                <Select className="max-w-md" id="Service" theme={customselectTheme} color={"success"} required>
                                {ServiceData?.map((item) => (
                                    <optgroup label={item.ServiceType} key={item.Id}>
                                        {item?.actualTask?.map((ars, index) => (
                                            <option key={index}>{ars.task}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </Select>
                            </div>
                        </Card>

                        <Alert color="warning" icon={HiInformationCircle}>
                            <span className="font-medium">Info alert! </span>Details to be Captured
                            <p className="text-xs text-gray-500">{"Category: " + yourProv}</p>
                            <p className="text-xs text-gray-500">{"sub-service: " + yourTown}</p>
                        </Alert>
                        <Online>
                            <Button isProcessing={isProcessing} disabled={isProcessing} theme={customsubmitTheme} type="submit" color="appsuccess">
                                Submit
                            </Button>
                        </Online>
                        <Offline>
                            <Alert color="failure" icon={HiInformationCircle}>
                                <span className="font-medium">Info alert! </span>{NetworkTitle}
                                <p className="text-xs text-gray-500">{NetworkMessage}</p>
                            </Alert>
                        </Offline>
                    </Card>
                </form>
     );
}
 
export default TempServices;