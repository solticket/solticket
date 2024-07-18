"use client";

import Hero from "@/components/homepage/Hero";
import Navbar from "@/components/layout/Navbar";
import EventsList from "@/components/events/EventsList";
import Benefits from "@/components/homepage/Benefits";
import GlobalLayout from "@/components/layout/GlobalLayout";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <GlobalLayout>
      <main className="flex flex-col items-center justify-between w-full">
        <Navbar />
        <Hero />

        <div className="py-16 w-full px-8">
          <h2 className="title">
            {"Reserve your tickets for our exclusives events"}
          </h2>

          <div className="mt-6 w-full">
            <EventsList />
          </div>
        </div>

        <Benefits />

        <div className="py-16 w-full items-center justify-center flex">
          <Button size="lg">
            {"Create your event and start selling tickets"}
          </Button>
        </div>
      </main>
    </GlobalLayout>
  );
};

export default Home;
