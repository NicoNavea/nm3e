import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import Tienda from "@/components/Tienda";
import Footer from "@/components/Footer";

export const revalidate = 3600;

export default function TiendaPage() {
  return (
    <>
      <CustomCursor />
      <ScrollReveal />
      <Navbar />
      <Tienda />
      <Footer />
    </>
  );
}
