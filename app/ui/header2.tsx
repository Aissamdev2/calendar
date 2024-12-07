'use client'

import Image from "next/image"
import { useEffect, useRef, useState } from "react";


export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    } 
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full px-1 py-1 z-[100]">
      <nav className="bg-gradient-to-r bg-gray-800/80 backdrop-blur-md px-6 py-2 flex items-center justify-between rounded-lg shadow-lg">
        {/* Logo or Title */}
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="45" data-id="lg_r2WzWjhLq4UpEuSA6T" data-version="1" viewBox="500 0 1000 289"><g data-padding="20"><g ><rect width="574.166" height="196.62" x="0" y="0" fill="none" rx="0" ry="0"/><path fill="#fff" d="M865.56 209.76q-26.32 0-42.4-17.69-16.07-17.68-16.07-46.81 0-33.15 20.09-55.86 20.09-22.7 49.43-22.7 11.65 0 21.6 2.11 9.94 2.11 14.16 4.32l4.02 2.21-11.65 27.92q-6.03-4.01-16.28-7.53-10.24-3.52-18.08-3.52-16.28 0-26.12 11.46-9.85 11.45-9.85 30.34 0 25.51 9.35 39.78 9.34 14.27 26.02 14.27 10.85 0 20.49-3.02V153.9h-25.92l2.01-20.3h48.22l-1.8 32.76 1.4 34.76q-29.53 8.64-48.62 8.64m152.9-2.21h-73.54l2.41-48.83-2.41-89.81h75.35l-2.21 21.5h-45.21l-1.2 35.56h40.18l-2.21 21.3h-38.78l-.2 8.03 1.41 30.95h48.62Zm58.27-140.06 25.32 77.36h2.01l29.33-76.36 27.73.81.81 86.4 3.81 51.84h-27.12l1-52.25-2.21-52.84-24.11 66.51-24.71 1.2-22.51-67.71-1.8 52.84 1.4 52.25h-24.91l2.81-48.83 1.2-86.2Zm112.72 42.8 26.93-5.03-2.41 50.03 2.21 47.22-26.93 5.03 2.41-48.83Zm-1.4-34.46q0-6.73 5.22-12.06 5.23-5.32 12.06-5.32t10.44 3.71q3.62 3.72 3.62 11.16 0 7.43-5.12 12.76-5.13 5.32-11.86 5.32t-10.55-4.42q-3.81-4.42-3.81-11.15m127.59-6.92-2.21 21.5h-42.8l-1.21 36.97h38.38l-2.21 21.29h-36.77l-.2 6.63 2.41 52.25h-28.13l2.41-48.83-2.41-89.81ZM768.734.192c-38.872 0-55.04 35.432-61.92 72.928-36.132 4.462-63.276 35.146-63.296 71.552 0 33.712 23.392 62.264 55.04 69.832-3.784 31.648-11.352 61.92-27.52 63.296-19.264 1.376-15.824-22.36-31.992-14.448-13.76 6.88 7.224 25.456 23.048 25.456 38.872 0 55.04-35.432 61.92-72.928 36.13-4.197 63.364-34.834 63.296-71.208 0-33.712-23.392-62.264-55.04-69.832 3.784-31.648 11.352-61.92 27.52-63.296 19.264-1.376 15.824 22.36 31.992 14.448 13.76-7.224-6.88-25.8-23.048-25.8M657.28 144.672c0-28.208 20.296-51.944 47.128-57.104-2.752 23.048-2.752 45.752-2.752 59.856 0 9.632 0 30.616-2.064 53.32-24.424-6.88-42.312-29.584-42.312-56.072m116.272 0c0 28.208-20.296 51.944-47.128 57.104 2.752-23.048 2.752-45.752 2.752-59.856 0-9.632 0-30.616 2.064-53.32 24.424 6.88 42.312 29.584 42.312 56.072"/></g><path fill="transparent" stroke="transparent" d="M618 0h764v289H618z"/></g></svg>
      {/* Right Section */}
      <div className="relative" ref={dropdownRef} >
        {/* Profile Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`flex items-center ${dropdownOpen ? "bg-gray-500" : "hover:bg-gray-500"} text-white px-4 py-2 gap-1 rounded-lg focus:outline-none`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

          <span>Perfil</span>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-gray-700 text-white rounded-lg shadow-lg">
            {/* Profile Info */}
            <div className="p-4 border-b border-gray-600">
              <div className="flex items-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-300">johndoe@example.com</p>
                </div>
              </div>
            </div>

            {/* Options */}
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Settings</li>
              <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Account</li>
              <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Help</li>
            </ul>

            {/* Logout */}
            <div className="px-4 py-2 border-t hover:bg-[#954646] rounded-lg border-gray-600">
              <button
                className="text-red-500 font-semibold w-full text-left"
                onClick={() => alert("Logged out")}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      </nav>
    </header>
  )
}