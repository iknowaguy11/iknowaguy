import { Button, Card } from "flowbite-react";
import om from "../../public/logoinknow.png";
import { customsubmitTheme } from "../customTheme/appTheme";
import { HiEye, HiHome } from "react-icons/hi";

const SuccessPage = () => {
    return (
        <div className="w-full h-full flex justify-center mt-20 mb-3">
            <Card
                className="max-w-sm"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={om.src}
            >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Succesfull Payment
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Thank you for making this payment. Your account has been credited, you can now place a bid of your choice.
                </p>

                <div className="flex">
                    <Button size={"sm"} href="/jobs"
                        type="button"
                        className="mr-2 underline bg-white text-black focus:ring-4 focus:ring-transparent"
                    >
                        <HiEye className="-ml-0.5 mr-2 h-4 w-4" />
                        View Projects
                    </Button>
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

export default SuccessPage;