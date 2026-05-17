'use client';

import { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { RootState } from '@/store/store';
import { useGetCompanyQuery } from '@/store/api/companyApi';
import { setCurrentCompany } from '@/store/slices/companySlice';
import Sidebar from '../Layout/Sidebar';
import Loader from '../common/Loader';

// ✅ Only auth routes — tenders/gallery are in (public) group now
const PUBLIC_ROUTES = ['/login', '/signup', '/otp-request', '/otp-verify'];

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { currentCompany } = useSelector((state: RootState) => state.company);
  const router = useRouter();
  const pathname = usePathname();

  const companyId = user?.companyIds?.[0] ?? null;

  const { data: companyData } = useGetCompanyQuery(companyId!, {
    skip: !companyId || !!currentCompany,
  });

  useEffect(() => {
    const company = companyData?.data?.company;
    if (company) {
      dispatch(setCurrentCompany(company));
    }
  }, [companyData, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return <Loader />;
  }

  // ✅ All dashboard routes always have sidebar
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}