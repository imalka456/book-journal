"use client"

import Link from 'next/link';
import { BsArrowLeftShort, BsJournalCheck } from "react-icons/bs";
import { useState } from 'react';
import { MdDashboard, MdManageSearch, MdGames } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen]= useState(true);
  const pathname = usePathname();

  const menus = [
    {title: "My Dashboard", href: "/", icon: <MdDashboard />},
    {title: "My Book Journal", href: "/book-journal", icon: <BsJournalCheck />},
    {title: "Word Search History", href: "/search-history", icon: <MdManageSearch />},
    {title: "Word Games", href: "/games", icon: <MdGames />}
  ]

  return (
    <nav className="bg-dark-blue p-5 h-screen">
      <div className={`dark-blue text-white ${isOpen ? "w-64" : "w-20"}  p-4 transition-all duration-300 relative`}>
        <div className="px-4 pb-4 relative">
          <BsArrowLeftShort className={`bg-white text-3xl rounded-full text-dark-blue absolute
           -right-10 border border-dark-blue cursor-pointer ${!isOpen && "rotate-180"}`}
          onClick={() => setIsOpen(!isOpen)}/>
        </div>
        
        <div className='inline-flex pb-8'>
          <FaBook className={`w-8 h-8 flex-shrink-0 text-white text-2xl rounded block cursor-pointer float-left mr-4 duration-500 ${isOpen && "rotate-[360deg]"}`} />
          <h1 className={`font-bold block origin-left text-base font-bold text-xl duration-300 ${!isOpen && "scale-0"}`}>My Book App</h1>
        </div>
        
      <div className=''>
          {menus.map((menu, index) => (            
            <li key={index} className="list-none">
              <Link href={menu.href} className={`block py-2  hover:bg-hover-color ${pathname === menu.href ? "bg-active-color" : ""} flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2`}
              >
                <span className='text-2xl text-gray-400 block float-left'>
                  {menu.icon ? menu.icon : <MdDashboard/>}
                </span>
                <span className={`text-base font-medium flex-1 duration-200 ${!isOpen && "hidden"}`}>{menu.title}</span>
              </Link>
            </li> 
          ))}
      </div>
      </div>
    </nav>
  );
}