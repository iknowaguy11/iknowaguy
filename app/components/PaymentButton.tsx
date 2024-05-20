import React from 'react';
import { generateSignature } from '../payment_signature/signature';
import { Button } from 'flowbite-react';
import { HiShoppingCart } from 'react-icons/hi';
import { customsubmitTheme } from '../customTheme/appTheme';

const PaymentButton = () => {
  const myData:any = {
    "merchant_id": "10000100",
    "merchant_key": "46f0cd694581a",
    "return_url": "https://inkowaguy.vercel.app/success",
    "cancel_url": "https://inkowaguy.vercel.app/cancel",
    "notify_url": "https://inkowaguy.vercel.app/pages/api/notify",
    "name_first": "John",
    "name_last": "Doe",
    "email_address": "devslcx@gmail.com",
    "m_payment_id": "1234",
    "amount": "150.00",
    "item_name": "Biding Package:Bronze"
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
      <Button
        theme={customsubmitTheme}
        color="appsuccess"
        type="submit"
        className="inline-flex w-full justify-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-200"
      >
        <HiShoppingCart className="mr-2 h-5 w-5" /> Choose plan
      </Button>
    </form>
  );
};

export default PaymentButton;
