'use client'

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [state, setState] = useState(() => pathname.split('/').pop()); 

  const menu = ['Asignaturas', 'Otro'];
  const hrefMenu = ['subjects', 'other'];


  return (
    <div className="w-full h-full flex">
      <div className="w-[15%] border-r border-[#a19aff6b] p-4 bg-white flex-col justify-start items-start gap-6 inline-flex">
          <div className="w-full h-8 px-3 items-center flex">
            <h6 className="text-gray-500 text-sm font-semibold leading-4">MENÚ DE AJUSTES</h6>
          </div>
          <ul className="flex-col gap-1 flex ml-3 w-full">
            {
              hrefMenu.map((item, index) => (
                <Link key={index} href={`/gemif/settings/${hrefMenu[index]}`} onClick={() => setState(item)} className={`flex-col flex w-full p-3 ${state === item ? 'border-l-[4px] border-[#a19affb3] bg-[#f0f0ff]' : 'bg-white'} cursor-pointer`}>
                  <h2 className="text-gray-500 text-sm font-medium leading-snug">{menu[index]}</h2>
                </Link>
              ))
            }
          </ul>
      </div>
      {children}
    </div>
  );
}