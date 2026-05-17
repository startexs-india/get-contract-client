import Footer from "@/components/Layout/Footer";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";
import Navbar from "@/components/Layout/Navbar";


export default function DashboardLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <div>
      <Navbar />
      <LayoutWrapper>{children}</LayoutWrapper>
      <Footer />
    </div>
  );
}