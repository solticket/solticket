import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProgramContext } from "@/context/program.context";
import { useEffect, useState } from "react";

const EventCard = ({ account, publicKey }) => {
  const [timeEvent, setTimeEvent] = useState('');
  const [eventOver, setEventOver] = useState(false);

  useEffect(() => {
    const deadline = account.deadline * 1000;
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance < 0) {
        setTimeEvent('Event has ended.');
        setEventOver(true);
      } else {
        const deadlineDate = new Date(deadline);
        const month = deadlineDate.getMonth() + 1;
        const year = deadlineDate.getFullYear();
        const date = deadlineDate.getDate();
        const hours = deadlineDate.getHours();
        const minutes = deadlineDate.getMinutes();
  

        setTimeEvent(`${year}/${month}/${date} ${hours}h ${minutes}m`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [account.eventDeadline]);
  return (
    <Card>
      <div className="h-[200px]  bg-gray-100">
        {/* <Image
          src="https://source.unsplash.com/300x200/?music"
          alt="event"
          className="w-full h-[200px] object-cover"
        /> */}
      </div>
      <CardHeader>
        <CardTitle>{account.title}</CardTitle>
        <CardDescription>{account.descritpion}</CardDescription>
        <CardContent>Location: {account.location}</CardContent>
        <CardDescription>{timeEvent}</CardDescription>
      </CardHeader>
      <CardContent>
        <p></p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
