import Link from "next/link";

export default function Header() {
  return (
    <header className="lg:px-16 px-4 bg-[#d0e1ff] fixed top-0 w-full flex flex-wrap items-center py-4 shadow-md">
        <div className="flex-1 flex justify-between items-center">
            <Link href="#" className="text-xl">Company</Link>
        </div>

        <nav>
            <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                <li><Link className="md:p-4 py-3 px-0 block" href="/gemif/agenda">Agenda</Link></li>
                <li><Link className="md:p-4 py-3 px-0 block" href="#">Blog</Link></li>
                <li><Link className="md:p-4 py-3 px-0 block" href="#">AboutUs</Link></li>
                <li><Link className="md:p-4 py-3 px-0 block md:mb-0 mb-2" href="#">Contact Us</Link></li>
            </ul>
        </nav>
      </header>
  );
}