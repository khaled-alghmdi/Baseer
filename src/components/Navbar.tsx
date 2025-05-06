'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="py-6 mb-16">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            <ul className="flex items-center space-x-8 space-x-reverse">
              <li>
                <Link 
                  href="/reports" 
                  className={`relative px-4 py-2 rounded-md transition-all duration-300 ${
                    isActive('/reports') 
                      ? 'text-white bg-primary shadow-md hover:shadow-lg' 
                      : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <span className="relative z-10">التقارير</span>
                  {isActive('/reports') && (
                    <span className="absolute inset-0 bg-primary rounded-md animate-pulse-slow"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className={`relative px-4 py-2 rounded-md transition-all duration-300 ${
                    isActive('/dashboard') 
                      ? 'text-white bg-primary shadow-md hover:shadow-lg' 
                      : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <span className="relative z-10">لوحة المعلومات</span>
                  {isActive('/dashboard') && (
                    <span className="absolute inset-0 bg-primary rounded-md animate-pulse-slow"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`relative px-4 py-2 rounded-md transition-all duration-300 ${
                    isActive('/contact') 
                      ? 'text-white bg-primary shadow-md hover:shadow-lg' 
                      : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <span className="relative z-10">تواصل معنا</span>
                  {isActive('/contact') && (
                    <span className="absolute inset-0 bg-primary rounded-md animate-pulse-slow"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`relative px-4 py-2 rounded-md transition-all duration-300 ${
                    isActive('/about') 
                      ? 'text-white bg-primary shadow-md hover:shadow-lg' 
                      : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <span className="relative z-10">من نحن</span>
                  {isActive('/about') && (
                    <span className="absolute inset-0 bg-primary rounded-md animate-pulse-slow"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  href="/" 
                  className={`relative px-4 py-2 rounded-md transition-all duration-300 ${
                    isActive('/') 
                      ? 'text-white bg-primary shadow-md hover:shadow-lg' 
                      : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <span className="relative z-10">الرئيسية</span>
                  {isActive('/') && (
                    <span className="absolute inset-0 bg-primary rounded-md animate-pulse-slow"></span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
