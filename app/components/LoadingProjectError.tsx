"use client";

import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const LoadingProjectError = () => {
    return (

        <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Info alert!</span> Something went wrong while fetching our Content. we appologize for the inconvinience, our team is working on resolving the issue.
        </Alert>
    );
}

export default LoadingProjectError;