
"use client";

import { HiEye, HiInformationCircle,HiHome } from "react-icons/hi";
import { Alert, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { customsubmitTheme } from "../customTheme/appTheme";

export default function ProjectNotFound() {
    const router = useRouter();
  return (
    <Alert additionalContent={<AdditionalContent router={router} />} color="warning" icon={HiInformationCircle}>
      <span className="font-medium">Info alert!</span> Project Not Found.
    </Alert>
  );
}

function AdditionalContent({router}:{router:any}) {
  return (
    <>
      <div className="mb-4 mt-2 text-sm text-black dark:text-white">
        Project does not exit or may have been concluded or removed from the system. You may attempt to refresh your page or go back home.
      </div>
      <div className="flex">
        <Button theme={customsubmitTheme} color="appsuccess" size={"sm"} onClick={()=>router.replace('/jobs')}
          type="button"
          className="mr-2 inline-flex items-center rounded-lg bg-appGreen px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-appGreen focus:ring-4 focus:ring-appGreen dark:bg-appGreen dark:hover:bg-appGreen"
        >
          <HiEye className="-ml-0.5 mr-2 h-4 w-4" />
          View More Projects
        </Button>
        <Button theme={customsubmitTheme} color="light" size={"sm"} onClick={()=>router.replace('/')}
          type="button"
        >
            <HiHome className="-ml-0.5 mr-2 h-4 w-4" />
          Go Home
        </Button>
      </div>
    </>
  );
}
