import axios from "axios"
import { failureMessage, successMessage } from "../notifications/successError";

export const SendMailToContractor = async (email: string, name: string, message: string, subject: string) => {
    try {
        const response = await fetch('https://payfastpaymentvalidator.onrender.com/sendemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    email: email,
                    name: name,
                    message: message,
                    subject: subject
                }),
        });

        const data = await response.json();
        if (data.message == "email deliverd") {
            successMessage("An email has been shared to the person you recommended.");
        } else {
            failureMessage("We could not deliver your Recommendation to this individual, however your recommendation was delivered to I Know A Guy.")
        }
    } catch (error: any) {
        console.log(error);
        failureMessage("Error: " + error?.message);
    }

}