'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { navData } from '@/data/navData';
import { useRouter } from 'next/navigation';
import TopStrip from './TopStrip';
import { useSelector, useDispatch } from 'react-redux';
import { persistor, RootState } from '@/store/store';
import { logout } from '@/store/slices/authSlice';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ use Redux directly — no local state copy
  const { user, token } = useSelector((state: RootState) => state.auth);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await persistor.purge();
      // ✅ clear cookie
      if (typeof document !== 'undefined') {
        document.cookie = 'token=; path=/; max-age=0';
      }
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <TopStrip />
      <header className="bg-white border-b border-gray-300 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">

            {/* Left Logo */}
            <div className="flex gap-3">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-2xl text-gray-700 lg:hidden"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
              <Link href="/">
                <img
                  src="/assets/images/bidsmartai_logo.png"
                  alt="bidsmartai"
                  className="w-[100px] max-[900px]:w-[60px]"
                />
              </Link>
            </div>

            {/* MOBILE MENU */}
            <div className="lg:hidden">
              <div
                className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                  }`}
              >
                <div className="flex items-center justify-between p-5 border-b">
                  <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>

                <ul className="flex flex-col p-4">
                  <li className="border-b border-gray-200">
                    <Link
                      href="/"
                      className="flex items-center py-4 text-gray-700 font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>

                  {navData.map((item: any) => {
                    if (item.title === 'Dashboard' && !token) return null;
                    if (item.title === 'Login' && token) return null;

                    return (
                      <li key={item.id} className="border-b border-gray-200">
                        {item.children ? (
                          <>
                            <button
                              onClick={() => toggleDropdown(item.id)}
                              className="w-full flex items-center justify-between py-4 text-gray-700 font-medium"
                            >
                              {item.title}
                              {activeDropdown === item.id ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </button>
                            {activeDropdown === item.id && (
                              <ul className="pl-4 pb-3">
                                {item.children.map((child: any, idx: number) => (
                                  <li key={idx}>
                                    <Link
                                      href={child.link}
                                      className="block py-2 text-gray-600 hover:text-blue-600"
                                      onClick={() => {
                                        setMenuOpen(false);
                                        setActiveDropdown(null);
                                      }}
                                    >
                                      {child.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link
                            href={item.link}
                            className="flex items-center py-4 text-gray-700 font-medium"
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.title}
                          </Link>
                        )}
                      </li>
                    );
                  })}

                  {/* ✅ use token from Redux directly */}
                  {token && (
                    <li className="border-b border-gray-200">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left py-4 text-red-500 font-medium"
                      >
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </div>

              {menuOpen && (
                <div
                  className="fixed inset-0 bg-black/40 z-40"
                  onClick={() => setMenuOpen(false)}
                />
              )}
            </div>

            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex lg:text-[14px] xl:text-[16px] items-center">
              <ul ref={navRef} className="flex items-center gap-6">
                {/* NORMAL NAV ITEMS */}
                {navData.map((item: any) => (
                  <li
                    key={item.id}
                    className="relative group"
                  >
                    {item.children ? (
                      <>
                        <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition">
                          {item.title}

                          <FaChevronDown className="text-xs" />
                        </button>

                        <ul className="absolute top-full left-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                          {item.children.map(
                            (
                              child: any,
                              idx: number
                            ) => (
                              <li key={idx}>
                                <Link
                                  href={child.link}
                                  className="block px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition"
                                >
                                  {child.title}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </>
                    ) : (
                      <Link
                        href={item.link}
                        className="text-gray-700 hover:text-blue-600 font-medium transition"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}


              </ul>
            </nav>

            <div className='flex gap-10'>
              {/* RIGHT SIDE AUTH SECTION */}
              <li className="lg:ml-10 xl:ml-20 flex items-center gap-4">

                {!token ? (
                  <Link
                    href="/login"
                    className="text-white rounded-lg px-3 py-1 border-2 bg-[#2e5f9b] hover:border-[#2e5f9b] font-medium transition"
                  >
                    Login
                  </Link>
                ) : (
                  <>
                    {/* USER NAME */}
                    <Link
                      href="/dashboard"
                      className="text-blue-600 hover:text-blue-800 font-bold transition"
                    >
                      {user?.name || "Dashboard"}
                    </Link>

                    {/* LOGOUT */}
                    <button
                      onClick={handleLogout}
                      className="hidden sm:block px-5 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition font-medium"
                    >
                      Logout
                    </button>
                  </>
                )}
              </li>
              {/* Right Logo */}
              <div className="text-center">
                <Link href="/" className="block">
                  <img
                    src="/assets/images/logo2.jpg"
                    alt="new hope"
                    className="w-[70px] max-[900px]:w-[50px] mx-auto"
                  />
                  <p className="font-semibold text-[#0088b7]">NHAASCPL</p>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;