import { Avatar, Button,Popover } from "flowbite-react";
import { IOtherOffers } from "../Interfaces/appInterfaces";
import { SendMailAcceptence } from "../utils/SendEmail";


export default function HoverProfile({ofrs}:{ofrs:IOtherOffers}) {
  const AcceptOffer=()=>{
    let msg="You have been awarded a project to work on, find more details of the project uder your profile on I Know A Guy";
    SendMailAcceptence("futurekgaphola@gmail.com",ofrs?.companyName!==null ? ofrs?.companyName  : ofrs.firstName,msg,"Project Offer");
  }
  return (
    <Popover placement="left" trigger="hover"
      aria-labelledby="profile-popover"
      content={
        <div className="w-64 p-3">
          <div className="mb-2 flex items-center justify-between">
            <a href="#">
              <img
                className="h-10 w-10 rounded-full"
                src={ofrs?.profileImage}
                alt="contract potrait"
              />
            </a>
            <div>
              <Button
              onClick={()=>AcceptOffer()}
               size="xs"
                type="button"
                className="rounded-lg bg-blue-700 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Accept
              </Button>
            </div>
          </div>
          <p>{"Representative : "+ofrs?.firstName}</p>
          <p id="profile-popover" className="text-base font-semibold leading-none text-gray-900 dark:text-white">
            {ofrs?.companyName!=="" && ofrs?.companyName!==null ? ofrs?.companyName  : null}
          </p>
          {ofrs?.Address!=="" && ofrs?.Address!==null ? <p className="text-xs text-nowrap">Address : {ofrs?.Address}</p>  : null}
          <p className="mb-3 text-sm font-normal">
            <a href="#" className="hover:underline">
              {ofrs?.companyEmail}
            </a>
          </p>
          
          <ul className="flex text-sm">
            
            <li>
              <a href="#" className="hover:underline">
              <span>Offer : </span>
                <span className="font-semibold text-gray-900 dark:text-white">R{ofrs?.OfferMade}</span>
                
              </a>
            </li>
          </ul>
        </div>
      }
    >
      <button type="button" className="bg-transparent"><Avatar img={ofrs?.profileImage} alt="avatar of contractor" rounded stacked /></button>
    </Popover>
  );
}
