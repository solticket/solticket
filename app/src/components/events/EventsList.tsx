import EventCard from "./EventCard";

const EventsList = () => {
  return (
    <div className="grid grid-cols-4 space-x-4 w-full">
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </div>
  );
};

export default EventsList;
