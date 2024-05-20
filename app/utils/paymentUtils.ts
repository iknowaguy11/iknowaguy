
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
