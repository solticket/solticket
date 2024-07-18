import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventData } from "@/types/event";
import dayjs from "dayjs";
import Image from "next/image";

const EventCard = ({ event }: { event: EventData}) => {
  return (
    <Card>
      <div className="h-[200px] bg-gray-100 rounded-t-lg">
        <Image
          src="https://spaceholder.cc/i/300x200"
          alt={event.title}
          className="w-full h-[200px] object-cover rounded-t-lg"
          width={300}
          height={200}
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold">{`${event.title}, ${event.location}`}</CardTitle>
        <CardDescription>{dayjs(event.deadline).format('DD MM YYYY')}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm">
        {event.description}
      </CardContent>
    </Card>
  );
};

export default EventCard;
