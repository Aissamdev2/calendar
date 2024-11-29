'use client'
import AccountButton from "./account-button";
import { useUser } from "../lib/use-user";

export default function Header() {
    
    const { user, isLoading } = useUser();

  return (
    <header className="w-full">
    <nav className="absolute top-0 border-solid border-gray-200 w-full border-b z-50 py-1 bg-indigo-500">
      <div className=" w-full">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full flex justify-between items-center lg:flex-row">
            <ul className="flex mx-[30px] gap-2">
              <li className="py-2 cursor-pointer rounded-lg text-white hover:bg-indigo-400 transition-[background-color] duration-300">
                <a className="flex items-center justify-center  text-sm lg:text-base font-medium  transition-all duration-500 mb-2 lg:mx-3 md:mb-0">Inicio</a>
              </li>
              <li className="py-2 cursor-pointer rounded-lg text-white hover:bg-indigo-400 transition-[background-color] duration-300">
                <a className="flex items-center justify-center text-sm lg:text-base font-medium transition-all duration-500 mb-2 lg:mx-3 md:mb-0 md:mr-3">Calendario</a>
              </li>
              <li className="py-2 cursor-pointer rounded-lg text-white hover:bg-indigo-400 transition-[background-color] duration-300">
                <a className="flex items-center justify-center text-sm lg:text-base font-medium transition-all duration-500 mb-2 lg:mx-3 md:mb-0 md:mr-3">Asignaturas</a>
              </li>
            </ul>
            <ul className="mr-[100px] py-3">
              <li>
                <AccountButton user={user} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>                            
    </header>
);
}