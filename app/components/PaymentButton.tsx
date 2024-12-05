import React, { useContext, useEffect, useState } from 'react';
import { generateSignature } from '../payment_signature/signature';
import { Alert, Button } from 'flowbite-react';
import { HiShoppingCart } from 'react-icons/hi';
import { customsubmitTheme } from '../customTheme/appTheme';
import { v4 } from "uuid";
import { useFetchUserAccount } from '../_hooks/useFetch';
import { AppContext } from '../Context/appContext';

const PaymentButton = ({ price, Bidpackage }: { price: string, Bidpackage: string }) => {
  const { ukey } = useContext(AppContext);
  const { UserData } = useFetchUserAccount(ukey);
  const [IsLoggedIn,SetIsLoggedIn]=useState(false);
  const testingMode = true;
  const myData: any = {
    "merchant_id": testingMode ? process?.env?.NEXT_PUBLIC_MERCHANT_ID : process?.env?.NEXT_PUBLIC_PMERCHANT_ID,
    "merchant_key":testingMode ? process?.env?.NEXT_PUBLIC_MERCHANT_KEY : process?.env?.NEXT_PUBLIC_PMERCHANT_KEY,
    "return_url": "https://inkowaguy.vercel.app/success",
    "cancel_url": "https://inkowaguy.vercel.app/cancel",
    "notify_url": "https://payfastpaymentvalidator.onrender.com/notify",
    "name_first":  UserData[0]?.YourName?.trim(),
    "name_last": UserData[0]?.YourSurName?.trim(),
    "email_address": UserData[0]?.companyEmail?.trim(),
    "m_payment_id": v4()?.trim(),
    "amount": price.trim(),
    "item_name": "Bidding Package:"+Bidpackage?.trim(),
    "custom_str1": ukey?.trim(),
    "custom_str2": Bidpackage?.trim(),
    "custom_str3": UserData[0]?.phone?.trim()
  };

  useEffect(()=>{
    if(ukey!=="" && ukey!==null){
      SetIsLoggedIn(true);
      const myPassphrase = testingMode ? process?.env?.NEXT_PUBLIC_PASSPHRASE : process?.env?.NEXT_PUBLIC_PPASSPHRASE;
      myData["signature"] = generateSignature(myData, myPassphrase);
    }else{
      SetIsLoggedIn(false);
    } 
  },[ukey]);
  
  const pfHost = testingMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';

  return (
    <form action={`https://${pfHost}/eng/process`} method="post">
      {IsLoggedIn && UserData[0]?.membership?.trim()?.toLocaleLowerCase()!=="homeowner" ?
       Object.keys(myData).map((key) => (
        <input key={key} name={key} type="hidden" value={myData[key]?.trim()} />
      )) :<Alert color="warning" rounded>
      <span className="font-medium">Info alert!</span> Only registered contractors are able to buy credits.
    </Alert>}
      {
        IsLoggedIn && UserData[0]?.membership?.trim()?.toLocaleLowerCase()!=="homeowner" ?
        <Button
        theme={customsubmitTheme}
        color="appsuccess"
        type="submit"
        className="inline-flex w-full justify-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-200"
      >
        <HiShoppingCart className="mr-2 h-5 w-5" /> Choose plan
      </Button> : null
      }
    </form>
  );
};

export default PaymentButton;
