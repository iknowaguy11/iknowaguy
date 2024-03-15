
'use client';

import { Button, Checkbox, Label, TextInput, Textarea,Card } from 'flowbite-react';
import Link from 'next/link';
import { customCheckboxTheme, customsubmitTheme } from '../customTheme/appTheme';

export default function Recommend() {
    return (
        <div className='flex justify-center items-center'>
            <Card className='flex max-w-md gap-4 flex-grow mt-28 mb-10'>
            <form className="flex max-w-md flex-col gap-4 flex-grow">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="contrname" value="Contractor's Name" />
                    </div>
                    <TextInput id="contrname" type="text" placeholder="Name of the person you are recommending" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="companyName" value="Their company Name" />
                    </div>
                    <TextInput id="companyName" type="text" placeholder="Contractor company Name" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="contractphone" value="Contractor's Phone No." />
                    </div>
                    <TextInput id="contractphone" type="text" placeholder="Name of the person you are recommending" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="contemail" value="Their Email" />
                    </div>
                    <TextInput id="contemail" type="email" placeholder="someone@company.co.za" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="Town" value="Company's Physical Address" />
                    </div>
                    <TextInput id="Town" type="text" placeholder="Company's Physical address (may be town/city/village/etc.)" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="Services" value="Type of Services Rendering" />
                    </div>
                    <Textarea id="Services" placeholder="Indicate the type of Services they are rendering." required rows={3} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="yourname" value="Share your Name" />
                    </div>
                    <TextInput id="repeat-password" type="text" placeholder='Share your Name' required shadow />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="agree" theme={customCheckboxTheme} color="success"/>
                    <Label htmlFor="agree" className="flex">
                        I agree with the&nbsp;
                        <Link href="#" className="text-appGreen hover:underline dark:text-appGreen">
                            terms and conditions
                        </Link>
                    </Label>
                </div>
                <Button theme={customsubmitTheme} type="submit" color="appsuccess">Recommend</Button>
            </form>
            </Card>
           

        </div>

    );
}
