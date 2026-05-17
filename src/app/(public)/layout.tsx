// src/app/(public)/layout.tsx
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            {/* ✅ No wrapping main here — each page/sublayout controls its own layout */}
            {children}
            <Footer />
        </div>
    );
}