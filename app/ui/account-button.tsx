import { signOut } from "../lib/auth"
import { User } from "../lib/definitions"
import { useFormState, useFormStatus } from "react-dom"
import { useEffect, useRef, useState } from "react"

export default function AccountButton({ user }: { user: User | undefined }) {
  const [errorMessage, dispatch] = useFormState(signOut, undefined)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    } 
  }, []);

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
    <button type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex justify-center items-center gap-2 py-1 px-2 text-[16px] text-white hover:bg-indigo-400 transition-[background-color] duration-300 rounded-lg cursor-pointer font-semibold text-center">
      Cuenta
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M13.3331 5.83333C13.3331 7.67428 11.8407 9.16667 9.99976 9.16667C8.15881 9.16667 6.66642 7.67428 6.66642 5.83333C6.66642 3.99238 8.15881 2.5 9.99976 2.5C11.8407 2.5 13.3331 3.99238 13.3331 5.83333Z" stroke="white" strokeWidth="1.6"></path>
         <path d="M9.99976 11.6667C7.62619 11.6667 5.54235 12.752 4.36109 14.3865C3.73609 15.2513 3.42359 15.6837 3.88775 16.5918C4.35192 17.5 5.12342 17.5 6.66642 17.5H13.3331C14.8761 17.5 15.6476 17.5 16.1118 16.5918C16.5759 15.6837 16.2634 15.2513 15.6384 14.3865C14.4572 12.752 12.3733 11.6667 9.99976 11.6667Z" stroke="white" strokeWidth="1.6"></path>
       </svg>
    </button>
    {
      isOpen && (
        <div id="dropdown-with-subheading" className="dropdown-menu rounded-xl shadow-xl bg-white absolute right-[0] top-full w-72 mt-2 divide-y divide-gray-200" >
          <div className="px-4 py-3 flex gap-3 ">
          <div className="block mt-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3331 5.83333C13.3331 7.67428 11.8407 9.16667 9.99976 9.16667C8.15881 9.16667 6.66642 7.67428 6.66642 5.83333C6.66642 3.99238 8.15881 2.5 9.99976 2.5C11.8407 2.5 13.3331 3.99238 13.3331 5.83333Z" stroke="black" strokeWidth="1.6"></path>
              <path d="M9.99976 11.6667C7.62619 11.6667 5.54235 12.752 4.36109 14.3865C3.73609 15.2513 3.42359 15.6837 3.88775 16.5918C4.35192 17.5 5.12342 17.5 6.66642 17.5H13.3331C14.8761 17.5 15.6476 17.5 16.1118 16.5918C16.5759 15.6837 16.2634 15.2513 15.6384 14.3865C14.4572 12.752 12.3733 11.6667 9.99976 11.6667Z" stroke="black" strokeWidth="1.6"></path>
            </svg>
          </div>
          <div className="block">
            <div className="text-indigo-600 font-normal mb-1">{user?.name}</div>
            <div className="text-sm text-gray-500 font-medium truncate">{user?.email}</div>
          </div>
          </div>
          <ul className="py-2">
          <span className="block px-6 py-2 text-sm font-medium text-gray-500 ">Ajustes y Notificaciones</span>
          <li>
            <a className="flex cursor-pointer items-center gap-3 px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.4167 7.5C16.5673 7.5 17.5 8.43274 17.5 9.58333V12.5C17.5 14.857 17.5 16.0355 16.7678 16.7678C16.0355 17.5 14.857 17.5 12.5 17.5H7.5C5.14298 17.5 3.96447 17.5 3.23223 16.7678C2.5 16.0355 2.5 14.857 2.5 12.5V9.58333C2.5 8.43274 3.43274 7.5 4.58333 7.5M10 13.3333L6.50337 9.83671M10 13.3333L13.4966 9.83671M10 13.3333V2.5" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg> Editar Cuenta </a>
          </li>
          <li>
            <a className="flex cursor-pointer items-center gap-3 px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10.8333H11.6667M5 13.3333H8.33333M11.3883 1.94437V5.55548C11.3883 6.47595 12.1345 7.22214 13.055 7.22214H16.6661M10.6985 1.66666H8.5C5.67157 1.66666 4.25736 1.66666 3.37868 2.54534C2.5 3.42402 2.5 4.83823 2.5 7.66666V12.3333C2.5 15.1618 2.5 16.576 3.37868 17.4546C4.25736 18.3333 5.67156 18.3333 8.49997 18.3333C9.30683 18.3333 10.1356 18.3333 10.945 18.3333C13.7731 18.3333 15.1871 18.3333 16.0658 17.4546C16.9444 16.576 16.9444 15.1618 16.9444 12.3333V7.91257C16.9444 7.47054 16.7689 7.04662 16.4563 6.73406L11.877 2.15481C11.5645 1.84225 11.1406 1.66666 10.6985 1.66666Z" stroke="#111827" strokeWidth="1.6" strokeLinecap="round"></path>
              </svg> Asignaturas </a>
          </li>
          <li>
            <a className="flex cursor-pointer items-center gap-3  px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.1116 9.16666C15.2575 10.9606 15.8104 12.3731 16.3475 13.3586C16.7027 14.0104 16.2305 15 15.4881 15H4.51181C3.76939 15 3.27739 13.995 3.61578 13.3342C4.28214 12.0329 4.99996 9.94714 4.99996 6.99999C4.99996 5.58582 5.52663 4.22916 6.46413 3.22916C7.40246 2.22916 8.67496 1.66666 9.99996 1.66666C10.2808 1.66666 10.56 1.69166 10.8333 1.74166M11.4416 17.5C11.2953 17.7528 11.0851 17.9626 10.832 18.1085C10.579 18.2544 10.292 18.3312 9.99996 18.3312C9.70788 18.3312 9.42094 18.2544 9.1679 18.1085C8.91487 17.9626 8.70464 17.7528 8.5583 17.5M15 6.66666C15.663 6.66666 16.2989 6.40326 16.7677 5.93442C17.2366 5.46558 17.5 4.8297 17.5 4.16666C17.5 3.50362 17.2366 2.86773 16.7677 2.39889C16.2989 1.93005 15.663 1.66666 15 1.66666C14.3369 1.66666 13.701 1.93005 13.2322 2.39889C12.7634 2.86773 12.5 3.50362 12.5 4.16666C12.5 4.8297 12.7634 5.46558 13.2322 5.93442C13.701 6.40326 14.3369 6.66666 15 6.66666Z" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg> Notificaciones </a>
          </li>
        </ul>
        <form action={dispatch} className="py-2">
          <span className="block px-6 py-2 text-sm font-medium text-gray-500 ">Cerrar Sesión</span>
          <LogOutButton />
        </form>
      </div>
      )
    }
    </div>
  )
}

function LogOutButton() {
  const { pending } = useFormStatus()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (pending) {
      event.preventDefault()
    }
  }
  return (
    <button type="submit" aria-disabled={pending} className="block px-6 py-2  text-red-500 font-medium" onClick={handleClick}>
      {pending ? "Saliendo..." : "Salir"}
    </button>
  )
}