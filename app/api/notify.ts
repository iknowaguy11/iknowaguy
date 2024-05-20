import { pfValidSignature, pfValidIP, pfValidPaymentData, pfValidServerConfirmation } from '../utils/paymentUtils';

export default async function handler(req:any, res:any) {
  if (req.method !== 'POST') {
    console.log("Method Not Allowed");
    return res.status(405).send('Method Not Allowed');
  }

  const pfData = req.body;
  let pfParamString = "";
  for (let key in pfData) {
    if (pfData.hasOwnProperty(key) && key !== "signature") {
      pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(/%20/g, "+")}&`;
    }
  }
  pfParamString = pfParamString.slice(0, -1); // Remove last '&'

  //const myPassphrase = process.env.PAYFAST_PASSPHRASE;
  const myPassphrase ="jt7NOE43FZPn"
  const testingMode = true;
  const pfHost = testingMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';
  const check1 = pfValidSignature(pfData, pfParamString, myPassphrase);
  const check2 = await pfValidIP(req);
  const check3 = pfValidPaymentData(150.00, pfData);
  const check4 = await pfValidServerConfirmation(pfHost, pfParamString);

  if (check1 && check2 && check3 && check4) {
    // All checks have passed, the payment is successful
    console.log("All checks have passed, the payment is successful");
    res.status(200).send("Payment Verified");
  } else {
    // Some checks have failed, check payment manually and log for investigation
    console.log("Some checks have failed, check payment manually and log for investigation");
    if(check1){
        console.log("check1");
    }
    if(check2){
        console.log("check2");
    }
    if(check3){
        console.log("check3");
    }
    if(check4){
        console.log("check4");
    }
    res.status(400).send("Payment Verification Failed");
  }
}
