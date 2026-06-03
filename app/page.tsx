import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Services from "@/components/Services";
import Clinics from "@/components/Clinics";
import Team from "@/components/Team";
import Financing from "@/components/Financing";
import Reviews from "@/components/Reviews";
import InstagramSection from "@/components/Instagram";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatWidget from "@/components/ChatWidget";
import TextReveal from "@/components/TextReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Welcome />

        {/* Text reveal statement */}
        <section className="bg-[#FAFAF8] py-24 sm:py-32">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <TextReveal
              text="Llevamos más de 15 años transformando sonrisas en Tenerife. Tecnología de vanguardia, equipo multidisciplinar y 8 clínicas para estar siempre cerca de ti."
              className="text-[clamp(22px,3.8vw,52px)] font-extrabold"
            />
          </div>
        </section>

        <Reviews />
        <Services />
        <Clinics />
        <Team />
        <Financing />
        <InstagramSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </>
  );
}
