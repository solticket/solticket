import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="p-24 text-black h-[480px] flex-shrink-0 bg-gray-50 w-full flex items-center justify-center">
      <div>
        <h2 className="text-4xl font-bold text-center mt-4">
          {"Experience the Future of  Event Ticketing"}
        </h2>

        <div className="flex items-center mt-6 justify-center">
          <Button size="lg">{"Explore our Exclusive Events"}</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
