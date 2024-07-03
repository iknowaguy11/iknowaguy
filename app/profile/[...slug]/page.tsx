"use client"
import { useFetchReviews } from "@/app/_hooks/useFetch";
import ReviewsTemplate from "@/app/components/ReviewsTemplate";
import { customsubmitTheme } from "@/app/customTheme/appTheme";
import { Button } from "flowbite-react";
import { HiViewList } from "react-icons/hi";

const Reviews = () => {
    //const { userReviews, ReviewsError, isGettingReviews }=useFetchReviews();
    return (
        // <div className="bg-slate-50 w-full gap-4 pt-28">
        //     <div className='h-full flex flex-col justify-center items-center bg-slate-50'>
        //         <div className="flex gap-2">
        //             <Button color="success" size={"sm"} theme={customsubmitTheme} pill>
        //                 <HiViewList className="mr-2 h-5 w-5" /> All
        //             </Button>
        //             <Button color="light" size={"sm"} theme={customsubmitTheme} pill>
        //                 <HiViewList className="mr-2 h-5 w-5" /> Only mine
        //             </Button>
        //         </div>
        //         {
        //             userReviews?.length>0 ?
        //             userReviews.map((rev)=>(
        //                 <ReviewsTemplate key={rev.Id} revdata={rev}/>
        //             ))
        //             :
        //             <h2>No Reviews found</h2>
        //         }

                
        //     </div>

        // </div>
        <></>
    );
}

export default Reviews;