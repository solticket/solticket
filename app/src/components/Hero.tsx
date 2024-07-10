import { Button } from './ui/button';

const Hero = () => {
  return (
    <div className="p-24 text-white">
        <h1 className="font-bold text-4xl text-center">SolTicket</h1>
        <h2 className="text-3xl text-center mt-4">
          {"Experience the Future of  Event Ticketing"}
      </h2>

      <div className="flex items-center mt-6 justify-center">
      <Button>
        {'Explore our Exclusive Events'}
      </Button>
      </div>
    </div>
  );
};

export default Hero;
