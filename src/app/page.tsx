import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar      from "@/components/Navbar";
import Hero        from "@/components/Hero";
import Problema    from "@/components/Problema";
import Blog        from "@/components/Blog";
import Servicios   from "@/components/Servicios";
import Tienda      from "@/components/Tienda";
import Cifras      from "@/components/Cifras";
import Proceso     from "@/components/Proceso";
import CtaFinal    from "@/components/CtaFinal";
import Footer      from "@/components/Footer";

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
      <Tienda />
      <Cifras />
      <Proceso />
      <CtaFinal />
      <Footer />
    </>
  );
}
