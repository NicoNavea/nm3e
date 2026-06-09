import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problema from "@/components/Problema";
import Blog from "@/components/Blog";
import Servicios from "@/components/Servicios";
import Cifras from "@/components/Cifras";
import Proceso from "@/components/Proceso";
import Contacto from "@/components/Contacto";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollReveal />
      <Navbar />
      <Hero />
      <Problema />
      <Blog />
      <Servicios />
      <Proceso />



      <Cifras />

      <Contacto />
      <CtaFinal />
      <Footer />
    </>
  );
}
