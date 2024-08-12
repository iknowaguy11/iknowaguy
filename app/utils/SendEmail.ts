
import { IAwardproject, IRecommendationDetails } from "../Interfaces/appInterfaces";
import { failureMessage, successMessage } from "../notifications/successError";
//send email to contractor for recommendation
export const SendMailToContractor = async (email: string, name: string, message: IRecommendationDetails, subject: string) => {
    try {
        const response = await fetch('https://payfastpaymentvalidator.onrender.com/sendemailrecommendation', {
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
            successMessage(`An email has been shared to the ${email} you recommended.`);
        } else {
            failureMessage(`We could not deliver your Recommendation to ${email}. but we have capture it on our database.`)
        }
    } catch (error: any) {
        console.log(error);
        failureMessage("Error: " + error?.message);
    }

}

//send email recomendation copy to submissions@iknowaguy.co.za
export const SendMailToIknowaguy = async (email: string="submissions@iknowaguy.co.za", name: string, message: IRecommendationDetails, subject: string) => {
    try {
        const response = await fetch('https://payfastpaymentvalidator.onrender.com/sendemailAdminRecommendationCopy', {
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
            successMessage(`An email has been shared to ${email}`);
        } else {
            failureMessage(`We could not deliver your Recommendation to ${email}. but we have capture it on our database.`)
        }
    } catch (error: any) {
        console.log(error);
        failureMessage("Error: " + error?.message);
    }
}
//send to Contractor for winning project
export const SendMailAcceptence = async (email: string, name: string, message: IAwardproject, subject: string) => {
    try {
        const response = await fetch('https://payfastpaymentvalidator.onrender.com/sendemailawardingproject', {
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
            successMessage("An acceptence offer email has been shared to the contractor or skilled individual.");
        } else {
            failureMessage("We could not deliver your mail to the contractor or skilled individual. but we have capture it on our database.");
        }
    } catch (error: any) {
        console.log(error);
        failureMessage("Error: " + error?.message);
    }

}