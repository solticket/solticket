import { useProgramContext } from "@/context/program.context";
import EventCard from "./EventCard";

const EventsList = () => {
  const {events} = useProgramContext();
  return (
    <div className="grid grid-cols-4 space-x-4 w-full">
      {events?.map((event) => (
        <EventCard key={event.publicKey} {...event}/>
      ))}
    </div>
  );
};

export default EventsList;

