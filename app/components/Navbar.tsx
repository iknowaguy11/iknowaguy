
'use client';
import logoApp from '../../public/logoinknow.png';
import Image from 'next/image'
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import Link from 'next/link';
import { customsubmitTheme } from '../customTheme/appTheme';
import { useRouter } from 'next/navigation';
import { Suspense, useContext } from 'react';
import { AppContext } from '../Context/appContext';
import { app } from '../DB/firebaseConnection';
import { getAuth } from 'firebase/auth';
import { useFetchUserAccount } from '../_hooks/useFetch';
import ProfileSkeleton from './loading';

export function AppNavbar() {
  const router = useRouter();
  const { isLoggedIn, setLoggedIn, ukey } = useContext(AppContext);
  const { UserData } = useFetchUserAccount(ukey);
  const auth = getAuth(app);
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

          {isLoggedIn ?
            <Suspense fallback={<ProfileSkeleton />}>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar className='object-contain aspect-square' alt="User Profile" img={UserData[0]?.profileImage} placeholderInitials={UserData[0]?.companyName.substring(0, 1).toUpperCase()} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm"><Link href={'/profile'}>
                    {UserData[0]?.membership=="contractor" && UserData[0]?.companyName!==""  ? UserData[0]?.companyName :UserData[0]?.membership=="homeowner" ? UserData[0]?.YourName: UserData[0]?.membership=="contractor" && UserData[0]?.companyName==""  ?  UserData[0]?.YourName : null }</Link></span>
                  <span className="block truncate text-sm font-medium">{UserData[0]?.companyEmail}</span>
                </Dropdown.Header>
                <Dropdown.Item onClick={() => {
                  try {
                    auth.signOut();
                    window?.sessionStorage.setItem("ukey", "");
                    setLoggedIn(false);
                    window?.sessionStorage.clear();
                    router.replace("/");
                  } catch (error:any) {
                    console.log(error);
                  }
                }}>Sign out</Dropdown.Item>
              </Dropdown>
            </Suspense>
            :
            <div className='btns flex flex-row gap-1'>
              <Button onClick={() => router.push('/login')} theme={customsubmitTheme} size={'xs'} color='appsuccess'>Login</Button>
              <Button onClick={() => router.push("/register")} theme={customsubmitTheme} size={'xs'} color='appsuccess'>Sign Up</Button>
            </div>
          }
          <Navbar.Toggle />

        </div>
        <Navbar.Collapse>
          <Navbar.Link onClick={() => {
            const element = document.getElementById('whatIsIkg');
            element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }}>
            What Is IKAG
          </Navbar.Link>
          <Navbar.Link onClick={() => {
            const element = document.getElementById('HowItWorks');
            element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }}>
            How It Works
          </Navbar.Link>
          <Navbar.Link onClick={() => {
            const element = document.getElementById('jobSection');
            element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }}>Current Projects</Navbar.Link>
          {UserData[0]?.Id && UserData[0]?.membership?.trim().toLocaleLowerCase()=="homeowner" ? <Navbar.Link as={Link} href="/postproject">Post A Project</Navbar.Link> :null }
          
          <Navbar.Link as={Link} href="/recommend">Recommend A &quot;Guy&quot;</Navbar.Link>
          <Navbar.Link onClick={() => {
            const element = document.getElementById('inspirations');
            element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }} >Get Inspired</Navbar.Link>
          <Navbar.Link onClick={() => {
            const element = document.getElementById('bottom');
            element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }} >Contact</Navbar.Link>
          {
            isLoggedIn ?
              null
              : <div className='logSign'>
              <Button className='m-2' onClick={() => router.push('/login')} theme={customsubmitTheme} size={"xs"} color='appsuccess'>Login</Button>
              <Button className='m-2' onClick={() => router.push("/register")} theme={customsubmitTheme} size={"xs"} color='appsuccess'>Sign Up</Button>
            </div>
          }

        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
