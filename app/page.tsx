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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Welcome />
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
