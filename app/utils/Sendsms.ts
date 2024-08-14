import { failureMessage, successMessage } from "../notifications/successError";

export const Sendsmscustomer=async(message:String,phone:string)=>{
    try {
        const response = await fetch('https://payfastpaymentvalidator.onrender.com/smscustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    message: message,
                    phone: phone,
                }),
        });
        const data = await response.json();
        if (parseInt(data.cost)>0) {
            successMessage(`An sms has been shared to ${phone}`);
        } else {
            failureMessage(`We could not deliver your Recommendation to ${phone}. but we have capture it on our database.`)
        }
    } catch (error: any) {
        console.log(error);
        failureMessage("Error: " + error?.message);
    }
}