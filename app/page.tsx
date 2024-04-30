'use client';
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
    </main>
  );
}
