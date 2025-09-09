'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, BookOpenIcon, TagIcon, TrendingUpIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
interface SidebarProps {
  mobile: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({
  mobile
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  // No aplicamos la lógica de contracción en móvil
  const handleMouseEnter = () => {
    if (!mobile) setIsExpanded(true);
  };
  const handleMouseLeave = () => {
    if (!mobile) setIsExpanded(false);
  };
  return <div className={`h-0 flex-1 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out ${!mobile && 'group'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Logo */}
      <div className="flex items-center justify-center h-40 flex-shrink-0 px-4 bg-custom-green-800 overflow-hidden shadow-md">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Full logo for expanded state */}
          <img src="/iso-1-white.png" alt="Xquisito Logo" className={`h-20 w-auto transition-opacity duration-300 ${mobile || isExpanded ? 'opacity-100' : 'opacity-0 absolute'}`} />
          {/* X-only logo for collapsed state */}
          <div className={`flex items-center justify-center transition-opacity duration-300 ${mobile || isExpanded ? 'opacity-0 absolute' : 'opacity-100'}`}>
            <div className="h-12 w-12 flex items-center justify-center overflow-hidden">
              <img src="/iso-1-white.png" alt="Xquisito Logo" className="h-12 object-cover" style={{
              objectPosition: 'center',
              width: '48px'
            }} />
            </div>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <nav className="mt-6 flex-1 px-3 bg-white space-y-2">
        <Link href="/" className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${pathname === '/' ? 'bg-custom-green-100 text-custom-green-900 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
          <HomeIcon className={`flex-shrink-0 h-5 w-5 ${mobile || isExpanded ? 'mr-3 text-custom-green-600' : 'mx-auto text-gray-500'} transition-all duration-200`} />
          <span className={`${!mobile && !isExpanded ? 'hidden' : 'block'} transition-opacity duration-200`}>
            Inicio
          </span>
        </Link>
        <Link href="/menu" className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${pathname === '/menu' ? 'bg-custom-green-100 text-custom-green-900 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
          <BookOpenIcon className={`flex-shrink-0 h-5 w-5 ${mobile || isExpanded ? 'mr-3 text-custom-green-600' : 'mx-auto text-gray-500'} transition-all duration-200`} />
          <span className={`${!mobile && !isExpanded ? 'hidden' : 'block'} transition-opacity duration-200`}>
            Menú
          </span>
        </Link>
        <Link href="/promotions" className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${pathname === '/promotions' ? 'bg-custom-green-100 text-custom-green-900 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
          <TagIcon className={`flex-shrink-0 h-5 w-5 ${mobile || isExpanded ? 'mr-3 text-custom-green-600' : 'mx-auto text-gray-500'} transition-all duration-200`} />
          <span className={`${!mobile && !isExpanded ? 'hidden' : 'block'} transition-opacity duration-200`}>
            Dine
          </span>
        </Link>
        <Link href="/rewards" className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${pathname === '/rewards' ? 'bg-custom-green-100 text-custom-green-900 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
          <TrendingUpIcon className={`flex-shrink-0 h-5 w-5 ${mobile || isExpanded ? 'mr-3 text-custom-green-600' : 'mx-auto text-gray-500'} transition-all duration-200`} />
          <span className={`${!mobile && !isExpanded ? 'hidden' : 'block'} transition-opacity duration-200`}>
            Scala
          </span>
        </Link>
        <Link href="/settings" className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${pathname === '/settings' ? 'bg-custom-green-100 text-custom-green-900 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
          <SettingsIcon className={`flex-shrink-0 h-5 w-5 ${mobile || isExpanded ? 'mr-3 text-custom-green-600' : 'mx-auto text-gray-500'} transition-all duration-200`} />
          <span className={`${!mobile && !isExpanded ? 'hidden' : 'block'} transition-opacity duration-200`}>
            Configuración
          </span>
        </Link>
        <div className="pt-4 mt-6 border-t border-gray-200">
          <button onClick={() => alert('Sesión cerrada')} className="w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200">
            <LogOutIcon className={`flex-shrink-0 h-5 w-5 text-red-500 ${mobile || isExpanded ? 'mr-3' : 'mx-auto'}`} />
            <span className={`${!mobile && !isExpanded ? 'hidden' : 'block'} transition-opacity duration-200`}>
              Cerrar sesión
            </span>
          </button>
        </div>
      </nav>
    </div>;
};
export default Sidebar;