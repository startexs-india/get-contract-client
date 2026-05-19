'use client';

import { useState } from "react";

import Footer from "@/components/Layout/Footer";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";

import {
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50">

      {/* Navbar */}
      <Navbar />

      {/* MOBILE SIDEBAR BUTTON */}
      {!sidebarOpen && <button
        onClick={() =>
          setSidebarOpen(true)
        }
        className="fixed top-200 left-0 z-19 lg:hidden flex items-center justify-center h-10 rounded-md bg-[#2e5f9b] shadow-lg border border-gray-200"
      >
        <ChevronRightIcon className="w-6 h-6 text-white font-bold" />
      </button>}

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* Dashboard Body */}
      <div className="flex">

        {/* MOBILE SIDEBAR */}
        <div
          className={`
            fixed top-0 left-0 z-50 h-full
            transition-transform duration-300 ease-in-out
            lg:hidden

            ${sidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
            }
          `}
        >
          <div className="relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() =>
                setSidebarOpen(false)
              }
              className="absolute right-0 z-50 p-1 rounded-lg shadow"
            >
              <XMarkIcon className="w-6 h-6 text-white stroke-[3]" />
            </button>

            <Sidebar />
          </div>
        </div>

        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </div>

      <Footer />
    </div>
  );
}