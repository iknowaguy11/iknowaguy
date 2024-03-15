
'use client';
import logoApp from '../../public/logoinknow.png'
import Image from 'next/image'
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Link from 'next/link';

export function AppNavbar() {
  return (
    <header className="bg-white fixed top-0 w-full z-20">
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <Image
          src={logoApp}
          alt="Picture of the author"
          className="mr-3 h-10 w-44 sm:h-9"
        />

      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
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
        <Navbar.Link href="#">
          Home
        </Navbar.Link>
        <Navbar.Link href="#" className=''>Jobs</Navbar.Link>
        <Navbar.Link href="#">Post a Project</Navbar.Link>
        <Navbar.Link href="/recommend" as={Link}>Recommend "a guy"</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </header>
  );
}
