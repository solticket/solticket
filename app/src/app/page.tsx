import Hero from "@/components/homepage/Hero";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import EventsList from "@/components/events/EventsList";
import Benefits from "@/components/homepage/Benefits";
import GlobalLayout from "@/components/layout/GlobalLayout";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <GlobalLayout>
      <main className="flex flex-col items-center justify-between bg-white h-screen w-screen">
        <Navbar />
        <Hero />

        <div className="py-16">
          <h2 className="title">
            {"Reserve your tickets for our exclusives events"}
          </h2>

          <EventsList />
        </div>

        <Benefits />

        <div className="py-16">
          <Button size="lg">
            {"Create your event and start selling tickets"}
          </Button>
        </div>
        <Footer />
      </main>
    </GlobalLayout>
  );
};

export default Home;
