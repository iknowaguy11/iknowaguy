import { Card,Label,TextInput, Button, Badge } from "flowbite-react";
import { useContext, useState } from "react";
import iknown from '../../public/logoinknow.png';
import { customInputBoxTheme, customsubmitTheme,customTheme } from '../customTheme/appTheme';
import Image from "next/image";
import { HiPlusCircle } from 'react-icons/hi';
import { IUser } from "../Interfaces/appInterfaces";
import MyProjects from "./MyProjects";
import { useRouter } from "next/navigation";
import { AppContext } from "../Context/appContext";
import { useFetchUserProjects } from "../_hooks/useFetch";

const HomeOwnerProfile = ({UserData}:{UserData:IUser[]}) => {
    const [LastName, setLastName] = useState<string>(UserData[0]?.LastName);
    const [FristName, setFristName] = useState<string>(UserData[0]?.firstName);
    const [phone, setPhone] = useState<string>(UserData[0]?.phone);
    const { UserProjects } = useFetchUserProjects(UserData[0]?.Id);
    const router=useRouter();
    return ( 
        <>
            <div className="h-full items-center justify-items-center">
                
                <Card className='flex max-w-lg flex-grow rounded mt-3'>
                <div className="mb-2 block">
                            <Image
                                src={iknown}
                                alt="Picture of the author"
                                className="mr-3 w-auto sm:h-9"
                                width={176}
                                height={40}
                                priority
                            />
                            <p className="text-xs text-gray-500">support@ikag.co.za</p>
                        </div>
                <div className="h-full items-center justify-items-center">
                <Card className='flex max-w-lg flex-grow rounded mt-3'>
                    <form className="flex max-w-lg flex-col gap-4 flex-grow">
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
                                <Label htmlFor="firstname" value="First Name *" />
                            </div>
                                <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="firstname" type="text" onChange={(e)=>setFristName(e.target.value)} value={FristName} placeholder="First Name" required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="lastname" value="Last Name *" />
                            </div>
                                <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="lastname" type="text" onChange={(e)=>setLastName(e.target.value)} value={LastName} placeholder="Last Name" required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone" value={"User Phone No."} />
                            </div>
                            <TextInput theme={customInputBoxTheme} onChange={(e)=>setPhone(e.target.value)} value={phone} color={"focuscolor"} id="phone" type="tel" placeholder="Phone Numbers" maxLength={10} required shadow />
                        </div>

                        <Button theme={customsubmitTheme} type="submit" color="appsuccess">Update</Button>
                    </form>
                </Card>
            </div>
                    <form className="flex max-w-lg flex-col gap-4 flex-grow">
                        
                        <h3 className="text-lg font-bold underline">My Projects</h3><Badge onClick={()=>router.push("postproject")} theme={customTheme} color={"success"} className="w-fit bg-appGreen hover:cursor-pointer" icon={HiPlusCircle}>Add a Project</Badge>
                        
                        {
                            UserProjects?.map((item) => (
                                <MyProjects item={item} key={item.ProjectId}/>
                            ))
                        }

                    </form>
                </Card>
            </div>
        </>
    );
}
 
export default HomeOwnerProfile;