'use client';

import { Footer } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import logoApp from '../../public/logoinknow.png';
import { BsFacebook } from 'react-icons/bs';

export function FooterApp() {
  return (
    <Footer bgDark>
      <div className="w-full lg:mt-0 mt-[200px]">
        {/* Grid Layout for Footer Sections */}
        <div className="grid grid-cols-1 gap-6 px-4 py-8 md:grid-cols-4 md:px-6">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={logoApp}
              alt="Logo"
              className="w-40 h-auto bg-white rounded"
              width={176}
              height={40}
              priority
            />
            <p className="mt-2 text-center text-sm text-gray-400 md:text-left">
              Find Trusted, Reliable Contractors For Your Home
            </p>
          </div>

          {/* Company Section */}
          <div className="flex flex-col text-center md:text-left items-center md:items-start">
            <Footer.Title title="Company" className="text-gray-100" />
            <Footer.LinkGroup col className=''>
              <Footer.Link href="tel:087 012 5690">087 012 5690</Footer.Link>
              <div className="flex gap-2 justify-center md:justify-start mt-1">
                <Footer.Icon
                  href="https://www.facebook.com/iknowaguysouthafrica/"
                  target="_blank"
                  icon={BsFacebook}
                />
                <Footer.Link
                  href="https://www.facebook.com/iknowaguysouthafrica/"
                  target="_blank"
                >
                  Facebook
                </Footer.Link>
              </div>
              <Footer.Link href="mailto:support@iknowaguy.co.za" as={Link}>
                support@iknowaguy.co.za
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col text-center md:text-left items-center md:items-start">
            <Footer.Title title="Legal" className="text-gray-100" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="/terms-and-conditions"
                as={Link}
                target="_blank"
              >
                Privacy Policy
              </Footer.Link>
              <Footer.Link
                href="/terms-and-conditions"
                as={Link}
                target="_blank"
              >
                Terms &amp; Conditions
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col text-center md:text-left items-center md:items-start">
            <Footer.Title title="Quick Links" className="text-gray-100" />
            <Footer.LinkGroup col>
              <Footer.Link href="/purchase" as={Link}>
                Buy Credits
              </Footer.Link>
              <a
                onClick={() => {
                  const element = document.getElementById('inspirations');
                  element?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest',
                  });
                }}
                className="cursor-pointer text-gray-400 hover:underline"
              >
                Get Inspired
              </a>
              <Footer.Link href="/recommend" as={Link}>
                Recommend A &quot;Guy&quot;
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          id="bottom"
          className="w-full bg-gray-700 px-4 py-10 text-center sm:flex sm:items-center sm:justify-between sm:text-left"
        >
          <Footer.Copyright href="/" by="iknowaguy™" year={2024} />
        </div>
      </div>
    </Footer>
  );
}
