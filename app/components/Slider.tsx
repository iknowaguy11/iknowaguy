
'use client';
import caponlycrop from '../../public/caponlycrop.png';
import { Carousel, Card, Badge, Button } from 'flowbite-react';
import Image from 'next/image';
import plumber from '../../public/plumber.jpg';
import electrican from '../../public/electrician.jpg';
import gardener from '../../public/seedlings.jpg';
import construction from '../../public/construction.jpg';
import tools from '../../public/tools.jpg';

export function Slider() {
    return (
        <div className=" relative h-96 sm:h-96 xl:h-80 2xl:h-96 content-center">
            <Card className="absolute z-10 top-1/4 bottom-14 left-16 max-w-sm max-h-fit" horizontal>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    What Service Are You Looking For?
                </h5>
                <div className="flex flex-wrap gap-2">
                    <Image
                        alt="Bonnie image"
                        src={caponlycrop}
                        className="h-8 w-8 mb-3 rounded-full shadow-lg"
                    />
                    <Image
                        alt="Bonnie image"
                        src={caponlycrop}
                        className="h-8 w-8 mb-3 rounded-full shadow-lg"
                    />
                    <Image
                        alt="Bonnie image"
                        src={caponlycrop}
                        className="h-8 w-8 mb-3 rounded-full shadow-lg"
                    />

                </div>
                <div className='flex flex-row gap-2'>
                    <Button as="a" color="light">Find a contractor</Button>
                    <Button as="a" color="light">Sign up</Button>
                </div>
            </Card>
            <Carousel pauseOnHover>
                <Image src={plumber} alt="..." />
                <Image src={electrican} alt="..." />
                <Image src={gardener} alt="..." />
                <Image src={construction} alt="..." />
                <Image src={tools} alt="..." />
            </Carousel>
        </div>
    );
}
