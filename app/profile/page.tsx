'use client';

import { useContext, useState } from "react";
import { AppContext } from "../Context/appContext";
import { useFetchProvinces, useFetchServices, useFetchUserAccount } from "../_hooks/useFetch";
import ContractorProfile from "../components/ContractorProfile";
import HomeOwnerProfile from "../components/HomeOwnerProfile";
import { useRouter } from "next/navigation";


const profile = () => {
    const { ukey } = useContext(AppContext);
    const { UserData, accountError, isGettingAccount } = useFetchUserAccount(ukey);
    const router=useRouter();
    if(window?.sessionStorage?.getItem("ukey")==undefined || window?.sessionStorage?.getItem("ukey")==null || window?.sessionStorage?.getItem("ukey")=="" ){
        router.replace('login');
    }
    return (
        <>
        {
            isGettingAccount ? <p>Loading profile data</p> :
        <div className={UserData[0]?.membership=="contractor" ? "w-full h-full mt-16 mb-8 grid lg:grid-cols-2 xl:lg:grid-cols-2 md:lg:grid-cols-2 sm:lg:grid-cols-1 items-center justify-items-center justify-center" : "w-full h-full mt-16 mb-8 flex items-center justify-items-center justify-center" }>
            {
                UserData[0]?.membership=="contractor" ? <ContractorProfile UserData={UserData}/> : UserData[0]?.membership=="homeowner"? <HomeOwnerProfile UserData={UserData}/>  : null     
            }
        </div>
        }
        </>     
    );
}

export default profile;