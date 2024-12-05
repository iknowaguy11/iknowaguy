import axios from "axios";
import crypto from "crypto";
import dns from "dns";
import moment from "moment";
import admin from "firebase-admin";


    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env?.projectId,
                clientEmail: process.env?.clientEmail,
                privateKey: process?.env?.privateKey?.toString().replace(/\\n/g, '\n'),
            }),
        });
        


    }
const auth = admin.auth();
const db_admin = admin.firestore();
const db = admin.firestore();

const validDomais = [
    'www.payfast.co.za',
    'sandbox.payfast.co.za',
    'w1w.payfast.co.za',
    'w2w.payfast.co.za',
    "https://inkowaguy.vercel.app",
    "https://www.inkowaguy.vercel.app",
    "https://www.iknowaguysa.co.za",
    "https://www.paysho.co.za",
    "https://payfastpaymentvalidator.onrender.com",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001"
];

const pfValidSignature = (pfData:any, pfParamString:any, pfPassphrase:any = null) => {
    // Calculate security signature
    let tempParamString = '';
    if (pfPassphrase !== null) {
      pfParamString += `&passphrase=${encodeURIComponent(pfPassphrase.trim()).replace(/%20/g, "+")}`;
    }
    const signature = crypto.createHash("md5").update(pfParamString).digest("hex");
    return pfData['signature'] === signature;
  };
  
  async function ipLookup(domain:any) {
    return new Promise((resolve, reject) => {
      dns.lookup(domain, { all: true }, (err:any, address:any, family:any) => {
        if (err) {
          reject(err)
        } else {
          const addressIps = address.map(function (item:any) {
            return item.address;
          });
          resolve(addressIps);
        }
      });
    });
  }
  
  const pfValidIP = async (req:any) => {
    const validHosts = [
      'www.payfast.co.za',
      'sandbox.payfast.co.za',
      'w1w.payfast.co.za',
      'w2w.payfast.co.za'
    ];
  
    let validIps:any = [];
    const pfIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
    try {
      for (let key in validHosts) {
        const ips:any = await ipLookup(validHosts[key]);
        validIps = [...validIps, ...ips];
      }
    } catch (err:any) {
      console.error(err);
    }
  
    const uniqueIps = [...new Set(validIps)];
  
    if (uniqueIps.includes(pfIp)) {
      return true;
    }
    return false;
  };
  const pfValidServerConfirmation = async (pfHost:any, pfParamString:any) => {
    const result = await axios.post(`https://${pfHost}/eng/query/validate`, pfParamString)
      .then((res:any) => {
        return res.data;
      })
      .catch((error:any) => {
        console.error(error)
      });
    return result === 'VALID';
  };

  export async function POST(req: Request){
    console.log("post hello");
    const res=Response;
    try {
        const testingMode = true;
        const pfHost = testingMode ? "sandbox.payfast.co.za" : "www.payfast.co.za";
        const pfData = JSON.parse(JSON.stringify(await req?.json()));
    
        let pfParamString = "";
        for (let key in pfData) {
          if (pfData.hasOwnProperty(key) && key !== "signature") {
            pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(/%20/g, "+")}&`;
          }
        }
    
        // Remove last ampersand
        pfParamString = pfParamString.slice(0, -1);
        const passPhrase = process.env.PHASS_PHRASE;
        const check1 = pfValidSignature(pfData, pfParamString, passPhrase);
        const check2 = await pfValidIP(req);
        const check4 = await pfValidServerConfirmation(pfHost, pfParamString);
    
        if (check1 == true) {
          // All checks have passed, the payment is successful
          console.log("valid checks");
          const { m_payment_id, amount_gross, custom_str1, custom_str2, amount_fee, amount_net, custom_str3, name_first, name_last, email_address } = await req?.json();
          console.log(req.body);
          const docRef = db.collection('BidCredits').doc(custom_str1);
    
          db.collection('BidCredits').doc(custom_str1).get().then((doc:any) => {
            if (doc.exists) {
              console.log('Document data:', doc.data());
              //recharge account
              const { credit, tokens } = doc?.data();
              let updateBalance = {};
              updateBalance = {
                credit: custom_str2 == "Bronze" ? credit + 5 : custom_str2 == "Silver" ? credit + 10 : credit + 20,
                CreditType: "paid",
                tokens: [...tokens, { "tk": m_payment_id, "pdate": moment().format('MMMM Do YYYY, h:mm a'), amount_gross, amount_fee, amount_net, "Package": custom_str2, "phone": custom_str3 }]
              }
              // Update specific fields in the document
              docRef.update(updateBalance).then(() => {
                console.log('Document successfully updated!');
                const site = 'https://inkowaguy.vercel.app/login';
                //SendSmsToCustomer(`Hi ${name_first + " " + name_last},\n Thank you for recharging your account with us on I-know-A-Guy.\n You bought the ${custom_str2} package. You may review your account balance on the site : ${site} \n\n Kind Reagerds,\n I Know A Guy Team.`, custom_str3?.trim());
    
              }).catch((error:any) => {
                console.error('Error updating document: ', error);
              });
    
            } else {
              //send sms recharge failure
              // SendSmsToCustomer(`Hi Future,\n sorry we had a technical issue while attempting to recharche your account (avoid attempting to recharge your account until you consult with us).\n Kindly contact our adminstration Team.\n\nOrder Details\n
              // Package: ${custom_str2}
              // \nGross Amount: ${amount_gross}
              //  \nRefference Key: ${m_payment_id}`, custom_str3?.trim());
            }
          }).catch((error:any) => {
            //send sms recharge failure
            console.error('Error getting document: ', error);
          });
          // Reference to the document
    
          res.json({ message: "valid checks" });
        } else {
          // Some checks have failed, check payment manually and log for investigation
          console.log("invalid checks");
          console.log(req.body);
          res.json({ message: "invalid checks" });
        }
      } catch (error:any) {
        console.log("something went wrong");
        res.json({ message: error.message });
      }


  }

