
'use client';

import { Footer } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import logoApp from '../../public/logoinknow.png';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

export function FooterApp() {
  return (
    <Footer bgDark>
      <div className="w-full">
        <div className="grid w-full grid-cols-1 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
          <Image
            src={logoApp}
            alt="Picture of the author"
            className="mr-3 w-auto sm:h-9 bg-white"
            width={176}
            height={40}
            priority
          />
          <p className='text-gray-500 dark:hover:text-white mt-2'>Find Trusted, Reliable Contractors For Your Home</p>
          </div>
          <div>
            <Footer.Title title="Company" />
            <Footer.LinkGroup col>
              <Footer.Link href="tel:087 012 5690">087 012 5690</Footer.Link>
              <div className='flex gap-2 items-center'>
                <Footer.Icon href="https://www.facebook.com/iknowaguysouthafrica/" target='_blank' icon={BsFacebook} />
                <Footer.Link href="https://www.facebook.com/iknowaguysouthafrica/" target='_blank'>Facebook</Footer.Link>
              </div>
              <Footer.Link href="mailto:support@iknowaguy.co.za" as={Link}>support@iknowaguy.co.za</Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div>
            <Footer.Title title="legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="terms-and-conditions" as={Link} target='_blank'>Privacy Policy</Footer.Link>
              <Footer.Link href="terms-and-conditions" as={Link} target='_blank'>Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Quick Links" />
            <Footer.LinkGroup col>
              <Footer.Link href="purchase" as={Link}>Buy Credits</Footer.Link>
              <Footer.Link href="#inspirations" as={Link}>Get Inspired</Footer.Link>

              <Footer.Link href="recommend" as={Link}>Recommend A &quot;Guy&quot;</Footer.Link>
              {/* <Footer.Link href="contractors" as={Link}>Contractors</Footer.Link> */}
            </Footer.LinkGroup>
          </div>
        </div>
        <div id='bottom' className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="/" by="iknowaguy™" year={2024} />
          {/* <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div> */}
        </div>
        
      </div>
    </Footer>
  );
}
