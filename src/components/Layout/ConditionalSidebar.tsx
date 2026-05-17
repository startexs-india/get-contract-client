// needs 'use client' only for Sidebar Redux reads
'use client';

import Sidebar from './Sidebar';

export default function ConditionalSidebar({
    children,
    isLoggedIn,
}: {
    children: React.ReactNode;
    isLoggedIn: boolean;
}) {
    if (isLoggedIn) {
        return (
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        );
    }

    return (
        <main className="flex-1 w-full">
            {children}
        </main>
    );
}