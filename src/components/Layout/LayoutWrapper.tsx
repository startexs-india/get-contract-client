'use client';

import { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';

import { RootState } from '@/store/store';
import { useGetCompanyQuery } from '@/store/api/companyApi';
import { setCurrentCompany } from '@/store/slices/companySlice';

import Loader from '../common/Loader';

export default function LayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {

  const dispatch = useDispatch();

  const {
    isAuthenticated,
    user,
  } = useSelector(
    (state: RootState) => state.auth
  );

  const { currentCompany } = useSelector(
    (state: RootState) => state.company
  );

  const router = useRouter();
  const pathname = usePathname();

  const companyId =
    user?.companyIds?.[0] ?? null;

  const { data: companyData } =
    useGetCompanyQuery(companyId!, {
      skip:
        !companyId || !!currentCompany,
    });

  useEffect(() => {
    const company =
      companyData?.data?.company;

    if (company) {
      dispatch(
        setCurrentCompany(company)
      );
    }
  }, [companyData, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [
    isAuthenticated,
    pathname,
    router,
  ]);

  if (!isAuthenticated) {
    return <Loader />;
  }

  return (
    <main className="w-full p-6">
      {children}
    </main>
  );
}