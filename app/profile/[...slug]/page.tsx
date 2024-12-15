"use client"
import { AppContext } from "@/app/Context/appContext";
import { IReviews } from "@/app/Interfaces/appInterfaces";
import { useFetchUserAccount, useFetchReviews } from "@/app/_hooks/useFetch";
import ProfileContacts from "@/app/components/ProfileContacts";
import ReviewsTemplate from "@/app/components/ReviewsTemplate";
import { customsubmitTheme } from "@/app/customTheme/appTheme";
import { Button } from "flowbite-react";
import { notFound } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { HiViewList } from "react-icons/hi";

const Reviews = ({ params }: { params: { slug: string[] } }) => {
    const { ukey } = useContext(AppContext);
    const { userReviews, ReviewsError, isGettingReviews } = useFetchReviews(params?.slug[0]);//passing in user Id
    const { UserData } = useFetchUserAccount(decodeURIComponent(params?.slug[0]).trim());
    const data = useFetchUserAccount(ukey);
    let membership = data?.UserData[0]?.membership;

    const [TempReviews, SetTempReviews] = useState<IReviews[]>(userReviews);

    if (params.slug.length > 1) {
        notFound();
    }

    useEffect(() => {
        SetTempReviews(userReviews);
    }, [userReviews]);

    const FilterReviews = (key: string | null) => {
        if (key == null || key?.trim() == "" || key == undefined) {
            SetTempReviews([]);
            SetTempReviews(userReviews);
        } else {
            SetTempReviews(userReviews.filter(item => item.homeOwnerId == key));
        }

    }
    return (
        <div className="bg-slate-50 w-full gap-4 pt-28">
            <div className='h-full flex flex-col justify-center items-center '>
                <ProfileContacts item={UserData[0]} />
                {
                    ukey !== null && ukey !== "" && ukey !== undefined && membership == "homeowner" ? (
                        <div className="flex gap-2">
                            <Button onClick={() => FilterReviews("")} color="success" size={"sm"} theme={customsubmitTheme} pill>
                                <HiViewList className="mr-2 h-5 w-5" /> All
                            </Button>
                            <Button onClick={() => FilterReviews(ukey)} color="light" size={"sm"} theme={customsubmitTheme} pill>
                                <HiViewList className="mr-2 h-5 w-5" /> Only mine
                            </Button>
                        </div>
                    ) : null
                }
                {
                    TempReviews?.length > 0 ?
                        TempReviews.map((rev) => (
                            <ReviewsTemplate key={rev.Id} revdata={rev} contractorId={decodeURIComponent(params.slug[0]).trim()} />
                        ))
                        :
                        <h2>No Reviews found</h2>
                }

            </div>

        </div>

    );
}

export default Reviews;