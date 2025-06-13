"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { HiMiniDocumentCurrencyDollar } from "react-icons/hi2";
const Sidebar = () => {
  
 const pathname  = usePathname();

  return (
    <aside className="w-20 bg-[#161B29] p-4 flex flex-col items-center sticky top-0 h-screen">
      <nav className="flex flex-col gap-6 mt-4">
        <Link href="/pages/dashboard" className={`p-3 rounded-lg transition-colors text-3xl ${pathname?.includes('/dashboard') ? 'bg-cyan-400/20 text-[#00E0FF]' : 'text-gray-400 hover:bg-gray-700'}`} title="Dashboard">
                  <GoHomeFill />
        </Link>

           <Link href="/pages/meus-investimentos" className={`p-3 rounded-lg transition-colors text-3xl ${pathname?.includes('/meus-investimentos') ? 'bg-cyan-400/20 text-[#00E0FF]' : 'text-gray-400 hover:bg-gray-700'}`} title="Dashboard">
                <HiMiniDocumentCurrencyDollar />
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;