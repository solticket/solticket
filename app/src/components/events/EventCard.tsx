import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EventCard = () => {
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
        <CardTitle>Summer Music Festival, Paris</CardTitle>
        <CardDescription>Apr 17-22</CardDescription>
      </CardHeader>
      <CardContent>
        <p></p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
