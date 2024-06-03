import React, { useContext } from 'react';
import { generateSignature } from '../payment_signature/signature';
import { Button } from 'flowbite-react';
import { HiShoppingCart } from 'react-icons/hi';
import { customsubmitTheme } from '../customTheme/appTheme';
import { v4 } from "uuid";
import { useFetchUserAccount } from '../_hooks/useFetch';
import { AppContext } from '../Context/appContext';

const PaymentButton = ({ price, Bidpackage }: { price: string, Bidpackage: string }) => {
  const { ukey } = useContext(AppContext);
    const { UserData } = useFetchUserAccount(ukey);

  const IsLoggedIn=()=>{
    let found:boolean=false;
    if(ukey=="" || ukey==null ){
      found=false;
    }else{
      found=true;
    }
    return found;
  }
  const myData: any = {
    "merchant_id": "10000100",
    "merchant_key": "46f0cd694581a",
    "return_url": "https://inkowaguy.vercel.app/success",
    "cancel_url": "https://inkowaguy.vercel.app/cancel",
    "notify_url": "https://payfastpaymentvalidator.onrender.com/notify",
    "name_first":  UserData[0]?.firstName?.trim(),
    "name_last": UserData[0]?.LastName?.trim(),
    "email_address": UserData[0]?.companyEmail?.trim(),
    "m_payment_id": v4()?.trim(),
    "amount": price.trim(),
    "item_name": "Biding Package:Bronze",
    "custom_str1": ukey?.trim(),
    "custom_str2": Bidpackage.trim(),
    "custom_str3": UserData[0]?.phone?.trim()
  };

  const myPassphrase = "jt7NOE43FZPn";
  myData["signature"] = generateSignature(myData, myPassphrase);
  const testingMode = true;
  const pfHost = testingMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';

  return (
    <form action={`https://${pfHost}/eng/process`} method="post">
      {Object.keys(myData).map((key) => (
        <input key={key} name={key} type="hidden" value={myData[key].trim()} />
      ))}
      {
        IsLoggedIn() ?
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
