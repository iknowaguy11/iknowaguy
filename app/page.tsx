import Image from "next/image";
import logoApp from '../public/caponlycrop.png';
import { Slider } from "./components/Slider";
import { Popular } from "./components/PopularRequests";
import { TimeLine } from "./components/Timeline";
import CenterBody from "./components/CenterBody";

export default function Home() {
  return (
    <main>
      <Slider/>
      <CenterBody/>
      {/* <div className="flex justify-center items-center">
      <svg className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
      <h1 className="text-5xl">See our popular categories</h1>
      <Image
          src={logoApp}
          alt="Picture of the author"
          className="mr-3 aspect-auto"
        />
      </div>
      <Popular/> */}
      {/* <div className="flex justify-center items-center">
        <h1 className="text-3xl">Some reviews from our favourite clients</h1></div>

      <TimeLine/> */}
    </main>
    
  );
}
