
'use client';

import { Card,Badge } from 'flowbite-react';
import Image from 'next/image';
import plumber from '../../public/plumber.jpg';
import electrican from '../../public/electrician.jpg';
import gardener from '../../public/seedlings.jpg';
import painter from '../../public/painter.jpg';
import construction from '../../public/construction.jpg';
import tools from '../../public/tools.jpg';
import { HiCheck } from 'react-icons/hi';
import { customTheme } from '../customTheme/appTheme';
import { Ijobs } from '../Interfaces/appInterfaces';

export function Popular() {
    
    let jobs: Ijobs[] = [
        { id: '1', jobname: 'Plumber',imgsr:plumber,def:'Skilled worker who deals with pipes, fittings, and fixtures',duties:["Geyser Installation","Installation of showers","Broken pipe fixes","Leak detection"] },
        { id: '2', jobname: 'Electrician',imgsr:electrican,def:'Are skilled workers who design, install, maintain, and repair electrical systems in various settings.',duties:["Install electrical systems","Troubleshoot and repair electrical issues","Ensure compliance"]  },
        { id: '3', jobname: 'Gardening & Landscaping',imgsr:gardener,def:'Gardening and landscaping are home improvement techniques that center around plants and terrain.',duties:["Plant and maintain vegitation","Install irrigation systems","Manage and control pests"]  },
        { id: '4', jobname: 'Painting',imgsr:painter,def:'visual art, which is characterized by the practice of applying paint, color or other medium to a solid surface',duties:["Repair and patch surfaces","Colorfull combinations","Painting techniques"]  },
        { id: '5', jobname: 'Building & Renovations',imgsr:construction,def:'Skilled worker who deals with pipes, fittings, and fixtures',duties:["interpret construction blueprints","Brick layer"]  },
        { id: '6', jobname: 'More Categories',imgsr:tools,def:'Skilled worker who deals with pipes, fittings, and fixtures',duties:["Read more"]  }];
    return (
        <div className="m-4 grid gap-3 sm:grid-cols-4 md:grid-cols-4 xm:grid-cols-1 xs:grid-cols-1 justify-items-center mt-5 bg-slate-50 overflow-hidden p-2 rounded-md">
            {jobs.map((item) => (
                <Card key={item.id}
                    className="max-w-sm overflow-hidden"
                    renderImage={() => <Image className='aspect-[4/3] object-cover' src={item.imgsr} alt="popoular jobs" />}
                    >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.jobname}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {item.def}
                    </p>
                    <div className='flex flex-col gap-1'>
                    {item.duties.map((item,index)=>(
                        <Badge key={index} className='w-fit' icon={HiCheck} theme={customTheme} color="success">{item}</Badge>
                    ))}
                    </div>
                </Card>
            ))}
        </div>
    );
}
