"use client"

import Link from 'next/link';
import { BsArrowLeftShort, BsJournalCheck } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { MdDashboard, MdManageSearch, MdGames } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { GiHamburgerMenu } from "react-icons/gi";

export default function LeftNavigation() {
  const [isOpen, setIsOpen] = useState(true); // For toggling the sidebar width on large screens
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false); // For toggling mobile navigation visibility
  const pathname = usePathname();

  const menus = [
    { id: 1, title: "My Dashboard", href: "/", icon: <MdDashboard /> },
    { id: 2, title: "My Book Journal", href: "/book-journal", icon: <BsJournalCheck /> },
    { id: 3, title: "Word Search History", href: "/search-history", icon: <MdManageSearch /> },
    { id: 4, title: "Word Games", href: "/games", icon: <MdGames /> }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768); // Sidebar is always open on larger screens
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className='w-full h-16 bg-dark-blue sm:hidden flex items-center px-6'>
      <span className='sm:hidden bg-dark-blue text-white text-3xl top-5 left-4 cursor-pointer mr-2'>
      <GiHamburgerMenu onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}/>
      </span>
      <span className='font-bold text-white block font-bold text-xl ml-4'>My Book App</span>
      </div>

      <div className={`ease-in-out duration-500 ${isOpenMobileNav ? "translate-x-0" : "-translate-x-full"}  sm:hidden`}>
        <nav className="bg-dark-blue h-screen max-sm:fixed max-sm:z-10">
          <div className={`dark-blue text-white w-64 p-2 px-4 relative`}>        
            <div>
              {menus.map((menu) => (            
                <li key={menu.id} className="list-none">
                  <Link href={menu.href} className={`block py-2  hover:bg-hover-color ${pathname === menu.href ? "bg-active-color" : ""} flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2`}>
                    <span className='text-2xl text-gray-400 block float-left'>
                    {menu.icon ? menu.icon : <MdDashboard/>}
                    </span>
                    <span className={`text-base font-medium flex-1`}>{menu.title}</span>
                  </Link>
                </li> 
              ))}
            </div>
          </div>
        </nav>
      </div>

      <div className='hidden sm:block'>
        <nav className="bg-dark-blue p-5 h-screen max-sm:fixed max-sm:z-10">
          <div className={`dark-blue text-white ${isOpen ? "w-64" : "w-20"} p-4 transition-all duration-300 relative`}>
            <div className="px-4 relative">
              <BsArrowLeftShort
              className={`bg-white text-3xl rounded-full text-dark-blue absolute
              -right-10 border border-dark-blue cursor-pointer ${!isOpen && "rotate-180"}`}
              onClick={() => setIsOpen(!isOpen)}
              />
            </div>

            <div className='inline-flex pb-8'>
              <FaBook className={`w-8 h-8 flex-shrink-0 text-white text-2xl rounded block cursor-pointer float-left mr-4 duration-500 ${isOpen && "rotate-[360deg]"}`} />
              <h1 className={`font-bold block origin-left text-base font-bold text-xl duration-300 ${!isOpen && "scale-0"}`}>My Book App</h1>
            </div>

            <div>
              {menus.map((menu) => (
                <li key={menu.id} className="list-none">
                  <Link
                    href={menu.href}
                    className={`block py-2 hover:bg-hover-color ${pathname === menu.href ? "bg-active-color" : ""} flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2`}
                    >
                    <span className='text-2xl text-gray-400'>
                    {menu.icon ? menu.icon : <MdDashboard />}
                    </span>
                    <span className={`text-base font-medium flex-1 duration-200 ${!isOpen && "hidden"}`}>{menu.title}</span>
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}