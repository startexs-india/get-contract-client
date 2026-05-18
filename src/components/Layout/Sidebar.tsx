'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useCompanyId } from '@/hooks/useCompanyId';
import {
  HomeIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  UserGroupIcon,
  UserIcon,
  TruckIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  AcademicCapIcon,
  ScaleIcon,
  BriefcaseIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const topNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Tenders', href: '/tenders', icon: DocumentTextIcon },
  { name: 'Applied Applications', href: '/tender-applied', icon: ClipboardDocumentCheckIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
];

const companyChildren = (slug: string) => [
  { name: 'Basic Info', href: `/company/${slug}`, icon: BuildingOfficeIcon },
  { name: 'Directors', href: `/company/${slug}/directors`, icon: UserGroupIcon },
  { name: 'Engineers', href: `/company/${slug}/engineers`, icon: UserIcon },
  { name: 'Equipment', href: `/company/${slug}/equipment`, icon: TruckIcon },
  { name: 'Registrations', href: `/company/${slug}/registrations`, icon: ClipboardDocumentCheckIcon },
  { name: 'Audits', href: `/company/${slug}/audits`, icon: ChartBarIcon },
  { name: 'Experience Certificates', href: `/company/${slug}/experience-certificates`, icon: AcademicCapIcon },
  { name: 'Experience Quantities', href: `/company/${slug}/experience-quantities`, icon: ScaleIcon },
  { name: 'Existing Commitments', href: `/company/${slug}/commitments`, icon: BriefcaseIcon },
  { name: 'My Bids', href: `/company/${slug}/bids`, icon: DocumentTextIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const { slug } = useCompanyId();
  const [companyOpen, setCompanyOpen] = useState(true);

  const hasCompany = !!slug;
  const children = hasCompany ? companyChildren(slug) : [];
  const isCompanyActive = hasCompany && children.some((c) => pathname.startsWith(c.href));

  return (
    <aside
      className={`left-0 z-19 bg-white shadow-lg transition-transform duration-300 ease-in-out
  ${sidebarOpen
          ? 'translate-x-0'
          : '-translate-x-full'
        }
  lg:translate-x-0`}
      style={{
        width: '280px',
        height: 'calc(100vh - 64px)',
      }}
    >
      {/* h-full + min-h-screen ensures sidebar never shrinks when submenu collapses */}
      <div className="flex flex-col h-full min-h-screen">
        <nav className="flex-1 px-2 py-4 overflow-y-auto">

          {/* Top-level links */}
          {topNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1 ${active
                  ? 'bg-primary-100 text-primary-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}

          {/* Divider before company section */}
          <div className="my-3 border-t border-gray-100" />

          {/* Company section */}
          <div>
            <button
              onClick={() => hasCompany && setCompanyOpen(!companyOpen)}
              disabled={!hasCompany}
              className={`w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md ${isCompanyActive
                ? 'bg-primary-50 text-primary-700'
                : hasCompany
                  ? 'text-gray-600 hover:bg-gray-50'
                  : 'text-gray-400 cursor-not-allowed'
                }`}
            >
              <div className="flex items-center">
                <BuildingOfficeIcon className="mr-3 h-5 w-5 flex-shrink-0" />
                Company Profile
              </div>
              {hasCompany &&
                (companyOpen ? (
                  <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
                ))}
            </button>

            {/* No company → create prompt */}
            {!hasCompany && (
              <div className="ml-4 mt-2">
                <Link
                  href="/company/new"
                  className="flex items-center gap-2 px-2 py-2 text-sm text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-md"
                >
                  <PlusCircleIcon className="h-4 w-4 flex-shrink-0" />
                  Create Company
                </Link>
                <p className="px-2 text-xs text-gray-400 mt-1">
                  Create a company to unlock this section.
                </p>
              </div>
            )}

            {/* Submenu — max-height transition so the sidebar height is never affected */}
            {hasCompany && (
              <div
                className="ml-4 overflow-hidden transition-all duration-200 ease-in-out"
                style={{ maxHeight: companyOpen ? '700px' : '0px' }}
              >
                <div className="space-y-1 mt-1 pb-1">
                  {children.map((child) => {
                    const active = pathname === child.href;
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`flex items-center px-2 py-2 text-sm rounded-md ${active
                          ? 'bg-primary-100 text-primary-900'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                      >
                        <child.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                        {child.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}