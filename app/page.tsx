'use client';
import { Slider } from "./components/Slider";
import CenterBody from "./components/CenterBody";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Slider/>
      <Suspense fallback={<div>Loading...</div>}>
        <CenterBody />
      </Suspense>
    </main>
  );
}
