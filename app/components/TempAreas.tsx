import { Offline, Online } from "react-detect-offline";
import { Button, Label, TextInput, Card, Select, Alert } from 'flowbite-react';
import { NetworkMessage, NetworkTitle, customInputBoxTheme, customselectTheme, customsubmitTheme } from '../customTheme/appTheme';
import { FormEvent, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { useFetchProvinces } from "../_hooks/useFetch";
import { doc, setDoc } from "firebase/firestore";
import { failureMessage, successMessage } from "../notifications/successError";
import { db } from "../DB/firebaseConnection";

const TempAreas = () => {

    const { ProvinceData } = useFetchProvinces();
    const [yourTown, setYourTown] = useState("");
    const [yourProv, setYourProv] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [filteredTowns, setFilteredTowns] = useState([]);
    const [provId, setProvId] = useState<string>("");

    const provinces = [
        {key:"kZIiIhFQnVpx08oRQZ5E",prov:"Limpopo"},
        {key:"8MLpVGuqbENHD9sWJhPO",prov:"Gauteng"},
        {key:"i3htEN3oMl48kfjtSlSL",prov:"Eastern Cape"},
        {key:"EsnQzJc7ptkzCfriloKX",prov:"Free State"},
        {key:"0duG9knOs6aH4Ki14oTz",prov:"KwaZulu Natal"},
        {key:"ZDCr6qx0A17mQAJD88H9",prov:"Mpumalanga"},
        {key:"CYUUJyy4DQKY3oXIMStd",prov:"North West"},
        {key:"1762z53MW0Sj2w5GMfgO",prov:"Northern Cape"},
        {key:"Vdbwfwz1l8xtD8jfaa9I",prov:"Western Cape"}
        
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
        filtered = ProvinceData?.filter((itm) => itm.province?.trim()?.toLowerCase() === prov?.trim()?.toLowerCase());
        setFilteredTowns(filtered.length > 0 ? filtered[0].Towns : []);
    }
    const removeDuplicates = (array:any)=> {
        const seen = new Set();
        return array.filter((item:any) => {
            const duplicate = seen.has(item.prov + item.area);
            seen.add(item.prov + item.area);
            return !duplicate;
        });
    };
    const submitDetails = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (yourProv.trim()=="" || yourProv.trim()=="---") return;
        // Filter duplicates and submit
        setIsProcessing(true);
        const uniqueTowns = removeDuplicates([...filteredTowns,{area: yourTown.trim(), prov: yourProv.trim() }]);
        setDoc(doc(db, 'Provinces', provId.trim()), {"Towns":uniqueTowns}, { merge: true }).then(() => {
            
            successMessage("Updated province");
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
                        <h3 className="text-lg text-black">Add Provinces and Towns</h3>

                        <p className="text-xs text-black">Select a Province *</p>
                        {ProvinceData?.length > 0 && (
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
                                <Label htmlFor="Town" value="Town In That Province *" />
                            </div>
                            <TextInput
                                value={yourTown}
                                onChange={(e) => setYourTown(e.target.value)}
                                theme={customInputBoxTheme} 
                                color={"focuscolor"} 
                                id="cmpName" 
                                type="text" 
                                placeholder="Provide One Town Found In That Province" 
                                required 
                                shadow 
                            />
                        </div>

                        <Card>
                            <p className="text-xs text-black">Addresses as captured on the Database (read-only)</p>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Town" value="Addresses*" />
                                </div>
                                <Select id="addrSelector" className="max-w-md" theme={customselectTheme} color={"success"} required>
                                    {ProvinceData?.map((item) => (
                                        <optgroup label={item.province} key={item.Id}>
                                            {item.Towns.map((ars, index) => (
                                                <option key={index}>{ars.area}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </Select>
                            </div>
                        </Card>

                        <Alert color="warning" icon={HiInformationCircle}>
                            <span className="font-medium">Info alert! </span>Details to be Captured
                            <p className="text-xs text-gray-500">{"Province: " + yourProv}</p>
                            <p className="text-xs text-gray-500">{"Town: " + yourTown}</p>
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
 
export default TempAreas;