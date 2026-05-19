'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Loader from '@/components/common/Loader';
import { DocumentTextIcon, ClipboardDocumentListIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  const stats = [
    // {
    //   name: 'Active Tenders',
    //   value: activeTenders.length,
    //   icon: DocumentTextIcon,
    //   href: '/tenders',
    //   color: 'bg-primary-500',
    // },
    // {
    //   name: 'Applications Submitted',
    //   value: appliedBids.length,
    //   icon: ClipboardDocumentListIcon,
    //   href: '/company',          // now points to Company Profile (Bids tab inside)
    //   color: 'bg-success',
    // },
    {
      name: 'Company Profile',
      value: user?.companyIds?.[0] ? 'View' : 'Setup',
      icon: BuildingOfficeIcon,
      href: '/company',
      color: 'bg-secondary-500',
    },
  ];

  // if (tendersLoading || bidsLoading) return <Loader />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {user?.email || 'Contractor'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Card title="Recent Active Tenders">
          {
            true
              // activeTenders.length === 0 
              ? (
                <p className="text-gray-500">No active tenders at the moment.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Deadline
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* {activeTenders.slice(0, 5).map((tender: any) => (
                    <tr key={tender._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tender.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(tender.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          href={`/tenders/${tender._id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Apply Now →
                        </Link>
                      </td>
                    </tr>
                  ))} */}
                    </tbody>
                  </table>
                </div>
              )}
        </Card>
      </div>
    </div>
  );
}