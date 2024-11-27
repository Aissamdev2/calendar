import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full">
      <nav className="fixed border-b border-solid border-prime-gray-200  w-full py-3 bg-inherit ">
        <div className="hidden w-full lg:flex lg:pl-11 " id="navbar-default-example">
            <ul className="flex items-center flex-col mt-4 lg:mt-0 lg:ml-auto lg:flex-row gap-4">
                <li>
                    <a className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3">Inicio</a>
                </li>
                <li>
                    <a className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3">Calendario</a>
                </li>
                <li>
                    <a className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3">Asignaturas</a>
                </li>
                <li>
                    <a className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3">Cuenta</a>
                </li>
            </ul>
        </div>
      </nav>
  </header>
);
}