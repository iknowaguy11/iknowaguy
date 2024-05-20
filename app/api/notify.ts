import { db } from '../DB/firebaseConnection';
//import { pfValidSignature, pfValidIP, pfValidPaymentData, pfValidServerConfirmation } from '../utils/paymentUtils';
import { doc, setDoc } from "firebase/firestore"; 
// Add a new document in collection "cities"




import { Request } from "express";
import axios from "axios";
import crypto from "crypto";
import dns from "dns";
// Type for the lookup result
type Address = { address: string; family: number };

// Helper function for IP lookup
const ipLookup = async (domain: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, { all: true }, (err, addresses) => {
      if (err) {
        reject(err);
      } else {
        const addressIps = (addresses as Address[]).map(item => item.address);
        resolve(addressIps);
      }
    });
  });
};

// Function to validate the IP address
export const pfValidIP = async (req: Request): Promise<boolean> => {
  const validHosts = [
    'www.payfast.co.za',
    'sandbox.payfast.co.za',
    'w1w.payfast.co.za',
    'w2w.payfast.co.za'
  ];

  let validIps: string[] = [];
  let pfIp :string="";
  pfIp = (req.headers['x-forwarded-for'] as string);

  // || req.connection.remoteAddress

  try {
    for (const host of validHosts) {
      const ips = await ipLookup(host);
      validIps = [...validIps, ...ips];
    }
  } catch (err) {
    console.error(err);
  }

  const uniqueIps = [...new Set(validIps)];
  return uniqueIps.includes(pfIp);
};

// Function to validate the signature
export const pfValidSignature = (pfData: any, pfParamString: string, pfPassphrase: string | null = null): boolean => {
  let tempParamString = pfParamString;
  if (pfPassphrase !== null) {
    tempParamString += `&passphrase=${encodeURIComponent(pfPassphrase.trim()).replace(/%20/g, "+")}`;
  }

  const signature = crypto.createHash("md5").update(tempParamString).digest("hex");
  return pfData['signature'] === signature;
};

// Function to validate the payment data
export const pfValidPaymentData = (cartTotal: number, pfData: any): boolean => {
  return Math.abs(cartTotal - parseFloat(pfData['amount_gross'])) <= 0.01;
};

// Function to validate server confirmation
export const pfValidServerConfirmation = async (pfHost: string, pfParamString: string): Promise<boolean> => {
  try {
    const response = await axios.post(`https://${pfHost}/eng/query/validate`, pfParamString);
    return response.data === 'VALID';
  } catch (error) {
    console.error(error);
    return false;
  }
};


//

//  setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// }).then(()=>{

// }).catch(err=>{
//   console.log(err);
// });
// export default async function handler(req:any, res:any) {
//   if (req.method !== 'POST') {
//     console.log("Method Not Allowed");
//     return res.status(405).send('Method Not Allowed');
//   }else{
//     setDoc(doc(db, "citdfdies", "LereA"), {
//       name: "Los Angeles",
//       state: req.method,
//       country: "USA"
//     }).then(()=>{
    
//     }).catch(err=>{
//       console.log(err);
//     });
//   }

//   const pfData = req.body;
//   let pfParamString = "";
//   for (let key in pfData) {
//     if (pfData.hasOwnProperty(key) && key !== "signature") {
//       pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(/%20/g, "+")}&`;
//     }
//   }
//   pfParamString = pfParamString.slice(0, -1); // Remove last '&'

//   //const myPassphrase = process.env.PAYFAST_PASSPHRASE;
//   const myPassphrase ="jt7NOE43FZPn"
//   const testingMode = true;
//   const pfHost = testingMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';
//   const check1 = pfValidSignature(pfData, pfParamString, myPassphrase);
//   const check2 = await pfValidIP(req);
//   const check3 = pfValidPaymentData(150.00, pfData);
//   const check4 = await pfValidServerConfirmation(pfHost, pfParamString);

//   if (check1 && check2 && check3 && check4) {
//     // All checks have passed, the payment is successful
//     console.log("All checks have passed, the payment is successful");
   

// // Add a new document in collection "cities"
// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los success payment",
//   state: "CA",
//   country: "USA"
// });
//     res.status(200).send("Payment Verified");
//   } else {
//     await setDoc(doc(db, "citieserrors", "LAerrors"), {
//       name: "Los Angeles",
//       state: "CA",
//       country: "USA"
//     });
//     // Some checks have failed, check payment manually and log for investigation
//     console.log("Some checks have failed, check payment manually and log for investigation");
//     if(check1){
//         console.log("check1");
//     }
//     if(check2){
//         console.log("check2");
//     }
//     if(check3){
//         console.log("check3");
//     }
//     if(check4){
//         console.log("check4");
//     }
//     res.status(400).send("Payment Verification Failed");
//   }
// }


