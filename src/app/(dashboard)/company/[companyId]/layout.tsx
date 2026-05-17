'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Loader from '@/components/common/Loader';

/**
 * Guards all /company/[companyId]/* routes.
 * [companyId] is the slug (e.g. "chirag-3").
 * If the user has no company at all, redirect to /company/new.
 */
export default function CompanyLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const { currentCompany } = useSelector((state: RootState) => state.company);

    const hasCompanyId = !!user?.companyIds?.[0];

    useEffect(() => {
        // Only redirect if auth is settled and user genuinely has no company
        if (!hasCompanyId) {
            router.replace('/company/new');
        }
    }, [hasCompanyId, router]);

    // Still loading company data — wait before rendering
    if (hasCompanyId && !currentCompany) return <Loader />;

    // No company at all
    if (!hasCompanyId) return <Loader />;

    return <>{children}</>;
}