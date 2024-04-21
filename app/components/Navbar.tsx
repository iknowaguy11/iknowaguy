
'use client';
import logoApp from '../../public/logoinknow.png';
import Image from 'next/image'
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import Link from 'next/link';
import { customsubmitTheme } from '../customTheme/appTheme';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AppContext } from '../Context/appContext';
import { app } from '../DB/firebaseConnection';
import { getAuth } from 'firebase/auth';

export function AppNavbar() {
  const router=useRouter();
  const{isLoggedIn,setLoggedIn}=useContext(AppContext);
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
          <div className='btns flex flex-row gap-1'>
            <Button onClick={()=>router.push('login')} theme={customsubmitTheme} size={"xs"} color='appsuccess'>Login</Button>
            <Button onClick={()=>router.push("register")} theme={customsubmitTheme} size={"xs"} color='appsuccess'>Sign Up</Button>
          </div>
          {isLoggedIn &&
          <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={"/caponlycrop.png"} rounded />
          }
        >
          <Dropdown.Header>
            <span  className="block text-sm"><Link href={'/profile'}>Bonnie Green</Link></span>
            <span className="block truncate text-sm font-medium">name@iknowaguy.com</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={()=>{
            auth.signOut();
            setLoggedIn(false);
            router.replace("/");
          }}>Sign out</Dropdown.Item>
        </Dropdown>
        }
          <Navbar.Toggle />

        </div>
        <Navbar.Collapse>
          <Navbar.Link onClick={()=>{
            const element = document.getElementById('whatIsIkg');
            element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }}>
          What Is IKAG
          </Navbar.Link>
          <Navbar.Link onClick={()=>{
            const element = document.getElementById('HowItWorks');
            element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }}>
            How It Works
          </Navbar.Link>
          <Navbar.Link onClick={()=>{
            const element = document.getElementById('jobSection');
            element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }} >Current Projects</Navbar.Link>
          <Navbar.Link as={Link} href="/postproject">Post A Project</Navbar.Link>
          <Navbar.Link as={Link} href="/recommend">Recommend "A Guy"</Navbar.Link>
          <Navbar.Link onClick={()=>{
            const element = document.getElementById('inspirations');
            element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }} >Get Inspired</Navbar.Link>
          <Navbar.Link onClick={()=>{
            const element = document.getElementById('bottom');
            element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }} >Contact</Navbar.Link>
          <div className='logSign'>
          <Button className='m-2' theme={customsubmitTheme} size={"xs"} color='appsuccess'>Login</Button>
          <Button className='m-2' theme={customsubmitTheme} size={"xs"} color='appsuccess'>Sign Up</Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
