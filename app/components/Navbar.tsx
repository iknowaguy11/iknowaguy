
'use client';
import logoApp from '../../public/logoinknow.png';
import Image from 'next/image'
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import Link from 'next/link';
import { customsubmitTheme } from '../customTheme/appTheme';

export function AppNavbar() {
  return (
    <header className="bg-white fixed top-0 w-full z-20">
      <Navbar fluid rounded>
        <Navbar.Brand href="/" as={Link}>
          <Image
            src={logoApp}
            alt="Picture of the author"
            className="mr-3 w-auto sm:h-9"
            width={176}
            height={40}
            priority
          />

        </Navbar.Brand>
        <div className="flex md:order-2 gap-2">
          <div className='btns flex flex-row gap-1'>
            <Button theme={customsubmitTheme} size={"xs"} color='appsuccess'>Login</Button>
            <Button theme={customsubmitTheme} size={"xs"} color='appsuccess'>Sig nup</Button>
          </div>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img={"/caponlycrop.png"} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">name@iknowaguy.com</span>
            </Dropdown.Header>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />

        </div>
        <Navbar.Collapse>
          <Navbar.Link as={Link} href="/">
            Home
          </Navbar.Link>
          <Navbar.Link href="#" className=''>Jobs</Navbar.Link>
          <Navbar.Link href="#">Post a Project</Navbar.Link>
          <Navbar.Link href="/recommend" as={Link}>Recommend "a guy"</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
          <div className='logSign'>
          <Button className='m-2' theme={customsubmitTheme} size={"xs"} color='appsuccess'>Login</Button>
          <Button className='m-2' theme={customsubmitTheme} size={"xs"} color='appsuccess'>Sig nup</Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
