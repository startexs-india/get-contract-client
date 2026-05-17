// src/app/(public)/tenders/layout.tsx

import TendersSidebarWrapper from "@/components/tenders/TendersSidebarWrapper";

export default function TendersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <TendersSidebarWrapper>{children}</TendersSidebarWrapper>;
}