import { Button, Card } from "flowbite-react";
import om from "../../public/logoinknow.png";
import { customsubmitTheme } from "../customTheme/appTheme";
import { HiEye, HiHome } from "react-icons/hi";

const CancelPage = () => {
    return (
        <div className="w-full h-full flex justify-center mt-20 mb-3">
            <Card
                className="max-w-sm"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={om.src}
            >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Payment Cancelled
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Payment has been cancelled by you or by an external factor.</p>
                <div className="flex">
                    
                    <Button theme={customsubmitTheme} color="light" size={"sm"} href="/"
                        type="button"
                    >
                        <HiHome className="-ml-0.5 mr-2 h-4 w-4" />
                        Go Home
                    </Button>
                </div>
            </Card>
        </div>
    );
}
export default CancelPage;