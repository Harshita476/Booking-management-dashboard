import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ManifestStrip from "@/components/ManifestStrip";
import Routes from "@/components/Routes";
import Vessel from "@/components/Vessel";
import LogTestimonial from "@/components/LogTestimonial";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <ManifestStrip />
        <Routes />
        <Vessel />
        <LogTestimonial />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
