import Footer from "@/components/Layout/Footer";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <Navbar />

      {/* Dashboard Body */}
      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </div>

      <Footer />
    </div>
  );
}