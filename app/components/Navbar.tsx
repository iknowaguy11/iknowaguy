'use client';
import logoApp from '../../public/logoinknow.png';
import Image from 'next/image';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import Link from 'next/link';
import { customsubmitTheme } from '../customTheme/appTheme';
import { useRouter } from 'next/navigation';
import { Suspense, useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/appContext';
import { getAuth } from 'firebase/auth';
import { useFetchUserAccount } from '../_hooks/useFetch';
import ProfileSkeleton from './loading';
import { app } from '../DB/firebaseConnection';

export function AppNavbar() {
  const router = useRouter();
  const { isLoggedIn, setLoggedIn, ukey } = useContext(AppContext);
  const { UserData } = useFetchUserAccount(ukey);
  const auth = getAuth(app);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

 

  return (
    <header className="bg-white fixed top-0 w-full z-20 shadow-md">
      {(menuOpen || profileDropdownOpen) && (
        <div
          className={`fixed inset-0 bg-black ${profileDropdownOpen ? 'bg-opacity-30' : 'bg-opacity-50'
            } z-10`}
          onClick={() => {
            setMenuOpen(false);
            setProfileDropdownOpen(false);
          }}
        />
      )}

      <Navbar fluid rounded className="relative z-20">
        <Navbar.Brand href="/" as={Link}>
          <Image
            src={logoApp}
            alt="App Logo"
            className="mr-3 w-auto sm:h-9"
            width={176}
            height={40}
            priority
          />
        </Navbar.Brand>
        <div className="flex md:order-2 gap-2">
          {isLoggedIn ? (
            <Suspense fallback={<ProfileSkeleton />}>
              <Dropdown className='mt-1 border rounded-md'
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    className="object-contain aspect-square"
                    alt="User Profile"
                    img={UserData[0]?.profileImage}
                    placeholderInitials={UserData[0]?.companyName?.substring(0, 1).toUpperCase()}
                    rounded
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    <Link href="/profile">
                      {UserData[0]?.membership === 'contractor' && UserData[0]?.companyName
                        ? UserData[0]?.companyName
                        : UserData[0]?.YourName}
                    </Link>
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {UserData[0]?.companyEmail}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item
                  onClick={() => {
                    try {
                      auth.signOut();
                      window?.sessionStorage.setItem('ukey', '');
                      setLoggedIn(false);
                      window?.sessionStorage.clear();
                      router.push('/');
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </Suspense>
          ) : (
            <div className="hidden md:flex flex-row gap-1">
              <Button
                onClick={() => router.push('/login')}
                theme={customsubmitTheme}
                size="xs"
                color="appsuccess"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push('/register')}
                theme={customsubmitTheme}
                size="xs"
                color="appsuccess"
              >
                Sign Up
              </Button>
            </div>
          )}
          <Navbar.Toggle
            onClick={() => setMenuOpen(!menuOpen)}
            className={menuOpen ? 'open' : ''}
          />
        </div>

        <Navbar.Collapse className={`flex flex-col lg:flex-row  items-start lg:items-center ${menuOpen ? 'block' : 'hidden'}`}>
          <Navbar.Link onClick={() => document.getElementById('whatIsIkg')?.scrollIntoView({ behavior: 'smooth' })}>
            What Is IKAG
          </Navbar.Link>
          <Navbar.Link onClick={() => document.getElementById('HowItWorks')?.scrollIntoView({ behavior: 'smooth' })}>
            How It Works
          </Navbar.Link>
          <Navbar.Link onClick={() => document.getElementById('jobSection')?.scrollIntoView({ behavior: 'smooth' })}>
            Current Projects
          </Navbar.Link>
          {UserData[0]?.Id && UserData[0]?.membership?.trim().toLowerCase() === 'homeowner' && (
            <Navbar.Link as={Link} href="/postproject">
              Post A Project
            </Navbar.Link>
          )}
          <Navbar.Link as={Link} href="/recommend">
            Recommend A &quot;Guy&quot;
          </Navbar.Link>
          <Navbar.Link onClick={() => document.getElementById('inspirations')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Inspired
          </Navbar.Link>
          <Navbar.Link onClick={() => document.getElementById('bottom')?.scrollIntoView({ behavior: 'smooth' })}>
            Contact
          </Navbar.Link>

          {!isLoggedIn && (
            <div className="flex flex-row justify-center items-center mb-2 gap-2 mt-4 md:hidden">
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  router.push('/login');
                }}
                theme={customsubmitTheme}
                size="md"
                color="appsuccess"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  router.push('/register');
                }}
                theme={customsubmitTheme}
                size="md"
                color="appsuccess"
              >
                Sign Up
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
