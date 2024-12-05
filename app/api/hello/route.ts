import admin from "firebase-admin";
import crypto from "crypto";
import dns from "dns";
import axios from "axios";
// const axios = require("axios");
// const crypto = require("crypto");
// const dns = require('dns');
///
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

  ///



export async function GET() {
    return Response.json({ msg: 'Hello world' });
}
export async function POST(req: Request) {
    const resp = await req.json();
    return Response.json(resp);
}

export async function DELETE() {
    const auth = admin.auth();
    const db_admin = admin.firestore();
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env?.projectId,
                clientEmail: process.env?.clientEmail,
                privateKey: process?.env?.privateKey?.toString().replace(/\\n/g, '\n'),
            }),
        });
        


    }
    return Response.json({ msg: 'Hello world' });
}


export async function PUT() {
    return Response.json({ msg: 'Hello world' });
}