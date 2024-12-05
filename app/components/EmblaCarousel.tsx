'use client';

import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import { IinspirationsCarosal } from '../inspirations/[...slug]/page';
import Image from 'next/image';
import { Badge } from 'flowbite-react';
import { HiShare,HiOutlineEye } from 'react-icons/hi';
import { customTheme } from '../customTheme/appTheme';
import { useRouter } from 'next/navigation';


const EmblaCarousel = ({ slides, options,Category }: { slides: IinspirationsCarosal[], options?: EmblaOptionsType,Category:string }) => {
  const router=useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide border" key={item.id}>
              <Image
                className='w-full h-auto aspect-[3/4] object-cover'
                src={item.imageSrc}
                alt='inspiration'
              />
              <div className='flex gap-2'><Badge theme={customTheme} color={"success"} className="w-fit m-1 hover:cursor-pointer" icon={HiShare}>Copy Link</Badge>
              <Badge onClick={()=>router.push(Category+"/"+(++index))} theme={customTheme} color={"success"} className="w-fit m-1 hover:cursor-pointer" icon={HiOutlineEye}>Full View</Badge></div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((item, index) => (
                <Image key={item.id}
                  onClick={() => onThumbClick(item.id)}
                  className={'w-full h-auto aspect-[3/4] object-scale-down overflow-hidden rounded-md embla-thumbs__slide'.concat(
                    selectedIndex ? ' embla-thumbs__slide--selected' : ''
                  )}
                  src={item.imageSrc}
                  alt='inspiration'
                  height={50}
                  width={50}
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
