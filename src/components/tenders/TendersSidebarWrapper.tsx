'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Sidebar from '@/components/Layout/Sidebar';

export default function TendersSidebarWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    // ✅ Read directly from Redux — always accurate, no cookie race condition
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (isAuthenticated) {
        return (
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        );
    }

    // logged out — full width
    return (
        <main className="w-full">
            {children}
        </main>
    );
}