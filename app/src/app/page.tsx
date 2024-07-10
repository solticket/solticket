import Hero from "@/components/homepage/Hero";
import Footer from "@/components/layout/Footer";
import GlobalLayout from "@/components/layout/GlobalLayout";

const Home = () => {
  return (
    <GlobalLayout>
      <main className="flex flex-col items-center justify-between bg-white h-screen w-screen">
        <Hero />
        <Footer />
      </main>
    </GlobalLayout>
  );
};

export default Home;
