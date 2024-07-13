import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div
      className="p-24 text-black h-[480px] flex-shrink-0 bg-gray-50 w-full flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="z-40">
        <h2 className="text-4xl font-bold text-center mt-4 text-white">
          {"Experience the Future of  Event Ticketing"}
        </h2>

        <div className="flex items-center mt-8 justify-center">
          <Button size="lg">{"Explore our Exclusive Events"}</Button>
        </div>
      </div>
      <div className="h-[480px] w-full absolute bg-black opacity-30 z-10" />
    </div>
  );
};

export default Hero;
